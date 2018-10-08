/**
 * 作者：yeshengqiang
 * 时间：2018-06-26
 * 描述：websql.js
 */

import { isEmpty } from '@/libs/utils';

// 转换
const getFields = (opt) => {
    let str = '';
    for (let i in opt) {
        if (i !== undefined) {
            str += `${i} ${opt[i]},`;
        }
    }
    return str.replace(/,$/, '');
};

// 转换
const argToArr = (opt, arr) => {
    opt.mobile = JSON.parse(window.localStorage.getItem('loginInfo')).mobile;
    return arr.map(item => {
        return opt[item] || null;
    });
};

const apiFormat = (str, res) => {
    let reg = /\{(\w+?)\}/gi;
    return str.replace(reg, ($0, $1) => {
        return res[$1];
    });
};

const dbConf = {
    dbName: 'jacApp',
    dbVersion: '1.00',
    dbDesc: '江淮APP数据库',
    dbSize: 5 * 1024 * 1024
};

const DbTableConfig = {
    dbStructure: {
        PushMessage: {
            id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
            pid: 'Integer',
            title: 'TEXT',
            type: 'TEXT',
            mobile: 'TEXT',
            overview: 'TEXT',
            content: 'TEXT',
            status: 'TEXT', // (read, unread)
            issueName: 'TEXT',
            issueTime: 'DATETIME'
        }
    },
    dao: {
        addPushMessage: {
            sql: 'INSERT INTO PushMessage (pid,title,type,mobile,overview,content,status,issueName,issueTime) values (?,?,?,?,?,?,?,?,?)',
            args: ['pid', 'title', 'type', 'mobile', 'overview', 'content', 'status', 'issueName', 'issueTime']
        },
        getAllPushMessage: {
            sql: 'select * from PushMessage where 1=1',
            args: []
        },
        selectByStatus: {
            sql: 'select * from PushMessage where 1=1 and mobile=? and status=? order by issueTime desc',
            args: ['mobile', 'status']
        },
        selectByissueTime: {
            sql: 'select * from PushMessage where 1=1 and mobile=? order by status desc, issueTime desc Limit {start},{end}',
            args: ['mobile']
        },
        selectByissueTimeType: {
            sql: 'select * from PushMessage where 1=1 and mobile=? and type=? order by status desc, issueTime desc Limit {start},{end}',
            args: ['mobile', 'type']
        },
        selectAllCountByType: {
            sql: 'select count(id) as total from PushMessage where mobile=? and type=?',
            args: ['mobile', 'type']
        },
        selectAllCount: {
            sql: 'select count(id) as total from PushMessage where mobile=?',
            args: ['mobile']
        },
        selectById: {
            sql: 'select * from PushMessage where mobile=? and id=?',
            args: ['mobile', 'id']
        },
        updateStatus: {
            sql: 'UPDATE PushMessage SET status=? where mobile=? and id=?',
            args: ['status', 'mobile', 'id']
        },
        selectByTypeRead: {
            sql: 'select count(id) as total from PushMessage where 1=1 and mobile=? and status="unread" and type=?',
            args: ['mobile', 'type']
        }
    }
};

// 导出websql
const websql = {
    dbSession: null,
    _initDataBase () {
        const localDBVersion = window.localStorage.getItem('database__version');
        if (!isEmpty(localDBVersion) && localDBVersion < dbConf.dbVersion) {
            for (let i in DbTableConfig.dbStructure) {
                this._deleteTable(i, DbTableConfig.dbStructure[i]);
            }
        }

        window.localStorage.setItem('database__version', dbConf.dbVersion);

        for (let i in DbTableConfig.dbStructure) {
            this._creatTable(i, DbTableConfig.dbStructure[i]);
        }
    },
    _creatTable (name, structure) {
		this._execSql(
            `create table if not exists ${name} (${getFields(structure)})`, [],
            function (tx, result) {
				console.log('创建' + name + '表成功');
			}, function (tx, error) {
				console.log('创建' + name + '表失败:' + error.message);
			});
    },
    _OpenDbase () {
        if (!dbConf.dbName || !dbConf.dbVersion) return;
        const size = dbConf.dbSize || 5 * 1024 * 1024;
		try {
			this.dbSession = window.openDatabase(dbConf.dbName, dbConf.dbVersion, dbConf.dbDesc, size);
			this._initDataBase(this.dbSession);
		} catch (e) {
			console.error(e);
		}
    },
    _exec (operation, opts, callback) {
        try {
            this._execSql(operation.sql, argToArr(opts, operation.args),
            function (tx, result) {
                callback({ result: 0, responseData: result });
            },
            function (tx, error) {
                callback({ result: 1, responseData: error });
            });
        } catch (e) {
            console.log(e);
        }
    },
    _execByPage (operation, pageObj, opts, callback) {
        try {
            let page = {};
            page.start = (pageObj.pageNo - 1) * pageObj.pageSize;
            page.end = pageObj.pageSize;
            this._execSql(apiFormat(operation.sql, page), argToArr(opts, operation.args),
            function (tx, result) {
                callback({ result: 0, responseData: result });
            },
            function (tx, error) {
                callback({ result: 1, responseData: error });
            });
        } catch (e) {
            console.log(e);
        }
    },
    _execSql (...args) {
        if (!this.dbSession) {
            this._OpenDbase();
        }
        this.dbSession.transaction((tx) => {
            // sql, arr, scb, fcb
            tx.executeSql.apply(tx, args);
        });
    },
    _deleteTable (name) {
        this._execSql(
            `DROP TABLE IF EXISTS ${name}`, [],
            function (tx, result) {
                console.log('刪除' + name + '表成功');
            },
            function (tx, error) {
                console.log('刪除' + name + '表失败:' + error.message);
            });
    }
};

// 导出innerface
// 新增
export const addPushMessage = (options, callback) => {
    websql._exec(DbTableConfig.dao.addPushMessage, options, callback);
};

// 查询数据库里面所有消息
export const getAllPushMessage = (options, callback) => {
    websql._exec(DbTableConfig.dao.getAllPushMessage, options, callback);
};

// 查询未读信息
export const selectByStatus = (options, callback) => {
    websql._exec(DbTableConfig.dao.selectByStatus, options, callback);
};

// 更新状态
export const updateStatus = (options, callback) => {
    websql._exec(DbTableConfig.dao.updateStatus, options, callback);
};

// 根据id获取
export const selectById = (options, callback) => {
    websql._exec(DbTableConfig.dao.selectById, options, callback);
};

// 根据type获取未读
export const selectByTypeRead = (options, callback) => {
    websql._exec(DbTableConfig.dao.selectByTypeRead, options, callback);
};

// 根据时间及未读排序
export const selectByissueTimePage = (pageObj, options, callback) => {
    let operation = options.type ? DbTableConfig.dao.selectByissueTimeType : DbTableConfig.dao.selectByissueTime;
    websql._execByPage(operation, pageObj, options, function (response) {
        if (response.result === 0) {
            let data = [];
            for (let i = 0; i < response.responseData.rows.length; i++) {
                data.push(response.responseData.rows.item(i));
            }
            let dao = options.type ? DbTableConfig.dao.selectAllCountByType : DbTableConfig.dao.selectAllCount;
            websql._exec(dao, options, function (response) {
                if (response.result === 0) {
                    const totalPage = Math.ceil(response.responseData.rows.item(0).total / pageObj.pageSize);
                    callback({dataList: data, totalPage, currentPage: pageObj.pageNo});
                }
            });
        }
    });
};
