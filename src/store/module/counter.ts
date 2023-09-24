import { defineStore } from 'pinia'
import storeModuleNameGroup from '../constant'

const useCounter = defineStore(storeModuleNameGroup.COUNTER, {
	state: ()=> ({
		count: 1
	}),

	actions: {
		increment() {
			this.count + 1
		}
	}
})

export default useCounter