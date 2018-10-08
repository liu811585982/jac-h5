/**
 * 作者：yeshengqiang
 * 时间：2018-03-21
 * 描述：路由入口
 */
<style lang="scss">
    @import 'normalize.css';
    @import 'mint-ui/lib/style.css';
    @import 'src/scss/common';
    @import 'src/scss/animate';
    .app-main {
        position: relative;
    }
</style>
<template>
    <div class="app-main _full" v-plus-back>
        <transition :name="transition">
            <!-- <keep-alive :include="$store.getters.cacheList"> -->
            <router-view></router-view>
            <!-- </keep-alive> -->
        </transition>
    </div>
</template>
<script>
    import plusBack from '@/directives/plusBack';
    import checkUpdate from '@/mixins/checkUpdate';
    import { mapState, mapMutations } from 'vuex';

    export default {
        mixins: [ checkUpdate ],
        directives: { plusBack },
        mounted () {
            if (!this.isUpdate) {
                this.SET_IS_UPDATE(true);
                this.checkUpdate(true);
            }
        },
        computed: {
            ...mapState([
                'isUpdate',
                'transition'
            ])
        },
        methods: {
            ...mapMutations([
                'SET_IS_UPDATE'
            ])
        }
    };
</script>
