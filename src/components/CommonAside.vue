<template>
    <el-aside :width="$store.state.isCollapse ? '180px' : '60px'">

       <div class="h-16 flex flex-col items-center justify-center">
         <p v-show="$store.state.isCollapse" class="text-xl text-center text-gray-500 flex items-center justify-center h-12">xxxxxx</p>
        <p v-show="!$store.state.isCollapse" class="text-center text-gray-500">xxxxxx</p>
       </div>
       <hr class="border-gray-300">
        <el-menu class="el-menu-vertical-demo" text-color="black" 
            :collapse="!$store.state.isCollapse" :collapse-transition="true">
            <el-menu-item :index="item.path" v-for="item in noChildren()" :key="item.path" @click="clickMenu(item)" :class="!$store.state.isCollapse ? 'flex items-center justify-center' : 'gap-1 flex items-center mx-auto  justify-between w-3/4'">
                <component :class="$store.state.isCollapse ? 'h-[24px] w-[24px]' : 'h-[18px] w-[18px]'" :is="item.icon"></component>
                <span>{{ item.label }}</span>
            </el-menu-item>

            <el-sub-menu :index="item.label" v-for="item in hasChildren()" :key="item.path">

                <template #title>
                    <component :class="$store.state.isCollapse ? 'h-[24px] w-[24px]' : 'h-[18px] w-[18px]'" :is="item.icon"></component>
                    <span>{{ item.label }}</span>
                </template>

                <el-menu-item-group>
                    <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex"
                        @click="clickMenu(subItem)">
                        <component :class="$store.state.isCollapse ? 'h-[24px] w-[24px]' : 'h-[18px] w-[18px]'" :is="subItem.icon"></component>
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
    border-right: 1px solid #e4e7ed;
    h3 {
        line-height: 48px;
        color: #FFFFFF;
        text-align: center;
    }
}

.menus {
    background-color: #545C64;
    color: #FFFFFF;
}

.el-menu {
    border-right: none;
}
</style>