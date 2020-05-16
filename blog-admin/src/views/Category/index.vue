<template>
<div><el-tag
  :key="category"
  v-for="category in categories"
  closable
  :disable-transitions="false"
  @close="handleClose(category)">
  {{category.name}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button></div>
</template>

<script>
	import {
		getAllCategories,
		insertNewCategory,
		deleteCategory
	} from '../../api/category.js'
	import {
		store
	} from '../../store/store.js'
	export default {
		name: 'Category',
		data() {
			return {
				categories: [
					
				],
				inputVisible: false,
				inputValue: ''
			}
		},
		methods: {
			handleClose(category) {
				deleteCategory(category.id).then(response=>{
					if(response.data.code===200){
						this.$data.categories.splice(this.$data.categories.indexOf(category), 1);
					}
					this.$message({
					  type: 'success',
					  message: '删除成功'
					});
				})
				
			},

			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},

			handleInputConfirm() {
				let inputValue = this.inputValue;
				if (inputValue) {
					insertNewCategory({
						name:inputValue
					}).then(response=>{
						if(response.data.code===200){
							this.$data.categories.push(response.data.data)
							this.$message({
							  type: 'success',
							  message: '添加成功'
							});
						}
					})
					
				}
				this.inputVisible = false;
				this.inputValue = '';
			}
		},
		created() {
			if(typeof store.state.id == "undefined" || store.state.id == null || store.state.id == ""){
			        this.$router.push("/login")
			    }
			getAllCategories().then(response=>{
				let result=response.data
				if(result.code===200){
					this.$data.categories=result.data
				}
			})
		}
	}
</script>

<style>
	.el-tag+.el-tag {
		margin-left: 10px;
	}

	.button-new-tag {
		margin-left: 10px;
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.input-new-tag {
		width: 90px;
		margin-left: 10px;
		vertical-align: bottom;
	}
</style>
