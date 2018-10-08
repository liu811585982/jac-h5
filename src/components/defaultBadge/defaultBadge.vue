<template>
    <div class="default-badge">
        <div class="badge-desc"><span>{{desc}}</span></div>
    </div>
</template>

<script>
    export default {
        name: 'default-badge',
        props: {
            desc: {
                required: true,
                type: String | Number
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .default-badge {
        position: relative;
        width: px2rem(60);
        height: px2rem(60);
        overflow: visible;
        &:before {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            left: 0;
            top: 0;
            border: px2rem(30) solid;
            color: transparent;
            border-top-color: #FEC03C;
            border-right-color: #FEC03C;
        }
        .badge-desc {
            box-sizing: border-box;
            height: px2rem(60);
            text-align: center;
            font-size: px2rem(15);
            line-height: px2rem(40);
            overflow: hidden;
            color: #ffffff;
            word-break: keep-all;
            white-space: nowrap;
            transform: rotate(45deg);
        }
    }
</style>
