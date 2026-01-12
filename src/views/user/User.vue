<template>
    <div>
        <el-form :inline="true" :model="searchForm">
        <el-row class="shadow-md p-4 bg-white" >
                <el-col :span="21" >
                    <el-form-item label="用户名" >
                                                <el-input v-model="searchForm.userName" placeholder="请输入用户名" clearable />
                    </el-form-item>

                    <el-form-item label="密码" >
                                                <el-input v-model="searchForm.password" placeholder="请输入密码" clearable />
                    </el-form-item>

                    <el-form-item label="用户类型">
                        <el-select v-model="searchForm.type" placeholder="请选择用户类型" style="width:168px">
                            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                    
                <el-col :span="3">
                    <div class="flex justify-end">
                        <el-button type="primary" @click="clickSearch">搜索</el-button>
                    </div>
                </el-col>
        </el-row>
        </el-form>
    </div>

    <div class="table w-full mt-4">
        <el-table :data="userList" v-loading="loadStatus" empty-text="没有更多了~" border style="overflow: hidden;">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="userName" label="用户名" />
            <el-table-column prop="password" label="密码" />
            <el-table-column prop="validStr" label="状态" />
            <el-table-column prop="typeStr" label="用户类型" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="updateTime" label="修改时间" />            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="clickEdit(scope.row)">
                        编辑
                    </el-button>
                    <el-button type="danger" size="small" @click="clickDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background class="mt-4 w-full flex justify-end" layout="prev, pager, next" :total="config.total"
            @current-change="handleClick" />
    </div>

    <el-dialog v-model="dialogVisible" :title="action === 'add' ? '新增用户' : '编辑用户'" draggable="true" width="650">
        <el-form :inline="true" :model="submitForm" ref="form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="用户名" prop="userName" :rules="[{ required: true, message: '用户名是必填项' }]">
                        <el-input v-model="submitForm.userName" placeholder="请输入用户名" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '密码是必填项' }]">
                        <el-input v-model="submitForm.password" placeholder="请输入密码" />
                    </el-form-item>
                </el-col>            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="用户类型" prop="type" :rules="[{ required: true, message: '用户类型是必填项' }]">
                        <el-select v-model="submitForm.type" placeholder="请选择用户类型" style="width:168px">
                            <el-option v-for="item in typeSubmitOptions" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>            </el-row>

        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { onMounted, getCurrentInstance, ref, reactive } from 'vue';

const { proxy } = getCurrentInstance()

// 请求参数
const config = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 0,
})

// 枚举
const typeOptions = ref([])
const typeSubmitOptions = ref([])

// dialog展示控制
const dialogVisible = ref(false)

// 搜索参数
const searchForm = reactive({
    userName: '',
    password: '',
    type: ''})

// table加载状态
const loadStatus = ref(true)

// list列表
const userList = ref([])

// 弹窗 - 状态
const action = ref('add');

onMounted: {
    queryUserList()
}

// 查询
async function queryUserList() {
    loadStatus.value = true;
    const { data: data } = await proxy.$api.queryUserList(config)
    loadStatus.value = false;
    userList.value = data.list
    config.total = data.total
typeOptions.value = data.types
typeSubmitOptions.value = data.types.filter(x=>x.value !== 0)}

// 分页点击
function handleClick(pageNo) {
    config.pageNo = pageNo
    queryUserList()
}

// 搜索点击
function clickSearch() {
    config.userName = searchForm.userName

    config.password = searchForm.password

    if (searchForm.type.toString().length > 0) {
        config.type = searchForm.type
    }    queryUserList()
}

// 弹窗 - 新增
function handleAdd() {
    dialogVisible.value = true
    action.value = 'add'
}

// 弹窗 - 编辑
async function clickEdit(item) {
    action.value = 'edit'
    dialogVisible.value = true

    proxy.$nextTick(() => {
        submitForm.id = item.id
        submitForm.userName = item.userName

        submitForm.password = item.password

        submitForm.type = item.type
    });
}

// form - 新增/修改
let submitForm = reactive({
    userName: '',
    password: '',
    type: ''})

// 提交 - 新增/修改
async function onSubmit() {
    proxy.$refs.form.validate(async (valid, fields) => {
        if (valid) {
            if (action.value === 'add') {
                submitForm.id = null
                const res = await proxy.$api.addUser(submitForm)
                resetAndToast(res)
            } else {
                const res = await proxy.$api.modifyUser(submitForm)
                resetAndToast(res)
            }
        } else {
            proxy.$toast.validerr()
        }
    })
}

// 成功提示
function resetAndToast(res) {
    if (res) {
        dialogVisible.value = false
        proxy.$refs.form.resetFields()
        queryUserList()
        proxy.$toast.success()
    }
}

// 按钮 - 取消
function handleCancel() {
    dialogVisible.value = false
    proxy.$nextTick(() => {
        proxy.$refs.form.resetFields();
    });

}

// 按钮 - 删除
function clickDelete(item) {
    proxy.$toast.confirm(async () => {
        const res = await proxy.$api.removeUser({ id: item.id })
        queryUserList()
        if (res) {
            proxy.$toast.success()
        }
    })
}

</script>

<style lang="less" scoped>

:deep(.el-form-item) {
    margin-bottom: 0;
    display: inline-flex;
    align-items: center;
}

:deep(.el-form-item__content) {
    display: flex;
    align-items: center;
}
</style>
