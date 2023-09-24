import { getStorage } from '@/utils'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import router from './index'
// const { open, close} = useLoading()
const routerMiddleWare = (to : RouteLocationNormalized, _from : RouteLocationNormalized, next : NavigationGuardNext)=> {
	const token = getStorage('token')
	if (!token && to.path !== '/login') {
		next('/login')
	} else if (token && to.path === '/login'){
		next('/')
	} else {
		next()
	}
}
router.beforeEach((to, from, next)=> {
	NProgress.start()
	// open(true)
	routerMiddleWare(to, from, next)
})

router.afterEach( ()=> {
	// close(false)
	NProgress.done()
})