<template>
    <el-form :model="loginForm" class="login-container">
        <h3>系统登录</h3>
        <el-form-item>
            <el-input type="input" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup>
import { reactive } from 'vue';
import { getCurrentInstance } from 'vue';
import { useStore } from 'vuex'
const { proxy } = getCurrentInstance()
const store = useStore()
import routerGlobal from '../router';

let loginForm = reactive({
    username: 'admin',
    password: 'password'
})

/**
 * 用户登录处理函数
 * 
 * @async
 * @function login
 * @description 处理用户登录逻辑，包括调用API、设置菜单数据、存储token和路由跳转
 * 
 * @returns {Promise<void>} 无返回值
 * 
 * @throws {Error} 如果登录API调用失败或返回无效数据
 * 
 * @example
 * // 在组件中调用
 * login()
 */
async function login() {
    const res = await proxy.$api.login(loginForm)
    console.log('res ', res)
    if (res) {
        store.commit('setMenuData', res.data.menuData)
        store.commit('initMenuData', routerGlobal)
        console.log('rrrrr ', routerGlobal)
        store.commit('setToken', res.data.token)
        routerGlobal.push({
            name: 'home'
        })
    }


}

</script>
<style lang="less" scoped>
.login-container {
    width: 350px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cacaca;
    margin: 180px auto;

    h3 {
        text-align: center;
        margin-bottom: 20px;
        color: #505450
    }

    :deep(.el-form-item__content) {
        justify-content: center;
    }
}
</style>