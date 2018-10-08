/**
 * 作者：yeshengqiang
 * 时间：2018-05-02
 * 描述：animate.js
 */

import { ensureNumber, noop } from '@/libs/utils';

const tween = {
    Linear (t, b, c, d) {
        return c * t / d + b;
    },
    easeOutExpo (t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
    }
};

export default class Count {
    constructor (startVal, endVal, duration, callback, anFn = tween.easeOutExpo) {
        if (typeof anFn === 'string') {
            if (anFn in tween) {
                anFn = tween[anFn];
            } else {
                console.error(`[Count] tween[${anFn}] is not a inexistence`);
            }
        }
        this.isStart = false;
        this.anFn = anFn;
        this.timer = null;
        this.isPause = false;          // 是否暂停 【缺省】
        this.frameVal = 0;
        this.originStartVal = this.startVal = Number(startVal) || 0;
        this.originEndVal = this.endVal = Number(endVal);
        this.originDuration = this.duration = Number(duration) || 3000;
        if (!ensureNumber(this.startVal) ||
            !ensureNumber(this.endVal) ||
            !ensureNumber(this.duration)) {
            console.error(`[Count] startVal (${startVal}) or endVal (${endVal}) or duration (${duration}) is not a number`);
        }
        this.callback = callback || noop;
        this.countDown = this.startVal > this.endVal;
    };
    count (timestamp) {
        if (!this.startTime) { this.startTime = timestamp; }
        this.timestamp = timestamp;
        var progress = timestamp - this.startTime;
        this.remaining = this.duration - progress;
        var val = this.countDown
                    ? this.startVal - this.anFn(progress, 0, this.startVal - this.endVal, this.duration)
                    : this.anFn(progress, this.startVal, this.endVal - this.startVal, this.duration);
        this.frameVal = this.countDown
                            ? Math.max(val, this.endVal)
                            : Math.min(val, this.endVal);
        this.callback && this.callback(this.frameVal, this.originDuration - this.duration + progress);
        if (progress < this.duration) {
            this.timer = requestAnimationFrame(this.count.bind(this));
        } else {
            this.isStart = false;
        }
    };
    start () {
        if (this.isStart) return;
        if (this.frameVal === this.endVal) return;
        this.isStart = true;
        cancelAnimationFrame(this.timer);
        this.timer = requestAnimationFrame(this.count.bind(this));
    };
    reset () {
        delete this.startTime;
        cancelAnimationFrame(this.timer);
        this.timer = null;
        this.frameVal = 0;
        this.isStart = false;
        this.isPause = false;
        this.startVal = this.originStartVal;
        this.endVal = this.originEndVal;
        this.duration = this.originDuration;
        this.countDown = this.startVal > this.endVal;
        this.callback(this.startVal);
    };
    // 暂停/恢复
    pause () {
        if (!this.isStart) return;
        if (this.endVal === this.frameVal) return;
        this.isPause = !this.isPause;
        if (!this.isPause) {
            delete this.startTime;
            this.startVal = this.frameVal || 0;
            this.countDown = this.startVal > this.endVal;
            this.duration = this.remaining;
            this.timer = requestAnimationFrame(this.count.bind(this));
        } else {
            cancelAnimationFrame(this.timer);
        }
    };
    updateDuration (val) {
        this.originDuration = this.duration = Number(val);
    };
    update (newEndVal) {
        newEndVal = Number(newEndVal);
        if (!ensureNumber(newEndVal)) {
            console.error('[CountUp] update() - new endVal is not a number: ' + newEndVal);
            return;
        }
        if (newEndVal === this.frameVal) return;
        cancelAnimationFrame(this.timer);
        delete this.startTime;
        this.startVal = this.frameVal || 0;
        this.endVal = newEndVal;
        if (this.isStart) {
            this.duration = this.remaining;
        }
        this.countDown = this.startVal > this.endVal;
        this.timer = requestAnimationFrame(this.count.bind(this));
    }
};
