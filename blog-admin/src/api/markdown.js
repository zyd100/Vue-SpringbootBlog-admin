import axios from 'axios'
import Cookies from 'js-cookie'
import Qs from 'qs'
export function submitArticle(data) {
	let url = 'http://localhost:8080/articles'
	return axios({
		method: 'post',
		data: data,
		url: url,
		headers: {
			'Authorization': "Bearer " + Cookies.get('Authorization')
		}
	})
}
export function updateArticle(data) {
	let url = 'http://localhost:8080/articles'
	return axios({
		method: 'put',
		data: data,
		url: url,
		headers: {
			'Authorization': "Bearer " + Cookies.get('Authorization')
		}
	})
}

export function addImage(formdata) {
	return axios({
		url: 'http://localhost:8080/minio/upload',
		method: 'post',
		data: formdata,
		headers: {
			'Content-Type': 'multipart/form-data',
			'Authorization': "Bearer " + Cookies.get('Authorization')
		},
	})
}
export function getImgUrl(objectName)	{
	return 'http://localhost:8080/minio/view/'+objectName
}

export function deleteImg(url){
	let objectName=url.slice(33)
	let data={
		'fileName':objectName
	}
	return axios({
		url: 'http://localhost:8080/minio/delete',
		method: 'delete',
		data: Qs.stringify(data),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
			'Authorization': "Bearer " + Cookies.get('Authorization')
		},
	})
	
}