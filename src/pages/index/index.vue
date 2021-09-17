<template >
    <div class="container-box">
        <div class="header-container">
            <el-input
                placeholder="请输入登录名/手机号"
                v-model="keywords"
                suffix-icon="el-icon-search"
                @keyup.enter="getUserlist"
            ></el-input>
            <div class="button-group">
                <el-button-group>
                    <el-button icon="el-icon-d-arrow-left" @click="page = 1" :disabled="page == 1"></el-button>
                    <el-button icon="el-icon-arrow-left" @click="page--" :disabled="page == 1"></el-button>
                    <el-button>{{page}}/{{allPage}}</el-button>
                    <el-button icon="el-icon-arrow-right" @click="page++" :disabled="page >= allPage"></el-button>
                    <el-button
                        icon="el-icon-d-arrow-right"
                        @click="endPage"
                        :disabled="page == allPage"
                    ></el-button>
                </el-button-group>
                <el-dropdown @command="handleCommand">
                    <el-button>
                        {{pageSize}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-for="(item, index) in sizeArr" :key="index" :command="item">{{item}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="table-main">
            <el-table :data="tableData" border>
                <el-table-column prop="username" label="登录名"></el-table-column>
                <el-table-column prop="mobile" label="手机号"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="gender" label="角色"></el-table-column>
                <el-table-column prop="created_at" label="加入时间"></el-table-column>
                <el-table-column label="是否已启用">
                    <template #default="scope">
                        <el-tag size="small" v-if="scope.row.status == 1" type="success">已启用</el-tag>
                        <el-tag size="small" v-if="scope.row.status == 2" type="info">已禁用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <span @click="handleDelete(scope.row)" class="operation">删除</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onBeforeMount, watch } from 'vue'
import { Http } from '../../api/http'
export default defineComponent({
    name: 'Index',
    setup() {
        const _that = reactive({
            tableData: [],
            sizeArr: [20, 30, 50, 100],
            keywords: '',
            allPage: 0,
            page: 1,
            pageSize: 20
        })
        watch(() => _that.page, (newPage: Number, old: Number) => {
            getUserlist();
        })

        onBeforeMount(() => {
            getUserlist();
        })
        const getUserlist = () => {
            const { keywords, page, pageSize } = _that
            let params = {
                keywords,
                page,
                pageSize
            }
            Http.getUserlist(params).then(res => {
                _that.tableData = res.data.data
                _that.allPage = res.data.allPage
            })
        }
        const handleCommand = (event: any) => {
            _that.pageSize = event
            _that.page = 1
            getUserlist()
        }
        const handleDelete = (item: any) => {
            console.log(item.id);
        }
        const endPage = () => {
            _that.page = _that.allPage
        }

        return {
            ...toRefs(_that),
            handleDelete,
            getUserlist,
            endPage,
            handleCommand
        }
    },
})
</script>
<style lang='scss'>
.header-container {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-input {
        width: 30%;
    }
}
.el-input__inner {
    height: 35px !important;
    line-height: 35px !important;
}
.el-button-group {
    margin-right: 15px;
}
.el-button {
    min-height: 35px !important;
    padding: 0 8px !important;
}
</style>