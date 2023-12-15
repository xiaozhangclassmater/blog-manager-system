<template>
  <RouterView />
  <Loading v-if="loading" />
</template>
<script lang="ts" setup>
import Loading from '@/components/loading/index.vue'
import { useLoading } from './hooks/module/useLoading'
const { loading } = useLoading()
// console.log('na', navigator.connection);
</script>
<style scoped lang="less">
// 测试 StyleLint规则是否生效
.a {
  display: flex;
  width: 100px;
  height: 100px;
  position: absolute;
}
</style>
