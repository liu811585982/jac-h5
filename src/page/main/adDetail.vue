/**
 * 作者：yeshengqiang
 * 时间：2018-05-15
 * 描述：广告详情
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
                .detail-content {
                    font-size: px2rem(26);
                    color:rgba(148,159,170,1);
                    line-height: 1.5;
                    .content {
                        padding-top: px2rem(30);
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="section-panel">
        <!-- 头部 -->
        <hy-header :title="detailInfo.adTitle" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <!-- 内容 -->
        <section class="section-body">
            <div class="message-detail-panel">
                <h1>{{detailInfo.adTitle}}</h1>
                <p>{{detailInfo.issueTime}}</p>
                <div class="detail-content">
                    <img :src="detailInfo.adCover" alt="banner" />
                    <div class="content" v-html="detailInfo.adContent"></div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import { adById } from '@/services/advertiseService/advertiseService';

    export default {
        data () {
            return {
                detailInfo: {}
            };
        },
        created () {
           this._getDetail();
        },
        methods: {
            async _getDetail () {
                try {
                    const result = await adById({id: this.$route.query.id});
                    this.detailInfo = result.data;
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
