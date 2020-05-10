<template>
	<div>
		<el-row>
			<el-col :span="4" :offset='18'>
				<el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
			</el-col>
			<el-col :span="1">
				<el-button size="mini">搜索</el-button>
			</el-col>
		</el-row>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column label="序号" prop="id">
			</el-table-column>
			<el-table-column label="评论内容" prop="content">
			</el-table-column>
			<el-table-column label="评论者" prop="userName">
			</el-table-column>
			<el-table-column label="评论文章" prop="articleId">
			</el-table-column>
			<el-table-column label="评论时间" prop="createdTime">
			</el-table-column>
			<el-table-column label="审核状态" prop="type">
				<template scope='scope'>
					<el-radio-group v-model="scope.row.type" @change="updateCommentStatus(scope.row)">
						<el-radio :label="1">审批中</el-radio>
						<el-radio :label="2">批准</el-radio>
					</el-radio-group>
				</template>
			</el-table-column>
			<el-table-column align="right">
				<template slot="header" slot-scope="scope">
				</template>
				<template slot-scope="scope">
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background layout="prev, pager, next" :total="$data.total" :page-size="$data.pageSize" @current-change='currentChange'>
		</el-pagination>
	</div>
</template>

<script>
	import {
		store
	} from '../../store/store.js'
	import {getComments,updateCommentStatus,deleteComment} from '../../api/comments.js'
	export default {
		name: "Comments",
		data() {
			return {
				tableData: [{
						id: '1',
						content: '',
						createdTime: '',
						userName: '',
						articleId: '',
						type: 2
					},
					{
						id: '1',
						content: '',
						createdTime: '',
						userName: '',
						articleId: '',
						type: 1
					}
				],
				total: 11,
				pageNum: 10,
				pageSize: 10,
			}
		},
		methods: {
			updateCommentStatus(row) {
				updateCommentStatus(row.id,row.type).then(response=>{
					console.log(response.data)
				})
			},
			handleDelete(index, row) {
				this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					deleteComment(row.id).then(response=>{
						console.log(response.data)
						if(response.data.code===200){
							this.$data.tableData.splice(index,1)
						}
					}).catch(error=>{
						
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			currentChange(pageNum) {
				getComments(pageNum,this.$data.pageSize).then(response=>{
					let result=response.data
					this.$data.tableData=result.data.list
					this.$data.total=result.data.total
				}).catch(error=>{
				
			})	
			}
		},
		created() {
			if(typeof store.state.id == "undefined" || store.state.id == null || store.state.id == ""){
			        this.$router.push("/login")
			    }
			getComments(1,this.$data.pageSize).then(response=>{
				let result=response.data
				this.$data.tableData=result.data.list
				this.$data.total=result.data.total
			}).catch(error=>{
				
			})	
		}
	}
</script>

<style>
</style>
