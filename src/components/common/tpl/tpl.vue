/**
 * 作者：yeshengqiang
 * 时间：2018-04-16
 * 描述：template 基类
 */
<style lang="scss" scoped>

</style>
<template>
    <div class="main-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <section class="main-body">
            <scroller lock-x scrollbar-y height="100%" ref="scroller">
                <slot></slot>
            </scroller>
        </section>
    </div>
</template>
<script>
    import { Scroller } from 'vux';

    export default {
        components: { Scroller }
    };
</script>
