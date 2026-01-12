<template>
    <el-aside :width="$store.state.isCollapse ? '180px' : '64px'">

        <h3 v-show="$store.state.isCollapse">xxxxx</h3>
        <h3 v-show="!$store.state.isCollapse">yyyy</h3>
        <el-menu class="el-menu-vertical-demo" text-color="#FFFFFF" background-color="#545C64"
            :collapse="!$store.state.isCollapse" :collapse-transition="false">
            <el-menu-item :index="item.path" v-for="item in noChildren()" :key="item.path" @click="clickMenu(item)">
                <component class="icons" :is="item.icon"></component>
                <span>{{ item.label }}</span>
            </el-menu-item>


            <el-sub-menu :index="item.label" v-for="item in hasChildren()" :key="item.path">

                <template #title>
                    <component class="icons" :is="item.icon"></component>
                    <span>{{ item.label }}</span>
                </template>

                <el-menu-item-group>
                    <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex"
                        @click="clickMenu(subItem)">
                        <component class="icons" :is="subItem.icon"></component>
                        <span>{{ subItem.label }}</span>
                    </el-menu-item>
                </el-menu-item-group>

            </el-sub-menu>

        </el-menu>
    </el-aside>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { getCurrentInstance, ref, onMounted } from 'vue';
import {useStore} from 'vuex'
const list = ref([])
const {proxy} = getCurrentInstance()
const store = useStore()
const menus = store.state.menu

function noChildren() {
    return menus.filter((item) => !item.children)
}

function hasChildren() {
    return menus.filter((item) => item.children)
}

const router = useRouter()
function clickMenu(menu) {
    router.push({
        name: menu.name
    })
    store.commit('selectMenu', menu)
}

</script>

<style lang="css" scoped>
.el-aside {
    h3 {
        line-height: 48px;
        color: #FFFFFF;
        text-align: center;
    }
}

.icons {
    width: 18px;
    height: 18px;
}

.menus {
    background-color: #545C64;
    color: #FFFFFF;
}

.el-menu {
    border-right: none;

}
</style>