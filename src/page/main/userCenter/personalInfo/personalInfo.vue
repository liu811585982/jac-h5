
/**
 * 作者：yeshengqiang
 * 时间：2018-03-27
 * 描述：个人信息
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .personal-panel {
        @include wh(100%, 100%);
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        -webkit-align-items: stretch;
        align-items: stretch;
        -webkit-flex-flow: column nowrap;
        flex-flow: column nowrap;
        .panel-body {
            flex: 1;
            -webkit-flex: 1;
            position: relative;
            overflow: auto;
            .info-title {
                background-color: $white;
                margin-bottom: $font-size-10;
                /deep/ .mint-cell-mask {
                    display: none;
                }
                .info-png {
                    width: 2.318rem;
                    height: 2.318rem;
                    border-radius: 50%;
                    display: inline-block;
                    overflow: hidden;
                    margin: $font-size-10 $font-size-10 $font-size-10 0;
                    box-shadow: 6px 6px 6px #ccc;
                    img {
                        display: block;
                        width: 100%;
                        margin: 0 auto;
                    }
                }
            }
            .info-body {
                background-color: $white;
                margin-bottom: 10px;
                /deep/ .weui-cell__ft {
                    padding-right: 13px;
                }
            }
        }
        & /deep/ .vux-no-group-title {
            margin-top: 0;
        }
    }
</style>
<template>
    <div class="personal-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <section class="panel-body">
            <div class="panel-scroller">
                <div class="info-title">
                    <group>
                        <cell :title="userInfo.nickName" is-link :link="{
                                path: link,
                                query: { keyword: 'nickName', value: userInfo.nickName}
                            }">
                            <span slot="icon" class="info-png">
                                <img :src="userInfo.avatar | avatarFormat"  @click="photo($event)"/>
                            </span>
                        </cell>
                        <cell title="姓名" :value="userInfo.driverName" is-link :link="{
                            path: link,
                            query: { keyword: 'driverName', value: userInfo.driverName}
                        }"></cell>
                    </group>
                </div>
                <div class="info-body">
                    <group  label-width="4.5em" label-margin-right="2em" >
                        <cell title="手机号码" :value="userInfo.mobile"></cell>
                        <cell title="身份证号" :value="userInfo.identityCard" is-link :link="{
                            path: link,
                            query: { keyword: 'identityCard', value: userInfo.identityCard}
                        }"></cell>
                        <cell title="性别" :value="userInfo.sex | sex" is-link @click.native="handleTips('sex')"></cell>
                        <cell title="QQ" :value="userInfo.qq" is-link :link="{
                            path: link,
                            query: { keyword: 'qq', value: userInfo.qq}
                        }"></cell>
                        <cell title="电子邮箱" :value="userInfo.email" is-link :link="{
                            path: link,
                            query: { keyword: 'email', value: userInfo.email}
                        }"></cell>
                        <cell title="联系地址" :value="userInfo.address" is-link :link="{
                            path: link,
                            query: { keyword: 'address', value: userInfo.address}
                        }" aligns-item="flex-start"></cell>
                    </group>
                </div>
                <div class="info-body">
                    <group>
                        <cell title="所属车队" :value="userInfo.fleetName"></cell>
                    </group>
                </div>
                <div class="info-body" v-if="userInfo.type === 'driver'">
                    <group>
                        <datetime
                            title="驾驶证有效截止日期"
                            v-model="userInfo.licenseValidDate"
                            :display-format="formatValueFunction"
                            @on-change="handleUpdateLicenseValidDate"
                        ></datetime>
                        <cell
                        title="驾驶证"
                        is-link
                        :border-intent="false"
                        :arrow-direction="showContent1 ? 'up' : 'down'"
                        @click.native="showContent1 = !showContent1"></cell>
                        <div class="slide" :class="showContent1?'animate':''">
                            <upload-img :imageUrl="licensePicture" svg="upload_img" @result="getFileLicensePicture"></upload-img>
                        </div>

                        <datetime
                            title="从业资格证有效截止日期"
                            v-model="userInfo.qualityValidDate"
                            :display-format="formatValueFunction"
                            @on-change="handleUpdateQualityValidDate"
                        ></datetime>
                        <cell
                        title="从业资格证"
                        is-link
                        :border-intent="false"
                        :arrow-direction="showContent2 ? 'up' : 'down'"
                        @click.native="showContent2 = !showContent2"></cell>
                        <div class="slide" :class="showContent2?'animate':''">
                            <upload-img :imageUrl="qualityPicture" svg="upload_img" @result="getFileQualityPicture"></upload-img>
                        </div>
                    </group>
                </div>
            </div>
            <!-- 搜索车队 -->
            <search
                @result-click="searchClick"
                :results="results"
                v-model="searchValue"
                position="absolute"
                auto-scroll-to-top
                v-show="searchVisible"
                @on-cancel="handleCancel"
                ref="search"></search>
        </section>
        <!-- 头像选择 | 性别选择-->
        <mt-actionsheet :actions="actionsText" v-model="sheetVisible"></mt-actionsheet>
    </div>
</template>
<script>
    import { mapMutations, mapState, mapActions } from 'vuex';
    import { Group, Cell, Scroller, Search, Datetime } from 'vux';
    import userInfo from '@/mixins/userInfo';
    import { formateDate, isEmpty } from '@/libs/utils';
    import { modifyPersonalInfo } from '@/services/userCenter/userCenter';
    import { uploadFileToCertificater, uploadFileToDrivingLicense } from '@/services/driverService/driverService';
    import { imgHttp } from '@/libs/config';
    import { uploadImg } from '@/components';

    export default {
        mixins: [ userInfo ],
        components: { Group, Cell, Scroller, Search, uploadImg, Datetime },
        data () {
            return {
                searchValue: '',
                searchResult: [],
                searchVisible: false,
                currentValue: new Date(),
                actionsType: 'phone',
                sheetVisible: false,
                link: '/main/userCenter/personalInfo/updatePersonalInfo',
                showContent1: true,
                showContent2: true,
                formatValueFunction (val) {
                    return formateDate(val, 'yyyy-MM-dd');
                }
            };
        },
        computed: {
            ...mapState([
                'allDiverList'
            ]),
            results () {
                if (this.searchResult.length) {
                    return this.searchResult;
                }
                if (this.allDiverList.length) {
                    return this.allDiverList.map(item => {
                        return {
                            title: item.name,
                            ...item
                        };
                    });
                }
                return [];
            },
            actionsText () {
                const map = {
                    phone: [{
                        name: '拍照',
                        method: this.takePhoto
                    }, {
                        name: '从相册选择',
                        method: this.openAlbum
                    }],
                    sex: [{
                        name: '男',
                        method: this.handleSelect
                    }, {
                        name: '女',
                        method: this.handleSelect
                    }]
                };
                return map[this.actionsType];
            },
            licensePicture () {
                return imgHttp + this.userInfo.licensePicture;
            },
            qualityPicture () {
                return imgHttp + this.userInfo.qualityPicture;
            }
        },
        mounted () {
            if (!this.allDiverList.length) {
                this.getAllDiverList();
            }
        },
        methods: {
            ...mapActions([
                'getAllDiverList'
            ]),
            ...mapMutations([
                'MODIFY_USERINFO'
            ]),
            // 打开相机
            takePhoto () {
                // 开始拍照
                let cmr = plus.camera.getCamera();
                cmr.captureImage((p) => {
                    // 读取拍照文件
                    plus.io.resolveLocalFileSystemURL(p, (entry) => {
                        this.openCrop(entry.toLocalURL());
                    }, (e) => {
                        this.$toast({
                            message: '读取拍照文件错误：' + e.message,
                            position: 'bottom'
                        });
                    });
                }, (e) => {
                    let message = '失败：' + e.message;
                    if (e.code === 11) {
                        message = '请先开启摄像头权限';
                    }
                    this.$toast({
                        message: message,
                        position: 'bottom'
                    });
                }, {filename: '_doc/camera/', index: 1});
            },
            // 打开相册
            openAlbum () {
                plus.gallery.pick((path) => {
                    this.openCrop(path);
                }, (e) => {
                    this.$toast({
                        message: '取消选择图片',
                        position: 'bottom'
                    });
                }, {filter: 'image'});
            },
            // 跳转到裁图页面
            openCrop (imageUrl) {
                this.$router.push({
                    path: '/main/userCenter/personalInfo/updatePhoto',
                    query: {
                        imageUrl: imageUrl
                    }
                });
            },
            // 提示
            handleTips (type) {
                this.actionsType = 'sex';
                this.sheetVisible = true;
            },
            // 修改驾驶证有效截止日期
            handleUpdateLicenseValidDate (value) {
                // console.log('value', value);
                let param = {
                    licenseValidDate: formateDate(value, 'yyyy-MM-dd hh:mm:ss')
                };
                this.modifyInfo(param);
            },
            // 修改从业资格证有效截止日期
            handleUpdateQualityValidDate (value) {
                let param = {
                    qualityValidDate: formateDate(value, 'yyyy-MM-dd hh:mm:ss')
                };
                this.modifyInfo(param);
            },
            // 修改个人信息
            async modifyInfo (param) {
                try {
                    this.$indicator.open();
                    await modifyPersonalInfo(param);
                    this.MODIFY_USERINFO(param);
                    this.$indicator.close();
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                    this.$indicator.close();
                }
            },
            handleSelect (val) {
                const sex = val.name === '男' ? 'MALE' : 'FEMALE';
                const param = { sex };
                this.modifyInfo(param);
            },
            photo (el) {
                this.actionsType = 'phone';
                this.sheetVisible = true;
                el.preventDefault();// 阻止默认事件（原生方法）
                el.stopPropagation(); // 阻止冒泡（原声方法）
            },
            // 选择车队
            chooseDiver (val) {
                this.searchVisible = true;
                this.searchValue = val;
                this.$nextTick(() => {
                    this.$refs.search.setFocus();
                });
            },
            handleCancel () {
                this.searchVisible = false;
            },
            searchClick (item) {
                const param = { fleetName: item.name, fleetId: item.id };
                this.modifyInfo(param);
                this.searchVisible = false;
            },
            // 获取驾驶证
            getFileLicensePicture (file) {
                this.uploadService('license', file);
            },
            // 获取从业资格证
            getFileQualityPicture (file) {
                this.uploadService('quality', file);
            },
            // 上传图片
            async uploadService (type, file) {
                try {
                    let result = '';
                    let param = {};
                    let formData = new FormData();
                    formData.append('file', file);
                    if (type === 'quality') {
                        // 从业资格证
                        result = await uploadFileToCertificater(formData);
                        param.qualityPicture = result.data.filePath;
                    } else {
                        // 驾照
                        result = await uploadFileToDrivingLicense(formData);
                        param.licensePicture = result.data.filePath;
                    }
                    await this.modifyInfo(param);
                    this.$toast({
                        message: '文件已保存',
                        position: 'bottom'
                    });
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                    this.$indicator.close();
                }
            }
        },
        watch: {
            searchValue (val) {
                if (isEmpty(val)) this.searchResult = [];
                this.searchResult = this.results.filter(item => {
                    return new RegExp(val, 'i').test(item.title);
                });
            }
        },
        filters: {
            sex (val) {
                let str = '';
                switch (val) {
                    case 'MALE':
                        str = '男';
                        break;
                    case 'FEMALE':
                        str = '女';
                        break;
                    case 'UNKNOWN':
                        str = '未知';
                        break;
                }
                return str;
            },
            // 默认头像过滤
            avatarFormat (val) {
                let url = '';
                if (val) {
                    url = imgHttp + val;
                } else {
                    url = require('../../../../assets/images/bbs.png');
                }
                return url;
            }
        }
    };
</script>
