import axios from 'axios'
import Cookies from 'js-cookie'
import Qs from 'qs'
export function getComments(pageNum,pageSize){
	return axios({
					method:'get',
					data:{},
					url:'http://localhost:8080/comments'+'?pageNum='+pageNum+'&pageSize='+pageSize,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
						'Authorization': "Bearer " + Cookies.get('Authorization')
					},
				})
}
export function updateCommentStatus(commentId,status){
	return axios({
					method:'put',
					data:{},
					url:'http://localhost:8080/comments/status'+'?commentId='+commentId+'&statusCode='+status,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
						'Authorization': "Bearer " + Cookies.get('Authorization')
					},
				})
}

export function deleteComment(commentId){
	return axios({
					method:'delete',
					data:{},
					url:'http://localhost:8080/comments'+'?commentId='+commentId,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
						'Authorization': "Bearer " + Cookies.get('Authorization')
					},
				})
}