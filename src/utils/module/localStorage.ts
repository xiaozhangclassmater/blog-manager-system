export function setStorage (key : string, value : any) {
	localStorage.setItem(key, JSON.stringify(value))
}
export function getStorage (key : string) {
	try {
		return JSON.parse(localStorage.getItem(key) as string)
	} catch (error) {
		return null
	}
}

export function removeStorage (key : string){
	localStorage.removeItem(key)
}