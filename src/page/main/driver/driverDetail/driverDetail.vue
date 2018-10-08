<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .page-panel /deep/{
        @include wh(100%, 100%);
        overflow: hidden;
        .mb-25 {
            margin-bottom: 25px;
        }
        .weui-cells__title {
            color: #9E9E9E;
            font-size: px2rem(26);
        }
        .vux-label {
            color: #7F8C9A;
            font-size: px2rem(28);
        }
        .weui-cell__ft {
            color: #212121;
            font-size: px2rem(28);
        }
    }

    .page-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        overflow: hidden;
        /deep/ .weui-cell__ft {
            padding-right: 13px;
        }
        .btn {
            width: 80%;
            margin: 1.5rem 0 0 10%;
        }
        .view-box-panel {
            flex: 1;
            overflow: auto;
        }
        .mb-25 {
            margin-bottom: 25px;
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
        <div class="view-box-panel">
            <group title="基本信息"  label-width="4.5em" label-margin-right="2em">
                <cell title="所属车队" :value="driverInfo.fleetName"></cell>
                <cell title="姓名" :value="driverInfo.driverName"></cell>
                <cell title="身份证" :value="driverInfo.identityCard"></cell>
                <cell title="性别" :value="driverInfo.sex | sex"></cell>
                <cell title="手机" :value="driverInfo.mobile"></cell>
                <cell title="QQ" :value="driverInfo.qq"></cell>
                <cell title="电子邮箱" :value="driverInfo.email"></cell>
                <cell title="联系地址" :value="driverInfo.address" align-items="flex-start"></cell>
            </group>
            <group title="证件信息">
                <cell title="驾驶证号" :value="driverInfo.driverLicense"></cell>
                <cell title="驾驶证有效截止日期" :value="driverInfo.licenseValidDate | dateFormat('yyyy-MM-dd')" value-align="right"></cell>
                <cell
                title="驾驶证"
                is-link
                :arrow-direction="showContent2 ? 'up' : 'down'"
                @click.native="showContent2 = !showContent2"></cell>
                <div class="slide" :class="showContent2?'animate':''">
                    <div class="upload_img vux-1px">
                        <!--<div class="icon">
                            <svg-icon type="upload_img"></svg-icon>
                        </div>
                        <div class="text">无图片</div>-->
                        <div v-if="driverInfo.licensePicture" class="preview_img" :style="{backgroundImage: 'url(' + imgHttp + driverInfo.licensePicture + ')'}"></div>
                        <no-picture v-else></no-picture>
                    </div>
                </div>

                <cell title="从业资格证有效截止日期" :value="driverInfo.qualityValidDate | dateFormat('yyyy-MM-dd')" value-align="right"></cell>
                <cell
                title="从业资格证"
                is-link
                :arrow-direction="showContent1 ? 'up' : 'down'"
                @click.native="showContent1 = !showContent1"></cell>
                <div class="slide" :class="showContent1?'animate':''">
                    <div class="upload_img vux-1px">
                        <!--<div class="icon">
                            <svg-icon type="upload_img"></svg-icon>
                        </div>
                        <div class="text">无图片</div>-->
                        <div v-if="driverInfo.qualityPicture" class="preview_img" :style="{backgroundImage: 'url(' + imgHttp + driverInfo.qualityPicture + ')'}"></div>
                        <no-picture v-else></no-picture>
                    </div>
                </div>
            </group>
            <!--<x-button type="warn" class="btn mb-25" @click.native="handleUnBindFleet">解除绑定</x-button>-->
        </div>
    </div>
</template>
<script>
    import { formateDate } from '@/libs/utils';
    import { driverDetail, unbindFleet } from '@/services/driverService/driverService';
    import { imgHttp } from '@/libs/config';
    import { Group, Cell, CellBox, PopupPicker, Actionsheet, XButton } from 'vux';
    import { noPicture } from '@/components';

    export default {
        components: { Group, Cell, CellBox, PopupPicker, Actionsheet, XButton, noPicture },
        data () {
            return {
                currentValue: new Date(),
                showContent1: false,
                showContent2: false,
                driverInfo: {},
                imgHttp: imgHttp
            };
        },
        mounted () {
            // 获取司机信息
            this.driverInfo.id = this.$route.query.driverId;
            if (this.driverInfo.id) {
                this.getInfo({driverId: this.driverInfo.id});
            }
        },
        methods: {
            async getInfo (param) {
                try {
                    this.$indicator.open();
                    let result = await driverDetail(param);
                    this.driverInfo = result.data;
                    this.$indicator.close();
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                    this.$indicator.close();
                }
            },
            handleChange (value) {
                let param = {
                    birthday: formateDate(value, 'yyyy-MM-dd hh:mm:ss')
                };
                this.modifyInfo(param);
            },
            handleEdit () {
                this.$router.push({
                    path: '/main/driver/driverEdit',
                    query: {
                        driverId: this.driverInfo.id
                    }
                });
            },
            // 解除绑定
            handleUnBindFleet () {
                this.$messagebox.confirm(`是否解绑司机：${this.driverInfo.driverName}`).then(async () => {
                    try {
                        this.$indicator.open();
                        await unbindFleet({driverId: this.driverInfo.id});
                        this.$toast({
                            message: '解绑成功',
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
            }
        }
    };
</script>
