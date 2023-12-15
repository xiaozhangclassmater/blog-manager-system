import webLayout from '@/layout/index.vue'
import { defineAsyncComponent } from 'vue'
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: webLayout,
		redirect: '/dashboard',
		children: [
			{
				path: 'dashboard',
				name: 'dashboard',
				meta: {
					title: "首页"
				},
				component: defineAsyncComponent(()=> import('@/pages/dashboard/index.vue'))
      
			},
			{
				path: 'waterMackManager',
				name: 'waterMackManager',
				meta: {
					title: "水印管理"
				},
				component: defineAsyncComponent(()=> import('@/pages/waterMack/index.vue'))
      
			},
			{
				path: 'ground',
				name: 'ground',
				meta: {
					title: "广场"
				},
				component: defineAsyncComponent(()=> import('@/pages/ground/index.vue'))
        
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		meta: {
			title: '登录'
		},
		component: defineAsyncComponent(()=> import('@/pages/login/index.vue'))
	}
]

const router = createRouter({
	routes,
	history: createWebHashHistory()
})

export default router