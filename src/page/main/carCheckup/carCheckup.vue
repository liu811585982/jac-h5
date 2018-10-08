/**
 * 作者：yeshengqiang
 * 时间：2018-04-24
 * 描述：车辆体检
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
            <span class="header-nav__inner" slot="left" @click="back">
                <svg-icon type="back"></svg-icon>
            </span>
            <span class="header-nav__inner is-right" slot="right" @click="toggleMoreSearch" v-show="false">
                <svg-icon type="header_search"></svg-icon>
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
    import { mapState, mapMutations } from 'vuex';

    export default {
        mixins: [ userInfo ],
        components: { tabBar },
        data () {
            return {
                tabBarValue: this.$route.meta.title
            };
        },
        computed: {
            ...mapState([
               'moreSearch'
            ]),
            // 是否是车队 | 没有绑定车
            isFleet () {
                return this.userInfo.type === 'fleet';
            },
            currentTitle () {
                if (this.isFleet) {
                    return this.$route.meta.title;
                }
                return '车辆体检';
            },
            tabBarList () {
                const mapBase = [
                    {
                        label: '故障查询',
                        route: '/main/carCheckup/faultQuery'
                    },
                    {
                        label: '故障历史',
                        route: '/main/carCheckup/faultHistory'
                    },
                    {
                        label: '故障统计',
                        route: '/main/carCheckup/faultStatistical'
                    }
                ];
                return mapBase;
            }
        },
        methods: {
            ...mapMutations([
               'SET_MORE_SEARCH'
            ]),
            back () {
                this.$router.push('/main');
            },
            handleChange (item) {
                this.$router.push(item.route);
            },
            toggleMoreSearch () {
                const moreSearch = !this.moreSearch;
                this.SET_MORE_SEARCH(moreSearch);
            }
        },
        watch: {
            $route (val) {
                this.tabBarValue = val.meta.title;
            }
        }
    };
</script>
