/**
 * 作者：yeshengqiang
 * 时间：2018-04-23
 * 描述：报警管理
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
        <hy-header :title="currentTitle" class="v-immersed">
            <span class="header-nav__inner" slot="left" @click="back()">
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <!-- tab -->
        <tab-bar :list="tabBarList" v-if="!isFleet" v-model="tabBarValue" @tab-change="handleChange"></tab-bar>
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
            // 是否是车队
            isFleet () {
                return this.userInfo.type === 'fleet';
            },
            currentTitle () {
                if (this.isFleet) {
                    return this.$route.meta.title;
                }
                return '报警管理';
            },
            tabBarList () {
                const mapBase = [
                    {
                        label: '报警查询',
                        route: '/main/alarmManagement/alarmQuery'
                    },
                    {
                        label: '报警统计',
                        route: '/main/alarmManagement/alarmStatistical'
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
