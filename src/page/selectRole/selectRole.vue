/**
 * 作者：yeshengqiang
 * 时间：2018-03-21
 * 描述：登录
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    body{
        background-color: #f4f4f4;
    }
    .panel-body {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        .page-content {
            flex: 1;
            position: relative;
            .page-content-center {
                position: absolute;
                @include wh(85%, auto);
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background:#EBECEE;
                border-radius: 6px;
                text-align: center;
                .logo-panel {
                    position: relative;
                    margin: 2rem 0;
                    height: 2.7rem;
                    @include bg-image('../../assets/images/logo');
                    background-size: contain;
                    background-position: center center;
                    background-repeat: no-repeat;
                }
                .item {
                    position: relative;
                    width: 85%;
                    height: 4.26rem;
                    margin: 0 auto;
                    // padding-left: 5.5rem;
                    display: flex;
                    display: -webkit-flex;
                    -webkit-align-items: center;
                    -webkit-flex-flow: row nowrap;
                    align-items: center;
                    flex-flow: row nowrap;
                    border-radius: 6px;
                    background-color: #F4F4F4;
                    background-size: contain;
                    background-position: 1.2rem center;
                    background-repeat: no-repeat;
                    background-size: 3rem 3rem;
                    span {
                        padding-left: 5.5rem;
                    }
                }
                .item-1 {
                    @include bg-image('../../assets/images/driver');
                    margin-bottom: 0.64rem;
                }
                .item-2 {
                    @include bg-image('../../assets/images/team');
                    margin-bottom: 3.58rem;
                }
            }
        }
    }
</style>
<template>
    <div class="panel-body _full_router">
        <hy-header title="选择角色" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="page-content">
            <div class="page-content-center">
                <div class="logo-panel"></div>
                <div class="item item-1" @click="login('driver')">
                    <span>司机登录</span>
                </div>
                <div class="item item-2" @click="login('fleet')">
                    <span>车队登录</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapMutations, mapGetters } from 'vuex';
    import { login } from '@/services/loginService/loginService';

    export default {
        data () {
            return {
                loginInfo: {}
            };
        },
        computed: mapGetters([
            'getLoginInfo'
        ]),
        methods: {
            ...mapMutations([
                'LOGIN_IN'
            ]),
            async login (type) {
                try {
                    this.$indicator.open();
                    this.loginInfo = Object.assign({}, this.getLoginInfo);
                    this.loginInfo.type = type;
                    const result = await login(this.loginInfo);
                    this.$indicator.close();
                    this.LOGIN_IN(result.data);
                    this.$store.dispatch('getAllMessage');
                    this.$router.replace('/main');
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
