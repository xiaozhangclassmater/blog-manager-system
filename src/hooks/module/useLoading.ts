import { ref } from "vue";

const loading = ref(false)

export function useLoading () {
	return {
		loading,
		open(val : boolean = true){
			loading.value = val
		},
		close (val : boolean = false) {
			loading.value = val
		}
	}
}