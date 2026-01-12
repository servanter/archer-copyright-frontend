<template>
    <div class="header">
        <el-form :inline="true" :model="searchForm">
            <el-row>
                <el-col :span="3">
                    <el-button type="info" color="#40485b" @click="queryRoleList()">
                        <el-icon size="16">
                            <Refresh />
                        </el-icon>
                    </el-button>
                    <el-button type="success" @click="handleAdd">
                        <el-icon size="16">
                            <Plus />
                        </el-icon>
                        <span>新增</span>
                    </el-button>
                </el-col>
                <el-col :span="21" style="text-align: right;">
                    <el-form-item label="角色名称">
                                                <el-input v-model="searchForm.name" placeholder="请输入角色名称" clearable />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="clickSearch">搜索</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>


    <div class="table">
        <el-table :data="roleList" style="width: 100%" v-loading="loadStatus" empty-text="没有更多了~" border>
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="name" label="角色名称" />
            <el-table-column prop="validStr" label="状态" />
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
        <el-pagination background class="pager" layout="prev, pager, next" :total="config.total"
            @current-change="handleClick" />
    </div>

    <el-dialog v-model="dialogVisible" :title="action === 'add' ? '新增角色' : '编辑角色'" draggable="true" width="650">
        <el-form :inline="true" :model="submitForm" ref="form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="角色名称" prop="name" :rules="[{ required: true, message: '角色名称是必填项' }]">
                        <el-input v-model="submitForm.name" placeholder="请输入角色名称" />
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


// dialog展示控制
const dialogVisible = ref(false)

// 搜索参数
const searchForm = reactive({
    name: ''})

// table加载状态
const loadStatus = ref(true)

// list列表
const roleList = ref([])

// 弹窗 - 状态
const action = ref('add');

onMounted: {
    queryRoleList()
}

// 查询
async function queryRoleList() {
    loadStatus.value = true;
    const { data: data } = await proxy.$api.queryRoleList(config)
    loadStatus.value = false;
    roleList.value = data.list
    config.total = data.total
}

// 分页点击
function handleClick(pageNo) {
    config.pageNo = pageNo
    queryRoleList()
}

// 搜索点击
function clickSearch() {
    config.name = searchForm.name
    queryRoleList()
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
        submitForm.name = item.name
    });
}

// form - 新增/修改
let submitForm = reactive({
    name: ''})

// 提交 - 新增/修改
async function onSubmit() {
    proxy.$refs.form.validate(async (valid, fields) => {
        if (valid) {
            if (action.value === 'add') {
                submitForm.id = null
                const res = await proxy.$api.addRole(submitForm)
                resetAndToast(res)
            } else {
                const res = await proxy.$api.modifyRole(submitForm)
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
        queryRoleList()
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
        const res = await proxy.$api.removeRole({ id: item.id })
        queryRoleList()
        if (res) {
            proxy.$toast.success()
        }
    })
}

</script>

<style lang="less" scoped>
.table {
    position: relative;

    .pager {
        position: absolute;
        bottom: -50px;
        right: 0;
    }
}

.header {
    display: flex;

    form {
        width: 100%;
    }
}
</style>