<template>
	<div>	 
			   <el-row>
				   <el-col :span="2"><el-button type="text" @click='returnBack'>返回</el-button></el-col>
				   <el-col :span="6"> <el-input placeholder="标题" v-model="article.title" >
			       <template slot="prepend">标题</template>
			     </el-input></el-col>
				 <el-col :span="6"> <el-input placeholder="作者" v-model="article.author" >
				   <template slot="prepend">作者</template>
				 </el-input></el-col>
			   </el-row>
			    
				
	     <mavon-editor 
	         v-model="article.content" 
	         ref="md" 
	         @change="change" 
	         style="min-height: 600px"
	     />
				<el-button type="info" plain @click="submit">更新文章</el-button>
	 </div>
</template>

<script>
	import { mavonEditor } from 'mavon-editor'
	import 'mavon-editor/dist/css/index.css'
	import Cookies from 'js-cookie'
	import {store} from '../../store/store.js'
	import {getArticleDetail} from '../../api/article.js'
	import {updateArticle} from '../../api/markdown.js'
	export default{
		data(){
			return {
				html:'',// 及时转的html
				article:{
					content:'',
					title:'',
					author:'',
					summary:'',
					userId:'',
					}
			}
		},
		methods:{
			change(value, render){
			    // render 为 markdown 解析后的结果[html]
			    this.html = render;
			},
			submit(){
				updateArticle(this.$data.article).then(response=>{
					if(response.data.code ===200){
						console.log('success')
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			returnBack(){
				this.$router.push('/article')
			}
		},
		created(){
			getArticleDetail(this.$route.params.id).then(response=>{
				let result=response.data
				this.$data.article=result.data.article
				console.log(this.$data.article)
			}).catch(error=>{
				console.log(error)
			})
		},
		
	}
</script>

<style>
</style>
