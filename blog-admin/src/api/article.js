import axios from 'axios'
import Cookies from 'js-cookie'
export function getArticleSummary(pageNum,pageSize){
	return axios({
					method:'get',
					data:{},
					url:'http://localhost:8080/articles/summary/'+pageNum+'/'+pageSize
				})
}

export function getArticleDetail(id){
	return axios({
					method:'get',
					data:{},
					url:'http://localhost:8080/articles/'+id
				})
}

export function getDraftSummary(pageNum,pageSize){
	return axios({
					method:'get',
					data:{},
					url:'http://localhost:8080/articles/draft/summary/'+pageNum+'/'+pageSize,
					headers: {
					           'Authorization': "Bearer "+Cookies.get('Authorization')
					       }
				})
}

export function deleteArticle(id){
	return axios({
					method:'delete',
					data:{},
					url:'http://localhost:8080/articles/'+id,
					headers: {
					           'Authorization': "Bearer "+Cookies.get('Authorization')
					       }
				})
}