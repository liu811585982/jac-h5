/**
 * 作者：yeshengqiang
 * 时间：2018-07-11
 * 描述：权限检测
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .promise-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        overflow: hidden;
        .promise-body {
            flex: 1;
            padding: px2rem(15);
            .promise-body-item {
                margin: 0 px2rem(15);
            }
        }
    }
</style>
<template>
    <div class="promise-panel">
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <section class="promise-body">
            <h3>权限状态</h3>
            <x-button class="promise-body-item" @click.native="fnPosition(item.permission, item.name)" v-for="(item, index) in list" :key="index" mini type="primary">{{item.name}}</x-button>
        </section>
        <section class="promise-body">
            <h3>测试功能</h3>
            <x-button class="promise-body-item" @click.native="test(item.methods)" v-for="(item, index) in testList" :key="index" mini type="primary">{{item.name}}</x-button>
        </section>
    </div>
</template>
<script>
    import { XButton } from 'vux';
    import { plusready } from '@/libs/plus';

    export default {
        name: 'promise',
        components: { XButton },
        data () {
            return {
                testList: [
                    {
                        name: '相机',
                        methods: 'photo'
                    },
                    {
                        name: '相册',
                        methods: 'read_'
                    },
                    {
                        name: '定位',
                        methods: 'location'
                    },
                    {
                        name: '电话plus',
                        methods: 'callPhone'
                    },
                    {
                        name: '电话原生',
                        methods: 'callPhone1'
                    }
                ],
                list: [
                    {
                        name: '相机',
                        permission: 'CAMERA'
                    },
                    {
                        name: '读取',
                        permission: 'READ_EXTERNAL_STORAGE'
                    },
                    {
                        name: '写入',
                        permission: 'WRITE_EXTERNAL_STORAGE'
                    },
                    {
                        name: '网络定位',
                        permission: 'ACCESS_COARSE_LOCATION'
                    },
                    {
                        name: 'GPS定位',
                        permission: 'ACCESS_FINE_LOCATION'
                    },
                    {
                        name: '电话',
                        permission: 'CALL_PHONE'
                    }
                ]
            };
        },
        methods: {
            photo () {
                plusready((plus) => {
                    let cmr = plus.camera.getCamera();
                    cmr.captureImage((p) => {
                        // 读取拍照文件
                        plus.io.resolveLocalFileSystemURL(p, (entry) => {
                            alert(JSON.stringify(entry));
                        }, (e) => {
                            this.$toast({
                                message: '读取拍照文件错误：' + e.message,
                                position: 'bottom'
                            });
                        });
                    }, (e) => {
                        let message = '失败：' + e.message;
                        if (e.code === 11) {
                            message = '请先开启摄像头权限';
                        }
                        this.$toast({
                            message: message,
                            position: 'bottom'
                        });
                    }, {filename: '_doc/camera/', index: 1});
                });
            },
            // 相册
            read_ () {
                plusready((plus) => {
                    plus.gallery.pick((path) => {
                        alert(JSON.stringify(path));
                    }, (e) => {
                        this.$toast({
                            message: '取消选择图片',
                            position: 'bottom'
                        });
                    }, {filter: 'image'});
                });
            },
            // 定位
            location () {
                plusready((plus) => {
                    plus.geolocation.getCurrentPosition((p) => {
                        alert('Geolocation\nLatitude:' + p.coords.latitude + '\nLongitude:' + p.coords.longitude + '\nAltitude:' + p.coords.altitude);
                    }, (e) => {
                        alert('Geolocation error: ' + e.message);
                    });
                });
            },
            // 拨打电话
            callPhone () {
                plusready((plus) => {
                    plus.device.dial('15623595054', true);
                    // const Context = plus.android.runtimeMainActivity();
                    // var Intent = plus.android.importClass('android.content.Intent');
                    // var parse = plus.addroid.invoke('android.net.Uri', 'parse', `tel:${phone}`);
                    // var intent = new Intent('android.intent.action.DIAL', parse);
                    // Context.startActivity(intent);
                });
            },
            // 拨打电话
            callPhone1 () {
                plusready((plus) => {
                    var Intent = plus.android.importClass('android.content.Intent');
                    var Uri = plus.android.importClass('android.net.Uri');
                    // 获取主Activity对象的实例
                    var main = plus.android.runtimeMainActivity();
                    // 创建Intent
                    var uri = Uri.parse(`tel:15623595054`); // 这里可修改电话号码
                    var call = new Intent('android.intent.action.DIAL', uri);
                    // 调用startActivity方法拨打电话
                    main.startActivity(call);
                });
            },
            test (fn) {
                this[fn]();
            },
            // 权限状态
            fnPosition (permission) {
                const Context = plus.android.runtimeMainActivity();
                const res = plus.android.invoke('android.support.v4.app.ActivityCompat', 'checkSelfPermission', Context, `android.permission.${permission}`);
                let str = '';
                switch (+res) {
                    case 0 :
                        str = '开启';
                        break;
                    default :
                        str = '禁止/询问';
                        break;
                }
                plus.nativeUI.alert(`已${str}权限`);
            }
        }
    };
</script>
