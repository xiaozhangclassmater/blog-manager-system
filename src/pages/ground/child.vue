<template>
  <div class="root">
    <div>{{ count !== 0 ? `${count}秒后重新发送`: '获取验证码' }}</div>
    <div>{{ props }}</div>
    <button :disabled="disable" @click="handleClick">更新</button>
  </div>
</template>

<script lang="ts" setup>
import { useTimeout } from '@/hooks/module/useTimer';
import { inject } from 'vue';
const { start, count, disable } = useTimeout(5)
// const emit = defineEmits(['change'])
const props = defineProps({
	clickFn: {
		type: Function,
		default: ()=> console.log('11122222')
	}
})
const handleClick = ()=> {
	start()
}
const value = inject('groundName', '杭州')

console.log('value', value);
// const updateChange = ()=> {
  
// 	emit('change', '发生变化')
// }
</script>

<style scoped></style>
