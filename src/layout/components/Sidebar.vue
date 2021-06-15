<template>
  <div class="menu-wrapper">
    <Logo title="BiXin" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="currentRoutePath"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="true"
        mode="vertical"
      >
        <template v-for="(m, i) in menus">
          <!-- 一级菜单情况 -->

          <template v-if="m.children.length === 1">
            <el-menu-item
              :index="m.children[0].meta.url"
              @click="selectMenu(m.children[0])"
              :key="m.path"
            >
              <svg-icon :icon-class="m.children[0].meta.icon" />
              <template #title>{{ m.children[0].meta.title }}</template>

              <!-- <template #title>{{ m.children[0].meta }}</template> -->
            </el-menu-item>
          </template>
          <!-- 二级菜单情况 -->
          <el-submenu v-if="m.children.length > 1" :index="m.path" :key="m.path">
            <template #title>
              <svg-icon :icon-class="m.meta.icon" />
              <span>{{ m.meta.title }}</span>
            </template>
            <!-- <i class="el-icon-location"></i> -->
            <!-- <template #title>测试</template> -->
            <!-- <span>{{ m.meta.title || '公共数据' }}</span> -->
            <el-menu-item
              @click="selectMenu(item)"
              :index="item.meta.url"
              v-for="(item, i) in m.children"
              :key="item.path"
            >
              <svg-icon :icon-class="item.meta.icon" />
              <template #title>{{ item.meta.title }}</template>
            </el-menu-item>
          </el-submenu>
          <!-- === -->
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import variables from '@styles/variables.scss';
import routes from '../../router/index.js';
import Item from './Sidebar/Item.vue';
import { watch, computed, defineComponent, ref } from 'vue';
import Logo from './Logo.vue';

// export default {
export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
    },
  },
  components: {
    Item,
    Logo,
  },
  setup(props) {
    // watch(
    //   () => {
    //     return props.isCollapse;
    //   },
    //   n => {
    //     console.log(n);
    //   }
    // );
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    // let currentRoutePath = ref(router.currentRoute.value.path);
    // const $store: Store<any> = store;
    // const selectMenu = item => {
    //   // currentRoutePath.value = item.meta.url;
    //   // router.push({ path: item.meta.url });
    //   return routes;
    // };

    let currentRoutePath = ref(routes.currentRoute.value.path);
    const menus = computed(() => {
      console.log('routes', routes);
      return routes.options.routes;
      // return $store.state.user.routers;
      // return JSON.parse(JSON.stringify(routes.options.routes));
    });

    // const activeMenu = computed(() => {
    //   // return '/home';
    //   console.log('route', route);
    //   const { meta, path } = route;
    //   console.log('meta', meta);
    //   // if set path, the sidebar will highlight the path you set
    //   if (meta.activeMenu) {
    //     return meta.activeMenu;
    //   }
    //   return path;
    // });

    const selectMenu = item => {
      // return;
      currentRoutePath.value = item.meta.url;
      routes.push({ path: item.meta.url });
    };
    return {
      selectMenu,
      menus,
      currentRoutePath,
      variables,
      // activeMenu,
    };
  },
});

// };
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
