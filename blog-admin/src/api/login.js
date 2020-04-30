import axios from 'axios'
export function login(data){
	return axios({
					method:'post',
					data:data,
					url:'http://localhost:8080/login'
				})
}

