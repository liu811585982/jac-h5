/**
 * 作者：aicong
 * 时间：2018-03-26
 * 描述：忘记密码
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .login-panel {
        background-color: $white;
        @include wh(100%, 100%);
        .logo-panel {
            position: relative;
            background-color: $global_color;
            height: 40%;
            img.logo {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                @include wh(#{px2rem(140)}, #{px2rem(140)});
                display: inline-block;
                margin: auto;
                vertical-align: middle;
            }
        }
        .input-panel {
            width: 85%;
            margin: 0 auto;
            .form-item {
                position: relative;
                display: flex;
                display: -webkit-flex;
                -webkit-align-items: center;
                -webkit-flex-flow: row nowrap;
                align-items: center;
                flex-flow: row nowrap;
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
                    width: 1rem;
                    line-height: 1;
                    text-align: center;
                    color: $felid_border;
                }
                .login-field {
                    flex: 1;
                    -webkit-flex: 1;
                }
            }
            .code.form-item {
                svg {
                    vertical-align: 0;
                }
            }
            .login-btn {
                margin-top: 1.5rem;
            }
        }
    }
    .mint-cell{
        min-height: 2.7rem;
    }
</style>
<template>
<transition name="slideRight">
    <div class="login-panel">
        <!-- 头部 -->
        <hy-header fixed :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="logo-panel">                    <!-- 头部 -->
            <img class="logo" src="../../assets/images/logo.png" alt="logo"/>
        </div>
        <div class="input-panel">
            <div class="form-item">
                <label class="login-label">
                    <svg-icon type="user"></svg-icon>
                </label>
                <mt-field class="login-field" v-model.trim="accountInfo.mobile" placeholder="手机号" type="number"></mt-field>
            </div>
            <div class="form-item code">
                <label class="login-label">
                    <svg-icon type="code" class="icon icon-code"></svg-icon>
                </label>
                <mt-field class="login-field w65" v-model.trim="accountInfo.verifyCode" placeholder="验证码" type="number"></mt-field>
                <send-code :value="accountInfo.mobile"></send-code>
            </div>
            <div class="form-item">
                <label class="login-label">
                    <svg-icon type="password"></svg-icon>
                </label>
                <mt-field class="login-field" v-model.trim="accountInfo.password" placeholder="输入新密码" type="password"></mt-field>
            </div>
            <div class="form-item">
                <label class="login-label">
                    <svg-icon type="password"></svg-icon>
                </label>
                <mt-field class="login-field" v-model.trim="accountInfo.repassword" placeholder="确认新密码" type="password"></mt-field>
            </div>
            <mt-button size="large" class="login-btn" @click="updatePassword()" type="danger">提交</mt-button>
        </div>
    </div>
</transition>
</template>
<script>
    import md5 from 'js-md5';
    import { forgetPassword } from '@/services/loginService/loginService';
    import { sendCode } from '@/components';

    export default {
        components: { sendCode },
        data () {
            return {
                accountInfo: {}
            };
        },
        methods: {
            async updatePassword () {
                if (!this.accountInfo.mobile) {
                    this.$toast({
                        message: '请输入手机号',
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
                if (!this.accountInfo.password) {
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
                if (this.accountInfo.password !== this.accountInfo.repassword) {
                    this.$toast({
                        message: '两次密码不一致',
                        position: 'bottom'
                    });
                    return;
                }
                try {
                    this.$indicator.open('登录中...');
                    const accountInfo = Object.assign({}, this.accountInfo);
                    accountInfo.password = md5(accountInfo.password).toUpperCase();
                    accountInfo.repassword = md5(accountInfo.repassword).toUpperCase();
                    await forgetPassword(accountInfo);
                    this.$indicator.close();
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
            }
        }
    };
</script>
