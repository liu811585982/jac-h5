<style lang="scss" scoped>
    @import 'src/scss/mixins';
    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        overflow: hidden;
    }
    .bg-image {
        background: url('../../../assets/images/goods_header.png') no-repeat;
        background-size: 100% px2rem(560);
        background-position: 0 0;
    }
</style>
<template>
    <div class="section-panel" :class="{'bg-image': $route.name === 'goodsState'}">
        <!-- 头部 -->
        <hy-header v-show="$route.name !== 'goodsState'" :title="$route.meta.title" :bg-color="$route.name === 'goodsState' ? '' : '#DC3F3E'" class="v-immersed">
            <span class="header_nav_inner" slot="left" @click="back">
                <svg-icon type="back"></svg-icon>
            </span>
            <span class="header-nav__inner is-right" slot="right" v-if="$route.name === 'goodsList'">
                <span class="nav_type" @click="goodsMap">
                    <svg-icon type="navigation"></svg-icon>
                </span>
            </span>
        </hy-header>
        <router-view></router-view>
    </div>
</template>

<script>
    import { canSign } from '@/services/goodsSupply/goodsSupplyService';
    export default {
        name: 'goodsSupply',
        created () {
            this.checkCanSign();
        },
        methods: {
            back () {
                this.$router.push('/main');
            },
            goodsMap () {
                this.$router.push('/main/goodsSupply/list/map');
            },
            async checkCanSign () {
                try {
                    const result = await canSign();
                    let state = '';
                    if (!result.data) {
                        state = 'NOTOPEN';
                        this.$router.replace('/main/goodsSupply/apply');
                    } else if (result.data.state === 'AGREE') {
                        state = result.data.state;
                        this.$router.replace('/main/goodsSupply/list');
                    } else {
                        state = result.data.state;
                        this.$router.replace('/main/goodsSupply/state');
                    }
                    this.$store.commit('SET_GOODS_SUPPLY_STATE', state);
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            }
        }
    };
</script>
