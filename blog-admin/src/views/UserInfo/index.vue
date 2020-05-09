<template>
	<div>
		<el-row>
			<el-col :span="6" :offset="10">
				<label for=".avatar-uploader">头像</label>
			<el-upload
			  class="avatar-uploader"
			  action="https://jsonplaceholder.typicode.com/posts/"
			  :show-file-list="false"
			  :before-upload="beforeAvatarUpload">
			  <img v-if="$data.userInfo.image!=''" :src="$data.userInfo.image" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="6" :offset="9">
			</el-col>
		</el-row>
		<el-form ref="form" :model="userInfo" label-width="80px">
			<el-row>
				<el-col :span="6" :offset="9">
					<el-form-item label="用户id">
						<el-input v-model="userInfo.userId" disabled=true></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6" :offset="9">
					<el-form-item label="用户名">
						<el-input v-model="userInfo.name" v-bind:disabled="disabled"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6" :offset="9">
					<el-form-item label="邮箱">
						<el-input v-model="userInfo.email" v-bind:disabled="disabled"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6" :offset="9">
					<el-form-item label="个人介绍">
						<el-input v-model="userInfo.introduction" v-bind:disabled="disabled"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6" :offset="9">
					<el-form-item label="职位">
						<el-input v-model="userInfo.position" v-bind:disabled="disabled"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-form-item>
				<el-button type="primary" @click="updateInfo" v-loading.fullscreen.lock="loading">{{updateBtnMessage}}</el-button>
				<el-button @click="cancelUpdate" v-bind:disabled="disabled" v-loading.fullscreen.lock="loading">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	import {
		getUserInfo
	} from '../../api/userinfo.js'
	import {
		updateUserInfo
	} from '../../api/userinfo.js'
	import {
		store
	} from '../../store/store.js'
	import {
		addImage,
		getImgUrl,
		deleteImg
	} from '../../api/markdown.js'
	export default {
		name: 'UserInfo',
		created() {
			if (typeof store.state.id == "undefined" || store.state.id == null || store.state.id == "") {
				this.$router.push("/login")
			}
			getUserInfo(store.state.id).then(response => {
				let result = response.data
				if (result.code === 200) {
					this.$data.userInfo = result.data
				} else {
					this.$message.error(result.message);
				}
			}).catch(error => {
				this.$message.error(result.message);
			})
		},
		data() {
			return {
				userInfo: {
					id: -1,
					createdTime: '',
					userId: '',
					email: '',
					name: '',
					introduction: '',
					position: '',
					image: ''
				},
				disabled: true,
				updateBtns: ['修改资料', '确定修改'],
				updateBtnMessage: '修改资料',
				loading: false,
				
				
			}
		},
		methods: {
			      beforeAvatarUpload(file) {
			        const isJPG = file.type === 'image/jpeg';
			        const isLt2M = file.size / 1024 / 1024 < 2;
			        if (!isJPG) {
			          this.$message.error('上传头像图片只能是 JPG 格式!');
			        }
			        if (!isLt2M) {
			          this.$message.error('上传头像图片大小不能超过 2MB!');
			        }
					if(isJPG && isLt2M){
						var formdata = new FormData();
						formdata.append('file', file);
						var preimg=this.$data.userInfo.image
						addImage(formdata).then(response=>{
							let result=response.data
							if(result.code===200){
								deleteImg(preimg)
								this.$data.userInfo.image=getImgUrl(result.data.objectName)
								updateUserInfo(this.$data.userInfo).then(response => {
									let result = response.data
									if (result.code === 200) {
										this.$data.userInfo = result.data
										this.$notify({
											title: '成功',
											message: '更新个人信息成功',
											type: 'success'
										});
									} else {
										this.$message.error(result.message);
									}
								}).catch(error => {
									this.$message.error(error);
								})
							}
						})
					}
			        return isJPG && isLt2M;
			      },
		
			getHeader(){
				return {
					'Authorization': "Bearer " + Cookies.get('Authorization')
				}
			},    
			updateInfo() {
				if (this.$data.disabled == true) {
					this.$data.updateBtnMessage = this.$data.updateBtns[1]
					this.$data.disabled = false
				} else {
					this.$data.loading = true
					this.$data.updateBtnMessage = this.$data.updateBtns[0]
					this.$data.disabled = true
					this.$data.loading = false
					updateUserInfo(this.$data.userInfo).then(response => {
						let result = response.data
						if (result.code === 200) {
							this.$data.userInfo = result.data
							this.$notify({
								title: '成功',
								message: '更新个人信息成功',
								type: 'success'
							});
						} else {
							this.$message.error(result.message);
						}
					}).catch(error => {
						this.$message.error(error);
					})
				}
			},
			cancelUpdate() {
				this.$data.loading = true
				getUserInfo(store.state.id).then(response => {
					let result = response.data
					if (result.code === 200) {
						this.$data.userInfo = result.data
					} else {
						this.$message.error(result.message);
					}
				}).catch(error => {
					this.$message.error(result.message);
				})
				this.$data.loading = false
				this.$data.updateBtnMessage = this.$data.updateBtns[0]
				this.$data.disabled = true

			}
		}
	}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
