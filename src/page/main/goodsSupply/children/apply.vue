<style lang="scss" scoped>
    @import 'src/scss/mixins';
    @import 'src/scss/vars';
    .apply-panel {
        flex: 1;
        font-size: px2rem(30);
        .custom-title {
            margin-right: 1em;
            .required {
                color: red;
                margin-right: px2rem(5);
            }
            .remark {
                color: #949FAA;
            }
        }
        .toolbox {
            width: 80%;
            margin: px2rem(100) auto 0;
        }
    }
    .apply-panel /deep/ {
        .weui-input, .weui-textarea {
            font-size: px2rem(30);
            &::-webkit-input-placeholder {
                color: #949FAA;
            }
            &::-moz-placeholder {
                color: #949FAA;
            }
            &:-ms-input-placeholder {
                color: #949FAA;
            }
        }
        .weui-label {
            font-size: px2rem(30);
            color: #282828;
        }
    }
    .custom-confirm /deep/ {
        .weui-dialog {
            @include borderRadius(#{px2rem(10)});
            .weui-dialog__hd {
                /* padding: 0;
                background: url('../../assets/images/customerService.png') no-repeat center center;
                height: px2rem(244);
                background-size: cover;
                .weui-dialog__title {
                    font-size: 0;
                } */
                display: none;
            }
            .weui-dialog__bd {
                padding: px2rem(46) px2rem(40);
                font-size: px2rem(32);
                font-weight: 900;
                .rescue-icon {
                    display: block;
                    font-size: px2rem(114);
                    margin: 0 auto px2rem(46) auto;
                }
            }
            .weui-dialog__btn {
                color: #399EFF;
                font-size: px2rem(36);
            }
        }
        .custom-text {
            font-size: px2rem(32);
            color: #000000;
        }
        .confirm-content {
            .title {
                font-size: px2rem(34);
                color: #000;
                margin-bottom: px2rem(30);
                font-weight: 500;
            }
            .rescue-icon {
                display: block;
                font-size: px2rem(114);
                margin: 0 auto px2rem(46) auto;
            }
            .custom-text {
                padding-bottom: px2rem(35);
                text-align: left;
                font-size: px2rem(26);
                border-bottom: 1px solid #EEEEEE;
                .desc {
                    color: #333333;
                    margin-bottom: px2rem(35);
                }
                .sub-desc {
                    color: #949FAA;
                }
            }
            .agreement {
                text-align: left;
                margin-top: px2rem(20);
                font-size: px2rem(26);
                .protocol {
                    color: #399EFF;
                }
            }
        }
    }
    .confirm-content {
        text-align: center;
        .title {
            font-size: px2rem(34);
            color: #000;
            margin-bottom: px2rem(30);
            font-weight: 600;
        }
        .rescue-icon {
            display: block;
            font-size: px2rem(114);
            margin: 0 auto px2rem(46) auto;
        }
        .custom-text {
            padding-bottom: px2rem(35);
            text-align: left;
            font-size: px2rem(26);
            border-bottom: 1px solid #EEEEEE;
            .desc {
                font-weight: 600;
                color: #333333;
                margin-bottom: px2rem(35);
            }
            .sub-desc {
                color: #949FAA;
            }
        }
        .agreement {
            text-align: left;
            margin-top: px2rem(20);
            font-size: px2rem(26);
            .protocol {
                color: #399EFF;
            }
        }
    }
</style>
<template>
    <div class="apply-panel">
        <group>
            <x-input label-width="7em" title="账号" placeholder="请填写号码以便运营人员反馈处理结果" v-model="applyData.telephone" readonly>
            </x-input>
        </group>
        <group>
            <cell>
                <div slot="title" class="custom-title">
                    申请描述&nbsp;&nbsp;<span class="remark">(0-100字)</span>
                </div>
            </cell>
            <x-textarea placeholder="请简要描述您的申请理由，以便运营人员进行判断和处理。" :rows="6" :max="100" v-model="applyData.applyExplain">
            </x-textarea>
        </group>
        <div class="toolbox">
            <x-button type="warn" @click.native="handleAgreement">确认</x-button>
        </div>
        <!-- 弹出 -->
        <!--<confirm class="custom-confirm" v-model="confirmShow"
                 title="1"
                 @on-confirm="handleConfirm" :show-confirm-button="agree">
            <div class="confirm-content">
                <p class="title">服务授权</p>
                <svg-icon type="authority" class="rescue-icon"></svg-icon>
                <div class="custom-text">
                    <p class="desc">授权 第三方 获取您的个人信息为你服务</p>
                    <p class="sub-desc">获取你的公开信息(姓名、手机号、位置等)</p>
                </div>
                <div class="agreement">
                    <svg-icon :type="!agree ? 'unchecked' : 'checked'" @click.native="toggleAgree"></svg-icon>&nbsp;&nbsp;<span>同意&nbsp;<span class="protocol">《用户授权协议》</span></span>
                </div>
            </div>
        </confirm>-->
        <confirm v-model="confirmShow" :confirmType="agree ? 'default' : 'disabled'" @on-confirm="handleConfirm">
            <div slot="body" class="confirm-content">
                <p class="title">服务授权</p>
                <svg-icon type="authority" class="rescue-icon"></svg-icon>
                <div class="custom-text">
                    <p class="desc">授权 第三方 获取您的个人信息为你服务</p>
                    <p class="sub-desc">获取你的公开信息(姓名、手机号、位置等)</p>
                </div>
                <div class="agreement">
                    <svg-icon :type="!agree ? 'unchecked' : 'checked'" @click.native="toggleAgree"></svg-icon>&nbsp;&nbsp;<span>同意&nbsp;<span class="protocol">《用户授权协议》</span></span>
                </div>
            </div>
        </confirm>
    </div>
</template>

<script>
    import { Group, Cell, XInput, XTextarea, XButton, XHeader, Confirm } from 'vux';
    import { sign } from '@/services/goodsSupply/goodsSupplyService';
    import { confirm } from '@/components';
    import regMap from '@/libs/regMap';
    export default {
        name: 'apply',
        components: {Group, Cell, XInput, XTextarea, XButton, XHeader, Confirm, confirm},
        data () {
          return {
            applyData: {
                applyExplain: '',
                telephone: this.$store.state.userInfo.mobile
            },
            confirmShow: false,
            agree: false
          };
        },
        methods: {
            handleAgreement () {
                if (!this.applyData.telephone) {
                    this.$toast({
                        message: '联系电话不能为空',
                        position: 'bottom'
                    });
                    return;
                }
                if (!regMap.phone.test(this.applyData.telephone)) {
                    this.$toast({
                        message: '联系电话格式不对',
                        position: 'bottom'
                    });
                    return;
                }
                if (regMap.emoji.test(this.applyData.applyExplain)) {
                    this.$toast({
                       message: '不支持表情符号',
                       position: 'bottom'
                    });
                    return;
                }
                this.agree = false;
                this.confirmShow = true;
            },
            async handleConfirm () {
                if (!this.agree) {
                    return;
                }
                try {
                    this.$indicator.open();
                    const result = await sign(this.applyData);
                    this.$indicator.close();
                    if (result.data && result.data === 'AGREE') {
                        this.$router.replace('/main/goodsSupply/list');
                    } else {
                        this.$router.replace('/main/goodsSupply/state');
                    }
                } catch (e) {
                    this.$toast({
                       message: e.message,
                       position: 'bottom'
                    });
                    this.$indicator.close();
                }
            },
            toggleAgree () {
                this.agree = !this.agree;
            }
        }
    };
</script>
