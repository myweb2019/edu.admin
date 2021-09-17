<template>
    <div class="container">
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-container>
                <el-header>
                    <div class="userInfo">
                        <div class="username">admin</div>
                        <el-dropdown @command="handleCommand">
                            <div class="user">
                                <img src="@assets/images/userphoto.jpg" />
                            </div>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>修改密码</el-dropdown-item>
                                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </el-header>
                <el-main>
                    <el-card>
                        <router-view></router-view>
                    </el-card>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onBeforeMount } from "vue";
import { useRouter } from 'vue-router';
import { Http } from '../../api/http'
import { ElMessage } from 'element-plus';
import { ElMessageBox } from 'element-plus';
export default defineComponent({
    name: "Login",
    setup() {
        const router = useRouter()
        const _that = reactive({
            list: []
        })

        const handleCommand = (event: any) => {
            if (event == 'logout') {
                ElMessageBox.alert('确定退出登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(res => {
                    localStorage.removeItem('ACCESS_TOKEN');
                    router.replace('/login');
                    ElMessage.success('退出成功')
                })

            }
        }

        return {
            handleCommand,
            ...toRefs(_that)
        }
    }
})
</script>
<style lang='scss' scoped>
.container {
    height: 100%;
}

.logo {
    min-width: 150px;
    background: rebeccapurple;
}

.el-header {
    background-color: #fff;
    display: flex;
    height: 45px !important;
    justify-content: flex-end;
    padding-left: 20px;
    align-items: center;
    color: #333;
    font-size: 20px;
    cursor: pointer;
    padding: 0 15px;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    .userInfo {
        display: flex;
        align-items: center;
        margin-right: 20px;
        .username {
            margin-right: 20px;
        }

        img {
            width: 40px;
            height: 40px;
            border-radius: 10px;
        }
    }
}

.el-aside {
    background-color: #333744;
}

.el-main {
    background-color: #eaedf1;
}
</style>