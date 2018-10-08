<style lang="scss">
    @import 'src/scss/vars';
    // 获取验证码
    .enable.btn-get-code{
        background-color: $global_color;
        color: $white;
    }
    .btn-get-code {
        width: 3.48rem;
        height: 1.49rem;
        line-height: 1.49rem;
        text-align: center;
        border-radius: 3px;
        font-size: $font-size-14;
        background-color: #E5E5E5;
        color: #999797;
        display: block;
    }
</style>
<template>
  <a class="btn-get-code" :class="{ enable : enable }"  @click="sendCode">{{btnText}}</a>
</template>
<script>
import { getCode } from '@/services/loginService/loginService';

export default {
    name: 'sendCode',
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            enable: false,
            btnText: '获取验证码'
        };
    },
    methods: {
        sendCode () {
            if (this.enable) {
                let count = 60;
                var interValObj = '';
                var curCount = 0;
                curCount = count;
                this.enable = false;
                this.btnText = `已发送(${curCount}s)`;
                this.getCode();
                interValObj = window.setInterval(() => {
                    if (curCount === 1) {
                        window.clearInterval(interValObj);
                        this.enable = true;
                        this.btnText = `重新获取`;
                    } else {
                        curCount--;
                        this.btnText = `已发送(${curCount}s)`;
                    }
                }, 1000);
            }
        },
        async getCode () {
            try {
                await getCode({phone: this.value});
            } catch (e) {
                this.$toast({
                    message: e.message,
                    position: 'bottom'
                });
            }
        }
    },
    watch: {
        value (val) {
            if (/^1[35678]\d{9}$/.test(val) && this.btnText.indexOf('s') === -1) {
                this.enable = true;
            } else {
                this.enable = false;
            }
        }
    }
};
</script>
