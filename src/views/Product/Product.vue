<template>
    <div>
        <el-form :inline="true" :model="searchForm" class="search-form">
        <el-row class="shadow-md p-4 bg-white" >
                <el-col :span="22" >
                     <el-form-item label="商品名称" label-width="100px">
                                                <el-input v-model="searchForm.productName" placeholder="请输入商品名称" clearable />
                    </el-form-item>

                                        <el-form-item label="所属IP" label-width="100px">
                                            
                                            <el-select v-model="searchForm.copyrightId" placeholder="请选择所属IP" style="width:148px">
                                                <el-option label="全部" value="0"/>
                                <el-option v-for="item in copyrightOptions" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select> 
                    </el-form-item>
                   

                    <el-form-item label="商品类目" label-width="100px">
                        <el-cascader
                            v-model="searchForm.thirdCategoryId"
                            :options="categoryOptions"
                            :props="cascaderProps"
                            placeholder="请选择商品类目（三级）"
                            clearable
                            style="width: 100%"
                        />
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

        <el-button type="danger" @click="handleAdd">
            <el-icon size="16">
                <Delete />
            </el-icon>
            <span>批量下架</span>
        </el-button>

        <el-button type="success" @click="handleAdd">
            <el-icon size="16">
                <Box />
            </el-icon>
            <span>批量上架</span>
        </el-button>
        
            </div>
        <el-table 
            :data="productList" 
            style="width: 100%" 
            v-loading="loadStatus" 
            empty-text="没有更多了~" 
            border
            @selection-change="handleSelectionChange">
         <div class="mb-2 flex justify-start items-center h-12"> 
               <el-button type="success" @click="handleAdd">
                   <el-icon size="16">
                    <Plus />
                   </el-icon>
                   <span>新增</span>
               </el-button>
        
            </div>
            <el-table-column type="selection" width="50" />
            <el-table-column prop="id" label="商品信息" width="300" >
                <template #default="scope">
                    <div class="flex items-center p-2">
                        <img :src="scope.row.firstProductImg" alt="商品图片" class="w-12 h-12 rounded mr-3">
                        <div class="flex-1">
                            <div class="font-medium mb-1">{{ scope.row.productName}}</div>
                            <div class="flex items-center text-gray-500 text-sm">
                                <span class="mr-2">ID: {{ scope.row.id }}</span>
                                <el-icon class="cursor-pointer hover:text-gray-700" @click="copyToClipboard(scope.row.id)">
                                    <CopyDocument />
                                </el-icon>
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="copyrightName" label="所属IP" />
            <el-table-column prop="productName" label="商品名称" />
            <el-table-column prop="price" label="固定价格" />
            <el-table-column prop="statusStr" label="状态" width="80" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="updateTime" label="修改时间" />            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <div class="grid grid-cols-2 gap-2">    
                    <el-button 
                        v-if="scope.row.status == 2" 
                        type="danger" 
                        size="small" 
                        @click="clickStatusUpdate(scope.row)"  
                        class="!ml-0">下架</el-button>
                    <el-button 
                        v-else 
                        type="success" 
                        size="small" 
                        @click="clickStatusUpdate(scope.row)"  
                        class="!ml-0">上架</el-button>
                    <el-button type="primary" size="small" @click="clickEdit(scope.row)"  class="!ml-0">编辑</el-button>
                    <el-button color="#626aef" size="small" @click="clickSpec(scope.row)"  class="!ml-0">规格</el-button>
                    <el-button color="#6127c4" size="small" @click="clickChannel(scope.row)"  class="!ml-0">渠道</el-button>
                    <el-button type="danger" size="small" @click="clickDelete(scope.row)"  class="!ml-0">删除</el-button>
                    
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background class="mt-4 w-full flex justify-end" layout="prev, pager, next" :total="config.total"
            @current-change="handleClick" />
    </div>

<el-drawer v-model="dialogVisible" direction="rtl" @close="handleCancel" size="60%">
        <template #header>
        <h4>{{ action === 'add' ? '新增商品' : '编辑商品' }}</h4>
        </template>
        <template #default>
        <el-form :model="submitForm" ref="form" label-width="130px" label-position="left">              
                    
                    <el-form-item label="所属IP" prop="copyrightId" :rules="[{ required: true, message: '所属IP是必填项' }]">
                        <el-select v-model="submitForm.copyrightId" placeholder="请选择所属IP" style="width:148px">
                            <el-option v-for="item in copyrightOptions" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>  
                    </el-form-item>
                
                
                    <el-form-item label="商品名称" prop="productName" :rules="[{ required: true, message: '商品名称是必填项' }]">
                        <el-input v-model="submitForm.productName" placeholder="请输入商品名称" />
                    </el-form-item>
                
                
                    <el-form-item label="商品类目（三级）" prop="selectThirdCategoryId" :rules="[{ required: true, message: '商品类目是必填项' }]">
                        <el-cascader
                            v-model="submitForm.selectThirdCategoryId"
                            :options="categoryOptions"
                            :props="cascaderProps"
                            placeholder="请选择商品类目（三级）"
                            clearable
                            style="width: 100%"
                        />
                    </el-form-item>
                    <el-form-item label="商品主图" prop="picMainUrls" :rules="[{ required: true, message: '商品主图是必填项' }]">
                        <div class="flex gap-2 flex-wrap">
                            <div v-for="(pic, index) in submitForm.picMainUrls" :key="index">
                                <el-upload
                                    class="border-2 border-dashed border-gray-300 rounded-lg cursor-pointer relative overflow-hidden hover:border-blue-500 transition-colors"
                                    action="http://localhost:8080/api/common/upload"
                                    :show-file-list="false"
                                    :on-success="(response, uploadFile) => handlePicMainFileUploadSuccess(response, uploadFile, index)"
                                    :before-upload="proxy.$upload.validateImageFormat"
                                >
                                    <img :src="pic" class="w-[60px] h-[60px] object-cover rounded" />
                                </el-upload>
                            </div>
                            
                            <!-- 添加图片按钮，只有未达到10张时显示 -->
                            <el-upload
                                v-if="submitForm.picMainUrls && submitForm.picMainUrls.length < 10"
                                class="border-2 border-dashed border-gray-300 rounded-lg cursor-pointer relative overflow-hidden hover:border-blue-500 transition-colors"
                                action="http://localhost:8080/api/common/upload"
                                :show-file-list="false"
                                :on-success="handlePicMainFileUploadSuccess"
                                :before-upload="proxy.$upload.validateImageFormat"
                            >
                                <div class="w-[60px] h-[60px] flex items-center justify-center text-gray-400">
                                    <el-icon size="28"><Plus /></el-icon>
                                </div>
                            </el-upload>
                        </div>
                         </el-form-item>


                    <el-form-item label="商品介绍" prop="picIntroUrls" :rules="[{ required: true, message: '商品介绍是必填项' }]">
                        <div class="flex gap-2 flex-wrap">
                            <div v-for="(pic, index) in submitForm.picIntroUrls" :key="index">
                                <el-upload
                                    class="border-2 border-dashed border-gray-300 rounded-lg cursor-pointer relative overflow-hidden hover:border-blue-500 transition-colors"
                                    action="http://localhost:8080/api/common/upload"
                                    :show-file-list="false"
                                    :on-success="(response, uploadFile) => handlePicIntroFileUploadSuccess(response, uploadFile, index)"
                                    :before-upload="proxy.$upload.validateImageFormat"
                                >
                                    <img :src="pic" class="w-[60px] h-[60px] object-cover rounded" />
                                </el-upload>
                            </div>
                            
                            <!-- 添加图片按钮，只有未达到10张时显示 -->
                            <el-upload
                                v-if="submitForm.picIntroUrls && submitForm.picIntroUrls.length < 10"
                                class="border-2 border-dashed border-gray-300 rounded-lg cursor-pointer relative overflow-hidden hover:border-blue-500 transition-colors"
                                action="http://localhost:8080/api/common/upload"
                                :show-file-list="false"
                                :on-success="handlePicIntroFileUploadSuccess"
                                :before-upload="proxy.$upload.validateImageFormat"
                            >
                                <div class="w-[60px] h-[60px] flex items-center justify-center text-gray-400">
                                    <el-icon size="28"><Plus /></el-icon>
                                </div>
                            </el-upload>
                        </div>
                         </el-form-item>
                
                
                    <el-form-item label="价格设定" prop="priceType" :rules="[{ required: true, message: '价格设定是必填项' }]">
                        <el-select v-model="submitForm.priceType" placeholder="请选择价格设定" style="width:148px">
                            <el-option v-for="item in priceTypeSubmitOptions" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                
                
                    <el-form-item label="固定价格" prop="price" :rules="[{ required: isPriceRequired, message: '固定价格是必填项' }]" v-if="showPriceField">
                        <el-input v-model="submitForm.price" placeholder="请输入固定价格" />
                    </el-form-item>
                
                    <el-form-item label="销售状态" prop="saleStatus" :rules="[{ required: true, message: '状态是必填项' }]">
                        <el-select v-model="submitForm.saleStatus" placeholder="请选择销售状态" style="width:148px">
                            <el-option v-for="item in saleStatusSubmitOptions" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                
                
                    <el-form-item label="预计发货日期" prop="shippingDate" :rules="[{ required: isShippingDateRequired, message: '预计发货日期是必填项' }]" v-if="showShippingDateField">
                        <el-date-picker
                        v-model="submitForm.shippingDate"
                        type="date"
                        placeholder="请选择预计发货日期"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                    />                    </el-form-item>
                
                
                    <el-form-item label="销售渠道" prop="selectSaleChannelIds" :rules="[{ required: true, message: '销售渠道是必填项' }]">
                         <el-cascader
                            v-model="submitForm.selectSaleChannelIds"
                            :options="channelOptions"
                            :props="cascaderChannelProps"
                            placeholder="请选择销售渠道"
                            clearable
                            style="width: 100%"
                        />
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

<!-- 规格配置抽屉 -->
<el-drawer v-model="specDrawerVisible" direction="rtl" size="60%" @close="handleSpecCancel">
    <template #header>
        <div class="flex items-center justify-between">
            <h4>🛒 商品规格配置 | 步骤{{ specStep }}/3：{{ specStepTitle }}</h4>
        </div>
    </template>
    <template #default>
        <div class="spec-config">
            <!-- 商品名称固定显示 -->
            <div class="mb-4 p-3 bg-gray-50 rounded">
                <span class="font-medium">商品名称：</span>
                <span>{{ currentProduct.productName }}</span>
            </div>

            <!-- 步骤1：添加规格属性 -->
            <div v-if="specStep === 1">
                <el-collapse v-model="activeCollapse">
                    <el-collapse-item title="步骤1：添加规格属性" name="step1">
                        <div class="mb-4 p-3 bg-blue-50 rounded text-blue-700">
                            📌 操作提示：先创建规格组（如尺码/颜色），再添加具体属性值
                        </div>

                        <!-- 规格属性组列表 -->
                        <div class="space-y-4">
                            <div v-for="(spec, specIndex) in specForm.specs" :key="specIndex" class="border rounded p-4">
                                <div class="flex items-center justify-between mb-3">
                                    <el-input
                                        v-model="spec.name"
                                        placeholder="规格名称（如：尺码、颜色）"
                                        style="width: 200px"
                                    />
                                    <el-button type="danger" @click="removeSpec(specIndex)">删除此规格</el-button>
                                </div>
                                <div class="flex flex-wrap gap-2">
                                    <el-tag
                                        v-for="(value, valueIndex) in spec.values"
                                        :key="valueIndex"
                                        closable
                                        @close="removeSpecValue(specIndex, valueIndex)"
                                    >
                                        {{ value.name }}
                                    </el-tag>
                                    <el-input
                                        v-model="spec.newValue"
                                        placeholder="输入属性值"
                                        style="width: 120px"
                                        @keyup.enter="addSpecValue(specIndex)"
                                    />
                                    <el-button @click="addSpecValue(specIndex)">添加</el-button>
                                </div>
                            </div>
                        </div>

                        <el-button type="primary" class="mt-4" @click="addSpec">+ 新增规格组</el-button>
                    </el-collapse-item>
                </el-collapse>
            </div>

            <!-- 步骤2：预览SKU组合 -->
            <div v-if="specStep === 2">
                <el-collapse v-model="activeCollapse">
                    <el-collapse-item title="步骤2：预览SKU组合" name="step2">
                        <div class="mb-4 p-3 bg-blue-50 rounded text-blue-700">
                            📌 操作提示：系统已自动生成组合，可删除不需要的SKU
                        </div>

                        <!-- SKU组合列表 -->
                        <div class="space-y-2">
                            <div
                                v-for="(sku, index) in specForm.skus"
                                :key="index"
                                class="flex items-center justify-between p-3 border rounded"
                            >
                                <div class="flex items-center gap-3">
                                    <el-checkbox v-model="sku.checked" />
                                    <span class="font-medium">{{ sku.combination }}</span>
                                </div>
                                <el-button type="danger" @click="removeSku(index)">删除</el-button>
                            </div>
                        </div>
                        <div class="mt-4 flex gap-2">
                            <el-button @click="selectAllSku">全选</el-button>
                            <el-button @click="invertSelectSku">反选</el-button>
                            <el-button type="danger" @click="batchDeleteSku">批量删除</el-button>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>

            <!-- 步骤3：配置SKU库存与价格 -->
            <div v-if="specStep === 3">
                <el-collapse v-model="activeCollapse">
                    <el-collapse-item title="步骤3：配置SKU库存与价格" name="step3">
                        <div class="mb-4 p-3 bg-blue-50 rounded text-blue-700">
                            📌 操作提示：填写每个SKU的库存、价格等信息，支持批量操作
                        </div>

                        <!-- SKU编辑表格 -->
                        <el-table :data="specForm.skus" border style="w-full">
                            <el-table-column prop="combination" label="属性组合" min-width="100" />
                            <el-table-column prop="skuCode" label="货号" min-width="180">
                                <template #default="scope">
                                    <el-input v-model="scope.row.skuCode" placeholder="输入货号"/>
                                </template>
                            </el-table-column>
                            <el-table-column prop="price" label="售价" min-width="150">
                                <template #default="scope">
                                    <el-input-number v-model="scope.row.price" :min="0" :precision="2" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="stock" label="总库存" min-width="150">
                                <template #default="scope">
                                    <el-input-number v-model="scope.row.stock" :min="0" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="freezeStock" label="不可售库存" min-width="150">
                                <template #default="scope">
                                    <el-input-number v-model="scope.row.freezeStock" :min="0" />
                                </template>
                            </el-table-column>
                        </el-table>

                    <!-- 批量操作工具 -->
                    <div class="mt-4 flex gap-2">
                        <el-button color="#239595" @click="batchSetPrice">设置售价</el-button>
                        <el-button color="#cf21e4" @click="batchSetStock">设置库存</el-button>
                        <el-button color="#cf21e4" @click="batchSetFreezeStock">设置冻结库存</el-button>
                    </div>
                </el-collapse-item>
            </el-collapse>
            </div>
        </div>
    </template>
    <template #footer>
        <div class="flex justify-between">
            <el-button v-if="specStep > 1" @click="prevStep">上一步</el-button>
            <div></div>
            <div class="flex gap-2">
                <el-button v-if="specStep < 3" type="primary" @click="nextStep">下一步</el-button>
                <el-button v-if="specStep === 3" type="primary" @click="saveSpec">保存并完成</el-button>
            </div>
        </div>
    </template>
    
</el-drawer>

<!-- 渠道配置抽屉 -->
<el-drawer v-model="channelDrawerVisible" direction="rtl" size="70%" @close="handleChannelCancel">
    <template #header>
        <h4>📱 商品渠道配置</h4>
    </template>
    <template #default>
        <div class="channel-config">
            <!-- 商品信息头部 -->
            <div class="mb-4 p-3 bg-gray-50 rounded border">
                <div class="flex gap-6">
                    <span class="font-medium">商品名称：</span>
                    <span>{{ currentProduct.productName }}</span>
                </div>
                <div class="flex gap-6 mt-2">
                    <span class="font-medium">商品ID：</span>
                    <span>{{ currentProduct.id }}</span>
                </div>
            </div>

            <!-- 渠道配置区域 -->
            <div class="channel-cards space-y-4">
                <el-card v-for="(channel, index) in channelForm.channels" :key="channel.channelId" shadow="hover">
                    <template #header>
                        <div class="flex items-center justify-between">
                            <span class="font-medium">渠道{{ index + 1 }}：{{ channel.channelName }}</span>
                            <el-tag :type="channel.stockStrategy === 1 ? 'success' : 'warning'">
                                {{ channel.stockStrategy === 1 ? '共享库存' : '独立库存' }}
                            </el-tag>
                        </div>
                    </template>
                    <div class="space-y-3">
                        <!-- 平台商品ID -->
                        <div class="flex items-center">
                            <span class="w-24 text-right mr-2 text-gray-600">平台商品ID：</span>
                            <el-input
                                v-model="channel.platformProductId"
                                placeholder="请输入平台商品ID"
                                :disabled="channel.id > 0"
                                style="width: 300px"
                            />
                        </div>

                        <!-- 库存策略 -->
                        <div class="flex items-center">
                            <span class="w-24 text-right mr-2 text-gray-600">库存策略：</span>
                            <el-radio-group v-model="channel.stockStrategy" @change="onStockStrategyChange(channel)">
                                <el-radio :label="1">共享库存</el-radio>
                                <el-radio :label="2">独立库存</el-radio>
                            </el-radio-group>
                        </div>

 <!-- SKU库存锁定面板 -->
                        <div v-if="channel.stockStrategy === 2" class="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
                            <div class="mb-3 font-medium text-blue-700">
                                🔒 {{ channel.channelName }}渠道 - SKU库存锁定面板
                            </div>
                            <el-table :data="channel.skuList" border style="width: 100%" max-height="400">
                                <el-table-column prop="specCombination" label="规格组合" min-width="200" />
                                <el-table-column prop="shareNum" label="可锁数量" width="100" />
                                <el-table-column prop="lockNum" label="锁定数量" width="150">
                                    <template #default="scope">
                                        <el-input-number
                                            v-model="scope.row.lockNum"
                                            :min="0"
                                            :max="scope.row.shareNum"
                                            size="small"
                                            style="width: 100%"
                                        />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="surplusNum" label="剩余数量" width="100">
                                    <template #default="scope">
                                        <span :class="scope.row.surplusNum > 0 ? 'text-green-600' : 'text-red-600'">
                                            {{ scope.row.surplusNum }}
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="mt-3 flex gap-2">
                                <el-button type="primary" size="small" @click="batchLockSku(channel)">
                                    批量锁定
                                </el-button>
                                <el-button size="small" @click="cancelSkuLock(channel)">
                                    重置
                                </el-button>
                            </div>
                        </div>
                        <!-- 操作按钮 -->
                        <div class="flex items-center gap-2">
                            <el-button type="success" size="small" @click="saveSkuLock(channel)">
                                保存
                            </el-button>
                        </div>

                       
                    </div>
                </el-card>
            </div>
        </div>
    </template>
    <template #footer>
        <div class="flex justify-end">
            <el-button type="primary" @click="channelDrawerVisible = false">完成分配</el-button>
        </div>
    </template>
</el-drawer>
</template>

<script setup>
import { onMounted, getCurrentInstance, ref, reactive, computed } from 'vue';
import { ElMessageBox } from 'element-plus';
import { initCopyrightOptions, initCategoryTree, initChannelOptions } from '../../api/api_utils.js';
import { all } from 'axios';
import { CopyDocument } from '@element-plus/icons-vue';
import { generateUUID } from '../../utils/uuid.js';

const { proxy } = getCurrentInstance()

// 请求参数
const config = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 0,
})

// 枚举
const priceTypeOptions = ref([])
const priceTypeSubmitOptions = ref([])
const statusOptions = ref([])
const statusSubmitOptions = ref([])
const saleStatusOptions = ref([])
const saleStatusSubmitOptions = ref([])

// dialog展示控制
const dialogVisible = ref(false)

// 搜索参数
const searchForm = reactive({
    copyrightId: '',
    productName: '',
    thirdCategoryId: '',
    priceType: '',
    price: '',
    status: '',
    saleStatus: '',
    shippingDate: '',
    saleChannelIds: ''})

// table加载状态
const loadStatus = ref(true)

// list列表
const productList = ref([])

// 选中的行
const selectedRows = ref([])

const copyrightOptions = ref([])
const categoryOptions = ref([])
const channelOptions = ref([])

// 弹窗 - 状态
const action = ref('add');

// 规格配置相关
const specDrawerVisible = ref(false)
const specStep = ref(1)
const currentProduct = ref({})
const specForm = reactive({
    specs: [],
    skus: []
})

// 渠道配置相关
const channelDrawerVisible = ref(false)
const channelForm = reactive({
    channels: []
})
const allChannelList = ref([])

// 步骤标题
const specStepTitle = computed(() => {
    const titles = {
        1: '添加规格属性',
        2: '预览SKU组合',
        3: '配置SKU库存与价格'
    }
    return titles[specStep.value]
})

// 折叠面板展开状态（默认展开当前步骤）
const activeCollapse = ref(['step1'])

// 级联选择器配置
const cascaderProps = {
    multiple: false,  // 是否多选
    checkStrictly: false,  // 是否可以选择任意一级
    emitPath: false,  // 是否返回由该节点所在的各级菜单的值所组成的数组
    label: 'label',
    value: 'value',
    children: 'children',
}

const cascaderChannelProps = {
    multiple: true,  // 是否多选
    checkStrictly: false,  // 是否可以选择任意一级
    emitPath: false,  // 是否返回由该节点所在的各级菜单的值所组成的数组
    label: 'label',
    value: 'value',
    children: 'children',
}

// 计算属性：是否显示固定价格字段
const showPriceField = computed(() => {
    return submitForm.priceType === 1
})

// 计算属性：固定价格字段是否必填
const isPriceRequired = computed(() => {
    return showPriceField.value
})

// 计算属性：是否显示预计发货日期字段
const showShippingDateField = computed(() => {
    return submitForm.saleStatus === 2 // 假设2是"预售"状态的值
})

// 计算属性：预计发货日期字段是否必填
const isShippingDateRequired = computed(() => {
    return showShippingDateField.value
})

onMounted(async () => {
    await initCopyrightOptions(copyrightOptions, proxy)
    await initCategoryTree(categoryOptions, proxy)
    await initChannelOptions(channelOptions, proxy)
    queryProductList()
})


// 查询
async function queryProductList() {
    loadStatus.value = true;
    const { data: data } = await proxy.$api.queryProductList(config)
    loadStatus.value = false;
    productList.value = data.list
    console.log(productList)
    config.total = data.total
priceTypeOptions.value = data.priceTypes
priceTypeSubmitOptions.value = data.priceTypes.filter(x=>x.value !== 0)
statusOptions.value = data.statuss
statusSubmitOptions.value = data.statuss.filter(x=>x.value !== 0)
saleStatusOptions.value = data.saleStatuss
saleStatusSubmitOptions.value = data.saleStatuss.filter(x=>x.value !== 0)}

// 分页点击
function handleClick(pageNo) {
    config.pageNo = pageNo
    queryProductList()
}

// 搜索点击
function clickSearch() {
    if (searchForm.copyrightId.toString().length > 0) {
        config.copyrightId = searchForm.copyrightId
    }
    config.productName = searchForm.productName

    if (searchForm.thirdCategoryId && searchForm.thirdCategoryId.toString().length > 0) {
        config.thirdCategoryId = searchForm.thirdCategoryId
    } else {
        config.thirdCategoryId = 0
    }
    if (searchForm.priceType.toString().length > 0) {
        config.priceType = searchForm.priceType
    }
    config.price = searchForm.price

    if (searchForm.status.toString().length > 0) {
        config.status = searchForm.status
    }
    if (searchForm.saleStatus.toString().length > 0) {
        config.saleStatus = searchForm.saleStatus
    }
    config.shippingDate = searchForm.shippingDate

    config.saleChannelIds = searchForm.saleChannelIds
    queryProductList()
}

// 弹窗 - 新增
function handleAdd() {
    dialogVisible.value = true
    action.value = 'add'
    // 确保新增时初始化空数组
    submitForm.picMainUrls = []
    submitForm.picIntroUrls = []
}

// 弹窗 - 编辑
async function clickEdit(item) {
    action.value = 'edit'
    dialogVisible.value = true

    proxy.$nextTick(async () => {
         console.log('item', item)
        submitForm.id = item.id
        submitForm.copyrightId = item.copyrightId

        submitForm.productName = item.productName

        submitForm.thirdCategoryId = item.thirdCategoryId

        submitForm.priceType = item.priceType

        submitForm.price = item.price

        submitForm.status = item.status

        submitForm.saleStatus = item.saleStatus

        submitForm.shippingDate = item.shippingDate

        submitForm.saleChannelIds = item.saleChannelIds

           // 处理销售渠道ID，将字符串转换为数字数组
        submitForm.selectSaleChannelIds = item.saleChannelIds ? item.saleChannelIds.split(',').map(id => parseInt(id, 0)) : []

        // 处理三级分类ID，将字符串转换为数字（单选模式）
        submitForm.selectThirdCategoryId = item.thirdCategoryId + ''

        const {data:pics} = await proxy.$api.queryProductPicList({ productId: item.id })
        submitForm.picMainUrls = pics.list.filter(x=>x.fileType === 1).map(x => x.fileUrl) || []
        submitForm.picIntroUrls = pics.list.filter(x=>x.fileType === 2).map(x => x.fileUrl) || []

        console.log('edit', submitForm)
    });
}

function handlePicMainFileUploadSuccess(response, uploadFile, index) {
    const newImageUrl = proxy.$upload.handleUploadSuccess(response, uploadFile)
    
    if (index !== undefined && index >= 0 && index < submitForm.picMainUrls.length) {
        // 使用splice方法确保响应式更新
        submitForm.picMainUrls.splice(index, 1, newImageUrl)
    } else {
        // 否则是添加新图片
        submitForm.picMainUrls.push(newImageUrl)
        console.log('picMainUrls', submitForm.picMainUrls)
    }
}

function handlePicIntroFileUploadSuccess(response, uploadFile, index) {
    const newImageUrl = proxy.$upload.handleUploadSuccess(response, uploadFile)
    
    if (index !== undefined && index >= 0 && index < submitForm.picIntroUrls.length) {
        // 使用splice方法确保响应式更新
        submitForm.picIntroUrls.splice(index, 1, newImageUrl)
    } else {
        // 否则是添加新图片
        submitForm.picIntroUrls.push(newImageUrl)
        console.log('picIntroUrls', submitForm.picIntroUrls)
    }
}

// form - 新增/修改
let submitForm = reactive({
    copyrightId: '',
    productName: '',
    thirdCategoryId: '',
    priceType: '',
    price: '',
    status: '',
    saleStatus: '',
    shippingDate: '',
    saleChannelIds: '',
    selectThirdCategoryId: null,
    selectSaleChannelIds: [],
    picMainUrls:[],
    picIntroUrls:[]
    })
async function onSubmit() {
    proxy.$refs.form.validate(async (valid, fields) => {
        if (valid) {
            // 处理销售渠道ID，将数组转换为逗号分隔的字符串
            submitForm.saleChannelIds = submitForm.selectSaleChannelIds.join(',')
            
            // 处理三级分类ID，将单选值转换为字符串
            submitForm.thirdCategoryId = submitForm.selectThirdCategoryId ? submitForm.selectThirdCategoryId.toString() : ''
            
            if (action.value === 'add') {
                submitForm.id = null
                const res = await proxy.$api.addProduct(submitForm)
                resetAndToast(res)
            } else {
                const res = await proxy.$api.modifyProduct(submitForm)
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
        // 重置动态字段
        submitForm.price = ''
        submitForm.shippingDate = ''
        submitForm.picMainUrls = []
        submitForm.picIntroUrls = []
        queryProductList()
        proxy.$toast.success()
    }
}

// 按钮 - 取消
function handleCancel() {
    dialogVisible.value = false
    proxy.$nextTick(() => {
        proxy.$refs.form.resetFields();
        // 重置动态字段
        submitForm.price = ''
        submitForm.shippingDate = ''
        submitForm.picMainUrls = []
        submitForm.picIntroUrls = []
    });

}

// 处理表格选择变化
function handleSelectionChange(selection) {
    selectedRows.value = selection
    console.log('选中的行:', selection)
}

// 复制到剪贴板
function copyToClipboard(id) {
    navigator.clipboard.writeText(id.toString()).then(() => {
        proxy.$toast.success('ID已复制到剪贴板')
    }).catch(err => {
        console.error('复制失败:', err)
        // 降级方案
        const textArea = document.createElement('textarea')
        textArea.value = id.toString()
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        proxy.$toast.success('ID已复制到剪贴板')
    })
}

// 按钮 - 更新状态
function clickStatusUpdate(item) {
    proxy.$toast.confirm('确定更新状态吗？', async () => {
        // 2是上架，3是下架
        const status = item.status == 2 ? 3 : 2
        const res = await proxy.$api.modifyStatusProduct({ id: item.id, status: status })
        queryProductList()
        if (res) {
            proxy.$toast.success()
        }
    })
}


// 按钮 - 删除
function clickDelete(item) {
    proxy.$toast.confirm('确定删除吗？', async () => {
        const res = await proxy.$api.removeProduct({ id: item.id })
        queryProductList()
        if (res) {
            proxy.$toast.success()
        }
    })
}

// ==================== 规格配置相关方法 ====================

// 点击规格按钮
async function clickSpec(item) {
    currentProduct.value = item
    specDrawerVisible.value = true

    // 请求规格数据
    const { data: specData } = await proxy.$api.getSpecAndStock(item.id)
    console.log('规格数据', specData)

    // 填充数据
    if (specData && specData.specs && specData.skus && specData.skus.length > 0) {
        // 有数据，跳转到第三步
        specStep.value = 3
        activeCollapse.value = ['step3']

        // 填充规格组
        const newSpecs = specData.specs.map(spec => ({
            id: spec.id,
            name: spec.name,
            values: spec.values.map(v => ({
                id: v.id,
                name: v.name
            })),
            newValue: ''
        }))
        specForm.specs.length = 0
        specForm.specs.push(...newSpecs)

        // 填充SKU数据，需要构建属性组合显示
        const newSkus = specData.skus.map(sku => {
            // 根据 specValueIds 查找对应的属性名称
            const specValueNames = sku.specValueIds.map(valueId => {
                for (const spec of specData.specs) {
                    const value = spec.values.find(v => v.id === valueId)
                    if (value) {
                        return `${spec.name}:${value.name}`
                    }
                }
                return ''
            }).filter(name => name).join(' / ')

            return {
                id: sku.id,
                combination: specValueNames,
                specValueIds: sku.specValueIds,
                skuCode: sku.skuCode,
                price: sku.price,
                stock: sku.stock,
                freezeStock: sku.freezeStock || 0,
                checked: true
            }
        })
        specForm.skus.length = 0
        specForm.skus.push(...newSkus)

        console.log('填充后的 SKU 数据:', specForm.skus)
    } else {
        // 没有数据，从第一步开始
        specStep.value = 1
        activeCollapse.value = ['step1']
        specForm.specs.length = 0
        specForm.skus.length = 0
    }
}

// 返回商品列表
function backToProductList() {
    specDrawerVisible.value = false
}

// 取消规格配置
function handleSpecCancel() {
    specDrawerVisible.value = false
}

// 添加规格组
function addSpec() {
    // 规格组编号使用UUID
    const specId = generateUUID()
    specForm.specs.push({
        id: specId,
        name: '',
        values: [],
        newValue: ''
    })
}

// 删除规格组
function removeSpec(index) {
    specForm.specs.splice(index, 1)
}

// 添加规格值
function addSpecValue(specIndex) {
    const spec = specForm.specs[specIndex]
    if (spec.newValue && spec.newValue.trim()) {
        // 属性编号使用UUID
        const valueId = generateUUID()
        spec.values.push({
            id: valueId,
            name: spec.newValue.trim()
        })
        spec.newValue = ''
    }
}

// 删除规格值
function removeSpecValue(specIndex, valueIndex) {
    specForm.specs[specIndex].values.splice(valueIndex, 1)
}

// 下一步
function nextStep() {
    if (specStep.value === 1) {
        // 步骤1 -> 步骤2：生成SKU组合
        generateSkuCombinations()
    }
    if (specStep.value < 3) {
        specStep.value++
        // 切换步骤时展开对应的折叠面板
        activeCollapse.value = [`step${specStep.value}`]
    }
}

// 上一步
function prevStep() {
    if (specStep.value > 1) {
        specStep.value--
        // 切换步骤时展开对应的折叠面板
        activeCollapse.value = [`step${specStep.value}`]
    }
}

// 生成SKU组合
function generateSkuCombinations() {
    const specs = specForm.specs.filter(s => s.name && s.values.length > 0)
    if (specs.length === 0) {
        proxy.$toast.warning('请至少添加一个规格组并填写属性值')
        return
    }

    // 生成所有组合
    const combinations = cartesianProduct(...specs.map(s => s.values.map(v => ({ specId: s.id, specName: s.name, valueId: v.id, valueName: v.name }))))

    specForm.skus = combinations.map((combo, index) => ({
        id: index + 1,
        combination: combo.map(c => `${c.specName}:${c.valueName}`).join(' / '),
        // 记录属性编号组合，用于提交给后台
        specValueIds: combo.map(c => c.valueId),
        skuCode: '',
        price: 0,
        stock: 0,
        freezeStock: 0,
        checked: true
    }))
}

// 笛卡尔积生成组合
function cartesianProduct(...arrays) {
    if (arrays.length === 0) return [[]]
    const [first, ...rest] = arrays
    const restProduct = cartesianProduct(...rest)
    return first.flatMap(item => restProduct.map(restItem => [item, ...restItem].flat()))
}

// 全选SKU
function selectAllSku() {
    specForm.skus.forEach(sku => sku.checked = true)
}

// 反选SKU
function invertSelectSku() {
    specForm.skus.forEach(sku => sku.checked = !sku.checked)
}

// 删除单个SKU
function removeSku(index) {
    specForm.skus.splice(index, 1)
}

// 批量删除SKU
function batchDeleteSku() {
    specForm.skus = specForm.skus.filter(sku => !sku.checked)
}

// 批量设置价格
function batchSetPrice() {

    proxy.$toast.prompt('请输入批量售价', '批量设置', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d+(\.\d{1,2})?$/,
        inputErrorMessage: '请输入有效的价格'
    }, (value) => {
        const price = parseFloat(value)
        specForm.skus.forEach(sku => sku.price = price)
        proxy.$toast.success('批量设置成功')
    })

}

// 批量设置库存
function batchSetStock() {
    
    proxy.$toast.prompt('请输入批量库存', '批量设置', {
        confirmButtonText: '确定', 
        cancelButtonText: '取消',
        inputPattern: /^\d+$/,
        inputErrorMessage: '请输入有效的库存数量'
    }, (value) => {
        const stock = parseInt(value)
        specForm.skus.forEach(sku => sku.stock = stock)
        proxy.$toast.success('批量设置成功')
    })

}

function batchSetFreezeStock() {
    
    proxy.$toast.prompt('请输入批量冻结库存', '批量设置', {
        confirmButtonText: '确定', 
        cancelButtonText: '取消',
        inputPattern: /^\d+$/,
        inputErrorMessage: '请输入有效的冻结库存数量'
    }, (value) => {
        const freezeStock = parseInt(value)
        specForm.skus.forEach(sku => sku.freezeStock = freezeStock)
        proxy.$toast.success('批量设置成功')
    })

}

// 保存规格配置
async function saveSpec() {
    // 验证
    const validSkus = specForm.skus.filter(sku => sku.checked)
    if (validSkus.length === 0) {
        proxy.$toast.warning('请至少选择一个SKU')
        return
    }

    // 构造提交数据
    const submitData = {
        productId: currentProduct.value.id,
        specs: specForm.specs.map(s => ({
            id: s.id,
            name: s.name,
            values: s.values.map(v => ({
                id: v.id,
                name: v.name
            }))
        })),
        skus: validSkus.map(sku => ({
            skuCode: sku.skuCode,
            specValueIds: sku.specValueIds, // 属性编号组合
            price: sku.price,
            stock: sku.stock,
            freezeStock: sku.freezeStock || 0
        }))
    }

    try {
        const res = await proxy.$api.saveProductSpec(submitData)
        if (res) {
            proxy.$toast.success('规格配置保存成功')
            specDrawerVisible.value = false
            // 刷新商品列表
            queryProductList()
        }
    } catch (error) {
        proxy.$toast.error('规格配置保存失败: ' + (error.message || '未知错误'))
    }
}

// ==================== 渠道配置相关方法 ====================

// 点击渠道按钮
async function clickChannel(item) {
    currentProduct.value = item
    channelDrawerVisible.value = true

    // 加载所有渠道列表
    const { data: channelList } = await proxy.$api.queryChannelList({ pageNo: 1, pageSize: 100 })
    allChannelList.value = channelList || []

    // 加载已配置的渠道数据
    const { data: configData } = await proxy.$api.queryProductChannelConfigList(item.id)

    console.log('渠道配置数据', configData)
    // 初始化渠道配置
    if (configData && configData.length > 0) {
        // 已有配置数据
        channelForm.channels = configData.map(config => {
            return {
                id: config.id,
                channelId: config.channelId,
                channelName: config.channelName || '',
                platformProductId: config.platformProductId || '',
                stockStrategy: config.stockStrategy || 1,
                skuList: []
            }
        })
        console.log('已配置渠道数据', channelForm.channels)

        // 为独立库存的渠道加载SKU数据
        for (const channel of channelForm.channels) {
            if (channel.stockStrategy === 2) {
                await loadChannelSkuList(channel)
            }
        }
    } else {
        // 没有配置数据,使用所有渠道初始化
        channelForm.channels = allChannelList.value.map(channel => ({
            channelId: channel.id,
            channelName: channel.name,
            platformProductId: '',
            stockStrategy: 1,
            skuList: []
        }))
    }
}

// 库存策略改变时触发
async function onStockStrategyChange(channel) {
    // 如果切换到独立库存且没有SKU数据,则加载SKU数据
    if (channel.stockStrategy === 2 && (!channel.skuList || channel.skuList.length === 0)) {
        await loadChannelSkuList(channel)
    }
}

// 加载渠道SKU列表
async function loadChannelSkuList(channel) {
    const { data: skuList } = await proxy.$api.queryProductSkuList(currentProduct.value.id, channel.channelId)

    if (skuList && skuList.length > 0) {
        channel.skuList = skuList.map(sku => ({
            id: sku.id,
            skuId: sku.skuId,
            specCombination: sku.specCombination || '',
            shareNum: sku.shareNum || 0,
            lockNum: sku.lockNum || 0,
            surplusNum: sku.surplusNum || 0
        }))
    } else {
        channel.skuList = []
    }
}

// 保存单个渠道配置
async function saveChannelItem(channel) {
    if (!channel.platformProductId) {
        proxy.$toast.warning('请输入平台商品ID')
        return
    }

    try {
        const res = await proxy.$api.saveChannelConfig({
            productId: currentProduct.value.id,
            platformProducts: [{
                platformProductId: channel.platformProductId,
                stockStrategy: channel.stockStrategy,
                channelId: channel.channelId
            }]
        })

        if (res) {
            proxy.$toast.success('渠道配置保存成功')
        }
    } catch (error) {
        proxy.$toast.error('渠道配置保存失败: ' + (error.message || '未知错误'))
    }
}

// 保存所有渠道配置
async function saveAllChannelConfig() {
    const platformProducts = channelForm.channels
        .filter(channel => channel.platformProductId)
        .map(channel => ({
            platformProductId: channel.platformProductId,
            stockStrategy: channel.stockStrategy,
            channelId: channel.channelId
        }))

    if (platformProducts.length === 0) {
        proxy.$toast.warning('请至少配置一个渠道的平台商品ID')
        return
    }

    try {
        const res = await proxy.$api.saveChannelConfig({
            productId: currentProduct.value.id,
            platformProducts
        })

        if (res) {
            proxy.$toast.success('所有渠道配置保存成功')
            channelDrawerVisible.value = false
            queryProductList()
        }
    } catch (error) {
        proxy.$toast.error('渠道配置保存失败: ' + (error.message || '未知错误'))
    }
}

// 保存渠道SKU库存锁定
async function saveSkuLock(channel) {
    console.log('保存SKU锁定', channel)

    const skuData = channel.skuList
        .filter(sku => sku.lockNum > 0)
        .map(sku => ({
            skuId: sku.skuId,
            lockNum: sku.lockNum
        }))

    if (channel.stockStrategy == 2 && skuData.length === 0) {
        proxy.$toast.warning('请至少锁定一个SKU的库存')
        return
    }

    try {
        const res = await proxy.$api.saveChannelSkuLock({
            id: channel.id,
            productId: currentProduct.value.id,
            platformProductId: channel.platformProductId,
            channelId: channel.channelId,
            stockStrategy: channel.stockStrategy,
            sku: skuData
        })

        if (res) {
            proxy.$toast.success('保存成功')
            // 重新加载SKU数据
            await loadChannelSkuList(channel)
        }
    } catch (error) {
        proxy.$toast.error('保存失败: ' + (error.message || '未知错误'))
    }
}

// 批量锁定SKU
function batchLockSku(channel) {
    proxy.$toast.prompt('请输入批量锁定数量', '批量锁定', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d+$/,
        inputErrorMessage: '请输入有效的数量'
    }, (value) => {
        const lockNum = parseInt(value)
        channel.skuList.forEach(sku => {
            if (sku.lockNum + lockNum <= sku.shareNum) {
                sku.lockNum += lockNum
            } else {
                sku.lockNum = sku.shareNum
            }
        })
        proxy.$toast.success('批量锁定成功')
    })
}

// 取消SKU锁定
function cancelSkuLock(channel) {
    channel.skuList.forEach(sku => {
        sku.lockNum = 0
    })
    proxy.$toast.success('已取消所有锁定')
}

// 取消渠道配置
function handleChannelCancel() {
    channelDrawerVisible.value = false
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
