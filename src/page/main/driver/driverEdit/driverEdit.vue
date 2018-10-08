<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .page-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        overflow: hidden;
        .section-body{
            position: relative;
            @include wh(100%, 100%);
            flex: 1;
            overflow: hidden;
            .section-scroller {
                position: absolute;
                left: 0;
                top: 0;
                @include wh(100%, 100%);
                overflow: auto;
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
                .toolbox {
                    width: 80%;
                    margin: px2rem(50) auto 0;
                }
            }
        }
    }
    .mb-25 {
        margin-bottom: 25px;
    }
</style>
<template>
    <div class="page-panel">
        <!-- 头部 -->
        <hy-header :title="title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="section-body">
            <div class="section-scroller">
                <group title="基本信息"  label-width="4.5em" label-margin-right="2em" label-align="left">
                    <x-input v-model="userInfo.fleetName" readonly>
                        <div class="label" slot="label"><span class="required">*</span><span>所属车队</span></div>
                    </x-input>
                    <x-input placeholder="请输入姓名" v-model="driverInfo.driverName" :min="2" :max="5">
                        <div class="label" slot="label"><span class="required">*</span><span>姓名</span></div>
                    </x-input>
                    <x-input placeholder="请输入身份证" v-model="driverInfo.identityCard" :min="15" :max="18">
                        <div class="label" slot="label"><span class="required">*</span><span>身份证</span></div>
                    </x-input>
                    <popup-picker value-text-align="left" :data="['男女'.split('')]" v-model="sex" @on-change="handleChange">
                        <div class="label" slot="title"><span class="required">*</span><span>性别</span></div>
                    </popup-picker>
                    <x-input placeholder="请输入手机号" v-model="driverInfo.mobile" @on-change="handleMobileChange" :disabled="$route.query.driverId !== undefined">
                        <div class="label" slot="label"><span class="required">*</span><span>手机</span></div>
                    </x-input>
                    <x-input title="QQ" placeholder="请输入QQ号" v-model="driverInfo.qq" :min="5"></x-input>
                    <x-input title="电子邮箱" placeholder="请输入电子邮箱" v-model="driverInfo.email"></x-input>
                    <x-textarea title="联系地址" placeholder="请填联系地址" v-model="driverInfo.address" :show-counter="false" :rows="3" :max="100"></x-textarea>
                </group>
                <group title="证件信息" class="mb-25">
                    <x-input placeholder="驾照号码" v-model="driverInfo.driverLicense" :min="15" :max="18">
                        <div class="label" slot="label"><span class="required">*</span><span>驾照号码</span></div>
                    </x-input>
                    <datetime
                        title="驾驶证有效截止日期"
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
                <div class="toolbox">
                    <x-button type="warn" @click.native="handleSave()">确认</x-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import userInfo from '@/mixins/userInfo';
    import { addDriver, driverDetail, updateDriver, uploadFileToCertificater, uploadFileToDrivingLicense, checkMobile } from '@/services/driverService/driverService';
    import { ViewBox, Group, Cell, CellBox, XInput, XTextarea, PopupPicker, Actionsheet, Spinner, Datetime, XButton } from 'vux';
    import { imgHttp } from '@/libs/config';
    import { uploadImg } from '@/components';
    import { formateDate } from '@/libs/utils';
    import regMap from '@/libs/regMap';

    export default {
        components: { ViewBox, Group, Cell, CellBox, XInput, XTextarea, PopupPicker, Actionsheet, Spinner, uploadImg, Datetime, XButton },
        mixins: [ userInfo ],
        data () {
            return {
                title: '新增司机信息',
                driverInfo: {
                    sex: 'MALE'
                },
                sex: ['男'],
                showContent1: true,
                showContent2: true,
                licenseValidDate: '',
                qualityValidDate: '',
                formatValueFunction (val) {
                    return formateDate(val, 'yyyy-MM-dd');
                }
            };
        },
        computed: {
            licensePicture () {
                return imgHttp + this.driverInfo.licensePicture;
            },
            qualityPicture () {
                return imgHttp + this.driverInfo.qualityPicture;
            }
        },
        mounted () {
            // 获取司机信息
            this.driverInfo.id = this.$route.query.driverId;
            if (this.driverInfo.id) {
                this.title = '编辑司机信息';
                this.getInfo({driverId: this.driverInfo.id});
            }
        },
        methods: {
             async getInfo (param) {
                try {
                    this.$indicator.open();
                    let result = await driverDetail(param);
                    this.driverInfo = result.data;
                    for (const key in this.driverInfo) {
                        if (!this.driverInfo[key]) {
                            this.driverInfo[key] = '';
                        }
                    }
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
            // 检查手机
            async handleMobileChange (value) {
                if (this.$route.query.driverId) {
                    return;
                }
                const reg = /^1[345678]\d{9}$/;
                if (!reg.test(value)) {
                    return;
                }
                const result = await checkMobile({mobile: value});
                result.data && (this.driverInfo = result.data);
            },
            // 获取驾驶证
            getFileLicensePicture (file, next) {
                this.uploadService('license', file, next);
            },
            // 获取从业资格证
            getFileQualityPicture (file, next) {
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
            async handleSave () {
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
                if (!this.driverInfo.mobile) {
                    this.$toast({
                        message: '手机号不能为空',
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
                if (!regMap.phone.test(this.driverInfo.mobile)) {
                    this.$toast({
                        message: '手机号格式不正确',
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
                        message: '驾照号格式不正确',
                        position: 'bottom'
                    });
                    return false;
                }
                this.driverInfo.fleetId = this.userInfo.fleetId;
                // 日期格式处理
                this.driverInfo.licenseValidDate && (this.driverInfo.licenseValidDate = formateDate(this.driverInfo.licenseValidDate, 'yyyy-MM-dd hh:mm:ss'));
                this.driverInfo.qualityValidDate && (this.driverInfo.qualityValidDate = formateDate(this.driverInfo.qualityValidDate, 'yyyy-MM-dd hh:mm:ss'));
                try {
                    this.$indicator.open('正在保存');
                    if (this.driverInfo.id) {
                        // 修改司机信息
                        await updateDriver(this.driverInfo);
                    } else {
                        // 新增司机信息
                        await addDriver(this.driverInfo);
                    }
                    this.$toast({
                        message: '保存成功',
                        position: 'bottom'
                    });
                    this.$router.back();
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
