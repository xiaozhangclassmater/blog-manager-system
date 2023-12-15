<template>
  <div>
    <Child :click-fn="() => console.log('1111')" @change="handleChange" />
    <ChildrenOnce />
    <div>{{ content }}</div>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ChildrenOnce from './ChildrenOnce.jsx';
import Child from './child.vue';
const router = useRouter()
const route = useRoute()
provide('groundName', '中国体育馆')
const content = ref()
console.log('router', router);
console.log('route', route.path);
const handleChange = (value : string)=> {
	content.value = value
	console.log(value)
}

</script>

<style scoped>
</style>
