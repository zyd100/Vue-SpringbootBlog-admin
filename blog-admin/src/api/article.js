import axios from 'axios'
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