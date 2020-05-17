import axios from 'axios'
import Cookies from 'js-cookie'

function getIds(array){
	let ids=''
	for(var i=0,len=array.length;i<len;++i){
		ids=ids+array[i]+',';
	}
	return ids.substr(0,ids.length-1)
}

const prefixUrl='http://localhost:8080/articleCategories/'

export function insertCategoryToNewArticle(articleId,categoryArray){
	let ids =getIds(categoryArray)

	return axios({
					method:'post',
					data:{},
					url:prefixUrl+articleId+'?categoiesIds='+ids,
					headers: {
					           'Authorization': "Bearer "+Cookies.get('Authorization')
					       }
				})
}

export function overrideCategoryToArticle(articleId,categoryArray){
	let ids =getIds(categoryArray)
	return axios({
					method:'put',
					data:{},
					url:prefixUrl+articleId+'?categoiesIds='+ids,
					headers: {
					           'Authorization': "Bearer "+Cookies.get('Authorization')
					       }
				})
}