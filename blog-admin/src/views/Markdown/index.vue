<template>
	<div>
		<el-row>
			<el-col :span="4">
				<el-input placeholder="标题" v-model="article.title">
					<template slot="prepend">标题</template>
				</el-input>
			</el-col>
			<el-col :span="4">
				<el-input placeholder="作者" v-model="article.author">
					<template slot="prepend">作者</template>
				</el-input>
			</el-col>
			<el-col :span="4">
				<template>
					<el-radio v-model="article.type" label=1>草稿</el-radio>
					<el-radio v-model="article.type" label=2>文章</el-radio>
				</template>
			</el-col>
		</el-row>
		<mavon-editor v-model="article.content" ref="md" @change="change" @save="save" @imgAdd="$imgAdd" @imgDel="$imgDel" style="min-height: 600px" />
		<el-row>
			<el-col :span="6">
				  <el-select v-model="articleCategory" filterable multiple placeholder="请选择文章标签">
				    <el-option
				      v-for="item in category"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				  </el-select>
			</el-col>
		</el-row>
		<el-button type="info" plain @click="submit">提交</el-button>
	</div>
</template>
<script>
	import {insertCategoryToNewArticle} from '../../api/articleCategory.js'
	import {
		mavonEditor
	} from 'mavon-editor'
	import 'mavon-editor/dist/css/index.css'
	import Cookies from 'js-cookie'
	import {
		submitArticle,
		addImage,
		getImgUrl,
		deleteImg
	} from '../../api/markdown.js'
	import {
		getAllCategories,
	} from '../../api/category.js'
	import {
		store
	} from '../../store/store.js'
	export default {
		name: 'Markdown',
		// 注册
		components: {
			mavonEditor,
		},
		data() {
			return {
				html: '', // 及时转的html
				article: {
					id:'',
					content: '',
					title: '',
					author: '',
					summary: '',
					userId: '',
					type: 1
				},
				articleCategory:[],
				category:[]
			}
		},
		methods: {
			// 所有操作都会被解析重新渲染
			change(value, render) {
				// render 为 markdown 解析后的结果[html]
				this.html = render;
			},
			// 提交
			submit() {
				
				this.$data.article.userId = store.state.id
				submitArticle(this.$data.article).then(response => {
					let result = response.data
					if (result.code === 200) {
						
						this.$data.article=result.data
						insertCategoryToNewArticle(result.data.id,this.$data.articleCategory).then(response=>{
							if(response.data.code===200){
								this.$notify({
									title: '成功',
									message: '上传文章成功',
									type: 'success'
								});
							}
						})
						Cookies.remove("ArticleMarkdown")
					} else {
						this.$notify.error({
							title: '错误',
							message: result.message
						});
					}
				}).catch(error => {
					this.$notify.error({
						title: '错误',
						message: error
					});
				})

			},
			save(markdown, html) {
				Cookies.set("ArticleMarkdown", this.$data.article)
				this.$notify({
					title: '成功',
					message: '暂时保存文章成功',
					type: 'success'
				});
			},
			$imgAdd(pos, $file) {
				// 将图片上传到服务器.
				var formdata = new FormData();
				formdata.append('file', $file);
				addImage(formdata).then(response=>{
					let result=response.data
					let imgPath=getImgUrl(result.data.objectName)
					this.$refs.md.$img2Url(pos,imgPath)
					this.$notify({
						title: '成功',
						message: '上传图片成功',
						type: 'success'
					});
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
			},
			initCategory(){
				getAllCategories().then(response=>{
					let result=response.data
					if(result.code===200){
						this.$data.category=result.data
					}
				})
			}
		},
		created() {
			if (typeof store.state.id == "undefined" || store.state.id == null || store.state.id == "") {
				this.$router.push("/login")
			}
			this.initCategory()
			let article = JSON.parse(Cookies.get("ArticleMarkdown"))
			this.$data.article = article
			this.$data.article.userId = store.state.id
		}
	}
</script>

<style>
</style>
