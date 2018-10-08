/**
 * 作者：yeshengqiang
 * 时间：2018-03-27
 * 描述：签到页面
 */
<style lang="scss" scoped>
    @import 'src/scss/mixins';
    @import 'src/scss/vars';
    .sign-panel {
        @include wh(100%, 100%);
        display: flex;
        display: -webkit-flex;
        align-items: stretch;
        flex-flow: column nowrap;
        -webkit-align-items: stretch;
        -webkit-flex-flow: column nowrap;
        overflow: hidden;
        background-color: $white;
        .sign-panel-body {
            flex: 1;
            -webkit-flex: 1;
            overflow: auto;
        }
    }
</style>
<template>
    <div class="sign-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <section class="sign-panel-body">
            <hy-calendar :year-format="signInfo.year" :month-format="signInfo.month" @signChange="handleSign" :mark-list.sync="signInfo.signInDateList"></hy-calendar>
        </section>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
    import { hyCalendar } from '@/components';
    import { getSignRecord, updateSignScore, getSignPoint } from '@/services/userCenter/userCenter';

    export default {
        components: { hyCalendar },
        data () {
            return {
                signInfo: {},
                score: 0,
                date: new Date().getDate(),
                ruleStatus: '' // 允许签到送积分 ENABLE:启用；DISABLE:禁用
            };
        },
        created () {
            this.getSignRecord();
        },
        methods: {
            ...mapMutations([
                'GET_TOTAL_RECODE',
                'MODIFY_USERINFO'
            ]),
            async getSignRecord () {
                try {
                    const result = await getSignRecord();
                    const res = await getSignPoint();
                    this.score = res.data.point;
                    this.ruleStatus = (res.data || {}).ruleStatus;
                    let list = result.data.signInDateList || [];
                    this.signInfo = result.data;
                    this.signInfo.signInDateList = list.map(item => new Date(item.replace(/-/g, '/')).getDate());
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            async handleSign (point, next) {
                try {
                    await updateSignScore({point: this.score});
                    if (this.ruleStatus === 'ENABLE') {
                        this.GET_TOTAL_RECODE({totalPoint: this.score});
                    }
                    this.MODIFY_USERINFO({signed: true});
                    next();
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
