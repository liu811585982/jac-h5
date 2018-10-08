/**
 * 作者：yeshengqiang
 * 时间：2018-03-23
 * 描述：plus.js
 */
import { toNumber, addStyle } from '@/libs/utils';
// 判断沉浸式
let ms;

// plusready
export const plusready = (callback) => {
    if (window.plus) {
        setTimeout(() => {
            callback && callback(window.plus);
        }, 0);
    } else {
        document.addEventListener('plusready', function () {
            callback && callback(window.plus);
        }, false);
    }
};

// immersed 生成沉浸式样式
export const immersed = () => {
    plusready((plus) => {
        let immersed = 0;
        ms = ms || (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
		if (ms && ms.length >= 3) {
            immersed = toNumber(ms[2]);
        }
        if (!immersed) return;
        const styleText = [
            `.v-immersed{padding-top: ${immersed}px;}.v-immersed-mt{margin-top: ${immersed}px;}`
        ];
        addStyle(styleText);
    });
};

// 关闭启动界面
export const closeSplashscreen = () => {
    plusready((plus) => {
        plus.navigator.hasSplashscreen() && plus.navigator.closeSplashscreen();
    });
};

// 推送push
export const push = {
    Initialize: false,
    init (callback) {
        this.Initialize = true;
        plusready((plus) => {
            plus.push.addEventListener('click', callback, false);
        });
    },
    add (content, payload, callback) {
        if (!this.Initialize) {
            this.init(callback);
        }
        plusready((plus) => {
            plus.push.createMessage(content, payload);
        });
    }
};

// checkNetWork
export const checkNetWork = () => {
    if (window.plus) return Promise.resolve(plus.networkinfo.CONNECTION_NONE === plus.networkinfo.getCurrentType());
    return new Promise((resolve, reject) => {
        plusready((plus) => {
            resolve(plus.networkinfo.CONNECTION_NONE === plus.networkinfo.getCurrentType());
        });
    });
};
