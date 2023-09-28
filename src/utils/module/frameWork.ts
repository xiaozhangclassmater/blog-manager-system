export function debounce (fn :()=> void, awaitTime : number) {
	let timer : null | number = null
	return  (...args : any[])=> {
		if (timer){
			clearTimeout(timer)
		}
		timer = setTimeout(()=> {
			fn.apply(this, args)
		}, awaitTime) as any
	}
}