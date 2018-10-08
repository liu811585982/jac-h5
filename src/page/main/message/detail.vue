/**
 * 作者：yeshengqiang
 * 时间：2018-05-10
 * 描述：消息详情
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
            overflow: auto;
            .message-detail-panel {
                position: absolute;
                z-index: 10;
                @include wh(100%, 100%);
                background-color: $white;
                padding: px2rem(30) px2rem(20);
                h1 {
                    line-height: 1.5;
                    color: #060606;
                    font-weight: 500;
                    font-size: px2rem(32);
                    margin-bottom: px2rem(15);
                }
                p {
                    padding: px2rem(15) 0;
                    color: #7D7D7D;
                    font-size: px2rem(28);
                    margin-bottom: px2rem(20);
                }
                .detail-img {
                    width: 100%;
                    .title-img {
                        width: 100%;
                    }
                }
                .detail-content {
                    font-size: px2rem(26);
                    color:rgba(148,159,170,1);
                    line-height: 1.5;
                }
            }
        }
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
            <div class="message-detail-panel">
                <h1>{{detailInfo.title}}</h1>
                <p>{{detailInfo.issueTime | dateFormat('yyyy-MM-dd')}}</p>
                <div class="detail-content" @click="handleEnlarge" v-html="detailInfo.content"></div>
            </div>
        </section>
    </div>
</template>
<script>
    import userInfo from '@/mixins/userInfo';
    import { updateStatus, selectById } from '@/libs/websql';

    export default {
        mixins: [ userInfo ],
        data () {
            return {
                detailInfo: {}
            };
        },
        mounted () {
            this._getDetail();
        },
        methods: {
            async _getDetail () {
                if (!this.userInfo.id) {
                    await this.getUserInfo();
                }
                updateStatus({id: this.$route.query.id, status: 'read'}, () => {});
                selectById({id: this.$route.query.id}, (response) => {
                    if (response.result === 0) {
                        this.detailInfo = response.responseData.rows.item(0);
                    }
                });
            },
            // 点击放大
            handleEnlarge (ev) {
                let el = ev.target || ev.srcElement;
                if (el.tagName === 'IMG' && el.getAttribute('data-enlarge')) {
                    this.$enlarge.open(el, {
                        resource: el.src
                    }, {
                        closeEl: false
                    });
                }
            },
            back () {
                this.$router.push('/main/message');
            }
        },
        beforeRouteLeave (to, from, next) {
            this.$enlarge.close();
            next();
        }
    };
</script>
