<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .integral-rules-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        .section-body {
            flex: 1;
            background-color: $white;
            padding: px2rem(50) px2rem(40);
            .rule-item {
                padding-left: px2rem(26);
                font-size: px2rem(26);
                .title {
                    position: relative;
                    font-size: px2rem(30);
                    font-weight: 600;
                    margin-bottom: px2rem(30);
                    &::before {
                        content: '';
                        position: absolute;
                        display: inline-block;
                        top: 50%;
                        left: px2rem(-24);
                        transform: translate(-50%, -50%);
                        @include wh(#{px2rem(18)}, #{px2rem(18)});
                        border-radius: 100%;
                        border: px2rem(5) solid #de4041;
                    }
                }
                .rule {
                    color: #7F8C9A;
                    line-height: px2rem(46);
                }
            }
        }
        .mb40 {
            margin-bottom: px2rem(40);
        }
        .mb50 {
            margin-bottom: px2rem(50);
        }
    }
</style>
<template>
    <div class="integral-rules-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="section-body">
            <div class="rule-item mb40">
                <p class="title">如何获得积分？</p>
                <p class="rule">1）根据每天领取积分的次数，你都可以获得不定数量的积分，记得领取哦！如果积分结束忘记领取，你可以在积分明细页面补领过去7天内漏领的积分。</p>
                <p class="rule">2）用户可以通过完成[积分奖励任务]来获取积分；按照任务描述完成指定要求，即可获取积分奖励。</p>
            </div>
            <div class="rule-item mb50">
                <p class="title">什么是积分？</p>
                <p class="rule">积分是江淮轻卡平台给予的优惠，用户使用积分成功支付后即可获得积分。</p>
            </div>
            <div class="rule-item">
                <p class="title">积分获取规则？</p>
                <p class="rule">用户在使用滴滴出租车、专车、快车打车时，用微信支付或者支付宝钱包成功支付车费后，即可获得“滴币”，每消费2元可获得一枚滴币。</p>
                <p class="rule">滴滴出行相关负责人表示，未来滴滴还会为“滴币”增加专门的支付选项。支付选项上线后，用户在支付车费时，即可选择用滴币来支付，也可选择用滴币支付部分车费，用其他付款方式支付剩余车费。</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'integralRules'
    };
</script>
