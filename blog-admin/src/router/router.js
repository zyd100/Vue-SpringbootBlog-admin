import VueRouter from 'vue-router'
import Home from '../components/homeBlog'
import UserInfo from '../views/UserInfo/index'
import Login from '../views/Login/index'
import Markdown from '../views/Markdown/index'
var router = new VueRouter({
    routes: [
       
        { path: '/', 
		component: Home,
		children:[
			{
				path:'/userinfo',
				component:UserInfo
			},
			{
				path:'/markdown',
				component:Markdown
			}
		]
		},
		{
			path:'/login',
			component:Login
		},
		{
			path:'',
			component:UserInfo
		}
    ],
	scrollBehavior: () => ({ y: 0 })
})

// 2、把路由对象暴露出去
export default router
