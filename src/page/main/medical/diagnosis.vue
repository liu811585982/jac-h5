/**
 * 作者：yeshengqiang
 * 时间：2018-07-17
 * 描述：诊断
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        .section-body {
            margin-top: px2rem(20);
            flex: 1;
            background-color: $white;
            .diagnosis-panel {
                width: 80%;
                margin: px2rem(100) auto;
            }
            .medical-btn {
                width: 70%;
                margin: 0 auto;
                .btn_check {
                    height: px2rem(85);
                    background-color: #de4041;
                    border-radius: px2rem(42);
                }
            }
        }
    }
</style>
<template>
    <div class="section-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <section class="section-body">
            <div class="diagnosis-panel">
                <img src="../../../assets/images/diagnosis.png" alt="diagnosis" />
            </div>
            <div class="medical-btn">
                <x-button class="btn_check" @click.native="check" type="warn">开始诊断</x-button>
            </div>
        </section>
    </div>
</template>
<script>
    import { XButton } from 'vux';
    import userInfo from '@/mixins/userInfo';
    import { checkup, getRemoteDiagnose } from '@/services/diagnosis/diagnosis';

    export default {
        name: 'diagnosis',
        mixins: [ userInfo ],
        components: { XButton },
        methods: {
            // 检查
            async check () {
                try {
                    if (!this.userInfo.defaultVin) {
                        this.$toast({
                            message: '请先绑定车辆',
                            position: 'bottom'
                        });
                        return;
                    }
                    const res = await checkup({vin: this.userInfo.defaultVin});
                    const result = await getRemoteDiagnose({commandRecordId: res.data});
                    console.log(result);
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            }
        }
    };
</script>
