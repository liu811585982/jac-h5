/**
* telInput 电话号码输入框
*/
<style lang="scss" scoped>
    @import 'src/scss/mixins';
    @import 'src/scss/vars';
    .tel-input {
        width: 100%;
        padding: 10px 15px;
        font-size: inherit;
        color: inherit;
        background-color: inherit;
        @include flex(stretch, row nowrap);
        input {
            flex: 1;
            padding-right: px2rem(10);
            line-height: $base_line_height;
        }
        .clear-icon {
            font-size: px2rem(30);
            color: #b2b2b2;
        }
    }
</style>

<template>
    <div class="tel-input">
        <input type="number" :placeholder="placeholder" :value="value" ref="input" @input="handleInput">
        <div class="clear-icon" v-if="value.length > max" @click="handleClear"><svg-icon type="clear_icon"></svg-icon></div>
    </div>
</template>

<script>
    export default {
        name: 'telInput',
        props: {
            value: {
                required: true,
                type: [Number, String]
            },
            max: {
                type: Number,
                default: 11
            },
            placeholder: {
                type: String,
                default: '请输入数字'
            }
        },
        data () {
            return {
            };
        },
        methods: {
            handleKeypress (event) {
                if (/[\D]/.test(String.fromCharCode(event.keyCode)) || event.target.value.length >= this.max) {
                    event.returnValue = false;
                }
            },
            handleInput (event) {
                event.target.value = event.target.value.trim().replace(/\D/g, '');
                this.$emit('input', event.target.value);
            },
            handleClear () {
                this.$refs.input.focus();
                this.$emit('input', '');
            }
        }
    };
</script>