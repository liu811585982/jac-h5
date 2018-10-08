/**
 * 作者：aicong
 * 时间：2018-04-09
 * 描述：上传照片
 */
 <style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .upload_img {
        position: relative;
        display: flex;
        display: -webkit-flex;
        margin: $font-size-10 auto $font-size-20;
        @include wh(8.53rem, 5.33rem);
        color:#99a4af;
        -webkit-flex-direction: column;
        flex-direction: column;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-align-items: center;
        align-items: center;
        overflow: hidden;
        background: #F4F4F4;
        .icon {
            font-size: 1.8rem;
            margin-bottom: px2rem(20);
            img {
                width: px2rem(150);
            }
        }
        .text {
            font-size: $font-size-14;
        }
        .preview_img {
            position: absolute;
            display: block;
            width: 100%;
            height:100%;
            top:0;
            left:0;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .loading {
            position: absolute;
            z-index: 1;
            width: 100%;
            height:100%;
            display: flex;
            display: -webkit-flex;
            -webkit-align-items: center;
            align-items: center;
            justify-content:center;
            -webkit-justify-content:center;
            background-color: rgba(255,255,255,1);
        }
    }
 </style>
<template>
    <div>
        <!-- <input type='file' id="file" @change="handleUpload"/> -->
        <div class="upload_img vux-1px" @click="isShowUploadMenus = true">
            <div class="icon">
                <!--<svg-icon :type="svg"></svg-icon>-->
                <img src="../../assets/images/no_picture.png" alt="">
            </div>
            <div class="text">请上传</div>
            <div v-show="backgroundImagePreview" class="preview_img" :style="{backgroundImage: 'url(' + backgroundImagePreview + ')'}"></div>
            <!--<div class="loading vux-1px" v-show="isLoading">
                <spinner type="ios" size="40px"></spinner>
            </div>-->
        </div>
        <!-- 拍照和相册菜单 -->
        <actionsheet v-model="isShowUploadMenus" :menus="showUploadMenus" @on-click-menu="handleClick" show-cancel></actionsheet>
    </div>
</template>

<script>
import { Spinner, Actionsheet } from 'vux';
import Exif from 'exif-js';

export default {
    name: 'uploadImg',
    components: { Spinner, Actionsheet },
    props: {
        imageUrl: {
            type: String,
            default: ''
        },
        svg: {
            type: String,
            default: 'upload_img'
        }
    },
    data () {
        return {
            backgroundImagePreview: '',
            isShowUploadMenus: false,
            showUploadMenus: {
                takePhoto: '拍照',
                openAlbum: '从相册选择'
            },
            isLoading: false,
            newFile: ''
        };
    },
    mounted () {
        this.initPriviewImg();
    },
    methods: {
        initPriviewImg () {
            setTimeout(() => {
                this.backgroundImagePreview = this.imageUrl;
            }, 20);
        },
        // 上传图片点击事件
        handleClick (key) {
            key && this[key].call();
        },
        // 打开相机
        takePhoto () {
            // document.getElementById('file').click();
            plus.camera.getCamera().captureImage((p) => {
               this.readImg(p);
            });
        },
        // 打开相册
        openAlbum () {
            plus.gallery.pick((p) => {
                this.readImg(p);
            });
        },
        // 读取图片文件
        readImg (url) {
            this.$indicator.open('正在上传，请稍候');
            plus.io.resolveLocalFileSystemURL(url, (entry) => {
                // 通过entry对象操作文件
                entry.file((file) => {
                    // 判断文件是否存在
                    if (file) {
                        // this.isLoading = true;
                        let fileReader = new plus.io.FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.onloadend = (e) => {
                            let imageSize = file.size;
                            let image = new Image();
                            image.src = e.target.result;
                            image.onload = () => {
                                let newImage = this.rotateImage(image);
                                this.backgroundImagePreview = newImage.src;
                                // this.isLoading = false;
                                this.judgeCompress(newImage, imageSize, file.name);
                            };
                        };
                    }
                });
            }, (e) => {
                console.log('获取: ' + e.message);
                this.$indicator.close();
            });
        },
        // 测试图片上传
        handleUpload (val) {
            let file = val.target.files[0];
            if (file) {
                // this.isLoading = true;
                let fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = (e) => {
                    let imageSize = file.size;
                    let image = new Image();
                    image.src = e.target.result;
                    image.onload = () => {
                        let newImage = this.rotateImage(image);
                        this.backgroundImagePreview = newImage.src;
                        this.judgeCompress(newImage, imageSize, file.name);
                    };
                };
            }
        },
        // 判断图片是否需要压缩
        judgeCompress (image, imageSize, filename) {
            // 判断图片是否大于1M
            var threshold = 1048576;// 阈值,可根据实际情况调整
            if (imageSize > threshold) {
                this.canvasDataURL(image.src, {quality: 0.2}, (base64Codes) => {
                    let newFile = this.dataURLtoFile(base64Codes, filename);
                    this.resultFile(newFile);
                });
            } else {
                let newFile = this.dataURLtoFile(image.src, filename);
                this.resultFile(newFile);
            }
        },
        // 图片压缩
        canvasDataURL (path, obj, callback) {
            let img = new Image();
            img.src = path;
            img.onload = function () {
                let that = this;
                // 默认按比例压缩
                let w = that.width,
                    h = that.height,
                    scale = w / h;
                w = obj.width || w;
                h = obj.height || (w / scale);
                let quality = 0.7;  // 默认图片质量为0.7
                // 生成canvas
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                // 创建属性节点
                let anw = document.createAttribute('width');
                anw.nodeValue = w;
                let anh = document.createAttribute('height');
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(that, 0, 0, w, h);
                // 图像质量
                if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                    quality = obj.quality;
                }
                // quality值越小，所绘制出的图像越模糊
                let base64 = canvas.toDataURL('image/jpeg', quality);
                // 回调函数返回base64的值
                callback(base64);
            };
        },
        // 将base64转换为文件
        dataURLtoFile (dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type: mime});
        },
        // 旋转照片
        rotateImage (image) {
            let width = image.width;
            let height = image.height;
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let newImage = new Image();
            // 旋转图片操作
            Exif.getData(image, function () {
                    let orientation = Exif.getTag(this, 'Orientation');
                    // console.log('orientation:' + orientation);
                    switch (orientation) {
                        // 正常状态
                        case 1:
                            // console.log('旋转0°');
                            newImage = image;
                            break;
                        // 旋转90度
                        case 6:
                            // console.log('旋转90°');
                            canvas.height = width;
                            canvas.width = height;
                            ctx.rotate(Math.PI / 2);
                            // 移动画布原点
                            ctx.translate(0, -height);
                            ctx.drawImage(image, 0, 0);
                            newImage.src = canvas.toDataURL('Image/jpeg', 1);
                            break;
                        // 旋转180°
                        case 3:
                            // console.log('旋转180°');
                            canvas.height = height;
                            canvas.width = width;
                            ctx.rotate(Math.PI);
                            ctx.translate(-width, -height);
                            ctx.drawImage(image, 0, 0);
                            newImage.src = canvas.toDataURL('Image/jpeg', 1);
                            break;
                        // 旋转270°
                        case 8:
                            // console.log('旋转270°');
                            canvas.height = width;
                            canvas.width = height;
                            ctx.rotate(-Math.PI / 2);
                            ctx.translate(-height, 0);
                            ctx.drawImage(image, 0, 0);
                            newImage.src = canvas.toDataURL('Image/jpeg', 1);
                            break;
                        // undefined时不旋转
                        case undefined:
                            // console.log('undefined  不旋转');
                            newImage = image;
                            break;
                    }
                }
            );
            return newImage;
        },
        next () {
            this.$indicator.close();
        },
        resultFile (file) {
            // this.isLoading = false;
            this.$emit('result', file, this.next);
        }
    },
    watch: {
        imageUrl () {
            this.initPriviewImg();
        }
    }
};
</script>
