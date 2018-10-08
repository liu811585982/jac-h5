/**
 * 作者：yeshengqiang
 * 时间：2018-04-17
 * 描述：searchBar
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .search-panel {
        position: relative;
        z-index: 1;
        .search-bar {
            display: flex;
            display: -webkit-flex;
            -webkit-align-items: center;
            -webkit-flex-flow: row nowrap;
            align-items: center;
            flex-flow: row nowrap;
            background-color: $white;
            overflow: hidden;
            @include border-b-1px(#DDDDDD);
            a.search-btn {
                position: relative;
                z-index: 3000;
                flex: 1;
                display: flex;
                display: -webkit-flex;
                -webkit-align-items: center;
                -webkit-justify-content: center;
                -webkit-flex-flow: row nowrap;
                align-items: center;
                justify-content: center;
                flex-flow: row nowrap;
                height: px2rem(72);
                line-height: px2rem(72);
                vertical-align: middle;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                font-size: px2rem(28);
                text-align: center;
                color: rgba(51,51,51,0.8);
                .triangle {
                    transition: transform 0.3s;
                    margin-left: px2rem(5);
                    display: inline-block;
                    vertical-align: middle;
                    font-size: px2rem(10);
                    color: currentColor;
                    transform: rotate(180deg);
                }
                &.search-selected {
                    color: #EB8C8D;
                }
                &.search-rotate {
                    .triangle {
                        transform: rotate(0deg);
                    }
                }
            }
        }
        .search-model {
            width: 100%;
            position: absolute;
            z-index: 2001;
            top: 100%;
            left: 0;
        }
        .search-shade {
            position: absolute;
            z-index: 2000;
            width: 100%;
            top: 100%;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.5);
        }
    }
</style>
<template>
    <div class="search-panel">
        <div class="search-bar">
            <a class="search-btn" :class="{ 'search-selected': currentValue === item.label, 'search-rotate': item.rotate }" @click="handleClick(item)" v-for="(item, index) in labelList" :key="index" href="javascript: void(0);">
                {{item.label}}
                <span class="triangle" v-if="!item.closed">
                    <svg-icon type="triangle"></svg-icon>
                </span>
            </a>
        </div>
        <div class="search-model"><slot></slot></div>
        <!-- 遮罩 -->
        <transition name="fade">
            <div class="search-shade" @click.self="handleClose" v-show="showShade" :style="styles"></div>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'searchBar',
        props: {
            value: [String, Number],
            modelAbleClick: Boolean
        },
        data () {
            return {
                height: 0,
                showShade: false,
                currentValue: this.value,
                labelList: []
            };
        },
        computed: {
            styles () {
                let style = {};
                if (this.height) {
                    style.height = this.height + 'px';
                }
                return style;
            }
        },
        methods: {
            findChild () {
                return this.$children.filter(item => item.$options.name === 'searchItem');
            },
            handleClick (res) {
                if (res.label === this.currentValue) {
                    res.rotate = !res.rotate;
                    this.showShade = false;
                    this.findChild().forEach(item => {
                        item.visiable = item.label === res.label && !item.closed && res.rotate;
                        if (item.visiable) {
                            this.showShade = true;
                        }
                    });
                } else {
                    this.findChild().forEach(item => {
                        item.visiable = item.label === res.label && !item.closed;
                        if (item.label === res.label) {
                            this.updateValue(item.label);
                            this.showShade = !item.closed;
                        };
                    });
                    this.labelList.forEach(item => {
                        item.rotate = item.label === res.label;
                    });
                }
            },
            updatePos () {
                this.$nextTick(() => {
                    const result = this.$el.getBoundingClientRect();
                    this.height = document.documentElement.clientHeight - result.bottom;
                });
            },
            // 更新child 隐藏展示
            updateChildVisible () {
                this.findChild().forEach(item => {
                    let isShow = !item.closed && item.label === this.currentValue;
                    if (isShow) {
                        this.showShade = true;
                    }
                    item.visiable = isShow;
                });
            },
            // 更新状态
            updateStatus () {
                this.updatePos();
                this.updateChildVisible();
                this.labelList = this.findChild().map(item => {
                    return {
                        label: item.label,
                        closed: item.closed,
                        rotate: item.visiable
                    };
                });
            },
            // 更新currentValue
            updateValue (val) {
                if (val === this.currentValue) return;
                this.currentValue = val;
                this.$emit('input', this.currentValue);
                this.$emit('tab-change', this.currentValue);
            },
            close () {
                this.findChild().forEach(item => {
                    item.visiable = false;
                });
                this.labelList.forEach(item => {
                    item.rotate = false;
                });
                this.showShade = false;
            },
            // 模态框
            handleClose () {
                if (!this.modelAbleClick) return;
                this.$emit('onCancel');
                this.close();
            }
        },
        watch: {
            value (val) {
                this.updateValue(val);
            }
        }
    };
</script>
