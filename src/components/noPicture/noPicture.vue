<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .no-picture {
        position: relative;
        @include wh(100%, 100%);
        background: #F4F4F4;
        .picture {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            img {
                display: inline-block;
                margin-bottom: px2rem(20);
                &.pic {
                    width: px2rem(150);
                }
                &.loc {
                    width: px2rem(100);
                }
            }
            p {
                font-size: px2rem(28);
                color: #7F8C9A;
            }
        }
    }
</style>
<template>
    <div class="no-picture">
        <div class="picture">
            <img :src="src" alt="" :class="{pic: this.type === 'picture', loc: this.type === 'location'}">
            <p>{{desc}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'no-picture',
        props: {
            type: {
                default: 'picture',
                type: String
            }
        },
        computed: {
            src () {
                let url = '';
                switch (this.type) {
                    case 'picture':
                        url = require('@/assets/images/no_picture.png');
                        break;
                    case 'location':
                        url = require('@/assets/images/no_location.png');
                        break;
                }
                return url;
            },
            desc () {
                return this.type === 'picture' ? '暂无图片' : '暂无定位';
            }
        }
    };
</script>
