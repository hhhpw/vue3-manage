<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div>{{ menus }}</div>
      <logo :collapse="isCollapse" />
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- <sidebar-item

          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        /> -->

        <template v-for="(menu, index) in menus">
          <!-- 存在一个子节点 父节点为Layout -->
          <!-- <template v-if="menu.name === undefined">
            <el-menu-item
              @click="selectMenu(menu.children[0])"
              :index="menu.children[0].meta.url"
              :key="menu.path"
            >
              <i class="el-icon-location"></i>
              <template #title>{{ menu.meta.title }}</template>
            </el-menu-item>
          </template> -->
          <!-- 不存在子节点 -->
          <!-- <template
            v-else-if="
              menu.children === undefined || menu.children.length === 0 || menu.name === undefined
            "
          >
            <el-menu-item @click="selectMenu(menu)" :index="menu.meta.url" :key="menu.path">
              <i class="el-icon-location"></i>
              <template #title>{{ menu.meta.title }}</template>
            </el-menu-item>
          </template> -->
          <!-- 存在多个子节点 -->
          <!-- <el-submenu v-else :index="menu.path" :key="menu.path">
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
          </el-submenu> -->
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem';
import variables from '@styles/variables.scss';
import router from '../../../router/index2.js';
import routes from '../../../router/index.js';
// import routes from '/@$/router/router.config.js';
// import routes from '../../../router/router.config';

console.log('=====>', router);

console.log('========', routes);
import Logo from './Logo';

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      permission_routes: router,
      // menus: router,
    };
  },
  props: ['isCollapse'],
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },

    menus() {
      return router;
    },
    // showLogo() {
    //   return this.$store.state.settings.sidebarLogo;
    // },
    variables() {
      return variables;
    },
    // isCollapse() {
    //   return !this.sidebar.opened;
    // },
  },
  methods: {
    selectMenu(item) {
      currentRoutePath.value = item.meta.url;
      router.push({ path: item.meta.url });
    },
  },
};
</script>

<style lang="scss" scoped>
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
