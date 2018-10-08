<style lang="scss" scoped>
    @import 'src/scss/mixins';

    .pannel-page {
        @include wh(100%, 100%);
        position: relative;
        overflow: hidden;
        background: #000;
        .vue-cropper{
            background: #000;
            @include wh(100%, 80%);
        }
        .wrapper {
            @include wh(100%, 100%);
        }
        .btn {
            position: absolute;
            bottom:5%;
            left: 10%;
            width: 80%;
            display: block;
        }
    }
    .font-size {
        font-size: px2rem(32);
    }
</style>

<template>
  <div class="pannel-page">
    <!-- 头部 -->
    <hy-header title="移动和缩放" class="v-immersed">
        <span class="header-nav__inner" slot="left" v-go-back>
            <svg-icon type="back"></svg-icon>
        </span>
        <span class="header-nav__inner is-right" slot="right">
            <span class="nav_type font-size" @click="uploadImg">
                使用
            </span>
        </span>
    </hy-header>
    <div class="wrapper">
        <vueCropper
            ref="cropper"
            :img="img"
            :autoCrop="autoCrop"
            :autoCropWidth="autoCropWidth"
            :autoCropHeight="autoCropHeight"
            :fixedBox="fixedBox"
            :canMoveBox="canMoveBox"
            :fixed="fixed"
            :info="info"
        ></vueCropper>
    </div>
  </div>
</template>
<script>
import VueCropper from 'vue-cropper';
import { uploadPhoto } from '@/services/userCenter/userCenter';

export default {
    	components: {
            VueCropper
        },
        data () {
            return {
                img: 'https://o90cnn3g2.qnssl.com/0C3ABE8D05322EAC3120DDB11F9D1F72.png',
				autoCrop: true,
				autoCropWidth: 300,
                autoCropHeight: 300,
                fixed: false,
                fixedBox: true,
                canMoveBox: false,
                info: false,
                downImg: ''
            };
        },
        mounted () {
            this.getImg();
        },
        methods: {
            getImg () {
                // this.img = this.$route.query.imageUrl;
            },
            uploadImg () {
                // 获取截图的blob数据
                this.$refs.cropper.getCropBlob((data) => {
                    let form = document.forms[0];
                    let formData = new FormData(form);
                    let extName = data.type.split('/')[1];
                    formData.append('avatar', data, 'img.' + extName);
                    console.log(formData.get('avatar'));
                    // this._uploadPhoto(formData);
                });
            },
            async _uploadPhoto (param) {
                try {
                    this.$indicator.open();
                    let result = await uploadPhoto(param);
                    this.$indicator.close();
                    console.log(result);
                    this.MODIFY_USERINFO({
                        avatar: result.data.filePath
                    });
                    this.$router.back();
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                    this.$indicator.close();
                }
            }
        }
};
</script>
