<template>
    <div class="header">
       <el-form :inline="true" :model="searchForm" class="search-form">
        <el-row class="shadow-md p-4 bg-white" :span="22">
                <el-form-item label="菜单名称" label-width="100px">
                                                <el-input v-model="searchForm.name" placeholder="请输入菜单名称" clearable />
                    </el-form-item>

                    <el-form-item label="父级菜单ID" label-width="100px">
                                                <el-input v-model="searchForm.parentId" placeholder="请输入父级菜单ID" clearable />
                    </el-form-item>

                    <el-form-item label="跳转地址" label-width="100px">
                                                <el-input v-model="searchForm.url" placeholder="请输入跳转地址" clearable />
                    </el-form-item>
                    <el-col :span="2">
                    <div class="flex justify-end">
                        <el-button type="primary" @click="clickSearch">搜索</el-button>
                    </div>
                </el-col>

        </el-row>
        </el-form>
    </div>


    <div class="table w-full mt-4 bg-white shadow-md px-4 pb-4">
    <div class="mb-2 flex justify-start items-center h-12"> 
               <el-button type="success" @click="handleAdd">
            <el-icon size="16">
                <Plus />
            </el-icon>
            <span>新增</span>
        </el-button>
        
            </div>
        <el-table :data="menuList" style="width: 100%" v-loading="loadStatus" empty-text="没有更多了~" border>
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="name" label="菜单名称" />
            <el-table-column prop="parentId" label="父级菜单ID" />
            <el-table-column prop="url" label="跳转地址" />
            <el-table-column prop="validStr" label="状态" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="updateTime" label="修改时间" />            
            <el-table-column fixed="right" label="操作">
                 <template #default="scope">
                    <div class="grid grid-cols-2 gap-2">
                        <el-button type="primary" size="small" @click="clickEdit(scope.row)" class="!ml-0">
                        编辑
                    </el-button>
                    <el-button type="danger" size="small" @click="clickDelete(scope.row)" class="!ml-0">删除</el-button>
                   </div>  
                </template>

            </el-table-column>
        </el-table>
        <el-pagination background class="mt-4 w-full flex justify-end" layout="prev, pager, next" :total="config.total"
            @current-change="handleClick" />
    </div>


    <el-drawer v-model="dialogVisible" direction="rtl">
        <template #header>
        <h4>{{ action === 'add' ? '新增菜单' : '编辑菜单' }}</h4>
        </template>
        <template #default>
        <el-form :model="submitForm" ref="form" label-width="130px" label-position="left">
                <el-form-item label="菜单名称" prop="name" :rules="[{ required: true, message: '菜单名称是必填项' }]">
                    <el-input v-model="submitForm.name" placeholder="请输入菜单名称" />
                </el-form-item>

                    <el-form-item label="父级菜单ID" prop="parentId" :rules="[{ required: true, message: '父级菜单ID是必填项' }]">
                    <el-input v-model="submitForm.parentId" placeholder="请输入父级菜单ID" />
                </el-form-item>
                <el-form-item label="跳转地址" prop="url" :rules="[{ required: true, message: '跳转地址是必填项' }]">
                    <el-input v-model="submitForm.url" placeholder="请输入跳转地址" />
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </div>
        </template>
    </el-drawer>

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
    name: '',
    parentId: '',
    url: ''})

// table加载状态
const loadStatus = ref(true)

// list列表
const menuList = ref([])

// 弹窗 - 状态
const action = ref('add');

onMounted: {
    queryMenuList()
}

// 查询
async function queryMenuList() {
    loadStatus.value = true;
    const { data: data } = await proxy.$api.queryMenuList(config)
    loadStatus.value = false;
    menuList.value = data.list
    config.total = data.total
}

// 分页点击
function handleClick(pageNo) {
    config.pageNo = pageNo
    queryMenuList()
}

// 搜索点击
function clickSearch() {
    config.name = searchForm.name

    if (searchForm.parentId.toString().length > 0) {
        config.parentId = searchForm.parentId
    }
    config.url = searchForm.url
    queryMenuList()
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

        submitForm.parentId = item.parentId

        submitForm.url = item.url
    });
}

// form - 新增/修改
let submitForm = reactive({
    name: '',
    parentId: '',
    url: ''})

// 提交 - 新增/修改
async function onSubmit() {
    proxy.$refs.form.validate(async (valid, fields) => {
        if (valid) {
            if (action.value === 'add') {
                submitForm.id = null
                const res = await proxy.$api.addMenu(submitForm)
                resetAndToast(res)
            } else {
                const res = await proxy.$api.modifyMenu(submitForm)
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
        queryMenuList()
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
        const res = await proxy.$api.removeMenu({ id: item.id })
        queryMenuList()
        if (res) {
            proxy.$toast.success()
        }
    })
}

</script>

<style lang="less" scoped>

.search-form :deep(.el-form-item) {
    margin-bottom: 0;
    display: inline-flex;
    align-items: center;
}

.search-form :deep(.el-form-item__content) {
    display: flex;
    align-items: center;
}
</style>
