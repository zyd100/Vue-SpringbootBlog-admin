<template>
	<div>	 
	<el-page-header content="" @back='returnBack'>
	</el-page-header>
			   <el-row>
				   <el-col :span="2"></el-col>
				   <el-col :span="4"> <el-input placeholder="标题" v-model="article.title" >
			       <template slot="prepend">标题</template>
			     </el-input></el-col>
				 <el-col :span="4"> <el-input placeholder="作者" v-model="article.author" >
				   <template slot="prepend">作者</template>
				 </el-input></el-col>
				 <el-col :span="4">
				 				<template>
				 				  <el-radio-group v-model="article.type">
				 				    <el-radio :label="1">草稿</el-radio>
				 				    <el-radio :label="2">文章</el-radio>
				 				    
				 				  </el-radio-group>
				 				</template>
				 </el-col>
			   </el-row>
			    
				
	     <mavon-editor 
	         v-model="article.content" 
	         ref="md" 
	         @change="change" 
			 @imgAdd="$imgAdd"
			 @imgDel="$imgDel"
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
	import {updateArticle,addImage,
		getImgUrl,
		deleteImg} from '../../api/markdown.js'
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
					type:'2',
					id:''
					},	
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
				this.$router.push(store.state.preRouter)
			},
			$imgAdd(pos, $file) {
				// 将图片上传到服务器.
				var formdata = new FormData();
				formdata.append('file', $file);
				addImage(formdata).then(response=>{
					let result=response.data
					if(response.data.code===200){
						let imgPath=getImgUrl(result.data.objectName)
						this.$refs.md.$img2Url(pos,imgPath)
						this.$notify({
							title: '成功',
							message: '上传图片成功',
							type: 'success'
						});
					}else{
						this.$notify.error({
							title: '错误',
							message: response.data.message
						});
					}
					
				}).catch(error=>{
					
				})
			},
			$imgDel(pos){
				deleteImg(pos[0]).then(response=>{
					if(response.data.code===200){
						this.$notify({
							title: '成功',
							message: '删除图片成功',
							type: 'success'
						});
					}else{
						this.$notify.error({
							title: '错误',
							message: response.data.message
						});
					}
					
				}).catch(error=>{
					
				})
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
