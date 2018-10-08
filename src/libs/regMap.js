
/**
 * 作者：yeshengqiang
 * 时间：2018-03-29
 * 描述：regExp
 */

 export default {
    phone: /^1[35678]\d{9}$/,             // 电话号码
    // 车牌号检验
    plateNo: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
    nickName: /^[\w\u4e00-\u9fa5]{4,16}$/,      // 昵称
    password: /^[a-zA-Z](?=.*?\d)[^\s/•¥£€\\]{5,17}$/,
    chineseName: /^[\u4e00-\u9fa5]{2,5}$/,       // 中文姓名
    identityCard: /^\d{15}$|^\d{17}(\d|X|x)$/,   // 身份证号,
    qq: /^[1-9][0-9]{4,17}$/, // QQ
    email: /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/,   // 电子邮箱
    emoji: /(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f])|(\ud83d[\ude80-\udeff])/                              // 匹配emoji表情
 };
