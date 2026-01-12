<template>
    <div class="tags">
        <el-tag v-for="(item, index) in tags" :key="item.name" :closable="item.name !== 'home'" :disable-transitions="false"
        :effect="$route.label === item.label ? 'dark' : 'light'" @click="changeTab(item)" @close="closeTab(item, index)" 
        >
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import {useStore} from 'vuex'
import { useRouter, useRoute } from 'vue-router';
const store = new useStore()
const router = new useRouter()
const route = new useRoute()
const tags = computed(()=> store.state.tabsList)
function changeTab(item) {
    router.push({   
        name: item.name,
    })
}
function closeTab(item, index) {
    let length = store.state.tabsList.length - 1
    store.commit('closeTab', item)

    if(item.name !== route.name) {
        return
    }
    if(index === length) {
        router.push({
            name : store.state.tabsList[index - 1].name
        })
    } else {
        router.push({
            name : store.state.tabsList[index].name
        })
    }
}

</script>

<style lang="less" scoped>
.tags{
    padding: 20px;
    width: 100%;
    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>