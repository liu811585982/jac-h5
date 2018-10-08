/**
 * 作者：yeshengqiang
 * 时间：2018-03-21
 * 描述：登录
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .login-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        background-color: $white;
        .logo-panel {
            position: relative;
            background-color: $global_color;
            height: 40%;
            img.logo {
                @include wh(#{px2rem(140)}, #{px2rem(140)});
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                // @include wh(90px, 90px);
                display: inline-block;
                margin: auto;
                vertical-align: middle;
            }
            .tab-hd {
                position: absolute;
                z-index: 1;
                bottom: 0;
                left: 0;
                width: 100%;
                color: $white;
                display: block;
                text-align: center;
                font-size: 0;
                a {
                    position: relative;
                    width: 50%;
                    height: 1.28rem;
                    display: inline-block;
                    text-align: center;
                    font-size: px2rem(30);
                    &::after {
                        position: absolute;
                        left: 50%;
                        bottom: 0;
                        margin: 0 auto;
                        content: '';
                        width: 0;
                        height:0;
                        border-width: 0.3rem;
                        border-style: solid;
                        border-color: transparent transparent $white transparent;
                        transform: translate(-50%,0);
                        display: none;
                    }
                }
                 a.active {
                    &::after {
                        display: block;
                    }
                }
            }
        }
        .input-panel {
            flex: 1;
            width: 85%;
            margin: $font-size-10 auto;
            .form-item {
                position: relative;
                @include flex(center, row nowrap);
                height: 2.8rem;
                font-size: $font-size-16;
                .vux-x-input {
                    flex: 1;
                    -webkit-flex: 1;
                    &::before {
                        content: '';
                        display: none;
                    }
                }
                &::after {
                    position: absolute;
                    left: 0;
                    top: calc(100% - 1px);
                    content: '';
                    width: 100%;
                    height: 1px;
                    background-color: $felid_border;
                    transform: scaleY(0.5);
                }
                .login-label {
                    flex: 0 0 1rem;
                    -webkit-flex: 0 0 1rem;
                    line-height: 1;
                    font-size: 1rem;
                    color: $felid_border;
                    text-align: center;
                }
                .login-field {
                    flex: 1;
                    -webkit-flex: 1;
                }
            }
            .login-btn {
                margin-top: 1.5rem;
            }
            .btn-ex-login {
                display: block;
                margin-top: 0.85rem;
                text-align: center;
                font-size: $font-size-14;
                color: #A7A7A7;
            }
            .forgetPassword {
                color: #999797;
                text-decoration: none;
            }
        }
    }
    .mint-cell{
        min-height: 2.7rem;
    }
    .rememberPassword {
        padding-top: px2rem(20);
        text-align: right;
        font-size: 0.64rem;
    }
</style>
<template>
    <div class="login-panel">
        <div class="logo-panel v-immersed">
            <img class="logo" src="../../assets/images/logo.png" alt="logo"/>
            <div class="tab-hd">
                <a @click="switchLogin(true)" :class=" { active : isLogin } ">登录</a>
                <a @click="switchLogin(false)" :class=" { active : !isLogin } ">注册</a>
            </div>
        </div>
        <div class="input-panel login-box" v-show="isLogin">
            <div class="form-item">
                <label class="login-label">
                    <svg-icon type="user"></svg-icon>
                </label>
                <x-input title="" autocomplete="off" v-model.trim="loginInfo.mobile" type="text" :max="11" placeholder="手机号"></x-input>
                <!-- <tel-input v-model="loginInfo.mobile" placeholder="手机号"></tel-input> -->
            </div>
            <div class="form-item">
                <label class="login-label">
                    <svg-icon type="password"></svg-icon>
                </label>
                <x-input title="" autocomplete="newpassword" v-model.trim="loginInfo.password" type="password" placeholder="密码"></x-input>
                <router-link to="/forgetPassword" class="forgetPassword">忘记密码？</router-link>
            </div>
            <div class="rememberPassword">
                <check-icon :value.sync="isRemember" type="plain">记住密码</check-icon>
            </div>
            <x-button type="warn" class="login-btn" @click.native="login()">登 录</x-button>
            <!-- <a class="btn-ex-login" @click="exLogin">体验登录</a> -->
        </div>
        <div class="input-panel register-box" v-show="!isLogin">
            <div class="form-item">
                <label class="login-label">
                    <svg-icon type="user"></svg-icon>
                </label>
                <x-input title="" v-model.trim="accountInfo.mobile"  type="text" :max="11" placeholder="手机号"></x-input>
                <!-- <tel-input v-model="accountInfo.mobile" placeholder="手机号"></tel-input> -->
            </div>
            <div class="form-item">
                <label class="login-label">
                    <svg-icon type="code" class="icon icon-code"></svg-icon>
                </label>
                <x-input title="" v-model.trim="accountInfo.verifyCode" :show-clear="false" type="number" placeholder="验证码"></x-input>
                <send-code :value="accountInfo.mobile"></send-code>
            </div>
            <x-button type="warn" class="login-btn" @click.native="isAccount()">下一步</x-button>
        </div>
    </div>
</template>
<script>
    import md5 from 'js-md5';
    import { mapMutations } from 'vuex';
    import { setStore, getStore, removeStore } from '@/libs/utils';
    import { login, checkMobile } from '@/services/loginService/loginService';
    import { sendCode, telInput } from '@/components';
    import { XInput, XButton, CheckIcon } from 'vux';
    import regMap from '@/libs/regMap';

    export default {
        components: { sendCode, XInput, XButton, telInput, CheckIcon },
        data () {
            return {
                isRemember: false,                  // 记住密码
                loginInfo: {
                    mobile: ''
                },
                accountInfo: {
                    mobile: ''
                },
                isLogin: true
            };
        },
        created () {
            const rLoginInfo = JSON.parse(getStore('rLoginInfo'));
            if (rLoginInfo) {
                this.isRemember = true;
                this.loginInfo = rLoginInfo;
            }
        },
        methods: {
            ...mapMutations([
                'LOGIN_IN',
                'SAVE_LOGIN_INFO'
            ]),
            async login () {
                try {
                    if (!this.loginInfo.mobile) {
                        this.$toast({
                            message: '请输入手机号',
                            position: 'bottom'
                        });
                        return;
                    }
                    if (!regMap.phone.test(this.loginInfo.mobile)) {
                        this.$toast({
                            message: '手机号格式不正确',
                            position: 'bottom'
                        });
                        return;
                    }
                    if (!this.loginInfo.password) {
                        this.$toast({
                            message: '请输入密码',
                            position: 'bottom'
                        });
                        return;
                    }
                    // 是否记住密码
                    if (this.isRemember) {
                        setStore('rLoginInfo', JSON.stringify(this.loginInfo));
                    } else {
                        removeStore('rLoginInfo');
                    }
                    this.$indicator.open('登录中...');
                    const loginInfo = Object.assign({}, this.loginInfo);
                    loginInfo.password = md5(loginInfo.password).toUpperCase();
                    const result = await login(loginInfo);
                    this.$indicator.close();
                    this.SAVE_LOGIN_INFO(loginInfo);
                    if (!result.data.fleetId) {
                        // 下一步 注册司机信息
                        this.$router.push({
                            path: '/login/driverRegister',
                            query: {
                                id: result.data.id,
                                ...loginInfo
                            }
                        });
                    } else {
                        if (result.data.type === 'fleetAndDriver') {
                            this.$router.push({path: '/selectRole'});
                        } else {
                            this.LOGIN_IN(result.data);
                            this.$store.dispatch('getAllMessage');
                            this.$router.replace('/main');
                        }
                    }
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                    this.$indicator.close();
                }
            },
            // 登录注册切换
            switchLogin (bool) {
                this.isLogin = bool;
            },
            // 体验登录
            exLogin () {
                this.loginInfo.mobile = '13012345678';
                this.loginInfo.password = '123456';
                this.login();
            },
            // 验证账号是否存在
            async isAccount () {
                if (!this.accountInfo.mobile) {
                    this.$toast({
                        message: '请输入手机号',
                        position: 'bottom'
                    });
                    return;
                }
                if (!regMap.phone.test(this.accountInfo.mobile)) {
                    this.$toast({
                        message: '手机号格式不正确',
                        position: 'bottom'
                    });
                    return;
                }
                if (!this.accountInfo.verifyCode) {
                    this.$toast({
                        message: '请输入验证码',
                        position: 'bottom'
                    });
                    return;
                }
                try {
                    this.$indicator.open();
                    const result = await checkMobile(this.accountInfo);
                    this.$indicator.close();
                    // 车队账号注册司机，会返回司机对象信息，如果不为空跳转到司机注册，如果为空跳转到设置密码
                    if (result.data) {
                        this.$router.push({
                            path: '/login/driverRegister',
                            query: {
                                registerData: JSON.stringify(result.data)
                            }
                        });
                    } else {
                        this.$router.push({
                            path: '/login/password',
                            query: {
                                mobile: this.accountInfo.mobile,
                                verifyCode: this.accountInfo.verifyCode
                            }
                        });
                    }
                } catch (e) {
                    this.$indicator.close();
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            }
        }
    };
</script>
