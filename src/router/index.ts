import webLayout from '@/layout/index.vue'
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: webLayout,
		redirect: '/dashboard',
		children: [{
			path: 'dashboard',
			name: 'dashboard',
			component: ()=> import('@/pages/dashboard/index.vue')
      
		}]
	},
	{
		path: '/login',
		name: 'login',
		meta: {
			title: '登录'
		},
		component: import('@/pages/login/index.vue')
	}
]

const router = createRouter({
	routes,
	history: createWebHashHistory()
})

export default router