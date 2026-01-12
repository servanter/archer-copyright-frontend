import { ElMessage } from 'element-plus';
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
    confirm(invokeMethod) {
        return ElMessageBox.confirm('确定删除吗？',
            {
                cancelButtonText: '取消',
                confirmButtonText: '确定'
            })
            .then(async () => {
                await invokeMethod()
            })
    }
    
}