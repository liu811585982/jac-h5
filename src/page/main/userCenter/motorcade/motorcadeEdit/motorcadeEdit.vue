<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .motorcadeEdit-panel {
        @include wh(100%, 100%);
        overflow: hidden;
        .btn {
            width: 80%;
            margin: 1.5rem 0 0 10%;
        }
    }
</style>
<template>
    <div class="motorcadeEdit-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <group>
            <x-textarea placeholder="请填写详细地址" v-model="currentValue" :show-counter="false" :rows="3"></x-textarea>
        </group>
        <x-button type="warn" class="btn" @click.native="handleSave">保存</x-button>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex';
    import { Group, XTextarea, XButton } from 'vux';
    import { modifyMotorcade } from '@/services/userCenter/userCenter';

    export default {
        components: { Group, XTextarea, XButton },
        data () {
            return {
                currentValue: this.$route.query.address
            };
        },
        computed: mapState({
            addInfo: state => state.motorcade.addInfo
        }),
        methods: {
            ...mapMutations([
                'motorcade/increment'
            ]),
            async handleSave () {
                try {
                    console.log(modifyMotorcade);
                    this.$indicator.open('正在保存');
                    this['motorcade/increment']({address: this.currentValue});
                    await modifyMotorcade(this.addInfo);
                    this.$toast({
                        message: '保存成功',
                        position: 'bottom'
                    });
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
        },
        beforeRouteLeave: (to, from, next) => {
            to.meta.keepAlive = true;
            next();
        }
    };
</script>
