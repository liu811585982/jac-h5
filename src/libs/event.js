/**
 * 作者：yeshengqiang
 * 时间：2018-05-07
 * 描述：事件订阅
 */

export default class EventMsg {
    constructor () {
        this.handles = {};
    };
    $emit () {
        let len = arguments.length;
        if (!len) return;
        let list = this.handles[arguments[0]];
        if (len > 1) {
            var args = ([]).slice.call(arguments, 1);
        }
        if (list) {
            list.forEach(function (item) {
                item.apply(event, args || []);
            });
        }
    };
    $once (name, cb) {
        this.handles[name] = this.handles[name] || [];
        this.handles[name] = [cb];
    };
    $on (name, cb) {
        this.handles[name] = this.handles[name] || [];
        this.handles[name].push(cb);
    };
    $off (name, cb) {
        let list = this.handles[name];
        if (list) {
            list.forEach(function (item, index) {
                if (item === cb) {
                    list.splice(index, 1);
                }
            });
        }
    };
};
