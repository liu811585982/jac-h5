<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .page-panel {
        @include wh(100%, 100%);
        overflow: hidden;
        .btn {
            width: 80%;
            margin: 1.5rem 0 0 10%;
        }
        .label {
            position: relative;
            width: 4.5em;
            margin-right: 2em;
            padding-left: px2rem(15);
            &.auto-width {
                width: 100%;
            }
            .required {
                position: absolute;
                top: px2rem(5);
                left: 0;
                color: $global_color;
            }
        }
        /deep/ .weui-label {
            padding-left: px2rem(15);
        }
        /deep/ .vux-label {
            padding-left: px2rem(15);
        }
    }
    .mb-25 {
        margin-bottom: px2rem(30);
    }
    .login-panel {
        width: 80%;
        margin: 0 auto;
        .login-btn {
            margin: px2rem(120) 0 px2rem(80);
        }
    }
</style>
<template>
    <div class="page-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <view-box ref="viewBox">
            <group title="基本信息"  label-width="4.5em" label-margin-right="2em">
                <x-input placeholder="请输入姓名" v-model="driverInfo.driverName" :min="2" :max="5">
                    <div class="label" slot="label"><span class="required">*</span><span>姓名</span></div>
                </x-input>
                <x-input placeholder="请输入身份证" v-model="driverInfo.identityCard" :min="15" :max="18">
                    <div class="label" slot="label"><span class="required">*</span><span>身份证</span></div>
                </x-input>
                <x-input title="驾驶证" placeholder="请输入驾驶证" v-model="driverInfo.driverLicense" :min="15" :max="18">
                    <div class="label" slot="label"><span class="required">*</span><span>驾驶证</span></div>
                </x-input>
                <popup-picker value-text-align="left" :data="['男女'.split('')]" v-model="sex" @on-change="handleChange">
                    <div class="label" slot="title"><span class="required">*</span><span>性别</span></div>
                </popup-picker>
                <x-input title="QQ" placeholder="请输入QQ号" v-model="driverInfo.qq" :min="5"></x-input>
                <x-input title="电子邮箱" placeholder="请输入电子邮箱" v-model="driverInfo.email"></x-input>
                <x-textarea title="联系地址" placeholder="请填写联系地址" v-model="driverInfo.address" :show-counter="false" :rows="3" :max="100"></x-textarea>
            </group>
            <group title="证件信息">
                <datetime
                    v-model="driverInfo.licenseValidDate"
                    :display-format="formatValueFunction">
                    <div class="label auto-width" slot="title"><span class="required">*</span><span>驾驶证有效截止日期</span></div>
                </datetime>
                <cell
                title="驾驶证"
                is-link
                :border-intent="false"
                :arrow-direction="showContent2 ? 'up' : 'down'"
                @click.native="showContent2 = !showContent2"></cell>
                <div class="slide" :class="showContent2?'animate':''">
                    <upload-img :imageUrl="licensePicture" svg="upload_img" @result="getFileLicensePicture"></upload-img>
                </div>
                <datetime
                    title="从业资格证有效截止日期"
                    v-model="driverInfo.qualityValidDate"
                    :display-format="formatValueFunction">
                    <div class="label auto-width" slot="title"><span class="required">*</span><span>从业资格证有效截止日期</span></div>
                </datetime>
                <cell
                title="从业资格证"
                is-link
                :border-intent="false"
                :arrow-direction="showContent1 ? 'up' : 'down'"
                @click.native="showContent1 = !showContent1"></cell>
                <div class="slide" :class="showContent1?'animate':''">
                    <upload-img :imageUrl="qualityPicture" svg="upload_img" @result="getFileQualityPicture"></upload-img>
                </div>
            </group>
            <group label-width="4.5em" label-margin-right="2em">
                <popup-picker
                    placeholder="请选中所属车队"
                    value-text-align="left" :data="fleetList" v-model="fleetName"  @on-change="selectFleet">
                    <div class="label" slot="title"><span class="required">*</span><span>所属车队</span></div>
                </popup-picker>
            </group>
            <div class="login-panel">
                <mt-button size="large" class="login-btn" @click="handleSave()" type="danger">确定</mt-button>
            </div>
        </view-box>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
    import { ViewBox, Group, Cell, CellBox, XInput, XTextarea, PopupPicker, Actionsheet, Datetime, XButton } from 'vux';
    import { registeredDriver, login, uploadFileToCertificater, uploadFileToDrivingLicense } from '@/services/loginService/loginService';
    import { fleetSelect } from '@/services/common';
    import { uploadImg } from '@/components';
    import { formateDate } from '@/libs/utils';
    import regMap from '@/libs/regMap';
    import { imgHttp } from '@/libs/config';

    export default {
        components: { ViewBox, Group, Cell, XButton, CellBox, XInput, XTextarea, PopupPicker, Actionsheet, uploadImg, Datetime },
        data () {
            return {
                driverInfo: {
                    sex: 'MALE',
                    fleetName: []
                },
                loginInfo: {},
                fleetName: [],
                fleetList: [],
                sex: ['男'],
                showContent1: true,
                showContent2: true,
                key: '',
                formatValueFunction (val) {
                    return formateDate(val, 'yyyy-MM-dd');
                }
            };
        },
        async created () {
            await this.getMotorcadeList();
            if (this.$route.query.registerData) {
                this.driverInfo = JSON.parse(this.$route.query.registerData);
                this.sex = this.driverInfo.sex === 'MALE' ? ['男'] : ['女'];
                this.fleetName = [this.driverInfo.fleetName];
            }
        },
        computed: {
            licensePicture () {
                return imgHttp + this.driverInfo.licensePicture;
            },
            qualityPicture () {
                return imgHttp + this.driverInfo.qualityPicture;
            }
        },
        methods: {
            ...mapMutations([
                'LOGIN_IN',
                'SAVE_LOGIN_INFO'
            ]),
            // 获取车队列表
            async getMotorcadeList () {
                try {
                    this.$indicator.open();
                    const result = await fleetSelect();
                    this.fleetList = [];
                    this.fleetList.push(result.data.map((item) => {
                        return {
                            id: item.id,
                            value: item.name,
                            name: item.name
                        };
                    }));
                    this.$indicator.close();
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                    this.$indicator.close();
                }
            },
            // 选择性别
            handleChange (value) {
                this.driverInfo.sex = (value.toString() === '男' ? 'MAlE' : 'FEMALE');
            },
            // 选择车队
            selectFleet (value) {
                this.fleetList[0].forEach(item => {
                    if (item.name === value[0]) {
                        this.driverInfo.fleetId = +item.id;
                    }
                });
            },
            // 获取驾驶证
            getFileLicensePicture (file, next) {
                this.uploadService('license', file, next);
            },
            // 获取从业资格证
            async getFileQualityPicture (file, next) {
                this.uploadService('quality', file, next);
            },
            // 上传图片
            async uploadService (type, file, next) {
                try {
                    let result = '';
                    let formData = new FormData();
                    formData.append('file', file);
                    if (type === 'quality') {
                        // 从业资格证
                        result = await uploadFileToCertificater(formData);
                        this.driverInfo.qualityPicture = result.data.filePath;
                    } else {
                        // 驾照
                        result = await uploadFileToDrivingLicense(formData);
                        this.driverInfo.licensePicture = result.data.filePath;
                    }
                    next();
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                    next();
                }
            },
            // 上传图片
            async handleSave () {
                if (this.$route.query.id) {
                    this.driverInfo.id = this.$route.query.id;
                }
                const loginInfo = {
                    mobile: this.$route.query.mobile,
                    password: this.$route.query.password
                };

                // 日期格式处理
                this.driverInfo.licenseValidDate && (this.driverInfo.licenseValidDate = formateDate(this.driverInfo.licenseValidDate, 'yyyy-MM-dd hh:mm:ss'));
                this.driverInfo.qualityValidDate && (this.driverInfo.qualityValidDate = formateDate(this.driverInfo.qualityValidDate, 'yyyy-MM-dd hh:mm:ss'));

                if (!this.driverInfo.driverName) {
                    this.$toast({
                        message: '司机姓名不能为空',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!this.driverInfo.identityCard) {
                    this.$toast({
                        message: '身份证号不能为空',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!this.driverInfo.driverLicense) {
                    this.$toast({
                        message: '驾驶证号不能为空',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!this.driverInfo.licenseValidDate) {
                    this.$toast({
                        message: '驾驶证有效截止日期不能为空',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!this.driverInfo.qualityValidDate) {
                    this.$toast({
                        message: '从业资格证有效截止日期不能为空',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!this.driverInfo.fleetId) {
                    this.$toast({
                        message: '所属车队不能为空',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!regMap.chineseName.test(this.driverInfo.driverName)) {
                    this.$toast({
                        message: '请输入正确的中文姓名',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!regMap.identityCard.test(this.driverInfo.identityCard)) {
                    this.$toast({
                        message: '身份证号格式不正确',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!regMap.qq.test(this.driverInfo.qq) && this.driverInfo.qq) {
                    this.$toast({
                        message: 'QQ号格式不正确',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!regMap.email.test(this.driverInfo.email) && this.driverInfo.email) {
                    this.$toast({
                        message: '电子邮箱式不正确',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!regMap.identityCard.test(this.driverInfo.driverLicense)) {
                    this.$toast({
                        message: '驾驶证号格式不正确',
                        position: 'bottom'
                    });
                    return false;
                }
                try {
                    this.$indicator.open('正在注册司机信息');
                    await registeredDriver(this.driverInfo);
                    const result = await login(loginInfo);
                    this.SAVE_LOGIN_INFO(loginInfo);
                    if (result.data.type === 'fleetAndDriver') {
                        this.$router.push({path: '/selectRole'});
                    } else {
                        this.LOGIN_IN(result.data);
                        this.$store.dispatch('getAllMessage');
                        this.$router.replace('/main');
                    }
                    this.$indicator.close();
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
