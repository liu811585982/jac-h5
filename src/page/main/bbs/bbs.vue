<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .bbs-panel {
        @include wh(100%, 100%);
        @include flex(stretch);
        overflow: hidden;
        .bbs-body-panel {
            flex: 1;
            overflow: hidden;
        }
    }
</style>

<template>
    <div class="bbs-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" @click="back">
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="bbs-body-panel">
            <iframe frameborder="0" width="100%" height="100%" ref="iframe" :src="bbs"></iframe>
        </div>
    </div>
</template>

<script>
    import { bbsUrl } from '@/libs/config';
    import { bbsLogin } from '@/services/bbs';

    export default {
        name: 'bbs',
        data () {
            return {
                bbs: bbsUrl
            };
        },
        mounted () {
            this.$indicator.open();
            this.loginIn();
            const iframe = this.$refs.iframe;
            if (iframe.attachEvent) {
                iframe.attachEvent('onload', () => {
                   this.$indicator.close();
                });
            } else {
                iframe.onload = () => {
                  this.$indicator.close();
                };
            }
        },
        methods: {
            // 断点登录
            async loginIn () {
                try {
                    await bbsLogin({token: this.$store.getters.getToken});
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            back () {
                this.$router.push('/main');
            }
        }
    };
</script>
