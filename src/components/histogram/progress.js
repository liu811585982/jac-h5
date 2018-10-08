/**
 * 作者：yeshengqiang
 * 时间：2018-05-02
 * 描述：progress
 */
import Count from '../animate.js';

export default {
    name: 'Progress',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        options: {
            type: Object,
            default () {
                return {};
            }
        },
        duration: {
            type: Number,
            default: 2000
        },
        start: {
            type: Boolean,
            default: true
        },
        startValue: {
            type: Number,
            default: 0
        },
        endValue: {
            type: Number,
            default: 0,
            required: true
        }
    },
    data () {
        return {
            currentValue: this.startValue
        };
    },
    mounted () {
        this.$nextTick(() => {
            this._countup = new Count(this.startValue, this.endValue, this.duration, (val) => {
                this.currentValue = val;
            });
            if (this.start) {
                this._countup.start();
            }
        });
    },
    render (h) {
        return h(this.tag, {
            style: {
                width: `${this.currentValue}%`
            }
        }, [
            h('span', {
                style: {
                    padding: `0 5px`
                }
            }, `${Math.floor(this.currentValue)}%`)
        ]);
    },
    beforeDestroy () {
        this._countup.reset();
    },
    watch: {
        start (val) {
            if (val) {
                this._countup.start();
            }
        },
        endValue (val) {
            this._countup.update(val);
        }
    }
};
