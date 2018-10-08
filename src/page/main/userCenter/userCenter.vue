<style scoped  lang="scss">
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    // 个人中心
    .user-center {
        width: 100%;
        background-color: #ffffff;
        .info-panel {
            position: relative;
            background-color: $global_color;
            color: #ffffff;
            text-align: center;
            font-size:0;
            padding: 2.7rem 0 0.85rem 0;
            img {
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
                margin: 0 auto 0.68rem auto;
            }
            .type{
                font-size: $font-size-14;
                margin: 0.5rem 0;
            }
            .name{
                font-size: $font-size-14;
                margin-right: 0.2rem;
            }
            .gender{
                // width: 1.7rem;
                // height:0.58rem;
                // line-height: 0.5rem;
                padding:  0.1rem 0.3rem;
                border-radius: 10px;
                // font-size: $font-size-10;
                background-color: rgba(255,255,255,0.2);
                display: inline-block;
                i svg {
                    // vertical-align: top;
                    // color: #ffffff;
                    font-size:$font-size-12;
                }
            }
        }
        .setting-list {
            color: #5c5c5c;
            margin-top: 2.1rem;
            font-size: 0;
            li {
                margin: px2rem(30) px2rem(50);
                position: relative;
                @include flex(center, row nowrap);
                font-size: 0;
                i {
                    width: 1rem;
                    line-height: 1;
                    text-align: center;
                    margin-right: px2rem(20);
                }
                a:link,
                a:visited,
                a:hover,
                a:active{
                    color: currentColor;
                    padding: px2rem(16) px2rem(30);
                    font-size: px2rem(28);
                }
                .tag {
                    position: relative;
                    padding: 2px 4px;
                    font-size: $font-size-12;
                    text-align: center;
                    border: 1px solid #ff9d02;
                    color: #ff9d02;
                    border-radius: 3px;
                    background-color: #fff4e4;
                    &::before{
                        position: absolute;
                        left: -0.08rem;
                        top: 40%;
                        width: 3px;
                        height: 3px;
                        border-radius: 50%;
                        background-color: #ff9d02;
                        content: "";
                        display: block;
                    }
                }
                .tag.small {
                    font-size: $font-size-10;
                }
            }
        }
    }
</style>

<template>
    <div class="user-wrapper">
             <!-- slide -->
        <hy-slide v-model="visibleSilde" placement="left" :styles="{ width: '70%' }" transition="slideLeft">
             <div class="user-center">
                <div class="info-panel">
                    <img class="logo" :src="userInfo.avatar | avatarFormat" alt="logo"/>
                <div>
                <span class="name">{{userInfo.driverName}}</span>
                <span class="gender">
                    <i><svg-icon :type="userInfo.sex | toLowerCase"></svg-icon></i>
                </span>
            </div>
                </div>
                <div class="setting-list">
                    <ul>
                        <li v-if="userInfo.type==='driver'">
                            <router-link tag="a" to="/main/userCenter/sign">
                                <i><svg-icon type="signin" class="icon"></svg-icon></i>
                                签到
                            </router-link>
                            <span class="tag small">{{userInfo.signed | signed}}</span>
                        </li>
                        <!-- <li v-else>
                            <a href="javascript: void(0);" @click="handleAdmin">
                                <i><svg-icon type="admin" class="icon"></svg-icon></i>
                                管理员
                            </a>
                        </li> -->
                        <li v-if="userInfo.type==='driver'">
                            <router-link tag="a" to="/main/userCenter/score/score">
                                <i><svg-icon type="score" class="icon"></svg-icon></i>
                                积分中心
                            </router-link>
                            <span class="tag">{{totalRecode}}</span>
                        </li>
                        <li>
                            <router-link tag="a" to="/main/userCenter/personalInfo">
                                <i><svg-icon type="personal" class="icon"></svg-icon></i>
                                个人信息
                            </router-link>
                        </li>
                        <li v-if="identity">
                            <a href="javascript: void(0);" @click="toggleidentity">
                                <i><svg-icon type="role_switch" class="icon"></svg-icon></i>
                                身份切换
                            </a>
                            <span class="tag small">{{userInfo.type | typeFormat}}</span>
                        </li>
                        <li v-if="userInfo.type==='fleet'">
                            <router-link tag="a" :to="{path:'/main/userCenter/motorcade', query: {id: userInfo.fleetId}}">
                                <i><svg-icon type="motorcade" class="icon"></svg-icon></i>
                                车队管理
                            </router-link>
                        </li>
                        <li>
                            <router-link tag="a" to="/main/userCenter/updatePassword">
                                <i><svg-icon type="password2" class="icon"></svg-icon></i>
                                密码修改
                            </router-link>
                        </li>
                        <li @click="loginOut">
                            <a href="javascript: void(0);">
                                <i><svg-icon type="quit" class="icon"></svg-icon></i>
                                退出当前账号
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </hy-slide>
    </div>
</template>
<script>
    import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
    import { hySlide } from '@/components';
    import userInfo from '@/mixins/userInfo';
    import { loginout } from '@/services/userCenter/userCenter';
    import { login } from '@/services/loginService/loginService';
    import { imgHttp } from '@/libs/config';

    export default {
        mixins: [ userInfo ],
        components: { hySlide },
        data () {
            return {
                visibleSilde: true
            };
        },
        computed: {
            ...mapGetters([
                'getLoginInfo'
            ]),
            ...mapState([
                'totalRecode'
            ]),
            identity () {
                let identity = this.userInfo.identity;
                if (!identity) return null;
                return identity.split(',').length === 2;
            }
        },
        mounted () {
            if (!this.totalRecode) {
                this.getTotalRecode();
            }
        },
        methods: {
            ...mapMutations([
                'LOGIN_OUT',
                'LOGIN_IN'
            ]),
            ...mapActions([
                'getTotalRecode'
            ]),
            handleAdmin () {
                this.$toast({
                    message: '敬请期待!',
                    position: 'bottom'
                });
                return;
            },
            loginOut () {
                this.$messagebox.confirm('是否退出?').then(async () => {
                    try {
                        this.$indicator.open();
                        await loginout();
                        this.LOGIN_OUT();
                        this.$toast({
                            message: '已注销登录',
                            position: 'bottom'
                        });
                        this.$router.push('/login');
                        this.$indicator.close();
                    } catch (e) {
                        this.$toast({
                            message: e.message,
                            position: 'bottom'
                        });
                        this.$indicator.close();
                    }
                });
            },
            // 切换身份
            toggleidentity () {
                if (!this.identity) return;
                let str = '';
                if (this.userInfo.type === 'driver') {
                    str = '车队';
                } else {
                    str = '司机';
                }
                let type = this.userInfo.identity.split(',').filter(item => item !== this.userInfo.type)[0];
                this.$messagebox.confirm(`确定切换${str}身份?`).then(async () => {
                    try {
                        this.$indicator.open();
                        let param = {
                            ...this.getLoginInfo,
                            type
                        };
                        const result = await login(param);
                        this.LOGIN_IN(result.data);
                        this.$store.dispatch('getAllMessage');
                        this.$store.dispatch('getLatestAdList');
                        if (result.data.type === 'driver') {
                            this.$store.dispatch('getApplyState');
                        }
                        this.$toast({
                            message: `切换${str}成功`,
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
                }).catch(e => {});
            }
        },
        watch: {
            visibleSilde () {
                if (!this.visibleSilde) {
                    setTimeout(() => {
                        this.$router.back();
                    }, 300);
                }
            }
        },
        filters: {
            // 默认头像过滤
            avatarFormat (val) {
                let url = '';
                if (val) {
                    url = imgHttp + val;
                } else {
                    url = require('../../../assets/images/logo.png');
                }
                return url;
            },
            toLowerCase (val) {
                val = val || '';
                return val && val.toLowerCase();
            },
            // 角色过滤
            typeFormat (val) {
                let str = '';
                if (val === 'fleet') {
                    str = '车队';
                } else {
                    str = '司机';
                }
                return str;
            },
            // 是否签到
            signed (val) {
                return val ? '已签到' : '未签到';
            }
        }
    };
</script>
