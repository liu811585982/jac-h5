/**
 * 作者：yeshengqiang
 * 时间：2018-05-07
 * 描述：消息推送
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        overflow: hidden;
        .section-body {
            position: relative;
            z-index: 1;
            flex: 1;
            -webkit-flex: 1;
            overflow: hidden;
            @include flex(stretch, column nowrap);
            .screen-bar {
                margin-bottom: px2rem(15);
                .icon-panel {
                    position: relative;
                    display: inline-block;
                    @include borderRadius(100%);
                    &.new::after {
                        content: attr(data-value);
                        display: block;
                        position: absolute;
                        color: $white;
                        top: 0;
                        right: 0;
                        text-align: center;
                        line-height: 1;
                        font-size: px2rem(12);
                        padding: px2rem(4) px2rem(8);
                        background-color: #FF5000;
                        transform: scale(0.8, 0.8) translate(80%, -50%);
                        @include borderRadius(#{px2rem(16)});
                    }
                }
            }
            .nav-bar {
                @include flex(stretch, row nowrap);
                background-color: $white;
                margin-bottom: px2rem(20);
                padding: px2rem(20) px2rem(10);
                .nav-bar-item {
                    flex: 1;
                    -webkit-flex: 1;
                    text-align: center;
                    &.nav-bar-active .figure{
                        background-color: #F0F0F3;
                    }
                    .figure {
                        display: inline-block;
                        padding: px2rem(10) px2rem(20);
                        .icon-panel {
                            position: relative;
                            // font-size: px2rem(40);
                            color: $white;
                            display: inline-block;
                            @include wh(#{px2rem(90)}, #{px2rem(90)});
                            line-height: px2rem(90);
                            @include borderRadius(100%);
                            &.gift {
                                background-color: #4286F5;
                            }
                            &.notice {
                                background-color: #FFA66B;
                            }
                            &.message {
                                background-color: #F97484;
                            }
                            &.new::after {
                                content: attr(data-value);
                                display: block;
                                position: absolute;
                                top: 0;
                                right: 0;
                                text-align: center;
                                line-height: 1;
                                font-size: px2rem(12);
                                padding: px2rem(4) px2rem(8);
                                background-color: #FF5000;
                                border: 2px solid $white;
                                transform: translate(50%, -20%);
                                @include borderRadius(100%);
                            }
                        }
                        figcaption {
                            padding-top: px2rem(15);
                            font-size: px2rem(32);
                            color: #464646;
                        }
                    }
                }
            }
            .message-panel-body {
                flex: 1;
                -webkit-flex: 1;
                background-color: $white;
                position: relative;
                overflow: hidden;
                .message-panel-scroller {
                    position: absolute;
                    @include wh(100%, 100%);
                    overflow: auto;
                    .message-panel {
                        .message-panel-item {
                            padding: 0 px2rem(20);
                            @include flex(stretch, row nowrap);
                            .message-body-left {
                                padding: px2rem(20);
                                padding-left: 0;
                                .message-icon {
                                    position: relative;
                                    text-align: center;
                                    color: $white;
                                    display: inline-block;
                                    @include borderRadius(#{px2rem(10)});
                                    @include wh(#{px2rem(86)}, #{px2rem(86)});
                                    line-height: px2rem(86);
                                    &.gift {
                                        background-color: #4286F5;
                                    }
                                    &.notice {
                                        background-color: #FFA66B;
                                    }
                                    &.message {
                                        background-color: #F97484;
                                    }
                                    &.unread::after {
                                        position: absolute;
                                        top: 0;
                                        right: 0;
                                        z-index: 10;
                                        content: '';
                                        @include wh(#{px2rem(20)}, #{px2rem(20)});
                                        @include borderRadius(#{px2rem(20)});
                                        background-color: #FF5000;
                                        transform: translate(30%, -30%);
                                    }
                                }
                            }
                            .message-body-right {
                                flex: 1;
                                -webkit-flex: 1;
                                text-align: left;
                                font-size: px2rem(30);
                                padding: px2rem(18) 0;
                                @include ellipsis;
                                @include border-1px(#EEEEEE);
                                .right-title {
                                    font-weight: 500;
                                    font-size: px2rem(30);
                                    padding: px2rem(5) 0;
                                    color: #060606;
                                    @include flex(center, row nowrap);
                                    .right-title-title {
                                        flex: 1;
                                        -webkit-flex: 1;
                                        @include ellipsis;
                                    }
                                    .right-title-time {
                                        flex: 1;
                                        -webkit-flex: 1;
                                        font-size: px2rem(28);
                                        color: #C8C8C8;
                                        text-align: right;
                                    }
                                    span {
                                        float: right;
                                        color: #C8C8C8;
                                    }
                                }
                                .left-content {
                                    @include flex(center, row nowrap, space-between);
                                    .right-title-time {
                                        flex: 1;
                                        -webkit-flex: 1;
                                        font-size: px2rem(28);
                                        color: #C8C8C8;
                                        text-align: right;
                                    }
                                    .left-overview {
                                        flex: 1;
                                        font-size: px2rem(24);
                                        color: #949FAA;
                                        @include ellipsis;
                                    }
                                }
                                .left-content {
                                    line-height: 1;
                                    padding-right: 40px;
                                    small {
                                        font-size: px2rem(24);
                                        color: #949FAA;
                                        @include ellipsis;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .noData {
        font-size: 0.64rem;
        line-height: 2rem;
        color: #A8A8A8;
        text-align: center;
    }
</style>
<template>
    <div class="section-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" @click="back">
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <!-- 内容 -->
        <section class="section-body">
            <screen class="screen-bar" @on-change="screenChange" v-model="screenValue" prop="label" :screen-list="screenList">
                <template slot-scope="scope">
                    <span class="icon-panel" v-data-value="scope.row.value">{{scope.row.label}}</span>
                </template>
            </screen>
            <!-- 提示部分 -->
            <!-- <ul class="nav-bar">
                <li class="nav-bar-item" :class="{'nav-bar-active': navBarActive === 'notice'}" @click="handleChoose('notice')">
                    <figure class="figure">
                        <span class="icon-panel notice" v-data-value="Unread">
                            <svg-icon type="notice"></svg-icon>
                        </span>
                        <figcaption>系统消息</figcaption>
                    </figure>
                </li>
                <li class="nav-bar-item" :class="{'nav-bar-active': navBarActive === 'gift'}" @click="handleChoose('gift')">
                    <figure class="figure">
                        <span class="icon-panel gift" v-data-value="giftUnread">
                            <svg-icon type="gift"></svg-icon>
                        </span>
                        <figcaption>节日慰问</figcaption>
                    </figure>
                </li>
                <li class="nav-bar-item" :class="{'nav-bar-active': navBarActive === 'message'}" @click="handleChoose('message')">
                    <figure class="figure">
                        <span class="icon-panel message" v-data-value="messageUnread">
                            <svg-icon type="message"></svg-icon>
                        </span>
                        <figcaption>维保推送</figcaption>
                    </figure>
                </li>
            </ul> -->
            <!-- 消息体 -->
            <div class="message-panel-body">
                <div class="message-panel-scroller">
                    <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
                        @on-pulldown-loading="refresh"
                        :pulldown-config="$store.state.pulldownDefaultConfig"
                        :pullup-config="$store.state.pullupDefaultConfig"
                        ref="scroller" height="100%">
                        <ul class="message-panel">
                            <li class="message-panel-item" @click="handleDetail(item.id)" v-for="(item, index) in list" :key="index">
                                <div class="message-body-left">
                                    <span class="message-icon" :class="classes(item)">
                                        <svg-icon :type="item.type | type"></svg-icon>
                                    </span>
                                </div>
                                <div class="message-body-right">
                                    <h3 class="right-title">
                                        <div class="right-title-title">{{item.title}}</div>
                                        <div class="right-title-time">{{item.issueTime | dateFormat('yyyy-MM-dd')}}</div>
                                    </h3>
                                    <div class="left-content">
                                        <small>{{item.overview}}</small>
                                    </div>
                                </div>
                            </li>
                            <transition name="fade">
                                <li v-show="!list.length" class="no-data-tip">
                                    <div class="text">暂无数据</div>
                                </li>
                            </transition>
                        </ul>
                    </scroller>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import { Scroller } from 'vux';
    import list from '@/mixins/list';
    import userInfo from '@/mixins/userInfo';
    import { Screen } from '@/components';
    import { selectByissueTimePage, selectByTypeRead } from '@/libs/websql';
    import { eventMsg, HOLIDAY_TOPIC, SYSTEM_TOPIC } from '@/libs/config';

    export default {
        mixins: [ userInfo, list ],
        components: { Scroller, Screen },
        data () {
            return {
                screenValue: '全部',
                noticeUnread: 0,
                giftUnread: 0,
                messageUnread: 0,
                list: [],
                type: ''
            };
        },
        computed: {
            screenList () {
                return [
                    {
                        label: '全部',
                        value: 0
                    },
                    {
                        label: '系统消息',
                        value: this.noticeUnread
                    },
                    {
                        label: '节日慰问',
                        value: this.giftUnread
                    },
                    {
                        label: '维保推送',
                        value: this.messageUnread
                    }
                ];
            }
        },
        mounted () {
            eventMsg.$once('messageEvent', (topic, message) => {
                this.type = '';
                this.reset();
                this.loadMore();
            });
        },
        methods: {
            back () {
                this.$router.push('/main');
            },
            screenChange (val) {
                let type = '';
                switch (val) {
                    case '系统消息':
                        type = SYSTEM_TOPIC;
                        break;
                    case '节日慰问':
                        type = HOLIDAY_TOPIC;
                        break;
                    case '维保推送':
                        type = this.userInfo.mobile;
                        break;
                }
                this.type = type;
                this.reset();
                this.loadMore();
            },
            // 获取数据
            async _getList () {
                if (!this.userInfo.id) {
                    await this.getUserInfo();
                }
                let result = await this._getAllList();
                let filter = this.$options.filters.type;
                [SYSTEM_TOPIC, HOLIDAY_TOPIC, this.userInfo.mobile].forEach(item => {
                    selectByTypeRead({type: item}, (response) => {
                        if (response.result === 0) {
                            this[`${filter(item)}Unread`] = response.responseData.rows.item(0).total;
                        }
                    });
                });
                return result;
            },
            _getAllList () {
                return new Promise((resolve, reject) => {
                    selectByissueTimePage(this.searchData, {type: this.type}, (response) => {
                        resolve(response);
                    });
                });
            },
            // 查看详情
            handleDetail (id) {
                this.$router.push({path: '/main/message/detail', query: { id }});
            },
            // 样式
            classes (item) {
                const type = this.$options.filters.type(item.type);
                const status = item.status === 'unread' ? 'unread' : 'read';
                return [
                    type,
                    status
                ];
            }
        },
        filters: {
            type (val) {
                let res = '';
                switch (val) {
                    case SYSTEM_TOPIC:
                        res = 'notice';
                        break;
                    case HOLIDAY_TOPIC:
                        res = 'gift';
                        break;
                    default:
                        res = 'message';
                        break;
                }
                return res;
            }
        },
        directives: {
            dataValue (el, { value }) {
                if (+value > 0 && +value < 100) {
                    el.classList.add('new');
                    el.setAttribute('data-value', value);
                } else if (+value >= 100) {
                    el.classList.add('new');
                    el.setAttribute('data-value', '99+');
                } else {
                    el.classList.remove('new');
                }
            }
        }
    };
</script>
