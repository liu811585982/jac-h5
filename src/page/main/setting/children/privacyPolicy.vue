/**
* 作者：yeshengqiang
* 时间：2018-04-25
* 描述：关于我们
*/
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .about-panel {
        position: absolute;
        left: 0;
        top: 0;
        @include wh(100%, 100%);
        background-color: $body_bg;
        display: flex;
        display: -webkit-flex;
        align-items: stretch;
        -webkit-align-items: stretch;
        flex-flow: column nowrap;
        -webkit-flex-flow: column nowrap;
        .about-panel-logo {
            flex: 0 0 200px;
            -webkit-flex: 0 0 200px;
            line-height: 0;
            background-color: $white;
            text-align: center;
            font-size: 200px;
        }
        .about-panel-content {
            flex: 1;
            background-color: $white;
            .noHeader /deep/ .weui-cells.vux-no-group-title {
                margin-top: 0;
            }
            padding: $font-size-20;
            .article {
                font-size: $font-size-15;
                color: #6d7c8b;
                line-height: $font-size-22;
                .title {
                    font-size: $font-size-16;
                    color: #212121;
                    font-weight: bold;
                    margin-bottom: $font-size-8;
                }
                .section {
                    margin-top: $font-size-22;
                    font-size: $font-size-14;
                }
                .footer {
                    margin-top: 2rem;
                    text-align: center;
                }
            }
        }
    }
</style>
<template>
    <div class="about-panel">
        <div class="about-panel-content">
            <div class="article">
                <p class="title">隐私协议</p>
                <p class="desc">江淮汽车Copyright&copy;2003-现在，江淮软件有限公司</p>
                <p class="section">
                    本网站包含与JAC的企业和产品有关的信息。

                    本网站中包含的所有信息（文字、图片、产品价格、产品参数等）仅作为您参考之用；对产品的描述仅限于在中国大陆市场（香港、澳门、台湾地区不包括在内。下文亦同）的车辆。我们将力求网站中所有资料准确、完整、最新，但保留不必事先通知而随时更改车型、配置、技术参数、有效性以及其他任何信息的权利。在我们确保信息的适时准确与及时更新的基础上，本网站的信息并不能取代您从其它合法途径获得的有关本企业与产品有关的信息。

                    本网站的信息不具有法律约束力，JAC保留完全依其决定不必事先通知您而随时根据公司需要更改、删除或增添本网站任何信息的权利。

                    JAC对本网站信息的确切性、完整性和时效性不作任何承诺，对信息的迟延、失误和遗漏不承担任何责任；如果您因使用本网站信息发生的任何纠纷与法律后果，JAC概不承担任何责任。

                    本网站禁止注册用户发送或转送任何非法的具有威胁、中伤、诽谤、淫秽、色情内容或其他违反法律的资料。对于这些资料，注册用户应承担任何因此可能产生的民事侵权或其他法律责任，该等法律责任与本网站无关。安徽江淮汽车集团股份有限公司保留屏蔽或删除任何注册用户在网站上发布的任何非法的或具有威胁、中伤、诽谤、淫秽、色情内容或其他违反法律的资料的权利。
                </p>
                <p class="footer">
                    —江淮汽车—
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import { Group, Cell } from 'vux';

    export default {
        components: { Group, Cell }
    };
</script>
