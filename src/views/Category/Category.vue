<template>
    <div>
        <el-form :inline="true" :model="searchForm" class="search-form">
        <el-row class="shadow-md p-4 bg-white" >
                <el-col :span="22" >
                                        <el-form-item label="类目名称" label-width="100px">
                                                <el-input v-model="searchForm.categoryName" placeholder="请输入类目名称" clearable />
                    </el-form-item>
                    <el-form-item label="一级类目" label-width="100px">
                        <el-select v-model="searchForm.topCategoryId" placeholder="请选择一级类目" style="width:148px" @change="changeTopCategory">
                            <el-option label="全部" value="0"/>
                            <el-option v-for="item in searchTopCategoryOptions" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="二级类目" label-width="100px">
                        <el-select v-model="searchForm.secondCategoryId" placeholder="请选择二级类目" style="width:148px">
                            <el-option label="全部" value="0"/>
                            <el-option v-for="item in searchSecondCategoryOptions" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
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


    <div class="w-full mt-4 bg-white shadow-md px-4 pb-4">
    <div class="mb-2 flex justify-start items-center h-12"> 
               <el-button type="success" @click="handleAdd">
            <el-icon size="16">
                <Plus />
            </el-icon>
            <span>新增</span>
        </el-button>
        
            </div>
        <el-table :data="categoryList" style="width: 100%" v-loading="loadStatus" empty-text="没有更多了~" border>
         <div class="mb-2 flex justify-start items-center h-12"> 
               <el-button type="success" @click="handleAdd">
                   <el-icon size="16">
                    <Plus />
                   </el-icon>
                   <span>新增</span>
               </el-button>
        
            </div>            <el-table-column prop="id" label="ID" />
            <el-table-column prop="categoryName" label="类目名称">
                <template #default="scope">
                    <span class="name-highlight" @click="gotoChildPage(scope.row)">{{ scope.row.categoryName }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="topCategoryId" label="一级类目">
                <template #default="scope">
                    <span>
                        {{ scope.row.topCategoryId <= 0 ? '无' : scope.row.topCategoryName + '(' + scope.row.topCategoryId + ')' }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="secondCategoryId" label="二级类目">
                 <template #default="scope">
                     <span>
                        {{ scope.row.secondCategoryId <= 0 ? '无' : scope.row.secondCategoryName + '(' + scope.row.topCategoryId + ')' }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="childNum" label="子类数量">
                <template #default="scope">
                    <span>{{ scope.row.childNum === 0 ? '0个' : `${scope.row.childNum}个` }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="statusStr" label="状态" />
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

<el-drawer v-model="dialogVisible" direction="rtl" @close="handleCancel">
        <template #header>
        <h4>{{ action === 'add' ? '新增类目' : '编辑类目' }}</h4>
        </template>
        <template #default>
        <el-form :model="submitForm" ref="form" label-width="130px" label-position="left">                
                    <el-form-item label="类目名称" prop="categoryName" :rules="[{ required: true, message: '类目名称是必填项' }]">
                        <el-input v-model="submitForm.categoryName" placeholder="请输入类目名称" />
                    </el-form-item>

                     <el-form-item label="所属一级类目" label-width="130px">
                        <el-select v-model="submitForm.topCategoryId" placeholder="不选择为一级类目" @change="changeEditTopCategory">
                            <el-option label="未选择" value="0"/>
                            <el-option v-for="item in editTopCategoryOptions" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                     <el-form-item label="所属二级类目" label-width="130px">
                        <el-select v-model="submitForm.secondCategoryId" placeholder="不选择为二级类目">
                            <el-option label="未选择" value="0"/>
                            <el-option v-for="item in editSecondCategoryOptions" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                
                    <el-form-item label="状态" prop="status" :rules="[{ required: true, message: '状态是必填项' }]">
                        <el-select v-model="submitForm.status" placeholder="请选择状态" style="width:148px">
                            <el-option v-for="item in statusSubmitOptions" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
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
import { ca } from 'element-plus/es/locales.mjs';
import { onMounted, getCurrentInstance, ref, reactive } from 'vue';

const { proxy } = getCurrentInstance()

// 请求参数
const config = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 0,
})

// 枚举
const statusOptions = ref([])
const statusSubmitOptions = ref([])

const searchTopCategoryOptions = ref([])
const searchSecondCategoryOptions = ref([])

const editTopCategoryOptions = ref([])
const editSecondCategoryOptions = ref([])


// dialog展示控制
const dialogVisible = ref(false)

// 搜索参数
const searchForm = reactive({
    categoryName: '',
    topCategoryId: '',
    secondCategoryId: '',
    thirdCategoryId: '',
    status: ''})

// table加载状态
const loadStatus = ref(true)

// list列表
const categoryList = ref([])

// 弹窗 - 状态
const action = ref('add');

onMounted: {
    queryCategoryList()
    queryChildrenList(0, searchTopCategoryOptions)
}

// 查询
async function queryCategoryList() {
    loadStatus.value = true;
    const { data: data } = await proxy.$api.queryCategoryList(config)
    console.log(data)
    loadStatus.value = false;
    categoryList.value = data.list
    config.total = data.total
    statusOptions.value = data.statuss
    statusSubmitOptions.value = data.statuss.filter(x=>x.value !== 0)

}

async function changeTopCategory(value) {
    queryChildrenList(value, searchSecondCategoryOptions)
}
async function changeEditTopCategory(value) {
    queryChildrenList(value, editSecondCategoryOptions)
}

async function gotoChildPage(value) {
    if(value.topCategoryId <= 0) {
        searchForm.topCategoryId = value.id
        changeTopCategory(value.id)
    } else if(value.topCategoryId > 0) {
         searchForm.secondCategoryId = value.id
    }
    clickSearch()
}
async function queryChildrenList(categoryId, categoryOptions) {
    const { data: data } = await proxy.$api.queryChildrenList({categoryId:categoryId})
    categoryOptions.value = data
}

// 分页点击
function handleClick(pageNo) {
    config.pageNo = pageNo
    queryCategoryList()
}

// 搜索点击
function clickSearch() {
    config.categoryName = searchForm.categoryName

    if (searchForm.topCategoryId.toString().length > 0) {
        config.topCategoryId = searchForm.topCategoryId
    }
    if (searchForm.secondCategoryId.toString().length > 0) {
        config.secondCategoryId = searchForm.secondCategoryId
    }
    if (searchForm.thirdCategoryId.toString().length > 0) {
        config.thirdCategoryId = searchForm.thirdCategoryId
    }
    if (searchForm.status.toString().length > 0) {
        config.status = searchForm.status
    }    queryCategoryList()
}

// 弹窗 - 新增
function handleAdd() {
    dialogVisible.value = true
    action.value = 'add'
    queryChildrenList(0, editTopCategoryOptions)

}

// 弹窗 - 编辑
async function clickEdit(item) {
    action.value = 'edit'
    dialogVisible.value = true
    queryChildrenList(0, editTopCategoryOptions)

    proxy.$nextTick(() => {
        submitForm.id = item.id
        submitForm.categoryName = item.categoryName

        submitForm.topCategoryId = item.topCategoryId === 0 ? '' : item.topCategoryId

        if(item.topCategoryId > 0) {
            queryChildrenList(item.topCategoryId, editSecondCategoryOptions)
        }

        submitForm.secondCategoryId = item.secondCategoryId === 0 ? '' : item.secondCategoryId

        submitForm.status = item.status
    });
}

// form - 新增/修改
let submitForm = reactive({
    categoryName: '',
    topCategoryId: '',
    secondCategoryId: '',
    status: ''})

// 提交 - 新增/修改
async function onSubmit() {
    proxy.$refs.form.validate(async (valid, fields) => {
        if (valid) {
            if (action.value === 'add') {
                submitForm.id = null
                const res = await proxy.$api.addCategory(submitForm)
                resetAndToast(res)
            } else {
                const res = await proxy.$api.modifyCategory(submitForm)
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
        queryCategoryList()
        proxy.$toast.success()
    }
}

// 按钮 - 取消
function handleCancel() {
    dialogVisible.value = false
    proxy.$nextTick(() => {
        proxy.$refs.form.resetFields();
        submitForm.topCategoryId = ''
        submitForm.secondCategoryId = ''
        editSecondCategoryOptions.value = []
    });

}

// 按钮 - 删除
function clickDelete(item) {
    proxy.$toast.confirm(async () => {
        const res = await proxy.$api.removeCategory({ id: item.id })
        queryCategoryList()
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
.name-highlight {
  cursor: pointer;
  color: #0712ed;
}
</style>
