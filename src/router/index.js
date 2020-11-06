import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Settings from '../views/Settings.vue'
import LogIn from '../views/LogIn.vue'
import LogOut from '../views/LogOut.vue'
import SignUp from '../views/SignUp.vue'

const routes = [
	{
		path: '/',
		name: 'Dashboard',
		component: Dashboard
	},
	{
		path: '/settings',
		name: 'Settings',
		component: Settings
	},
	{
		path: '/login',
		name: 'LogIn',
		component: LogIn
	},
	{
		path: '/logout',
		name: 'LogOut',
		component: LogOut
	},
	{
		path: '/signup',
		name: 'SignUp',
		component: SignUp
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
