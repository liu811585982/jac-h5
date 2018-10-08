<style lang="scss" scoped>
    @import 'src/scss/mixins';
    @import 'src/scss/vars';
    .state-panel {
        @include flex(stretch, column nowrap);
        flex: 1;
        .section-title {
            width: 100%;
            height: px2rem(460);
            .state-info {
                position: relative;
                text-align: center;
                margin-top: px2rem(67);
                .circle {
                    display: inline-block;
                    font-size: px2rem(216);
                    &.active {
                        animation: circle 3s infinite;
                    }
                }
                .info-panel {
                    position: absolute;
                    width: px2rem(216);
                    height: px2rem(216);
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    color: #ffffff;
                    .state-mark {
                        margin-top: px2rem(48);
                        margin-bottom: px2rem(18);
                        font-size: px2rem(75);
                    }
                    .info {
                        font-size: px2rem(28);
                    }
                }
            }
        }
        .section-body {
            padding: 30px 0;
            // @include flex(center, row nowrap);
            flex: 1;
            overflow: auto;
            background-color: $white;
            .list_title {
                font-size: px2rem(30);
                font-weight: 600;
                color: #333333;
                padding: 5px 15px 5px 0;
                .small_time {
                    float: right;
                    font-size: px2rem(26);
                    vertical-align: middle;
                    color: #949FAA;
                    font-weight: normal;
                }
                &.refuse-color {
                    color: #FE3737;
                }
            }
            .list_body {
                font-size: px2rem(26);
                color: #949FAA;
                padding: 0 15px 5px 0;
                white-space: normal;
                word-wrap: break-word;
                &.refuse-color {
                    color: #FE3737;
                }
            }

            .line {
                margin-top: 5px;
                font-size: 0;
                @include wh(100%, 1px);
                background-color: #EEEEEE;
            }
        }
    }

    @keyframes circle {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(1turn);
        }
    }
    .toolbox {
        width: 60%;
        margin: px2rem(50) auto 0;
    }
</style>
<template>
    <div class="state-panel">
        <hy-header :title="$route.meta.title" bg-color="" class="v-immersed">
            <span class="header_nav_inner" slot="left" @click="back">
                <svg-icon type="back"></svg-icon>
            </span>
            <span class="header-nav__inner is-right" @click="getApplyState" slot="right">
                <span class="nav_type">
                    <svg-icon type="refresh-a"></svg-icon>
                </span>
            </span>
        </hy-header>
        <div class="section-title">
            <div class="state-info">
                <svg-icon type="goods_circle" class="circle" :class="{active: applyInfo.state !== 'REFUSE'}"></svg-icon>
                <div class="info-panel">
                    <svg-icon :type="applyInfo.state === 'AUDIT' ? 'exclamation' : 'goods_close'" class="state-mark"></svg-icon>
                    <div class="info">
                        {{applyInfo.state|applyState}}
                    </div>
                </div>
            </div>
        </div>
        <div class="section-body">
            <step v-model="currentIndex" :icon-type="iconType">
                <step-item :label="1">
                    <div class="list_title" slot="title">资料已提交<small class="small_time">{{applyInfo.applyTime}}</small></div>
                    <div class="list_body">{{applyInfo.applyExplain}}</div>
                    <div class="line"></div>
                </step-item>
                <step-item :label="2">
                    <div class="list_title" :class="{'refuse-color': applyInfo.state === 'AUDIT'}" slot="title">{{auditText}}<small class="small_time">{{applyInfo.auditTime}}</small></div>
                    <div class="list_body" v-show="applyInfo.state === 'AUDIT'">请耐心等待管理员审核</div>
                    <div class="line"></div>
                </step-item>
                <step-item :label="3">
                    <div class="list_title" :class="{'refuse-color': applyInfo.state === 'REFUSE'}" slot="title">审核结果<small class="small_time" v-show="applyInfo.state === 'REFUSE'">{{applyInfo.auditTime}}</small></div>
                    <div class="list_body" v-show="applyInfo.state === 'REFUSE'">
                        {{applyInfo.refuseExplain}}
                    </div>
                    <div class="line" v-show="applyInfo.state === 'REFUSE'"></div>
                </step-item>
            </step>
            <div class="toolbox">
                <x-button type="warn" @click.native="reAudit" v-show="applyInfo.state === 'REFUSE'">重新申请</x-button>
                <x-button type="warn" @click.native="getApplyState" v-show="applyInfo.state === 'AUDIT'">刷新</x-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { XButton } from 'vux';
    import { Step, StepItem } from '@/components';
    import { queryOne } from '@/services/goodsSupply/goodsSupplyService';

    export default {
        name: 'state',
        components: { Step, StepItem, XButton },
        data () {
            return {
                applyInfo: {}
            };
        },
        computed: {
            auditText () {
                return this.applyInfo.state === 'AUDIT'
                                ? '管理员正在审核...'
                                : '管理员已审核';
            },
            iconType () {
                return this.applyInfo.state === 'AUDIT'
                                ? 'JAC'
                                : 'refuse';
            },
            currentIndex () {
                let num = 1;
                switch (this.applyInfo.state) {
                    // 审核中...
                    case 'AUDIT':
                        num = 2;
                        break;
                    // 审核中...
                    case 'AGREE':
                    case 'REFUSE':
                        num = 3;
                }
                return num;
            }
        },
        created () {
            this.getApplyState();
        },
        methods: {
            back () {
                this.$router.push('/main');
            },
            async getApplyState () {
                try {
                    this.$indicator.open();
                    const result = await queryOne();
                    this.$indicator.close();
                    if (result.data.state === 'AGREE') {
                        this.$router.replace('/main/goodsSupply/list');
                    } else {
                        this.applyInfo = result.data;
                    }
                } catch (e) {
                    this.$indicator.close();
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            reAudit () {
                this.$router.replace('/main/goodsSupply/apply');
            }
        },
        filters: {
            applyState (val) {
                switch (val) {
                    case 'AUDIT':
                        return '审核中...';
                    case 'REFUSE':
                        return '审核失败';
                }
            }
        }
    };
</script>

<style scoped>

</style>
