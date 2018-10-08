/**
 * 作者：yeshengqiang
 * 时间：2018-04-02
 * 描述：dial.js
 */

export default class Draw {
    constructor (id) {
        const el = id.nodeType ? id : document.getElementById(id);
        this.ctx = el.getContext('2d');
        this.width = this.ctx.canvas.width;  // 获取当前canvas的宽高
        this.height = this.ctx.canvas.height;
        this.rem = this.width / 300; // 比例，使时钟放大时保持外观一直
		this.r = this.width / 2 - 8 * this.rem;
    }
    // 绘制表盘
    drawBg () {
        const ctx = this.ctx;
        this.ctx.save();
        ctx.translate(this.width / 2, this.width / 2);  // 重新映射中心位置到canvas中间，默认是在左上角
        ctx.lineWidth = 6 * this.rem;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#BFBFBF';  // 边框颜色
        ctx.arc(0, 0, this.r, 0.15 * Math.PI, 0.85 * Math.PI, true);
        ctx.stroke();
    }
    // 画刻度
    drawScale () {
        const ctx = this.ctx;
        const num = 23;
        const offset = 0.875 * Math.PI;       // 偏移幅度
        for (var i = 0; i < num; i++) {
            ctx.beginPath();
            ctx.strokeStyle = '#BFBFBF';
            if (i % 2 === 0) {
                ctx.lineWidth = 2;
                ctx.moveTo((this.r - 12 * this.rem) * Math.cos(1.3 * Math.PI / num * i + offset), (this.r - 12 * this.rem) * Math.sin(1.3 * Math.PI / num * i + offset));
            } else {
                ctx.lineWidth = 1;
                ctx.moveTo((this.r - 8 * this.rem) * Math.cos(1.3 * Math.PI / num * i + offset), (this.r - 8 * this.rem) * Math.sin(1.3 * Math.PI / num * i + offset));
            }
            ctx.lineTo(this.r * Math.cos(1.3 * Math.PI / num * i + offset), this.r * Math.sin(1.3 * Math.PI / num * i + offset));
            ctx.stroke();
        }
    }
    // 画刻度
    // drawBgScale
    // 写文字
    drawText () {
        const ctx = this.ctx;
        const num = 23;
        ctx.fillStyle = '#BFBFBF';
        ctx.font = 'normal 14px Microsoft yahei';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.save();
        ctx.rotate(-0.625 * Math.PI);
        for (var i = 0; i < num; i++) {
            ctx.beginPath();
            ctx.strokeStyle = '#BFBFBF';
            if (i % 2 === 0) {
                // 写文字
                ctx.fillText(i * 10, 0, -115);
                ctx.rotate(1.3 * Math.PI * 2 / num);
            }
        }
        ctx.restore();
       // const ctx = this.ctx;
    }
};
