import useCounter from "./module/counter"

const useStore = ()=> {
	return {
		counter: useCounter()
	}
}
export default useStore