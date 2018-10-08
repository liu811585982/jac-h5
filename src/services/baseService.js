/**
 * 作者：yeshengqiang
 * 时间：2017-11-01
 * 描述：基类
 */
import axios from '@/libs/https';

export const fetch = axios;

export const apiFormat = (str, res) => {
    let reg = /\{(\w+?)\}/gi;
    return str.replace(reg, ($0, $1) => {
        return res[$1];
    });
};
