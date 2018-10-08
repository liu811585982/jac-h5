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
            <group title="基本信息" label-width="5em" label-margin-right="2em">
                <cell title="vin码" :value="appointInfo.vin"></cell>
                <cell title="车牌号" :value="appointInfo.plateNo"></cell>
                <cell title="司机" :value="appointInfo.driverName"></cell>
                <cell title="接收人" :value="appointInfo.receiveName"></cell>
                <cell title="工单号" :value="appointInfo.orderId"></cell>
                <cell title="所属车队" :value="appointInfo.motorcadeName"></cell>
                <cell title="维保类型" :value="appointInfo.appointType | appointTypeFormat"></cell>
                <cell title="所属经销商" :value="appointInfo.dealerName"></cell>
                <cell title="维保服务站" :value="appointInfo.appointServiceName"></cell>
                <cell title="维保负责人" :value="appointInfo.maintenanceName"></cell>
                <cell title="核销券" :value="appointInfo.discounts"></cell>
                <cell title="维保项" :value="appointInfo.items"></cell>
                <cell title="维保里程" :value="appointInfo.maintenanceMil ? appointInfo.maintenanceMil + '公里' : ''"></cell>
            </group>
            <group title="维保费用" label-width="5em" label-margin-right="2em">
                <cell title="费用合计" :value="appointInfo.totalCost ? appointInfo.totalCost + '元' : ''"></cell>
                <cell title="实付金额" :value="appointInfo.actualCost ? appointInfo.actualCost + '元' : ''"></cell>
            </group>
            <group title="日期" label-width="5em" label-margin-right="2em">
                <cell title="预约日期" :value="appointInfo.appointTime"></cell>
                <cell title="交车日期" :value="appointInfo.overTime"></cell>
            </group>
            <group label-width="5em" label-margin-right="2em" class="mb-25">
                <cell title="备注" align-items="flex-start" value-align="left" :value="appointInfo.note"></cell>
            </group>
        </view-box>
    </div>
</template>
<script>
    import { aqueryAppointItems } from '@/services/appointService/appointService';
    import { ViewBox, Group, Cell, CellBox, PopupPicker } from 'vux';
    // import { mapGetters } from 'vuex';

    export default {
        components: { ViewBox, Group, Cell, CellBox, PopupPicker },
        data () {
            return {
                appointInfo: {}
            };
        },
        // computed: {
        //     ...mapGetters([
        //         'appointInfoState'
        //     ])
        // },
        mounted () {
            // 获取维保信息
            this.getInfo();
            // console.log('res', this.appointInfoState);
            // console.log('appointInfo1', this.appointInfoState);
        },
        methods: {
            async getInfo () {
                let param = {appointId: this.$route.query.id};
                if (!param.appointId) {
                    this.$toast({
                        message: '获取详情失败',
                        position: 'bottom'
                    });
                    return;
                }
                try {
                    this.$indicator.open();
                    let result = await aqueryAppointItems(param);
                    this.appointInfo = result.data;
                    this.$indicator.close();
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                    this.$indicator.close();
                }
            }
        },
        filters: {
            // 预约类型过滤
            appointTypeFormat (val) {
                let str = '';
                switch (val) {
                    case 'maintain':
                        str = '保养';
                        break;
                    case 'repair':
                        str = '维修';
                        break;
                    case 'all':
                        str = '维修保养';
                        break;
                }
                return str;
            }
        }
    };
</script>
