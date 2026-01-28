import { ElMessage, ElMessageBox } from 'element-plus';
export default {

    success(msg = '操作成功') {
        return ElMessage({
            message: msg,
            type: 'success'
        })
    },
    validerr(msg = '您输入的信息有误，请重新输入') {
        return ElMessage({
            message: msg,
            type: 'warning'
        })
    },
    warning(msg = '您输入的信息有误，请重新输入'){
        return ElMessage({
            message: msg,
            type: 'warning'
        })
    },
    error(msg = '您输入的信息有误，请重新输入') {
        return ElMessage({
            message: msg,
            type: 'error'
        })
    },
    confirm(msg='确定删除吗？', invokeMethod) {
        return ElMessageBox.confirm(
            msg,
            '提示',
            {
                cancelButtonText: '取消',
                confirmButtonText: '确定'
            })
            .then(async () => {
                await invokeMethod()
            })
    },

    prompt(msg = '请输入', title = '提示', options = {}, invokeMethod) {
        return ElMessageBox.prompt(msg, title, options)
            .then(({ value }) => {
                if (invokeMethod) {
                    invokeMethod(value)
                }
                return value
            })
            .catch(() => {
                // 用户取消操作
            })
    },

}