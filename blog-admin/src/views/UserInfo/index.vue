<template>
	<div>
	<el-form ref="form" :model="userInfo" label-width="80px"  >
  <el-form-item label="用户id">
    <el-input v-model="userInfo.userId" disabled=true></el-input>
  </el-form-item>
  <el-form-item label="用户名">
    <el-input v-model="userInfo.name" v-bind:disabled="disabled"></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="userInfo.email" v-bind:disabled="disabled"></el-input>
  </el-form-item>
  <el-form-item label="个人介绍">
    <el-input v-model="userInfo.introduction" v-bind:disabled="disabled"></el-input>
  </el-form-item>
  <el-form-item label="职位">
    <el-input v-model="userInfo.position" v-bind:disabled="disabled"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="updateInfo" v-loading.fullscreen.lock="loading">{{updateBtnMessage}}</el-button>
    <el-button @click="cancelUpdate" v-bind:disabled="disabled" v-loading.fullscreen.lock="loading">取消</el-button>
  </el-form-item>
</el-form></div>
</template>

<script>
	import {getUserInfo} from '../../api/userinfo.js'
	import {updateUserInfo} from '../../api/userinfo.js'
	import {store} from '../../store/store.js'
	export default{
		name:'UserInfo',
		created() {
			if(typeof store.state.id == "undefined" || store.state.id == null || store.state.id == ""){
			        this.$router.push("/login")
			    }
			getUserInfo(store.state.id).then(response=>{
				let result=response.data
				if(result.code===200){
					this.$data.userInfo=result.data
				}else{
					 this.$message.error(result.message);
				}
			}).catch(error=>{
				 this.$message.error(result.message);
			})
		},
		data(){
			return {
				userInfo:{
					id:-1,
					createdTime:'',
					userId:'',
					email:'',
					name:'',
					introduction:'',
					position:''
				},
				disabled:true,
				updateBtns:['修改资料','确定修改'],
				updateBtnMessage:'修改资料',
				loading:false
			}
		},
		methods:{
			updateInfo(){
				if(this.$data.disabled==true){
					this.$data.updateBtnMessage=this.$data.updateBtns[1]
					this.$data.disabled=false
				}else{
					this.$data.loading=true
					this.$data.updateBtnMessage=this.$data.updateBtns[0]
					this.$data.disabled=true
					this.$data.loading=false
					updateUserInfo(this.$data.userInfo).then(response=>{
						let result=response.data
						if(result.code===200){
							this.$data.userInfo=result.data
							 this.$notify({
							          title: '成功',
							          message: '更新个人信息成功',
							          type: 'success'
							        });
						}else{
							 this.$message.error(result.message);
						}
					}).catch(error=>{
						 this.$message.error(error);
					})
				}
			},
			cancelUpdate(){
				this.$data.loading=true
				getUserInfo(store.state.id).then(response=>{
					let result=response.data
					if(result.code===200){
						this.$data.userInfo=result.data
					}else{
						 this.$message.error(result.message);
					}
				}).catch(error=>{
					 this.$message.error(result.message);
				})
				this.$data.loading=false
				this.$data.updateBtnMessage=this.$data.updateBtns[0]
				this.$data.disabled=true
				
			}
		}
	}
</script>

<style>
</style>
