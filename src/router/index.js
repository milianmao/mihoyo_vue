import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
	{ path: '/', redirect: '/login' },
	{ path: '/login', component: () => import('@/views/Login.vue') },
	{
		path: '/home',
		component: () => import('@/views/Home.vue'),
		redirect: '/welcome',
		children: [
			{
				path: '/welcome',
				component: () => import('@/views/welcome.vue'),
			},
			{
				path: '/user_info',
				component: () => import('@/components/User/user_info.vue'),
			},
			{
				path: '/user_activate',
				component: () => import('@/components/User/activite.vue'),
			},
			{
				path: '/user_uif',
				component: () => import('@/components/User/GenUIF.vue'),
			},
			{
				path: '/managea_users',
				component: () => import('@/components/Manage/Users_manage.vue'),
			},
			{
				path: '/managea_project',
				component: () => import('@/components/Manage/Card_manage.vue'),
			},
			{
				path: '/managea_cards',
				component: () => import('@/components/Manage/Cards_manage.vue'),
			},
		],
	},
]

const router = new VueRouter({
	routes,
})

export default router
