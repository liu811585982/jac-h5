/**
 * 作者：yeshengqiang
 * 时间：2018-04-18
 * 描述：车辆监控
 */
<style lang="scss" scoped>
    @import 'src/scss/mixins';

    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        overflow: hidden;
    }
</style>
<template>
    <div class="section-panel">
        <!-- 头部 -->
        <hy-header title="车辆监控" class="v-immersed">
            <span class="header-nav__inner" slot="left" @click="back">
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <!-- tab -->
        <tab-bar :list="tabBarList" v-model="tabBarValue" @tab-change="handleChange"></tab-bar>
        <!-- 内容 -->
        <router-view></router-view>
    </div>
</template>
<script>
    import userInfo from '@/mixins/userInfo';
    import { tabBar } from '@/components';

    export default {
        mixins: [ userInfo ],
        components: { tabBar },
        data () {
            return {
                tabBarValue: this.$route.meta.title
            };
        },
        computed: {
            tabBarList () {
                const mapBase = [
                    {
                        label: '实时定位',
                        route: '/main/carMonitoring/positioning'
                    },
                    {
                        label: '历史轨迹',
                        route: '/main/carMonitoring/history'
                    }
                ];
                let list = [];
                if (this.userInfo.type === 'driver') {
                    list = [{
                        label: '实时数据',
                        route: '/main/carMonitoring/realTime'
                    }].concat(mapBase);
                } else if (this.userInfo.type === 'fleet') {
                    list = list.concat(mapBase);
                }
                return list;
            }
        },
        mounted () {
            let tabBarValue = this.tabBarList.filter(item => item.route === this.$route.path);
            if (tabBarValue.length) {
                this.tabBarValue = tabBarValue[0].label;
            }
        },
        methods: {
            back () {
                this.$router.push('/main');
            },
            handleChange (item) {
                this.$router.push(item.route);
            }
        },
        watch: {
            $route (val) {
                this.tabBarValue = val.meta.title;
            }
        }
    };
</script>
