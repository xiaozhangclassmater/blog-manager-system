import { ref } from "vue";

export function useTimeout (time:number = 60, fn?:()=>void) {
	const disable = ref(false)
	const count = ref(time)
	let timer:any = null 
	function start(){
		timer = setInterval(()=> {
			disable.value = true
			if (fn) return fn()
			count.value--
			if (count.value === 0){
				disable.value = false
				clearInterval(timer)
			}
		}, 1000)
	}
	return {
		count, 
		disable,
		start
    
	}
}