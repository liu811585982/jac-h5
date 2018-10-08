#!/bin/bash
#前端文件打包及选择dcolud配置

BUILD='./dist/';
DIST_DIR='./dist/*';
DCLOUD_DIR='./dcloud_conf/';
confirm='N'
ENV=''
Android='G:/Android/JAC/app/src/main/assets/apps/*';

# 选择环境
function chooseEnv () {
    echo '请选择打包所需环境对应的序号'
    select var in 'test' '120' 'uat' 'prod'; do
        case $var in
            'test')
                ENV='test'
                break ;;
            '120')
                ENV='120'
                break ;;
            'uat')
                ENV='uat'
                break ;;
            'prod')
                ENV='prod'
                break ;;
            *)
                echo -n '请你输入正确的选项序号：'
                continue ;;
            esac
    done
    echo 你选择了服务器：$var
    isContain
}
function isContain () {
    while [[ $confirm != 'Y' && $confirm != 'y' ]]
    do
        read -n1 -p '确认请输入Y/y, 重新选择请输入其他键：' confirm
        if [[ $confirm != 'Y' && $confirm != 'y' ]]
        then
            echo -e '\n';
            chooseEnv
        fi
            echo -e '\n';
        break;
    done
}
# 选择环境
chooseEnv
echo 清空${DIST_DIR}目录
rm -rf ${DIST_DIR}
echo 编译新版本...
npm run build -- $ENV
echo 同步部署配置文件
cp -r ${DCLOUD_DIR}${ENV}/* ${BUILD}
echo 同步完成 （tips: 请打开hbuilder进行打包！）
echo 删除android静态资源文件
rm -rf ${Android}

