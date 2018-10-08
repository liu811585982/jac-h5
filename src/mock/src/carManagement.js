/**
 * 作者：yeshengqiang
 * 时间：2018-03-26
 * 描述：车辆列表
 */
import { MockJS, mockApi } from '../config.js';

mockApi.onGet('/carList').reply(args => {
    return new Promise((resolve, reject) => {
        let params = args.params;
        let pageSize = params.pageSize || 10;
        let result = MockJS.mock({
            [`list|${pageSize}`]: [
                {
                    'license': /^[云鄂京广豫粤津渝黑苏浙闽湘赣鲁][A-E][0-9][A-E][0-9][A-E][0-9]/,
                    'name': '@ctitle(3,5)',
                    'series': /[A-Z]/,
                    'seriesName': function () {
                        return `${this.name.slice(1)}${this.series}系`;
                    },
                    'color|1': ['蓝色', '红色', '白色', '咖啡色', '黄色', '绿色', '黑色', '橙色'],
                    'id|3': /\w{5,8}/
                }
            ]
        });
        setTimeout(() => {
            resolve([200, {
                code: 0,
                data: result.list
            }]);
        }, 3000);
    });
});
