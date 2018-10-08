/**
 * 作者：yeshengqiang
 * 时间：2018-07-03
 * 描述：商品详情
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        .section-body-panel {
            padding: absolute;
            flex: 1;
            overflow: auto;
            .goodsCateDetail-logo {
                padding: px2rem(15) px2rem(6);
                background-color: $white;
                margin-bottom: px2rem(11);
                .figure-panel {
                    .figure-img {
                        width: 100%;
                        height: px2rem(405);
                    }
                    .zone-body-item__text {
                        margin: 0 auto;
                        text-align: left;
                        padding: px2rem(33) px2rem(28) 0;
                        p.item__text_tips {
                            font-size: px2rem(30);
                            font-weight: 600;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #444444;
                            margin-bottom: px2rem(20);
                        }
                        p.item__text {
                            font-size: px2rem(26);
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            span {
                                color: #fe7c22;
                            }
                        }
                    }
                }
            }
            .goodsCateDetail-body {
                background-color: $white;
                padding: px2rem(14) px2rem(29);
                margin-bottom: px2rem(11);
                .goodsCateDetail-body-item {
                    padding: px2rem(29) 0 px2rem(32);
                    border-bottom: 1px solid #e5e5e5;
                    .body-item-title {
                        font-size: px2rem(28);
                        font-weight: 600;
                        font-stretch: normal;
                        letter-spacing: 1px;
                        color: #212121;
                        margin-bottom: px2rem(19);
                        .item-title-svg {
                            color: #eaaf06;
                            padding-right: px2rem(5);
                        }
                    }
                    .body-item-tips {
                        font-size: px2rem(26);
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #6d7c8b;
                    }
                }
            }
            .goodsCateDetail-footer {
                background-color: $white;
                padding: px2rem(8) px2rem(10);
            }
        }
        .custom-confirm /deep/ {
            .weui-dialog {
                @include borderRadius(#{px2rem(10)});
                .weui-dialog__hd {
                    /* padding: 0;
                    background: url('../../assets/images/customerService.png') no-repeat center center;
                    height: px2rem(244);
                    background-size: cover;
                    .weui-dialog__title {
                        font-size: 0;
                    } */
                    display: none;
                }
                .weui-dialog__bd {
                    padding: px2rem(46) px2rem(40);
                    font-size: px2rem(32);
                    font-weight: 900;
                    .rescue-icon {
                        display: block;
                        font-size: px2rem(114);
                        margin: 0 auto px2rem(46) auto;
                    }
                }
                .weui-dialog__btn {
                    color: #399EFF;
                    font-size: px2rem(36);
                }
            }
            .confirm-content {
                .rescue-icon {
                    display: block;
                    font-size: px2rem(114);
                    margin: 0 auto px2rem(46) auto;
                }
                .custom-text {
                    text-align: center;
                    font-size: px2rem(36);
                    color: #333333;
                    font-weight: 600;
                }
            }
        }
    }
</style>
<template>
    <div class="section-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="section-body-panel">
            <div class="goodsCateDetail-logo">
                <figure class="figure-panel">
                    <img class="figure-img" :src="goodsDetail.imagerUrl|avatarFormat" alt="banner">
                    <figcaption class="zone-body-item__text">
                        <p class="item__text_tips">{{goodsDetail.name}}</p>
                        <p class="item__text">
                            <span>{{goodsDetail.needIntegral}}</span>
                            积分
                        </p>
                    </figcaption>
                </figure>
            </div>
            <div class="goodsCateDetail-body">
                <div class="goodsCateDetail-body-item">
                    <h3 class="body-item-title">
                        <span class="item-title-svg">
                            <svg-icon type="validity"></svg-icon>
                        </span>
                        有效期
                    </h3>
                    <p class="body-item-tips">
                        {{goodsDetail.startTime|dateFormat('yyyy-MM-dd')}}至{{goodsDetail.endTime|dateFormat('yyyy-MM-dd')}}
                    </p>
                </div>
                <div class="goodsCateDetail-body-item">
                    <h3 class="body-item-title">
                        <span class="item-title-svg">
                            <svg-icon type="goods_synopsis"></svg-icon>
                        </span>
                        商品简介
                    </h3>
                    <p class="body-item-tips">
                        {{goodsDetail.synopsis}}
                    </p>
                </div>
                <div class="goodsCateDetail-body-item">
                    <h3 class="body-item-title">
                        <span class="item-title-svg">
                            <svg-icon type="goods_attention"></svg-icon>
                        </span>
                        注意事项
                    </h3>
                    <p class="body-item-tips">
                        {{goodsDetail.announcements}}
                    </p>
                </div>
            </div>
             <div class="goodsCateDetail-footer">
                 <x-button type="warn" class="login-btn" @click.native="handelExchange" :disabled="userInfo.totalPoint < goodsDetail.needIntegral">立即兑换</x-button>
             </div>
        </div>
        <confirm class="custom-confirm" v-model="confirmShow"
                 title="1"
                 @on-confirm="handleConfirm">
            <div class="confirm-content">
                <svg-icon type="authority" class="rescue-icon"></svg-icon>
                <div class="custom-text">
                    确定兑换？
                </div>
            </div>
        </confirm>
    </div>
</template>
<script>
    import { XButton, Confirm } from 'vux';
    import userInfo from '@/mixins/userInfo';
    import { goodsDetail, exchange } from '@/services/integralMall/integralMallService';
    import { imgHttp } from '@/libs/config';

    export default {
        name: 'goodsCateDetail',
        mixins: [userInfo],
        components: { XButton, Confirm },
        data () {
            return {
                goodsDetail: {},
                confirmShow: false
            };
        },
        mounted () {
            this.getUserInfo();
            this.getGoodsDetail();
        },
        methods: {
            async getGoodsDetail () {
                try {
                    this.$indicator.open();
                    const result = await goodsDetail({id: this.$route.query.id});
                    this.$indicator.close();
                    this.goodsDetail = result.data || {};
                } catch (e) {
                    this.$indicator.close();
                    this.$toast({
                       message: e.message,
                       position: 'bottom'
                    });
                }
            },
            handelExchange () {
                this.confirmShow = true;
            },
            handleConfirm () {
                this.exchangeGoods();
            },
            async exchangeGoods () {
                try {
                    this.$indicator.open();
                    if (this.userInfo.totalPoint < this.goodsDetail.needIntegral) {
                        this.$indicator.close();
                        this.$toast({
                            message: '当前剩余积分不足',
                            position: 'bottom'
                        });
                        return;
                    }
                    const payload = [];
                    payload.push({
                        couponId: this.goodsDetail.id,
                        integral: this.goodsDetail.needIntegral,
                        deduction: this.goodsDetail.deduction,
                        sysId: this.userInfo.id
                    });
                    await exchange(payload);
                    this.$indicator.close();
                    this.$router.replace('/main/integralMall/pointCenter');
                } catch (e) {
                    this.$indicator.close();
                    this.$toast({
                       message: e.message,
                       position: 'bottom'
                    });
                }
            }
        },
        filters: {
            avatarFormat (val) {
                let url = '';
                if (val) {
                    url = imgHttp + val;
                } else {
                    url = require('@/assets/images/goodsCateDetail.png');
                }
                return url;
            }
        }
    };
</script>
