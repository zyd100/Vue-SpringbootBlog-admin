import axios from 'axios'
import Cookies from 'js-cookie'
import Vue from 'vue'
export function getUserInfo(userid){

	let url='http://localhost:8080/userInfos/'+userid
	console.log(url)
	return axios({
					method:'get',
					data:{},
					url:url,
				})
}
export function updateUserInfo(data){
	let url='http://localhost:8080/userInfos'
	console.log(url)
	return axios({
					method:'put',
					data:data,
					url:url,
					 headers: {
					            'Authorization': "Bearer "+Cookies.get('Authorization')
					        }
				})
}