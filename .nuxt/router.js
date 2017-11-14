import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _5eaefecd = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _121019cd = () => import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */).then(m => m.default || m)
const _2856a1e4 = () => import('../pages/login.vue' /* webpackChunkName: "pages/login" */).then(m => m.default || m)
const _073ee94e = () => import('../pages/posts.vue' /* webpackChunkName: "pages/posts" */).then(m => m.default || m)
const _360d44fa = () => import('../pages/admin/addCategory.vue' /* webpackChunkName: "pages/admin/addCategory" */).then(m => m.default || m)
const _9f435cc8 = () => import('../pages/admin/addPost.vue' /* webpackChunkName: "pages/admin/addPost" */).then(m => m.default || m)
const _17315844 = () => import('../pages/admin/update.vue' /* webpackChunkName: "pages/admin/update" */).then(m => m.default || m)
const _11c820f6 = () => import('../pages/tag/_tag.vue' /* webpackChunkName: "pages/tag/_tag" */).then(m => m.default || m)
const _6d3d9356 = () => import('../pages/post/_detail.vue' /* webpackChunkName: "pages/post/_detail" */).then(m => m.default || m)



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
			component: _5eaefecd,
			name: "index"
		},
		{
			path: "/admin",
			component: _121019cd,
			name: "admin"
		},
		{
			path: "/login",
			component: _2856a1e4,
			name: "login"
		},
		{
			path: "/posts",
			component: _073ee94e,
			name: "posts"
		},
		{
			path: "/admin/addCategory",
			component: _360d44fa,
			name: "admin-addCategory"
		},
		{
			path: "/admin/addPost",
			component: _9f435cc8,
			name: "admin-addPost"
		},
		{
			path: "/admin/update",
			component: _17315844,
			name: "admin-update"
		},
		{
			path: "/tag/:tag?",
			component: _11c820f6,
			name: "tag-tag"
		},
		{
			path: "/post/:detail?",
			component: _6d3d9356,
			name: "post-detail"
		}
    ],
    fallback: false
  })
}
