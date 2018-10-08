/**
 * 作者：yeshengqiang
 * 时间：2018-04-28
 * 描述：报表统计
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
        <hy-header title="统计报表" class="v-immersed">
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
                        label: '里程统计',
                        route: '/main/report/mileage'
                    },
                    {
                        label: '油耗统计',
                        route: '/main/report/Fuel'
                    },
                    {
                        label: '驾驶时长',
                        route: '/main/report/drivingTime'
                    },
                    {
                        label: '行程统计',
                        route: '/main/report/event'
                    }
                ];
                return mapBase;
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
