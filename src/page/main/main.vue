/**
 * 作者：yeshengqiang
 * 时间：2018-03-20
 * 描述：main文件
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .main-panel {
        @include wh(100%, 100%);
        overflow: hidden;
        @include flex(stretch, column nowrap);
        .mr5 {
            margin-right: 5px;
        }
        /deep/ .mint-swipe {
            width: 100%;
            height: px2rem(489);
        }
        .main-menu {
            flex: 1;
            -webkit-flex: 1;
            font-size: 0.64rem;
            background-color: $white;
            position: relative;
            overflow: hidden;
            .main-grid {
                position: absolute;
            }
            .figure-panel {
                position: absolute;
                @include wh(100%, 100%);
                @include flex(center, column nowrap, center);
                &:active {
                    background-color: #EFEFEF;
                }
                .icon-panel-box {
                    position: relative;
                    @include wh(50%, auto);
                    margin-bottom: $font-size-10;
                    font-size: 1.8rem;
                    @include flex(center, column nowrap);
                    color: $white;
                    @include borderRadius(100%);
                    .icon-badge {
                        position: absolute;
                        font-size: px2rem(16);
                        top: px2rem(-5);
                        right: 0;
                        padding: 0 px2rem(5);
                        height: px2rem(26);
                        line-height: px2rem(26);
                        background: $global_color;
                        border-radius: px2rem(26) px2rem(26) px2rem(26) 0;
                    }
                    .icon-box {
                        // -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                    }
                    img.icon-img {
                        width: 100%;
                        display: block;
                    }
                }
                figcaption {
                    font-weight: 500;
                    color: $grid_font_color;
                }
            }
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
                padding: px2rem(46) px2rem(20);
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
        .custom-text {
            font-size: px2rem(32);
            color: #000000;
        }
    }
    .tips-cicle {
        // display: inline-block;
        position: relative;
        z-index: 1;
        &.news::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            @include wh(#{px2rem(16)}, #{px2rem(16)});
            @include borderRadius(100%);
            background-color: #FF8585;
            border: 2px solid $white;
        }
    }
</style>

<template>
<transition :name="transitionName">
    <div class="main-panel">
        <!-- 头部 -->
        <hy-header title="江淮" class="v-immersed">
            <router-link class="header-nav__inner" slot="left" to="/main/userCenter">
                <svg-icon type="mine_new"></svg-icon>
            </router-link>
            <span class="header-nav__inner is-right" slot="right">
                <router-link class="nav_type" to="/main/message">
                    <span class="tips-cicle" :class="{'news': hasUnRead}">
                        <svg-icon type="talk_new"></svg-icon>
                    </span>
                </router-link>
                <span class="nav_type" @click="handleSet()">
                    <svg-icon type="set_new"></svg-icon>
                </span>
            </span>
        </hy-header>
        <!-- banner -->
        <mt-swipe :auto="$store.state.swiperInterval">
            <mt-swipe-item v-for="(item, index) in $store.state.adList" :key="index" @click.native="handleClick(item.id)"><img :src="item.adCover" alt="banner" /></mt-swipe-item>
        </mt-swipe>
        <!-- 网格 -->
        <div class="main-menu">
            <hy-grid :list="list" class="main-grid" height="100%" @tab-change="handleChange">
                <template slot-scope="scope">
                    <figure class="figure-panel">
                        <span class="icon-panel-box">
                            <svg-icon :type="scope.row.icon"></svg-icon>
                            <!-- <img class="icon-img" :src="requireUrl(scope.icon)" alt="icon" /> -->
                            <span class="icon-badge" v-if="scope.row.hasBadge && (scope.row.icon === 'goods' && $store.state.goodsSupplyState && $store.state.goodsSupplyState !== 'AGREE')">{{$store.state.goodsSupplyState|applyState}}</span>
                        </span>
                        <figcaption>{{scope.row.label}}</figcaption>
                    </figure>
                </template>
            </hy-grid>
        </div>
        <!-- 弹出 -->
        <confirm class="custom-confirm" v-model="confirmShow"
        title="1"
        @on-confirm="handleConfirm">
            <svg-icon type="rescue_icon" class="rescue-icon"></svg-icon>
            <p class="custom-text">{{$store.state.rescuePhone}}</p>
        </confirm>
        <!-- 路由跳转 -->
        <router-view></router-view>
    </div>
</transition>
</template>
<script>
    import { hyGrid, hySlide } from '@/components';
    import userInfo from '@/mixins/userInfo';
    import mqtt from '@/mixins/mqtt';
    import { selectByStatus } from '@/libs/websql';
    import { _typeOf } from '@/libs/utils';
    import { eventMsg } from '@/libs/config';
    import { XHeader, Confirm } from 'vux';
    import { plusready } from '@/libs/plus';
    import { rescueCall } from '@/services/common';
    import { queryOne } from '@/services/goodsSupply/goodsSupplyService';

    export default {
        name: 'Main',
        mixins: [ userInfo, mqtt ],
        components: { hyGrid, hySlide, XHeader, Confirm },
        data () {
            return {
                hasUnRead: false,
                confirmShow: false,
                selected: '首页',
                visibleSilde: false,
                transitionName: 'slideLeft',
                adList: [],
                applyInfo: {}
            };
        },
        computed: {
            list () {
                return this.userInfo.type
                    ? this.$store.state.mainMenu.filter((item) => {
                        return item.role.indexOf(this.userInfo.type) > -1;
                    })
                    : [];
            }
        },
        created () {
            // 二期获取货源
            this.getApplyState();
        },
        mounted () {
            eventMsg.$once('messageEvent', this.getUnReadMsg);
            this.getUnReadMsg();
            this.getRescuePhone();
            this.$store.dispatch('getLatestAdList');
        },
        methods: {
            async handleChange (item) {
                let path = _typeOf(item.router) === 'object'
                                    ? item.router[this.userInfo.type]
                                    : item.router;
                if (_typeOf(path) === 'boolean') {
                    // this.confirmShow = true;
                    this.call();
                    return;
                }
                let params = item.params || {};
                if (!path) {
                    this.$toast({
                        message: '敬请期待!',
                        position: 'bottom'
                    });
                    return;
                };
                if (this.userInfo.type === 'driver' && (path === '/main/carMonitoring/realTime' ||
                    path === '/main/carCheckup/faultQuery' || path === '/main/driveReport')) {
                    this.$indicator.open();
                    await this.getUserInfo();
                    this.$indicator.close();
                    if (!this.userInfo.defaultVin) {
                        this.$toast({
                            message: '请先绑定车辆',
                            position: 'bottom'
                        });
                        return;
                    }
                }
                this.$router.push({path, params});
            },
            // 设置
            handleSet () {
                this.$router.push({path: '/main/setting'});
            },
            // 确定
            handleConfirm () {
                plusready((plus) => {
                    plus.device.dial(this.$store.state.rescuePhone, true);
                });
            },
            // 轮播广告
            handleClick (id) {
                this.$router.push({path: '/main/adDetail', query: { id }});
            },
            getUnReadMsg () {
                selectByStatus({status: 'unread'}, (response) => {
                    if (response.result === 0) {
                        this.hasUnRead = response.responseData.rows.length > 0;
                    }
                });
            },
            async getRescuePhone () {
                try {
                    const result = await rescueCall();
                    this.$store.commit('SET_RESCUE_CALL', result.data || '');
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            call () {
                this.$messagebox.confirm(this.$store.state.rescuePhone, '').then(() => {
                    plusready((plus) => {
                        plus.device.dial(this.$store.state.rescuePhone, true);
                    });
                }).catch(e => {});
            },
            async getApplyState () {
                try {
                    this.$indicator.open();
                    const result = await queryOne();
                    this.$indicator.close();
                    let state = '';
                    if (!result.data) {
                        state = 'NOTOPEN';
                    } else {
                        state = result.data.state;
                    }
                    this.$store.commit('SET_GOODS_SUPPLY_STATE', state);
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
            applyState (val) {
                switch (val) {
                    case 'NOTOPEN':
                        return '未开通';
                    case 'AUDIT':
                        return '审核中';
                    case 'REFUSE':
                        return '已拒绝';
                }
            }
        }
    };
</script>
