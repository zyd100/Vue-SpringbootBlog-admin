import VueRouter from 'vue-router'
import Home from '../components/homeBlog'
import UserInfo from '../views/UserInfo/index'
import Login from '../views/Login/index'
import Markdown from '../views/Markdown/index'
import Article from '../views/Article/index'
import ArticleDetail from '../views/Article/detail'
import Draft from '../views/Draft/index'
import Comments from '../views/Comments/index'
import Category from '../views/Category/index'
var router = new VueRouter({
    routes: [
       
        { path: '/', 
		component: Home,
		children:[
			{
				path:'userinfo',
				component:UserInfo
			},
			{
				path:'markdown',
				component:Markdown
			},
			{
				path:'article',
				component:Article
			},
			{
				path:'article/detail/:id',
				component:ArticleDetail
			},
			{
				path:'draft',
				component:Draft
			},
			{
				path:'comment',
				component:Comments
			},
			{
				path:'category',
				component:Category
			}
		]
		},
		{
			path:'/login',
			component:Login
		}
    ],
	scrollBehavior: () => ({ y: 0 })
})

// 2、把路由对象暴露出去
export default router
