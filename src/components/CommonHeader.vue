<template>
    <div class="h-16 w-full">
    <el-header class="h-full">
        <div class="l-content h-16">
            <el-button size="small" plain @click="handlerCollapse">
                <el-icon>
                    <Menu />
                </el-icon>
            </el-button>
            <h3>
                <el-breadcrumb separator="/" class="bread">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-if="currentMenu" :to="currentMenu.path">{{ currentMenu.label }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </h3>
        </div>
        <div class="h-full flex items-center ">
            <el-dropdown class=" w-28 h-full ">
                <span class="flex items-center w-28 justify-center cursor-pointer hover:bg-gray-100 rounded">
                    <img :src="getImgSrc('user.png')" class="h-[40px] w-[40px] rounded-full">
                    <span class="ml-2">张三</span>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>
        
    </el-header>
    <hr class="w-full" style="color:#e4e7ed">
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
const getImgSrc = (name) => {
    return new URL('../assets/' + name, import.meta.url).href
}
const store = useStore()
const router = useRouter()
function handlerCollapse() {
    store.commit('updateIsCollapse')
}
const currentMenu = computed(() => { return store.state.currentMenu })

function logout() {
    store.commit('logout')
    router.push({
        name : 'login'
    })
}
</script>

<style lang="less" scoped>
:deep(.el-header) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: white;
    height: 100%;
    
}

.l-content {
    display: flex;
    justify-content: center;
    align-items: center;

    .el-button {
        margin-right: 20px;
    }
  
}

:deep(.bread span) {
    color: black!important;
    cursor: pointer !important;
}

</style>