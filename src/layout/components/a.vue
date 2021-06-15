<template>
  <div class="menu-wrapper">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="logo-wrapper">
        <span class="logo-text">币信管理后台</span>
      </div>

      <!-- <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu> -->
      <el-menu
        :collapse="isCollapse"
        :uniqueOpened="false"
        :default-active="currentRoutePath"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        :collapse-transition="false"
        mode="vertical"
      >
        <template v-for="(menu, index) in menus">
          <!-- 存在一个子节点 父节点为Layout -->
          <template v-if="menu.name === undefined">
            <el-menu-item
              @click="selectMenu(menu.children[0])"
              :index="menu.children[0].meta.url"
              :key="menu.path"
            >
              <i class="el-icon-location"></i>
              <template #title>{{ menu.meta.title }}</template>
            </el-menu-item>
          </template>
          <!-- 不存在子节点 -->
          <template
            v-else-if="
              menu.children === undefined || menu.children.length === 0 || menu.name === undefined
            "
          >
            <el-menu-item @click="selectMenu(menu)" :index="menu.meta.url" :key="menu.path">
              <i class="el-icon-location"></i>
              <template #title>{{ menu.meta.title }}</template>
            </el-menu-item>
          </template>
          <!-- 存在多个子节点 -->
          <el-submenu v-else :index="menu.path" :key="menu.path">
            <template #title>
              <i class="el-icon-location"></i>
              <span>{{ menu.meta.title }}</span>
            </template>
            <el-menu-item
              @click="selectMenu(item)"
              :index="item.meta.url"
              v-for="(item, i) in menu.children"
              :key="item.path"
            >
              <template #title>{{ menu.meta.title }}</template>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { defineComponent, watch, computed, ref } from 'vue';
import routes from '../../router/index.js';
// import router from '@/router/index';
// import store from '@/store/index';
// import { Store } from 'vuex';
export default defineComponent({
  name: '',
  props: {
    isCollapse: {
      type: Boolean,
      default: true,
    },
  },
  setup: props => {
    console.log('routes', routes);

    watch(
      () => {
        return props.isCollapse;
      },
      n => {
        console.log(n);
      }
    );
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    // let currentRoutePath = ref(router.currentRoute.value.path);
    // const $store: Store<any> = store;
    const selectMenu = item => {
      // currentRoutePath.value = item.meta.url;
      // router.push({ path: item.meta.url });
      return routes[0].children;
    };
    const menus = computed(() => {
      // return $store.state.user.routers;
      return routes[0].children;
    });
    return {
      handleOpen,
      handleClose,
      menus,
      selectMenu,
      currentRoutePath: 'x',
    };
  },
});
</script>
<style scoped>
.logo-wrapper {
  height: 50px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #2b2f3a;
}
.logo-wrapper img {
  width: 50px;
}
.logo-wrapper span {
  background: hsla(0, 0%, 100%, 0.2);
  padding: 8px;
  color: #fff;
}
.logo-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
