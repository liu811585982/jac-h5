/**
 * 作者：yeshengqiang
 * 时间：2018-03-21
 * 描述：utils.js
 */

 const hasOwnProperty = Object.prototype.hasOwnProperty;
 const _slice = ([]).slice;
 /**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
};

 // 判断类型
 export const _typeOf = (target) => {
     return ({}).toString.call(target).replace(/\[object\s+(\w+?)\]/i, '$1').toLowerCase();
 };

 // 判断是否为native方法
 export const isNative = (fn) => {
    return typeof fn === 'function' && /native code/.test(fn.toString());
 };

 // toNumber
 export const toNumber = (num) => {
     const val = parseFloat(num);
     return isNaN(val) ? num : val;
 };

 // toArray  like Array
 export const toArray = (likeArr) => {
    return _slice.call(likeArr);
 };

 // createElement
 export const createElement = (target, attrs = {}) => {
    if (!target) return;
    let el = document.createElement(target);
    for (let i in attrs) {
        if (hasOwnProperty.call(attrs, i)) {
            el.setAttribute(i, attrs);
        }
    }
    return el;
 };

 // addStyle
 export const addStyle = (styleText) => {
    let style = createElement('style');
    styleText = styleText.join('\n');
    if ('styleSheet' in style) {
        style.setAttribute('type', 'text/css');
        style.styleSheet.cssText = styleText;
    } else {
        style.innerHTML = styleText;
    }
    document.head.appendChild(style);
 };

 // 判断是否是手机号
 export const isPhone = (val) => {
    let reg = /^1[345678][0-9]{9}$/;
    return reg.test(val);
};

 // hasOwn
 export const hasOwn = (target, i) => {
    return hasOwnProperty.call(target, i);
 };

 // unique
 export const unique = (arr) => {
    let list = [];
    let tempObj = {};
    arr.forEach(item => {
        if (!tempObj[item]) {
            list.push(item);
            tempObj[item] = true;
        }
    });
    return list;
 };

 // compare 用于 sort
 export const compare = (props = '') => {
     return (a, b) => {
        let objA = (a.constructor === Object) ? a[props] : a;
        let objB = (b.constructor === Object) ? b[props] : b;
        return objA - objB;
     };
 };

 //  maxContinuousLengthformEnd
 export const maxContinuousLengthformEnd = (arr) => {
    let len = arr.length;
    if (!len) return 0;
    let lastVal = arr[len - 1];
    let maxLength = 1;
    while (len--) {
        if (+lastVal - +arr[len - 1] === 1) {
            maxLength++;
            lastVal = arr[len - 1];
        }
    }
    return maxLength;
 };

 // 判断是否为对象
 export const isObject = (obj) => {
    return obj !== null && typeof obj === 'object';
 };

 // error
 export const error = (msg) => {
    /* eslint valid-typeof: "error" */
    const hasConsole = typeof console !== void 0;
    if (hasConsole) {
        console.error(`[app warn]: ${msg}`);
    }
 };

 // 供qs使用
 export const qsStringify = (obj) => {
    if (!isObject(obj)) return null;
    let str = '';
    for (let i in obj) {
        str += `${obj[i]}&`;
    }
    return str.replace(/&$/, '');
 };

 // isEmptyObj
 export const isEmptyObj = (obj) => {
    if (!isObject(obj)) return null;
    let status = true;
    for (let i in obj) {
        if (hasOwn(obj, i)) {
            status = false;
            break;
        }
    }
    return status;
 };

 // formateDate
 export const formateDate = function (date, fmt) { // author: meizz
    if (!date) return null;
    if (typeof date === 'string') {
        date = date.replace(/-/g, '/');
    }
    date = new Date(date);
    var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))); }
    return fmt;
};

// toISOString
export const toISOString = (time) => {
    const offset = new Date().getTimezoneOffset() / 60;
    return new Date(+new Date(time) - offset * 3600 * 1000).toISOString();
};

// isEmpty
export const isEmpty = (target) => {
    /* eslint valid-typeof: "error" */
    if (target === null || target === void 0 || target === '') {
        return true;
    }
    return false;
};

// 函数防抖
export const debounce = (idle, action) => {
    var timer = null;
	return () => {
		let args = arguments;
		let that = this;
		if (timer) {
			clearTimeout(timer);
			timer = null;          // 提高效率
		}
		timer = setTimeout(() => {
			action && action.apply(that, args);
		}, idle);
	};
};

// deepCopy
export const deepCopy = (obj, cache = []) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    const hit = cache.filter(c => c.original === obj)[0];
    if (hit) {
        return hit.copy;
    }
    const copy = Array.isArray(obj)
                    ? []
                    : {};
    cache.push({
        original: obj,
        copy
    });

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache);
    });
    return copy;
};

// 判断是否为number
export const ensureNumber = (n) => {
    return (typeof n === 'number' && !isNaN(n));
};

// noop
export const noop = () => {};

export const _eval = function (str) {
    const Fn = Function;
    return new Fn(`return ${str}`)();
};

export const phoneFormat = function (phone, split) {
    const reg = /^(\d{3})(\d{4})(\d{4})$/;
    const matches = reg.exec(phone);
    const newPhone = matches[1] + split + matches[2] + split + matches[3];
    return newPhone;
};

// 判断是否为int类型
export const isInt = (num) => {
    if (!ensureNumber(num)) {
        console.error('[isInt] num must be number');
        return;
    }
    return /^\d+$/.test(num);
};

// int 类型不需要进制
export const _toFixed = (val, n) => {
    return isInt(val)
                ? val
                : val.toFixed(n || 2);
};

// 日期转换为时间戳
export const dateToTimeStamp = (str) => {
    if (_typeOf(str) === 'string') {
        str = str.replace(/-/g, '/');
    }
    return +new Date(str);
};

export const to2Num = (num) => {
    return num < 10 ? '0' + num : '' + num;
};

// 判断DOM是否包含
export const isDOMContains = (refEle, ele) => {
    if (typeof refEle.contains === 'function') {
        return refEle.contains(ele);
    }

    if (typeof refEle.compareDocumentPosition === 'function') {
        return !!(refEle.compareDocumentPosition(ele) & 16);
    }

    let node = ele.parentNode;
    do {
        if (node === refEle) {
            return true;
        } else {
            node = node.parentNode;
        }
    } while (node !== null);
    return false;
};
