<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .motorcade-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        overflow: hidden;
        .panel-body {
            overflow: auto;
            .info-title {
                padding: 0 $font-size-10;
                background-color: $white;
                margin-bottom: $font-size-10;
                /deep/ .mint-cell-mask {
                    display: none;
                }
                .info-png {
                    width: 2.318rem;
                    height: 2.318rem;
                    border-radius: 50%;
                    display: inline-block;
                    margin: $font-size-10 $font-size-10 $font-size-10 0;
                    box-shadow: 6px 6px 6px #ccc;
                }
            }
            .info-body {
                padding: 0 $font-size-10;
                background-color: $white;
            }
            .btn {
                width: 80%;
                margin: 1.5rem 0 0 10%;
            }
        }
        .motorcade-body {
            flex: 1;
            position: relative;
            overflow: hidden;
            .motorcade-scroller {
                position: absolute;
                @include wh(100%, 100%);
                overflow: auto;
            }
        }
    }
    .section-footer {
        padding: 15px;
    }
</style>
<template>
    <div class="motorcade-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="motorcade-body">
            <div class="motorcade-scroller">
                <group label-width="5em" label-margin-right="2em">
                    <cell title="车队名称" :value="addInfo.motorcadeName"></cell>
                    <cell title="所属经销商" :value="addInfo.parentName"></cell>
                    <cell title="车队类型" :value="addInfo.type | type"></cell>
                    <x-address title="所在地区" v-model="locationDataValue" hide-district @on-hide="handleClose" raw-value :list="locationData"></x-address>
                    <cell @click.native="handleAddressEdit(addInfo.address)" title="详细地址" :value="addInfo.address" align-items="flex-start" is-link></cell>
                </group>
                <group v-if="motorcadeInfo.type === 'personal'">
                    <cell title="身份证照(正面)"></cell>
                    <div class="slide animate">
                        <upload-img :imageUrl="identityFront" svg="idcard_facade" @result="getIdentityFront"></upload-img>
                    </div>
                    <cell title="身份证照(反面)"></cell>
                    <div class="slide animate">
                        <upload-img :imageUrl="identityBack" svg="idcard_negative" @result="getIdentityBack"></upload-img>
                    </div>
                </group>
                <group v-if="motorcadeInfo.type === 'enterprise'">
                    <cell title="证件照"></cell>
                    <div class="slide animate">
                        <upload-img :imageUrl="businessLicensePath" svg="upload_img" @result="getBusinessLicensePath"></upload-img>
                    </div>
                </group>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex';
    import userInfo from '@/mixins/userInfo';
    import { modifyMotorcade, getMotorcade, uploadFileToBusinessLicense, uploadFileToIdentity } from '@/services/userCenter/userCenter';
    import { ViewBox, XButton, Group, Cell, CellBox, PopupPicker, Actionsheet, XAddress, ChinaAddressV4Data } from 'vux';
    import { imgHttp } from '@/libs/config';
    import { uploadImg } from '@/components';

    export default {
        components: { ViewBox, XButton, Group, Cell, CellBox, PopupPicker, Actionsheet, XAddress, uploadImg },
        mixins: [ userInfo ],
        data () {
            return {
                sheetVisible: false,
                actions: [],
                dateType: '',
                locationData: ChinaAddressV4Data,
                locationDataValue: [],
                motorcadeInfo: {},
                identityFront: '',
                identityBack: '',
                businessLicensePath: ''
            };
        },
        computed: mapState({
            addInfo: state => state.motorcade.addInfo
        }),
        mounted () {
            // 获取车队信息
            const id = this.$route.query.id;
            if (id) {
                this.getInfo({id: id});
            }
        },
        methods: {
            ...mapMutations([
                'motorcade/increment'
            ]),
            // 获取详情
            async getInfo (param) {
                try {
                    this.$indicator.open();
                    let result = await getMotorcade(param);
                    this.motorcadeInfo = result.data;
                    this.locationDataValue = [result.data.provinceName, result.data.cityName];
                    this.identityFront = imgHttp + this.motorcadeInfo.identityFront;
                    this.identityBack = imgHttp + this.motorcadeInfo.identityBack;
                    this.businessLicensePath = imgHttp + this.motorcadeInfo.businessLicensePath;

                    this['motorcade/increment'](result.data);
                    this.$indicator.close();
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                    this.$indicator.close();
                }
            },
            async handleClose (val) {
                try {
                    if (!val) return;
                    let res = [];
                    ChinaAddressV4Data.forEach(item => {
                        this.locationDataValue.forEach(im => {
                            if (item.value === im) {
                                res.push(item);
                            }
                        });
                    });
                    this['motorcade/increment']({provinceName: res[0].name, city: res[1].name});
                    await modifyMotorcade(this.addInfo);
                    this.$toast({
                        message: '保存成功',
                        position: 'bottom'
                    });
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            handleAddressEdit (val) {
                this.$router.push({
                    path: '/main/userCenter/motorcade/motorcadeEdit',
                    query: {
                        address: val
                    }
                });
            },
            getIdentityFront (file, next) {
                this.uploadService('identityFront', file, next);
            },
            getIdentityBack (file, next) {
                this.uploadService('identityBack', file, next);
            },
            getBusinessLicensePath (file, next) {
                this.uploadService('businessLicensePath', file, next);
            },
            // 上传图片
            async uploadService (type, file, next) {
                try {
                    let formData = new FormData();
                    formData.append('file', file);
                    // 文件上传
                    let result = '';
                    if (type === 'businessLicensePath') {
                        result = await uploadFileToBusinessLicense(formData);
                        this.businessLicensePath = imgHttp + result.data.filePath;
                    } else {
                        result = await uploadFileToIdentity(formData);
                        this[type] = imgHttp + result.data.filePath;
                    }
                    // 修改车队信息
                    let param = {};
                    param[type] = result.data.filePath;
                    this['motorcade/increment'](param);
                    await modifyMotorcade(this.addInfo);
                    next();
                    this.$toast({
                        message: '文件已保存',
                        position: 'bottom'
                    });
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                    next();
                }
            }
        },
        filters: {
            type (val) {
                let res = '';
                switch (val) {
                    case 'personal':
                        res = '个人';
                        break;
                    case 'enterprise':
                        res = '物流企业';
                        break;
                }
                return res;
            }
        }
    };
</script>
