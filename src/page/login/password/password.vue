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
                @include wh(3.5rem, 3.5rem);
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
            .tips {
                text-align: center;
                font-size: px2rem(26);
                color: #A0A0A0;
                padding-bottom: px2rem(20);
                margin: px2rem(30) 0;
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
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="input-panel">
            <div class="form-item">
                <label class="login-label">
                    <svg-icon type="password"></svg-icon>
                </label>
                <mt-field class="login-field" v-model.trim="accountInfo.password" placeholder="密码" type="password"></mt-field>
            </div>
            <div class="form-item">
                <label class="login-label">
                    <svg-icon type="password"></svg-icon>
                </label>
                <mt-field class="login-field" v-model.trim="accountInfo.repassword" placeholder="确认密码" type="password"></mt-field>
            </div>
            <p class="tips">提示：字母开头，必须字母加数字组合，字符不支持空格/•¥£€\\，长度6~18位</p>
            <mt-button size="large" class="login-btn" @click="register()" type="danger">确定</mt-button>
        </div>
    </div>
</transition>
</template>
<script>
    import md5 from 'js-md5';
    import { register } from '@/services/loginService/loginService';
    import regMap from '@/libs/regMap';

    export default {
        data () {
            return {
                accountInfo: {}
            };
        },
        methods: {
            // 注册
            async register () {
                if (!this.accountInfo.password) {
                    this.$toast({
                        message: '密码不能为空',
                        position: 'bottom'
                    });
                    return;
                }
                if (!regMap.password.test(this.accountInfo.password)) {
                    this.$toast({
                        message: '字母开头，必须字母加数字组合，字符不支持空格/•¥£€\\，长度6~18位',
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
                    this.$indicator.open('注册中...');
                    const accountInfo = Object.assign({}, this.accountInfo);
                    accountInfo.mobile = this.$route.query.mobile;
                    accountInfo.verifyCode = this.$route.query.verifyCode;
                    accountInfo.password = md5(accountInfo.password).toUpperCase();
                    const result = await register(accountInfo);
                    this.$indicator.close();
                    // 下一步 注册司机信息
                    this.$router.push({
                        path: '/login/driverRegister',
                        query: {
                            id: result.data,
                            mobile: this.$route.query.mobile,
                            password: accountInfo.password
                        }
                    });
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
