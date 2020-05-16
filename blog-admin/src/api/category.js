import axios from 'axios'
import Cookies from 'js-cookie'
const prefix_url='http://localhost:8080/categories'

export function getAllCategories(){
	return axios({
					method:'get',
					data:{},
					url:prefix_url
				})
}

export function insertNewCategory(data){
	return axios({
					method:'post',
					data:data,
					url:prefix_url,
					headers: {
					           'Authorization': "Bearer "+Cookies.get('Authorization')
					       }
				})
}

export function deleteCategory(id){
	return axios({
					method:'delete',
					data:{},
					url:prefix_url+'/'+id,
					headers: {
					           'Authorization': "Bearer "+Cookies.get('Authorization')
					       }
				})
}