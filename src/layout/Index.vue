<template>
  <div class="app-wrapper" :class="classCon">
    <sidebar class="sidebar-container" :isCollapse="isCollapse" />
    <div class="main-container">
      <div class="fixed-header">
        <navbar :isCollapse="isCollapse" @changeIsCollapse="changeIsCollapse" />
      </div>
      <appmain />
    </div>
  </div>
</template>
<script>
import { defineComponent, toRefs, reactive } from 'vue';
// import sidebar from './components/Sidebar/Index.vue';
import sidebar from './components/Sidebar.vue';
import navbar from './components/navbar2.vue';
import appmain from './components/AppMain.vue';
export default defineComponent({
  name: '',
  components: {
    sidebar,
    navbar,
    appmain,
  },
  setup: () => {
    const state = reactive({
      isCollapse: false, // 控制菜单展开 收起
      classCon: '',
      classObj: '',
    });
    const changeIsCollapse = () => {
      state.isCollapse = !state.isCollapse;
      // console.log(state.isCollapse);
      if (state.isCollapse === true) {
        state.classCon = 'hideSidebar';
      } else {
        state.classCon = 'openSidebar';
      }
    };

    // watch(() => state.classObj);
    return {
      ...toRefs(state),
      changeIsCollapse,
    };
  },
});
</script>
<style scoped lang="scss">
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
