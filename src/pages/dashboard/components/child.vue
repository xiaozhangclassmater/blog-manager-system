<template>
  <div>
    <button @click="btnClick">更新父组件</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, watch } from 'vue';
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const btnClick = ()=> {
	emit('update:modelValue', '更新成功')
}
console.log('props', props.modelValue)
watch(
  ()=> props.modelValue,
  ()=> {
	console.log('change')
}
)
</script>

<style scoped></style>
