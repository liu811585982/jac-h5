/**
 * 作者：yeshengqiang
 * 时间：2018-07-06
 * 描述：checkUpdate.js
 */

 import { imgHttp } from '@/libs/config';
 import { plusready } from '@/libs//plus';
 import { appVersion } from '@/services/setting/settingService';

 const update = (type, uploadPath) => {
    if (type === 1) { // ios更新
        // document.location.href = 'https://itunes.apple.com/cn/app/san-gu-hui/id131812xxxx?mt=8';
        document.location.href = 'https://www.pgyer.com/pGU2';
    } else if (type === 2) { // android 更新
        this.$indicator.open('正在下载中，请稍后！');
        const apkUrl = imgHttp + uploadPath;
        const dtask = plus.downloader.createDownload(apkUrl, {}, function (d, status) {
            this.$indicator.close();
            if (status === 200) {
                const path = d.filename;// 下载apk
                plus.runtime.install(path); // 自动安装apk文件
            } else {
                plus.nativeUI.alert('版本更新失败:' + status);
            }
        });
        dtask.start();
    }
 };

 export default {
    methods: {
        checkUpdate (immediate) {
            plusready((plus) => {
                plus.runtime.getProperty(plus.runtime.appid, async (inf) => {
                    const curVersion = inf.version;
                    try {
                        const ua = navigator.userAgent.toLowerCase();
                        const opt = {};
                        if (/iphone|ipad|ipod/.test(ua)) {
                            opt.versionType = 1;
                        } else if (/android/.test(ua)) {
                            opt.versionType = 2;
                        }
                        const result = await appVersion(opt);
                        if (!result || !result.data) {
                            this.$toast({
                                message: '暂未获取到版本信息',
                                position: 'bottom'
                            });
                            return;
                        }
                        const latestVersion = result.data.versionNo || 0;
                        const curVersionNo = parseInt(curVersion.replace(/[^\d]/g, ''));
                        const isCompulsion = result.data.isCompulsion || 0; // 是否强制更新
                        const uploadPath = result.data.attachmentPath;

                        if (latestVersion > curVersionNo) {
                            if (immediate && isCompulsion === 1) {
                                this.$messagebox.alert('可用更新版本' + result.data.versionName + '，请更新', '').then(() => {
                                    update(opt.versionType, uploadPath);
                                });
                            } else if (!immediate || isCompulsion === 0) {
                                this.$messagebox({
                                    title: '',
                                    message: '可用更新版本' + result.data.versionName,
                                    showCancelButton: true,
                                    confirmButtonText: '升级'
                                }).then((action) => {
                                    if (action === 'confirm') {
                                        update(opt.versionType, uploadPath);
                                    }
                                });
                            }
                        } else {
                            if (!immediate) {
                                this.$messagebox.alert('当前已是最新版本');
                            }
                        }
                    } catch (e) {
                        this.$toast({
                            message: e.message,
                            position: 'bottom'
                        });
                    }
                }, (e) => {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                });
            });
        }
    }
 };
