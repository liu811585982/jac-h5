<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .page-panel /deep/{
        @include wh(100%, 100%);
        overflow: hidden;
        .mb-25 {
            margin-bottom: 25px;
        }
        .weui-cells__title {
            color: #9E9E9E;
            font-size: px2rem(26);
        }
        .vux-label {
            color: #7F8C9A;
            font-size: px2rem(28);
        }
        .weui-cell__ft {
            color: #212121;
            font-size: px2rem(28);
            white-space: normal;
            word-break: break-word;
        }
    }
</style>
<template>
    <div class="page-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <view-box ref="viewBox">
            <group label-width="5em" label-margin-right="2em">
                <cell title="线路名称" align-items="flex-start" :value="detailInfo.lineName"></cell>
                <cell title="线路编码" align-items="flex-start" :value="detailInfo.lineCode"></cell>
                <cell title="出发地" align-items="flex-start" value-align="left" :value="detailInfo.startAddress"></cell>
                <cell title="目的地" align-items="flex-start" value-align="left" :value="detailInfo.endAddress"></cell>
            </group>
        </view-box>
    </div>
</template>
<script>
    import { ViewBox, Group, Cell, XButton } from 'vux';
    import { lineDetail } from '@/services/lineManage/lineManage';

    export default {
        components: { ViewBox, Group, Cell, XButton },
        data () {
            return {
                detailInfo: {}
            };
        },
        created () {
            this._getDetail();
        },
        methods: {
            // 查询详情
            async _getDetail (param) {
                try {
                    this.$indicator.open();
                    const result = await lineDetail({id: this.$route.query.id});
                    this.detailInfo = result.data;
                    this.$indicator.close();
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
