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
        .about-panel-content {
            flex: 1;
            background-color: $white;
            .noHeader /deep/ .weui-cells.vux-no-group-title {
                margin-top: 0;
            }
            /deep/ .weui-cell__ft {
                color: #000000;
            }
        }
    }
</style>
<template>
    <div class="about-panel">
        <div class="about-panel-content">
            <ViewBox>
                <Group label-margin-right="2em" class="noHeader">
                    <cell title="服务热线" value="400-800-9933"></cell>
                    <cell title="客服邮箱" value="service_jianghuai@jianghuai.com"></cell>
                    <cell title="官方网站" value="http://www.jac.com.cn"></cell>
                    <cell title="总部地址" value="安徽省合肥市东流路176号"></cell>
                </Group>
            </ViewBox>
        </div>
    </div>
</template>
<script>
    import { Group, Cell, ViewBox } from 'vux';

    export default {
        components: { Group, Cell, ViewBox }
    };
</script>
