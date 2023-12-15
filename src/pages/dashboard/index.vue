<template>
  <div>
    <div ref="contentRef" class="text">11111</div>
    <div>{{ content }}</div>
    <Child v-model="content" />
    <button @click="getText">获取文本</button>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import Child from './components/child.vue'
const contentRef = ref<HTMLElement>()
const content = ref({ source: 1 })
onBeforeMount(()=> {})
console.log('content', content)

const getText = ()=> {
	content.value = contentRef.value?.textContent || ''
	console.log('文本内容为', contentRef.value?.textContent)
}
</script>

<style scoped lang="less"></style>
