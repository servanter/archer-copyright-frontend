import axios from "axios";
import { ElMessage } from "element-plus";
const ERROR_MSG =  '网络请求异常，请稍后重试...'
import store from '../store/index.js'
import router from '../router';

const service = axios.create({

})

service.interceptors.request.use((req) => {
    const token = store.state.token
    if (token) {
        req.headers.token = token;
      }
    return req
})

service.interceptors.response.use((res)=>{
    const {code ,data} = res.data
    if(code == 200 || code == 0) {
        return res.data
    } if(code == -99991) {
        store.commit('setToken', '')
        router.push({name:'login'})
    } else {
        ElMessage.error(res.msg || ERROR_MSG)
        return Promise.reject(res.msg || ERROR_MSG)
    }
})


function request(options) {
    options.method=  options.method || 'get'
    if(options.method.toLowerCase() == 'get'){
        options.params = options.data
    }
    return service(options)
}

export default request