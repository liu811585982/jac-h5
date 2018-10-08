/**
 * 作者：yeshengqiang
 * 时间：2018-04-12
 * 描述：group
 */
<style lang="scss" scoped>
    .group-radio-panel {
        // display: inline-block;
        line-height: 1;
        vertical-align: middle;
        color: currentColor;
        font-size: 1em;
    }
</style>
<template>
    <div class="group-radio-panel">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'GroupRadio',
        props: {
            value: [String, Number]
        },
        data () {
            return {
                currentValue: this.value
            };
        },
        methods: {
            findChild () {
                return this.$children.filter(item => item.$options.name === 'RadioItem');
            },
            updateStatus () {
                const childrens = this.findChild();
                childrens.forEach(item => {
                    item.currentValue = this.currentValue === item.label;
                });
            },
            updateValue (val) {
                this.currentValue = val;
                this.$emit('input', val);
            }
        },
        watch: {
            value (val) {
                this.updateValue(val);
            },
            currentValue () {
                this.updateStatus();
            }
        }
    };
</script>
