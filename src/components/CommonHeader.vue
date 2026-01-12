<template>
    <el-header>
        <div class="l-content">
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
        <div class="r-content">

            <el-dropdown>
                <span class="el-dropdown-link">
                    <img :src="getImgSrc('user.png')" class="user">
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
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #333
}

.r-content {
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}

.l-content {
    display: flex;
    justify-content: center;
    align-items: center;

    .el-button {
        margin-right: 20px;
    }

    h3 {
        color: #FFF;
    }
}

:deep(.bread span) {
    color: #FFFFFF !important;
    cursor: pointer !important;
}
</style>