<template>
  <a-layout class="layout-level-1">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span>dashboard</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>相册管理</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="layout-level-2">
      <a-layout-header style="background: #fff; padding: 0">
        <Header @changeCollapsed="handleChangeCollapsed" />
      </a-layout-header>
      <a-layout-content class="layout-content">
        <RouterView v-slot="{Component}">
          <component :is="Component" />
        </RouterView>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
UploadOutlined,
UserOutlined,
VideoCameraOutlined
} from '@ant-design/icons-vue';
import { ref } from 'vue';
import Header from './components/header.vue';
const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);
const handleChangeCollapsed = ()=> {
	collapsed.value = !collapsed.value
}
</script>
<style scoped lang="less">
.layout-level-1{
  .layout-level-2{
    .layout-content{
      background: @white;
      margin: 24px 16px;
      min-height: 280px;
      padding: 24px
    }
  }
}

</style>
