<template>
	<div>
		<el-row>
			 <el-col :span="4" :offset='18'><el-input v-model="search" size="mini" placeholder="输入关键字搜索" /></el-col>
			  <el-col :span="1"><el-button size="mini" @click="searchArticle">搜索</el-button></el-col>
		</el-row>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column label="序号" prop="id">
			</el-table-column>
			<el-table-column label="标题" prop="title">
			</el-table-column>
			<el-table-column label="作者" prop="author">
			</el-table-column>
			<el-table-column align="right">
				<template slot="header" slot-scope="scope">	
				</template>
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
		  background
		  layout="prev, pager, next"
		  :total="$data.total"
		  :page-size="$data.pageSize"
		  @current-change='currentChange'>
		</el-pagination>
	</div>
	
	
</template>

<script>
	import {getArticleSummary} from '../../api/article.js'
	import {store} from '../../store/store.js'
	export default {
		name: 'Ariticle',

		data() {
			return {
				tableData: [{
					"id": '',
					"author": '',
					"title": '1',
					"summary": '',
					"star": '',
					"watch": ''
				}],
				search: '',
				total:11,
				pageNum:10,
				pageSize:10
			}
		},
		methods: {
			handleEdit(index, row) {
				this.$router.push('article/detail/'+row.id)
			},
			handleDelete(index, row) {
				console.log(row.id);
			},
			searchArticle(){
				console.log(this.$data.search)
			},
			
			currentChange(pageNum){
				getArticleSummary(pageNum,this.$data.pageSize).then(response=>{
					let result=response.data
					console.log(result)
					this.$data.tableData=result.data.list
					this.$data.total=result.data.total
				}).catch(error=>{
					console.log(error)
				})
			}
		},
		created(){
			if(typeof store.state.id == "undefined" || store.state.id == null || store.state.id == ""){
			        this.$router.push("/login")
			    }
			getArticleSummary(this.$data.pageNum,this.$data.pageSize).then(response=>{
				let result=response.data
				console.log(result)
				this.$data.tableData=result.data.list
				this.$data.total=result.data.total
			}).catch(error=>{
				console.log(error)
			})
		}
	}
</script>
<style>
</style>
