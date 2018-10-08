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
        }
    }
</style>
<template>
    <div class="about-panel">
        <div class="about-panel-logo">
            <svg-icon type="logo"></svg-icon>
        </div>
        <div class="about-panel-content">
            <group class="noHeader">
                <cell title="版权信息" is-link link="/main/setting/about/copyright"></cell>
                <cell title="隐私协议" is-link link="/main/setting/about/privacyPolicy"></cell>
                <cell title="用户协议" is-link link="/main/setting/about/userPolicy"></cell>
                <cell title="联系我们" is-link link="/main/setting/about/contactUs"></cell>
            </group>
        </div>
    </div>
</template>
<script>
    import { Group, Cell } from 'vux';

    export default {
        components: { Group, Cell }
    };
</script>
