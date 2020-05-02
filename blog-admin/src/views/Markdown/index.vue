<template>
	   <div>
		     <el-input placeholder="标题" v-model="article.title" >
		       <template slot="prepend">标题</template>
		     </el-input>
			 <el-input placeholder="作者" v-model="article.author" >
			   <template slot="prepend">作者</template>
			 </el-input>
	        <mavon-editor 
	            v-model="article.content" 
	            ref="md" 
	            @change="change" 
				@save="save"
	            style="min-height: 600px"
	        />
			<el-button type="info" plain @click="submit">提交</el-button>
	    </div>
</template>
<script>
	import { mavonEditor } from 'mavon-editor'
	import 'mavon-editor/dist/css/index.css'
	import Cookies from 'js-cookie'
	import {submitArticle} from '../../api/markdown.js'
	import {store} from '../../store/store.js'
	export default {
		name:'Markdown',
	    // 注册
	    components: {
	        mavonEditor,
	    },
	    data() {
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
	    methods: {
	        // 所有操作都会被解析重新渲染
	        change(value, render){
	            // render 为 markdown 解析后的结果[html]
	            this.html = render;
	        },
	        // 提交
	        submit(){
				submitArticle(this.$data.article).then(response=>{
					let result=response.data
					if(result.code === 200){
						this.$notify({
						         title: '成功',
						         message: '上传文章成功',
						         type: 'success'
						       });
						Cookies.remove("ArticleMarkdown")
					}else{
						this.$notify.error({
						         title: '错误',
						         message: result.message
						       });
					}
				}).catch(error=>{
					 this.$notify.error({
					          title: '错误',
					          message: error
					        });
				})
				
	        },
			save(markdown, html){
				Cookies.set("ArticleMarkdown",this.$data.article)
				 this.$notify({
				          title: '成功',
				          message: '暂时保存文章成功',
				          type: 'success'
				        });
			}
	    },
	    created() {
			if(typeof store.state.id == "undefined" || store.state.id == null || store.state.id == ""){
			        this.$router.push("/login")
			    }	
			let article=JSON.parse(Cookies.get("ArticleMarkdown"))
	    	this.$data.article=article
			this.$data.article.userId=store.state.id
	    }
	}
</script>

<style>
</style>
