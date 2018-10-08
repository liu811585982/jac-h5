/**
 * 作者：aicong
 * 时间：2018-04-23
 * 描述：维修保养
 */
<style lang="scss" scoped>
    @import 'src/scss/mixins';

    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        overflow: hidden;
        .section-section-body {
            flex: 1;
            @include flex(stretch, column nowrap);
            overflow: hidden;
            position: relative;
        }
    }
</style>
<template>
    <div class="section-panel">
        <!-- 头部 -->
        <hy-header title="维修保养" class="v-immersed">
            <span class="header-nav__inner" slot="left" @click="back()">
                <svg-icon type="back"></svg-icon>
            </span>
            <span class="header-nav__inner is-right" slot="right">
                <span class="nav_type" @click="toggleMoreSearch">
                    <svg-icon type="header_search"></svg-icon>
                </span>
                <span class="nav_type" @click="handleAdd">
                    <svg-icon type="header_add"></svg-icon>
                </span>
            </span>
        </hy-header>
        <div class="section-section-body">
            <!-- tab -->
            <tab-bar :list="tabBarList" v-model="tabBarValue" @tab-change="handleChange"></tab-bar>
            <router-view></router-view>
        </div>
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
            tabBarList () {
                const mapBase = [
                    {
                        label: '预约',
                        route: '/main/appoint/reservation'
                    },
                    {
                        label: '维保记录',
                        route: '/main/appoint/maintenance'
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
            handleAdd () {
                this.$router.push('/main/appoint/reservation/add');
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
