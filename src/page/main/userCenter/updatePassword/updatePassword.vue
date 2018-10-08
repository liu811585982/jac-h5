/**
 * 作者：aicong
 * 时间：2018-03-26
 * 描述：忘记密码
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .login-panel {
        background-color: $second_bg;
        // padding-top: 2.2rem;
        @include wh(100%, 100%);
        .input-panel {
            .showPassword {
                text-align: right;
                margin: 1rem 1rem 0 0;
                font-size: px2rem(28);
                input {
                    width: 0.8rem;
                    height: 0.8rem;
                    margin-right: 0.2rem;
                    vertical-align: middle;
                    outline: none;
                }

            }
            .tip {
                font-size: px2rem(28);
                margin: 10px;
                line-height: 1rem;
            }
            .toolbox {
                width: 80%;
                margin: px2rem(50) auto 0;
            }
        }
    }
    .space {
        line-height: 44px;
        padding: 0 10px;
    }
</style>
<template>
<transition name="slideRight">
    <div class="login-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="panel-body">
            <div class="input-panel">
                <group>
                    <x-input title="原密码" placeholder="请输入原密码" v-model.trim="accountInfo.password" :type="this.isShowPassword ? 'text':'password'">
                        <span class="space" slot="right-full-height">
                            <svg-icon :type="isShowPassword ? 'eye-open' : 'eye-close'"></svg-icon>
                        </span>
                    </x-input>
                    <x-input title="新密码" placeholder="请输入新密码" v-model.trim="accountInfo.newPassword" :type="this.isShowPassword ? 'text':'password'">
                        <span class="space" slot="right-full-height">
                            <svg-icon :type="isShowPassword ? 'eye-open' : 'eye-close'"></svg-icon>
                        </span>
                    </x-input>
                    <x-input title="确认密码" placeholder="请确认新密码" v-model.trim="accountInfo.repassword" :type="this.isShowPassword ? 'text':'password'">
                        <span class="space" slot="right-full-height">
                            <svg-icon :type="isShowPassword ? 'eye-open' : 'eye-close'"></svg-icon>
                        </span>
                    </x-input>
                </group>
                <div class="showPassword">
                    <check-icon :value.sync="isShowPassword">显示密码</check-icon>
                </div>
                <!-- <div class="tip">
                    注意密码需要填写8-20位字符，可有英文字母，数字和符号组成，不能含空格
                </div> -->
                <div class="toolbox">
                    <x-button type="warn" @click.native="login()">确认</x-button>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>
<script>
    import qs from 'qs';
    import md5 from 'js-md5';
    import { Group, XInput, CheckIcon, XButton } from 'vux';
    import { updatePassword } from '@/services/userCenter/userCenter';
    import { sendCode } from '@/components';
    import regMap from '@/libs/regMap';

    export default {
        components: { sendCode, Group, XInput, CheckIcon, XButton },
        data () {
            return {
                accountInfo: {},
                isShowPassword: false
            };
        },
        methods: {
            async login () {
                if (!this.accountInfo.password) {
                    this.$toast({
                        message: '请输入原密码',
                        position: 'bottom'
                    });
                    return;
                }
                if (!this.accountInfo.newPassword) {
                    this.$toast({
                        message: '请输入新密码',
                        position: 'bottom'
                    });
                    return;
                }
                if (!this.accountInfo.repassword) {
                    this.$toast({
                        message: '请确认新密码',
                        position: 'bottom'
                    });
                    return;
                }
                if (!regMap.password.test(this.accountInfo.repassword)) {
                    this.$toast({
                        message: '字母开头，必须字母加数字组合，字符不支持/•¥£€\\，长度6~18位',
                        position: 'bottom'
                    });
                    return;
                }
                if (this.accountInfo.newPassword !== this.accountInfo.repassword) {
                    this.$toast({
                        message: '两次密码不一致',
                        position: 'bottom'
                    });
                    return;
                }
                try {
                    this.$indicator.open();
                    const accountInfo = Object.assign({}, this.accountInfo);
                    for (let i in accountInfo) {
                        if (accountInfo.hasOwnProperty(i)) {
                            accountInfo[i] = md5(accountInfo[i]).toUpperCase();
                        }
                    }
                    let loginInfo = this.$store.getters.getLoginInfo;
                    await updatePassword(qs.stringify(accountInfo));
                    this.$store.commit('SAVE_LOGIN_INFO', {
                        ...loginInfo,
                        password: accountInfo.newPassword
                    });
                    this.$indicator.close();
                    this.$router.back();
                    this.$toast({
                        message: '密码修改成功',
                        position: 'bottom'
                    });
                    this.$router.back();
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                    this.$indicator.close();
                }
            },
            showPassword () {
                this.isShowPassword = !this.isShowPassword;
            }
        }
    };
</script>
