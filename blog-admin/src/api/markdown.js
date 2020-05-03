import axios from 'axios'
import Cookies from 'js-cookie'

export function submitArticle(data){
	let url='http://localhost:8080/articles'
	return axios({
					method:'post',
					data:data,
					url:url,
					headers: {
					           'Authorization': "Bearer "+Cookies.get('Authorization')
					       }
				})
}
export function updateArticle(data){
	let url='http://localhost:8080/articles'
	return axios({
					method:'put',
					data:data,
					url:url,
					headers: {
					           'Authorization': "Bearer "+Cookies.get('Authorization')
					       }
				})
}