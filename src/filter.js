import router from './router'
import store from './store'

const filters = router.beforeEach((to, from, next) => {
	if (to.path != '/login') {
		if (store.getters.getIsLogin) {
				next()
		} else {
			next({
				path: '/login'
			})
		}
	} else {
		next()
	}
})

export default { filters }
