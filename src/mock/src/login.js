/**
 * 作者：yeshengqiang
 * 时间：2018-03-23
 * 描述：login.js
 */
import { loginInfo, mockApi } from '../config.js';

mockApi.onGet('/users').reply(args => {
    return new Promise((resolve, reject) => {
        let params = args.params;
        if (params.phone.trim() === loginInfo.phone && params.password.trim() === loginInfo.password) {
            resolve([200, {
                code: 0,
                message: '登录成功！'
            }]);
        } else {
            resolve([200, {
                code: 1,
                message: '登录失败！'
            }]);
        }
    });
});
