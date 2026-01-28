<template>
    <div class="common-layout">
        <el-container class="lay-container">
            <CommonAside />
            <el-container class="el-container">
                <CommonHeader />
                <!-- <CommonTab /> -->
                <el-main class="right-main bg-gray-100 p-4">
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script setup>
import CommonHeader from '../components/CommonHeader.vue';
import CommonAside from '../components/CommonAside.vue';
import CommonTab from '../components/CommonTab.vue';



</script>

<style lang="less" scoped>
.el-container {
    flex-wrap: wrap;
    align-content: flex-start;
    height: 100%;
}

.common-layout {
    height: 100%;

    .lay-container {
        flex-wrap: nowrap;

        .right-main {
            height: calc(100% - 124px) !important;
        }
    }

    &>.el-container {
        height: 100%;

        &>.el-aside {
            height: 100%;
            background-color: white;
        }
    }
}

.lay-container {
    flex-wrap: nowrap;
}
</style>