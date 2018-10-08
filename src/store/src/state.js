/**
 * 作者：yeshengqiang
 * 时间：2017-07-20
 * 描述：定义states
 */

 export default {
     // 全局公共部分
	pageNo: 1,                          // 当前页
	pageSize: 10,                       // 分页数
    swiperInterval: 4000,               // 首页轮播时间
    adList: [],                         // 广告list
    userInfo: {},                       // 用户信息
    appointInfoState: {},               // 维保信息
    loginInfo: null,                    // 用户名密码
    tokenOverdue: true,                 // 是否过期
    isUpdate: false,                   // 是否检测过更新
    moreSearch: false,                 // 是否展开搜索面板（适用于嵌套路由页面）
    goodsSupplyState: '',               // 货源状态
    rescuePhone: '',
    // 下拉默认配置
    pulldownDefaultConfig: {
        content: '下拉刷新',
        downContent: '下拉刷新',
        upContent: '释放后刷新',
        loadingContent: '正在刷新...'
    },
    // 上拉默认配置
    pullupDefaultConfig: {
        content: '上拉加载更多',
        downContent: '释放后加载',
        upContent: '上拉加载更多',
        loadingContent: '加载中...'
    },
    transition: '',               // 路由切换动画
    // 首页菜单
    mainMenu: [
        {
            icon: 'car_manage',
            label: '车辆管理',
            router: '/main/carManagement',
            role: 'driver,fleet'
        },
        {
            icon: 'main_driver',
            label: '司机管理',
            router: '/main/driver',
            role: 'fleet'
        },
        {
            icon: 'motorcade_report',
            label: '车队报表',
            router: '/main/fleetReport',
            role: 'fleet'
        },
        {
            icon: 'car_monitoring',
            label: '车辆监控',
            router: {
                driver: '/main/carMonitoring/realTime',
                fleet: '/main/carMonitoring/positioning'
            },
            role: 'driver,fleet'
        },
        {
            icon: 'statistical_report',
            label: '统计报表',
            router: '/main/report/mileage',
            role: 'fleet'
        },
        {
            icon: 'alarm_manage',
            label: '报警管理',
            router: '/main/alarmManagement/alarmQuery',
            role: 'driver,fleet'
        },
        {
            icon: 'maintenance',
            label: '维修保养',
            router: '/main/appoint/reservation',
            role: 'driver'
        },
        {
            icon: 'rescue',
            label: '一键救援',
            router: true,
            role: 'driver'
        },
        {
            icon: 'service_station',
            label: '服务站',
            router: '/main/serviceStation',
            role: 'driver'
        },
        {
            icon: 'car_medical',
            label: '车辆体检',
            router: '/main/carCheckup/faultQuery',
            role: 'driver,fleet'
        },
        {
            icon: 'goods',
            label: '货源信息',
            router: '/main/goodsSupply',
            role: 'driver',
            hasBadge: true
        },
        // {
        //     icon: 'integral',
        //     label: '积分商城',
        //     router: '/main/integralMall',
        //     role: 'driver'
        // },
        // {
        //     icon: 'bbs',
        //     label: '卡友论坛',
        //     router: '/main/bbs',
        //     role: 'driver,fleet'
        // },
        {
            icon: 'medical',
            label: '体检下发',
            router: '/main/diagnosis',
            role: 'driver'
        },
        {
            icon: 'lineManage',
            label: '线路管理',
            router: '/main/lineManage',
            role: 'fleet'
        },
        // {
        //     icon: 'lineManage',
        //     label: '权限测试',
        //     router: '/promise',
        //     role: 'fleet, driver'
        // }
        {
            icon: 'driveReport',
            label: '驾驶月报',
            router: '/main/driveReport',
            role: 'driver'
        }
    ],
    colorList: ['#b373fb', '#de4041', '#34c8a1', '#8ee3e8', '#ec4a67', '#ffc100', '#71d50d', '#f87e4f', '#2f82ff', '#5fd170'],
    allDiverList: [],               // 所有车队列表
    allCarModelList: [],            // 所有车型列表
    allCarLengthList: [],           // 所有车长列表
    allCarVanList: [],              // 所有厢型列表
    totalRecode: 0,                 // 用户总积分
    // 允许连续按两次退出app的列表
    plusBackList: ['main', 'login', 'score']
};
