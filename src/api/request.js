import axios from "axios";
import { ElMessage } from "element-plus";
const ERROR_MSG =  '网络请求异常，请稍后重试...'

const service = axios.create({

})

service.interceptors.request.use((req) => {

    return req
})

service.interceptors.response.use((res)=>{
    const {code ,data} = res.data
    if(code == 200 || code == 0) {
        return res.data
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