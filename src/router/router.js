/**
 * 作者：yeshengqiang
 * 时间：2017-11-01
 * 描述：路由文件
 */
import _import from './_import.js';

/* **************** app ***************** */
// text
const text = _import('text/text');

// promise
const promise = _import('text/h5plus/promise');

// login
const login = _import('login/login');

// 设置密码
const password = _import('login/password/password');

// selectRole 选择角色
const selectRole = _import('selectRole/selectRole');

// 司机注册
const driverRegister = _import('login/driverRegister/driverRegister');

// forgetPassword 忘记密码
const forgetPassword = _import('forgetPassword/forgetPassword');

// main
const main = _import('main/main');

// adDetail
const adDetail = _import('main/adDetail');

// // 个人中心
const userCenter = _import('main/userCenter/userCenter');
const sign = _import('main/userCenter/sign/sign');
const score = _import('main/userCenter/score/score');
const personalInfo = _import('main/userCenter/personalInfo/personalInfo');
// 修改个人信息
const updatePersonalInfo = _import('main/userCenter/personalInfo/updatePersonalInfo/updatePersonalInfo');
const updatePhoto = _import('main/userCenter/personalInfo/updatePhoto/updatePhoto');
const updatePassword = _import('main/userCenter/updatePassword/updatePassword');
const motorcade = _import('main/userCenter/motorcade/motorcade');
const motorcadeEdit = _import('main/userCenter/motorcade/motorcadeEdit/motorcadeEdit');

// 消息中心
const message = _import('main/message/message');
const msgDetail = _import('main/message/detail');

// ************** 设置
const setting = _import('main/setting/setting');
// 关于我们
const about = _import('main/setting/about');
const copyright = _import('main/setting/children/copyright');
const contactUs = _import('main/setting/children/contactUs');
const privacyPolicy = _import('main/setting/children/privacyPolicy');
const userPolicy = _import('main/setting/children/userPolicy');

// car 车辆管理
const carManagement = _import('main/carManagement/carManagement');
const carModify = _import('main/carManagement/children/modify');
const carDetail = _import('main/carManagement/children/detail');

// // 图片文件裁剪
// const imgClipping = _import('main/userCenter/imgClipping/imgClipping');

// **************司机管理**************
// 司机列表
const driver = _import('main/driver/driver');
// 司机详情
const driverDetail = _import('main/driver/driverDetail/driverDetail');
// 司机信息编辑
const driverEdit = _import('main/driver/driverEdit/driverEdit');

// ************** 报警管理
const alarmManagement = _import('main/alarmManagement/alarmManagement');
// 报警统计
const alarmStatistical = _import('main/alarmManagement/alarmStatistical/alarmStatistical');
// 报警查询
const alarmQuery = _import('main/alarmManagement/alarmQuery/alarmQuery');
const alarmDetail = _import('main/alarmManagement/alarmQuery/detail/detail');

// ************** 维修保养**************
const appoint = _import('main/appoint/appoint');
// 预约
const reservation = _import('main/appoint/reservation/reservation');
// 预约新增
const reservationAdd = _import('main/appoint/reservation/add/add');
// 预约详情
const reservationDetail = _import('main/appoint/reservation/detail/detail');
// 维保
const maintenance = _import('main/appoint/maintenance/maintenance');
// 维保详情
const maintenanceDetail = _import('main/appoint/maintenance/detail/detail');

// ************** 车辆体检
const carCheckup = _import('main/carCheckup/carCheckup');
// 故障统计
const faultStatistical = _import('main/carCheckup/faultStatistical/faultStatistical');
// 故障历史
const faultHistory = _import('main/carCheckup/faultHistory/faultHistory');
// 故障查询
const faultQuery = _import('main/carCheckup/faultQuery/faultQuery');
// 故障详情
const faultDetail = _import('main/carCheckup/faultQuery/detail');

// ************** 服务站
const serviceStation = _import('main/serviceStation/serviceStationQuery');
const serviceStationDetail = _import('main/serviceStation/children/detail');
const serviceStationPosition = _import('main/serviceStation/children/position');

// ************** 车辆监控**************
const carMonitoring = _import('main/carMonitoring/carMonitoring');
// 实时数据
const realTime = _import('main/carMonitoring/realTime/realTime');
// 实时定位
const positioning = _import('main/carMonitoring/positioning/positioning');
// 历史轨迹
const history = _import('main/carMonitoring/history/history');

// ************** 【车队】报表统计
const report = _import('main/report/report');
// 里程统计
const mileage = _import('main/report/mileage/mileage');
// 油耗统计
const Fuel = _import('main/report/Fuel/Fuel');
// 油耗统计详情
const FuelDetail = _import('main/report/Fuel/detail');
// 驾驶时长
const drivingTime = _import('main/report/drivingTime/drivingTime');
// 事件统计
const _event = _import('main/report/event/event');

// 车队报表
const fleetReport = _import('main/fleetReport/fleetReport');

// **************** 货源信息
const goodsSupply = _import('main/goodsSupply/goodsSupply');
const goodsList = _import('main/goodsSupply/children/list');
const goodsApply = _import('main/goodsSupply/children/apply');
const goodsState = _import('main/goodsSupply/children/state');
const goodsDetail = _import('main/goodsSupply/children/detail');
const goodsMap = _import('main/goodsSupply/children/goodsMap');

// **************** 积分商城
const integralMall = _import('main/integralMall/integralMall');
const exchangeRecord = _import('main/integralMall/exchangeRecord');
const integralHome = _import('main/integralMall/integralHome');
const goodsCategory = _import('main/integralMall/goodsCategory');
const goodsCateDetail = _import('main/integralMall/goodsCateDetail');
const integralRules = _import('main/integralMall/integralRules');
const myOrders = _import('main/integralMall/myOrders');
const orderDetail = _import('main/integralMall/orderDetail');
const myCoupons = _import('main/integralMall/myCoupons');
// **************** 卡友论坛
const bbs = _import('main/bbs/bbs');

// **************** 体检下发
const medical = _import('main/medical/medical');
const diagnosis = _import('main/medical/diagnosis');

// **************** 线路管理
const lineManage = _import('main/lineManage/lineManage');
const lineManageAdd = _import('main/lineManage/lineManageAdd');
const lineManageDetail = _import('main/lineManage/lineManageDetail');

// **************** 驾驶月报
const driveReport = _import('main/driveReport/driveReport');
const driveReportDetail = _import('main/driveReport/driveReportDetail');

export default [
    {
        path: '',
        redirect: '/login'
    },
    {
        name: 'text',
        path: '/text',
        component: text,
        meta: {
            title: '测试页面'
        }
    },
    {
        name: 'promise',
        path: '/promise',
        component: promise,
        meta: {
            title: '权限页面'
        }
    },
    {
        name: 'login',
        path: '/login',
        component: login
    },
    {
        name: 'selectRole',
        path: '/selectRole',
        component: selectRole,
        meta: {
            title: '选择角色'
        }
    },
    {
        name: 'setPassword',
        path: '/login/password',
        component: password,
        meta: {
            title: '设置密码'
        }
    },
    {
        name: 'forgetPassword',
        path: '/forgetPassword',
        component: forgetPassword,
        meta: {
            title: '找回密码'
        }
    },
    {
        name: 'driverRegister',
        path: '/login/driverRegister',
        component: driverRegister,
        meta: {
            title: '司机注册'
        }
    },
    {
        name: 'main',
        path: '/main',
        component: main,
        meta: {
            title: '江淮'
        },
        children: [
            {
                path: 'userCenter',
                component: userCenter,
                name: '个人中心'
            }
        ]
    },
    {
        name: 'adDetail',
        path: '/main/adDetail',
        component: adDetail,
        meta: {
            title: '广告详情'
        }
    },
    {
        name: 'sign',
        path: '/main/userCenter/sign',
        component: sign,
        meta: {
            title: '签到'
        }
    },
    {
        name: 'score',
        path: '/main/userCenter/score/score',
        component: score,
        meta: {
            title: '积分记录'
        }
    },
    {
        name: 'personalInfo',
        path: '/main/userCenter/personalInfo',
        component: personalInfo,
        meta: {
            title: '个人信息'
        }
    },
    {
        name: 'updatePersonalInfo',
        path: '/main/userCenter/personalInfo/updatePersonalInfo',
        component: updatePersonalInfo,
        meta: {
            title: '个人信息'
        }
    },
    {
        name: 'updatePhoto',
        path: '/main/userCenter/personalInfo/updatePhoto',
        component: updatePhoto,
        meta: {
            title: '上传头像'
        }
    },
    {
        name: 'updatePassword',
        path: '/main/userCenter/updatePassword',
        component: updatePassword,
        meta: {
            title: '修改密码'
        }
    },
    {
        name: 'motorcade',
        path: '/main/userCenter/motorcade',
        component: motorcade,
        meta: {
            title: '车队管理'
        }
    },
    {
        name: 'motorcadeEdit',
        path: '/main/userCenter/motorcade/motorcadeEdit',
        component: motorcadeEdit,
        meta: {
            title: '详细地址'
        }
    },
    {
        name: 'message',
        path: '/main/message',
        component: message,
        meta: {
            title: '消息中心'
        }
    },
    {
        name: 'mesDetail',
        path: '/main/message/detail',
        component: msgDetail,
        meta: {
            title: '详情'
        }
    },
    {
        name: 'setting',
        path: '/main/setting',
        component: setting,
        children: [
            {
                name: 'about',
                path: 'about',
                component: about
            },
            {
                name: 'copyright',
                path: 'about/copyright',
                component: copyright
            },
            {
                name: 'privacyPolicy',
                path: 'about/privacyPolicy',
                component: privacyPolicy
            },
            {
                name: 'userPolicy',
                path: 'about/userPolicy',
                component: userPolicy
            },
            {
                name: 'contactUs',
                path: 'about/contactUs',
                component: contactUs
            }
        ]
    },
    {
        name: 'carManagement',
        path: '/main/carManagement',
        component: carManagement,
        meta: {
            title: '车辆信息'
        }
    },
    {
        name: 'carModify',
        path: '/main/carManagement/modify',
        component: carModify,
        meta: {
            title: '车辆信息'
        }
    },
    {
        name: 'carDetail',
        path: '/main/carManagement/detail',
        component: carDetail,
        meta: {
            title: '车辆详情'
        }
    },
    {
        name: 'driver',
        path: '/main/driver',
        component: driver,
        meta: {
            title: '司机管理'
        }
    },
    {
        name: 'driverDetail',
        path: '/main/driver/driverDetail',
        component: driverDetail,
        meta: {
            title: '司机信息'
        }
    },
    {
        name: 'driverEdit',
        path: '/main/driver/driverEdit',
        component: driverEdit,
        meta: {
            title: '司机编辑'
        }
    },
    {
        name: 'alarmManagement',
        path: '/main/alarmManagement',
        component: alarmManagement,
        meta: {
            title: '报警管理'
        },
        children: [
            {
                name: 'alarmQuery',
                path: 'alarmQuery',
                component: alarmQuery,
                meta: {
                    title: '报警查询'
                }
            },
            {
                name: 'alarmStatistical',
                path: 'alarmStatistical',
                component: alarmStatistical,
                meta: {
                    title: '报警统计'
                }
            }
        ]
    },
    {
        name: 'alarmDetail',
        path: '/main/alarmManagement/alarmQuery/detail',
        component: alarmDetail,
        meta: {
            title: '报警详情'
        }
    },
    {
        name: 'appoint',
        path: '/main/appoint',
        component: appoint,
        meta: {
            title: '维修保养'
        },
        children: [
            {
                // '预约'
                name: 'reservation',
                path: 'reservation',
                component: reservation,
                meta: {
                    title: '预约'
                }
            },
            {
                // '维保'
                name: 'maintenance',
                path: 'maintenance',
                component: maintenance,
                meta: {
                    title: '维保记录'
                }
            }
        ]
    },
    {
        name: 'reservationAdd',
        path: '/main/appoint/reservation/add',
        component: reservationAdd,
        meta: {
            title: '预约添加'
        }
    },
    {
        name: 'reservationDetail',
        path: '/main/appoint/reservation/detail',
        component: reservationDetail,
        meta: {
            title: '预约详情'
        }
    },
    {
        name: 'maintenanceDetail',
        path: '/main/appoint/maintenance/detail',
        component: maintenanceDetail,
        meta: {
            title: '维保详情'
        }
    },
    {
        name: 'carCheckup',
        path: '/main/carCheckup',
        component: carCheckup,
        meta: {
            title: '车辆体检'
        },
        children: [
            {
                name: 'faultQuery',
                path: 'faultQuery',
                component: faultQuery,
                meta: {
                    title: '故障查询'
                }
            },
            {
                name: 'faultHistory',
                path: 'faultHistory',
                component: faultHistory,
                meta: {
                    title: '故障历史'
                }
            },
            {
                name: 'faultStatistical',
                path: 'faultStatistical',
                component: faultStatistical,
                meta: {
                    title: '故障统计'
                }
            }
        ]
    },
    {
        name: 'faultDetail',
        path: '/main/carCheckup/faultQuery/faultDetail',
        component: faultDetail,
        meta: {
            title: '详情'
        }
    },
    {
        name: 'serviceStation',
        path: '/main/serviceStation',
        component: serviceStation,
        meta: {
            title: '服务站'
        }
    },
    {
        name: 'serviceStationDetail',
        path: '/main/serviceStation/detail',
        component: serviceStationDetail,
        meta: {
            title: '服务站详情'
        }
    },
    {
        name: 'serviceStationPosition',
        path: '/main/serviceStation/position',
        component: serviceStationPosition,
        meta: {
            title: '服务站定位'
        }
    },
    {
        name: 'fleetReport',
        path: '/main/fleetReport',
        component: fleetReport,
        meta: {
            title: '车队报表'
        }
    },
    {
        name: 'carMonitoring',
        path: '/main/carMonitoring',
        component: carMonitoring,
        meta: {
            title: '车辆监控'
        },
        children: [
            {
                // 实时数据
                name: 'realTime',
                path: 'realTime',
                component: realTime,
                meta: {
                    title: '实时数据'
                }
            },
            {
                // 实时定位
                name: 'positioning',
                path: 'positioning',
                component: positioning,
                meta: {
                    title: '实时定位'
                }
            },
            {
                // 历史轨迹
                name: 'history',
                path: 'history',
                component: history,
                meta: {
                    title: '历史轨迹'
                }
            }
        ]
    },
    {
        name: 'report',
        path: '/main/report',
        component: report,
        meta: {
            title: '统计报表'
        },
        children: [
            {
                // '里程统计'
                name: 'mileage',
                path: 'mileage',
                component: mileage,
                meta: {
                    title: '里程统计'
                }
            },
            {
                // '油耗统计'
                name: 'Fuel',
                path: 'Fuel',
                component: Fuel,
                meta: {
                    title: '油耗统计'
                }
            },
            {
                // '驾驶时长'
                name: 'drivingTime',
                path: 'drivingTime',
                component: drivingTime,
                meta: {
                    title: '驾驶时长'
                }
            },
            {
                // '行程统计'
                name: 'event',
                path: 'event',
                component: _event,
                meta: {
                    title: '行程统计'
                }
            }
        ]
    },
    {
        name: 'FuelDetail',
        path: '/main/report/FuelDetail',
        component: FuelDetail,
        meta: {
            title: '油耗统计-详情'
        }
    },
    {
        name: 'goodsSupply',
        path: '/main/goodsSupply',
        component: goodsSupply,
        meta: {
            title: '货源信息'
        },
        children: [
            {
              name: 'goodsList',
              path: 'list',
              component: goodsList,
              meta: {
                  title: '货源信息'
              }
            },
            {
                name: 'goodsApply',
                path: 'apply',
                component: goodsApply,
                meta: {
                    title: '申请'
                }
            },
            {
                name: 'goodsState',
                path: 'state',
                component: goodsState,
                meta: {
                    title: '申请进度'
                }
            }
        ]
    },
    {
        name: 'goodsDetail',
        path: '/main/goodsSupply/list/detail',
        component: goodsDetail,
        meta: {
            title: '货源详情'
        }
    },
    {
        name: 'goodsMap',
        path: '/main/goodsSupply/list/map',
        component: goodsMap,
        meta: {
            title: '货源地图'
        }
    },
    {
        name: 'goodsMapDetail',
        path: '/main/goodsSupply/list/map/detail',
        component: goodsDetail,
        meta: {
            title: '货源详情'
        }
    },
    {
        name: 'integralHome',
        path: '/main/integralMall',
        component: integralHome,
        meta: {
            title: '积分商城'
        }
    },
    {
        name: 'integralMall',
        path: '/main/integralMall/pointCenter',
        component: integralMall,
        meta: {
            title: '积分商城'
        }
    },
    {
        name: 'exchangeRecord',
        path: '/main/integralMall/pointCenter/exchangeRecord',
        component: exchangeRecord,
        meta: {
            title: '兑换记录'
        }
    },
    {
        name: 'goodsCategory',
        path: '/main/integralMall/goodsCategory',
        component: goodsCategory,
        meta: {
            title: '商品分类'
        }
    },
    {
        name: 'goodsCateDetail',
        path: '/main/integralMall/goodsCategory/detail',
        component: goodsCateDetail,
        meta: {
            title: '商品详情'
        }
    },
    {
        name: 'myOrders',
        path: '/main/integralMall/pointCenter/myOrders',
        component: myOrders,
        meta: {
            title: '我的订单'
        }
    },
    {
        name: 'orderDetail',
        path: '/main/integralMall/pointCenter/myOrders/detail',
        component: orderDetail,
        meta: {
            title: '订单详情'
        }
    },
    {
        name: 'integralRules',
        path: '/main/integralMall/pointCenter/integralRules',
        component: integralRules,
        meta: {
            title: '积分规则'
        }
    },
    {
        name: 'myCoupons',
        path: '/main/integralMall/myCoupons',
        component: myCoupons,
        meta: {
            title: '我的优惠券'
        }
    },
    {
        name: 'bbs',
        path: '/main/bbs',
        component: bbs,
        meta: {
            title: '卡友论坛'
        }
    },
    {
        name: 'diagnosis',
        path: '/main/diagnosis',
        component: diagnosis,
        meta: {
            title: '体检下发'
        }
    },
    {
        name: 'medical',
        path: '/main/medical',
        component: medical,
        meta: {
            title: '体检下发'
        }
    },
    {
        name: 'lineManage',
        path: '/main/lineManage',
        component: lineManage,
        meta: {
            title: '线路管理'
        }
    },
    {
        name: 'lineManageAdd',
        path: '/main/lineManageAdd',
        component: lineManageAdd,
        meta: {
            title: '线路管理'
        }
    },
    {
        name: 'lineManageDetail',
        path: '/main/lineManageDetail',
        component: lineManageDetail,
        meta: {
            title: '详情线路管理'
        }
    },
    {
        name: 'driveReport',
        path: '/main/driveReport',
        component: driveReport,
        meta: {
            title: '驾驶月报'
        }
    },
    {
        name: 'driveReportDetail',
        path: '/main/driveReport/detail',
        component: driveReportDetail,
        meta: {
            title: '月报详情'
        }
    }
];
