<template>
	<el-row :gutter="20">

		<el-col :span="16" :offset="8">
			<div class="login-container" style="margin: 0 auto;">
				<el-main>
					<el-card class="box-card">
						<el-form :model="form" status-icon label-width="100px">
							<el-form-item label="用户id">
								<el-input type="text" v-model="form.id" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="密码">
								<el-input type="password" v-model="form.password" autocomplete="off" showPassword></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitForm">提交</el-button>
								<el-button @click="resetForm">重置</el-button>
							</el-form-item>
						</el-form>
					</el-card>

				</el-main>
				</el-container>
			</div>
		</el-col>

	</el-row>

</template>

<script>
	import Cookies from 'js-cookie'
	import {login} from '../../api/login.js'
	import {store} from '../../store/store'
	export default {
		name: 'Login',
		data() {
			return {
				form: {
					id: 'testId',
					password: '123456'
				}
			}
		},
		methods: {
			submitForm() {
				login(this.$data.form).then(response=>{
					if(response.data.code ===200){
						Cookies.set('Authorization',response.data.data)
						store.setNewId(this.$data.form.id)
						this.$router.push('/')
					}
				}).catch((error)=>{
					alert(error)
				})
				
			},
			resetForm(){
				this.$data.form.id=''
				this.$data.form.password=''
			}
		},
		
	}
</script>

<style>
	.box-card {
		width: 480px;
	}
</style>
