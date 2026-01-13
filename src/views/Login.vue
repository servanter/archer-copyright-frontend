<template>
    <div class="login-page">
        <div class="login-box">
            <div class="logo-container">
                <h1>欢迎</h1>
            </div>
            <div class="form-container">
                <input type="text" placeholder="用户名" v-model="loginForm.userName" />
                <input type="password" placeholder="密码" v-model="loginForm.password" />
                <button @click="login">登录</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { getCurrentInstance } from 'vue';
import { useStore } from 'vuex'
const { proxy } = getCurrentInstance()
const store = useStore()
import routerGlobal from '../router';

let loginForm = reactive({
    userName: 'admin',
    password: 'password'
})

async function login() {
    const res = await proxy.$api.login(loginForm)
    if (res) {

        store.commit('setMenuData', res.data.menus)
        store.commit('initMenuData', routerGlobal)
        store.commit('setToken', res.data.token)
        routerGlobal.push({
            name: 'home'
        })
    }

}
</script>

<style lang="less">
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('../assets/1.png'); // 替换成你实际的背景大图路径
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    .login-box {
        background-color: white;
        padding: 30px;
        width: 360px;
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 0 5px #cacaca;

        .logo-container {
            text-align: center;
            margin-bottom: 30px;

            h1 {
                color: #303133;
                font-size: 28px;
            }
        }

        .form-container {
            input {
                width: 100%;
                height: 44px;
                border: 1px solid #dcdfe6;
                border-radius: 4px;
                padding: 0 15px;
                margin-bottom: 20px;
                box-sizing: border-box;

                &:focus {
                    border-color: #409EFF;
                    outline: none;
                }
            }

            button {
                width: 100%;
                height: 44px;
                background-color: #409EFF;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;

                &:hover {
                    background-color: #66b1ff;
                }
            }
        }

        .link-container {
            text-align: right;
            margin-top: 20px;

            a {
                color: #909399;
                text-decoration: none;
                margin-left: 10px;

                &:hover {
                    color: #409EFF;
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>