
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .panel {
        @include wh(100%, 100%);
        .page-secode {
            width: 90%;
            margin: 0 auto;
            .item {
                margin-top: 0.85rem;
            }
        }
        .tip {
            font-size: $font-size-14;
            margin-top: $font-size-14;
            height: 2.68rem;
        }
        .mint-field-core{
            text-align: center;
        }
    }
</style>
<template>
    <div class="panel">
        <!-- 头部 -->
        <hy-header :title="title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="page-secode">
            <div class="item">
                <mt-field v-model="addInfo[$route.query.keyword]" :placeholder="collectionTips.placeholder" type="text"></mt-field>
                <div class="tip">
                    {{collectionTips.tips}}
                </div>
            </div>
             <mt-button size="large" class="btn" @click="updateInfo" type="danger">确认</mt-button>
        </div>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
    import { modifyPersonalInfo } from '@/services/userCenter/userCenter';
    import regMap from '@/libs/regMap';

    export default {
        data () {
            return {
                addInfo: {[this.$route.query.keyword]: this.$route.query.value}
            };
        },
        computed: {
            collectionTips () {
                let map = {
                    driverName: {
                        placeholder: '请输入真实姓名',
                        tips: '2-5个字符，仅支持中文'
                    },
                    nickName: {
                        placeholder: '请输入新昵称',
                        tips: '4-16个字符，仅支持中文、英文大小写、数字、"_"、减号及其组合'
                    },
                    mobile: {
                        placeholder: '请输入手机号码',
                        tips: '11个字符，仅支持数字'
                    },
                    identityCard: {
                        placeholder: '请输入身份证号码',
                        tips: '18个字符，仅支持数字，英文大小写'
                    },
                    qq: {
                        placeholder: '请输入QQ号码',
                        tips: '5-18个字符，仅支持数字'
                    },
                    email: {
                        placeholder: '请输入邮箱',
                        tips: '建议使用常用邮箱'
                    },
                    address: {
                        placeholder: '请输入联系地址',
                        tips: '仅支持中文、英文大小写、数字、"_"、减号及其组合'
                    }
                };
                return 'keyword' in this.$route.query ? map[this.$route.query.keyword] : {};
            },
            title () {
                if (!this.$route.query.keyword) {
                    return this.$route.meta.title;
                }
                switch (this.$route.query.keyword) {
                    case 'nickName':
                        return '昵称';
                    case 'driverName':
                        return '姓名';
                    case 'identityCard':
                        return '身份证号';
                    case 'qq':
                        return 'QQ';
                    case 'email':
                        return '电子邮箱';
                    case 'address':
                        return '联系地址';
                }
            },
            reg () {
                if (!this.$route.query.keyword) {
                    return null;
                }
                switch (this.$route.query.keyword) {
                    case 'nickName':
                        return /^[\w\u4e00-\u9fa5]{4,16}$/;
                    case 'driverName':
                        return regMap.chineseName;
                    case 'identityCard':
                        return regMap.identityCard;
                    case 'qq':
                        return regMap.qq;
                    case 'email':
                        return regMap.email;
                    case 'address':
                        return /^([\u4e00-\u9fa5]|[A-Za-z0-9_-])+$/;
                }
            }
        },
        methods: {
            ...mapMutations([
                'MODIFY_USERINFO'
            ]),
            // 修改个人信息
            async updateInfo () {
                const keyword = this.$route.query.keyword || '';
                if (!this.addInfo[keyword] && (keyword === 'driverName' || keyword === 'identityCard')) {
                    this.$toast({
                        message: `${this.title}不能为空`,
                        position: 'bottom'
                    });
                    return;
                }
                if (this.reg && !this.reg.test(this.addInfo[keyword])) {
                    this.$toast({
                       message: `${this.title}格式不正确`,
                       position: 'bottom'
                    });
                    return;
                }
                try {
                    this.$indicator.open();
                    if ('driverName' in this.addInfo) {
                        this.addInfo.name = this.addInfo.driverName;
                    }
                    await modifyPersonalInfo(this.addInfo);
                    this.MODIFY_USERINFO(this.addInfo);
                    this.$router.back();
                    this.$indicator.close();
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                    this.$indicator.close();
                }
            }
        }
    };
</script>
