<template>
    <div>
        <el-form :inline="true" :model="searchForm" class="search-form">
        <el-row class="shadow-md p-4 bg-white" >
                <el-col :span="22" >
                    <el-form-item label="角色名称" label-width="100px">
                        <el-input v-model="searchForm.name" placeholder="请输入角色名称" clearable />
                    </el-form-item>
                </el-col>
                    
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
        <el-table :data="roleList" style="width: 100%;overflow: hidden;" v-loading="loadStatus" empty-text="没有更多了~" border>
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="name" label="角色名称" />
            <el-table-column prop="validStr" label="状态" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="updateTime" label="修改时间" /> 
            <el-table-column fixed="right" label="操作">
               
                <template #default="scope">
                    <div class="grid grid-cols-2 gap-2">
                        <el-button type="primary" size="small" @click="clickEdit(scope.row)" class="!ml-0">
                        编辑
                    </el-button>
                    <el-button type="success" size="small" @click="clickMenu(scope.row)" class="!ml-0">
                        菜单
                    </el-button>
                    <el-button type="danger" size="small" @click="clickDelete(scope.row)" class="!ml-0">删除
                    </el-button>
                   </div>  
                </template>
            </el-table-column>
        </el-table>
                <el-pagination background class="mt-4 w-full flex justify-end" layout="prev, pager, next" :total="config.total"
            @current-change="handleClick" />
    </div>

    <el-drawer v-model="dialogVisible" direction="rtl" size="30%">
    <template #header>
      <h4>{{ action === 'add' ? '新增角色' : '编辑角色' }}</h4>
    </template>
    <template #default>
        <el-form :model="submitForm" ref="form" label-width="130px" label-position="left">
            <el-form-item label="角色名称" prop="name" :rules="[{ required: true, message: '角色名称是必填项' }]">
                <el-input v-model="submitForm.name" placeholder="请输入角色名称" />
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

    <el-dialog v-model="menuDialogVisible" title="编辑角色" draggable width="400">
        <el-form :inline="true">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="授权角色">
                        <el-tree style="max-width: 400px" :data="allMenus" show-checkbox node-key="id"
                            :props="defaultProps" :default-checked-keys="curMenuIds" ref="treeRef" />
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="menuDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onRoleSubmit">确定</el-button>
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
    name: ''
})

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
    name: ''
})

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


// 角色设定
const allMenus = ref([])
const curMenuIds = ref([])
const treeRef = ref(null)
const menuDialogVisible = ref(false)

let settingMenu = reactive({
    roleId: '',
    menuIds: []
})

// 点击角色编辑
async function clickMenu(row) {
    settingMenu.roleId = ''
    settingMenu.menuIds = []
    curMenuIds.value = []
    menuDialogVisible.value = true
    const { data: data } = await proxy.$api.queryRoleMenuList({ roleId: row.id })
    allMenus.value = data.allMenus
    data.curMenus.forEach(x=> {
        if(x.children) {
            
            x.children.forEach(y=>{
                curMenuIds.value.push(y.id)
            })
        } else {
            curMenuIds.value.push(x.id)
        }
    })
    console.log(curMenuIds.value);
    settingMenu.roleId = row.id
}

// 提交
async function onRoleSubmit() {
    const selected = treeRef.value.getCheckedNodes()
    const selected1 = treeRef.value.getHalfCheckedNodes()
    
    selected.forEach(element=>settingMenu.menuIds.push(element.id))
    selected1.forEach(element=>settingMenu.menuIds.push(element.id))
    const { data: data } = await proxy.$api.addRoleMenuList(settingMenu)
    menuDialogVisible.value = false
    queryRoleList()
    proxy.$toast.success()
}

const defaultProps = {
    children: 'children',
    label: 'name',
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
