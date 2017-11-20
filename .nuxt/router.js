import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _31c76804 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _02270478 = () => import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */).then(m => m.default || m)
const _0921e9ca = () => import('../pages/login.vue' /* webpackChunkName: "pages/login" */).then(m => m.default || m)
const _4b515af6 = () => import('../pages/posts.vue' /* webpackChunkName: "pages/posts" */).then(m => m.default || m)
const _20f693b1 = () => import('../pages/admin/addCategory.vue' /* webpackChunkName: "pages/admin/addCategory" */).then(m => m.default || m)
const _509cd85a = () => import('../pages/admin/addPost.vue' /* webpackChunkName: "pages/admin/addPost" */).then(m => m.default || m)
const _b9d12272 = () => import('../pages/admin/update.vue' /* webpackChunkName: "pages/admin/update" */).then(m => m.default || m)
const _5cd7e6ee = () => import('../pages/tag/_tag.vue' /* webpackChunkName: "pages/tag/_tag" */).then(m => m.default || m)
const _1bedae3f = () => import('../pages/post/_detail.vue' /* webpackChunkName: "pages/post/_detail" */).then(m => m.default || m)



const scrollBehavior = (to, from, savedPosition) => {
  // SavedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // If no children detected
    if (to.matched.length < 2) {
      // Scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // If one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // If link has anchor, scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/",
			component: _31c76804,
			name: "index"
		},
		{
			path: "/admin",
			component: _02270478,
			name: "admin"
		},
		{
			path: "/login",
			component: _0921e9ca,
			name: "login"
		},
		{
			path: "/posts",
			component: _4b515af6,
			name: "posts"
		},
		{
			path: "/admin/addCategory",
			component: _20f693b1,
			name: "admin-addCategory"
		},
		{
			path: "/admin/addPost",
			component: _509cd85a,
			name: "admin-addPost"
		},
		{
			path: "/admin/update",
			component: _b9d12272,
			name: "admin-update"
		},
		{
			path: "/tag/:tag?",
			component: _5cd7e6ee,
			name: "tag-tag"
		},
		{
			path: "/post/:detail?",
			component: _1bedae3f,
			name: "post-detail"
		}
    ],
    fallback: false
  })
}
