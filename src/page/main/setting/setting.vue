/**
 * 作者：yeshengqiang
 * 时间：2018-04-25
 * 描述：设置
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .section-panel {
        @include wh(100%, 100%);
        display: flex;
        display: -webkit-flex;
        -webkit-align-items: stretch;
        -webkit-flex-flow: column nowrap;
        align-items: stretch;
        flex-flow: column nowrap;
        overflow: hidden;
        .icon {
            vertical-align: middle;
            margin-right: 5px;
            color: #BBBBBB;
        }
        .content {
            color: #BBBBBB;
        }
        .section-body {
            position: relative;
            flex: 1;
            -webkit-flex: 1;
            overflow: auto;
            .body-panel {
                height: -moz-calc(100% - #{px2rem(20)});
                height: -webkit-calc(100% - #{px2rem(20)});
                height: calc(100% - #{px2rem(20)});
                background-color: $white;
            }
            // background-color: $white;
        }
    }
</style>
<template>
    <div class="section-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <!-- 内容 -->
        <section class="section-body">
            <group class="body-panel" v-show="bodyPanel">
                <cell title="版本更新" is-link @click.native="handleCheckUpdate">
                    <!-- <span class="icon" slot="icon">
                        <svg-icon type="update"></svg-icon>
                    </span> -->
                    <span class="content">
                        版本{{curVersion}}
                    </span>
                </cell>
                <cell title="清理缓存" is-link @click.native="actionShow = true">
                    <!-- <span class="icon" slot="icon">
                        <svg-icon type="clear"></svg-icon>
                    </span> -->
                    <span class="content">
                        {{cacheSize}}
                    </span>
                </cell>
                <cell title="关于我们" is-link @click.native="handleToAbout">
                    <!-- <span class="icon" slot="icon">
                        <svg-icon type="more"></svg-icon>
                    </span> -->
                </cell>
            </group>
            <router-view></router-view>
        </section>
        <actionsheet v-model="actionShow" :menus="menus" @on-click-menu="clickMenu" show-cancel></actionsheet>
    </div>
</template>
<script>
    import { plusready } from '@/libs/plus';
    import { Group, Cell, Actionsheet } from 'vux';
    // import checkUpdate from '@/mixins/checkUpdate';
    import { checkUpdate } from '@/libs/set';
    import { setStore, getStore } from '@/libs/utils';

    export default {
        // mixins: [ checkUpdate ],
        components: { Group, Cell, Actionsheet },
        data () {
            return {
                cacheCaleState: false,
                curVersion: '',
                cacheSize: '0M',
                actionShow: false,
                menus: {confirm: '确认'}
            };
        },
        created () {
            this.getCacheSize();
            this.getCurrentVersion();
        },
        computed: {
            bodyPanel () {
                return this.$route.fullPath === '/main/setting';
            }
        },
        methods: {
            handleCheckUpdate () {
                checkUpdate(false);
            },
            // 跳转到关于我们
            handleToAbout () {
                this.$router.push({path: '/main/setting/about'});
            },
            clickMenu (menuKey, menuItem) {
                switch (menuKey) {
                    case 'confirm':
                        this.clearCache();
                        break;
                }
            },
            // 获取当前版本
            getCurrentVersion () {
                plusready((plus) => {
                    plus.runtime.getProperty(plus.runtime.appid, (inf) => {
                        this.curVersion = inf.version;
                    }, (e) => {
                        this.$toast({
                            message: e.message,
                            position: 'bottom'
                        });
                    });
                });
            },
            // 获取缓存大小
            getCacheSize () {
                plusready((plus) => {
                    plus.cache.calculate((size) => {
                        this.cacheCaleState = true;
                        this.cacheSize = parseFloat(size / (1024 * 1024)).toFixed(2) + 'M';
                    }, (e) => {
                        this.$toast({
                            message: e.message,
                            position: 'bottom'
                        });
                    });
                });
            },
            // 清除缓存
            clearCache () {
                plusready((plus) => {
                    const loginInfo = getStore('loginInfo');
                    const token = getStore('token');
                    plus.cache.clear(() => {
                        this.$toast({
                            message: '缓存清除完毕',
                            position: 'bottom'
                        });
                        this.cacheSize = '0M';
                        setStore('loginInfo', loginInfo);
                        setStore('token', token);
                        this.$store.dispatch('checkToken');
                        // this.$store.commit('LOGIN_OUT');
                        // this.$router.push('/login');
                    }, (e) => {
                        this.$toast({
                            message: e.message,
                            position: 'bottom'
                        });
                    });
                });
            }
        }
    };
</script>
