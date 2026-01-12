<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px;">
            <el-card shadow="hover">
                <div class="user">
                    <img src="../../assets/user.png" />
                    <div class="user-info">
                        <p class="name">Admin</p>
                        <p class="role">超级管理员</p>
                    </div>
                </div>

                <div class="login-info">
                    <p>上次登录时间：<span>2022-10-11</span></p>
                    <p>上次登录地点：<span>上海</span></p>
                </div>
            </el-card>
            <el-card shadow="hover" style="margin-top: 10px;">
                <el-table :data="tableData">
                    <el-table-column v-for="(item, key) in tableLabel" :key="key" :prop="key" :label="item">

                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin-top: 20px;">
            <div class="num">
                <el-card :body-style="{ display: 'flex', padding: 0 }" v-for="item in countData" :key="item.name">
                    <component class="icons" :is="item.icon" :style="{ background: item.color }"></component>
                    <div class="detail">
                        <p class="num">${{ item.value }}</p>
                        <p class="txt">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue';
const { proxy } = getCurrentInstance()
let tableData = ref([])
let countData = ref([])
const tableLabel = {
    name: '品牌',
    totalBuy: '日销量',
    monthBuy: '月销量',
    totalBuy: '总销量'
};
async function getTableList() {
    let res = await proxy.$api.getTableData()
    tableData.value = res.tableData
};

async function getCountList() {
    let res = await proxy.$api.getCountData()
    countData.value = res.countData
};

onMounted(() => {
    getTableList()
    getCountList()
})


</script>

<style lang="less" scoped>
.home {
    .user {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #CCC;
        margin-bottom: 20px;

        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }
    }

    .login-info {
        p {
            line-height: 30px;
            font-size: 14px;
            color: #999999;

            span {
                color: #666666;
                margin-left: 70px;
            }
        }
    }

    .num {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        .el-card {
            width: 32%;
            margin-bottom: 20px
        }

        .icons {
            width: 80px;
            height: 80px;
            font-size: 30px;
            text-align: center;
            line-height: 80px;
            color: #FFFFFF
        }

        .detail{
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .num {
                font-size: 30px;
                margin-bottom: 10px;
            }
            .txt{
                font-size: 14px;
                text-align: center;
                color: #999;

            }
        }
        
    }

}
</style>