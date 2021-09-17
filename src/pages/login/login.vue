<template>
    <div class="container">
        <div class="login">
            <div class="adBox"></div>
            <div class="login-form">
                <div class="title">在线教育平台</div>
                <el-form
                    status-icon
                    :model="form"
                    :rules="rules"
                    ref="ruleForm"
                    class="demo-ruleForm"
                >
                    <el-form-item prop="username">
                        <el-input
                            v-model="form.username"
                            prefix-icon="el-icon-user-solid"
                            autocomplete="off"
                            placeholder="请输入用户名"
                            style="width: 300px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            type="password"
                            v-model="form.password"
                            prefix-icon="el-icon-lock"
                            autocomplete="off"
                            placeholder="请输入密码"
                            style="width: 300px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-input
                            v-model="form.code"
                            autocomplete="off"
                            placeholder="请输入验证码"
                            style="width: 150px"
                        ></el-input>
                        <div class="code-box" v-if="codeUrl">
                            <img :src="codeUrl" class="code" @click="refreshCode" />
                        </div>
                    </el-form-item>
                    <el-button type="primary" style="width: 100%" @click="goLogin">登录</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted } from "vue";
import { DataType } from "./login";
import { Http } from '../../api/http'
import { useRouter } from "vue-router";
export default defineComponent({
    name: "Login",
    setup() {
        const router = useRouter();
        const _that = reactive<DataType>({
            ruleForm: ref(),
            codeUrl: '',
            form: {
                username: "",
                password: "",
                code: "",
                key: '',
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        max: 10,
                        message: "长度在 3 到 10 个字符",
                        trigger: "blur",
                    },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        max: 12,
                        message: "长度在 6 到 12 个数字",
                        trigger: "blur",
                    },
                ],
                code: [
                    { required: true, message: "请输入验证码", trigger: "blur" },
                ]
            }
        });

        const goLogin = () => {
            _that.ruleForm.validate((valid: boolean) => {
                if (!valid) return;
                Http.login(_that.form).then(res => {
                    console.log(res);
                    localStorage.setItem('ACCESS_TOKEN', res.data.access_token);
                    setTimeout(()=>{
                        router.push('/index')
                    },200)
                }).catch(error => {
                    getCodeUrl();
                })
            })
        }

        const getCodeUrl = () => {
            Http.getCode().then(res => {
                _that.codeUrl = res.url.img;
                _that.form.key = res.url.key;
            })
        }

        const refreshCode = () => {
            getCodeUrl();
            console.log();
            
        }

        onMounted(() => {
            getCodeUrl();

        })

        return {
            ...toRefs(_that),
            refreshCode,
            goLogin
        };
    },
});
</script>

<style lang='scss' scoped>
.container {
    width: 100%;
    height: 100%;
    background: url("@assets/images/bg2.jpg") center top/cover no-repeat;
    .login {
        width: 70%;
        height: auto;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-around;
        // justify-content: center;
        .adBox {
            width: 500px;
            height: 500px;
            background: url("@assets/images/ad.png") top center no-repeat;
        }
        .login-form {
            border-radius: 5px;
            background: rgba(25, 25, 25, 0.7);
            padding: 20px;
            .title {
                line-height: 50px;
                text-align: center;
                font-size: 16px;
                color: #fff;
            }
            .title:after {
                content: "";
                height: 1px;
                background: #fff;
                display: block;
                clear: both;
            }
            .el-form {
                padding: 20px 0;
                display: flex;
                flex-direction: column;
            }
            .el-form-item__content {
                display: flex;
            }
            .code-box {
                float: right;
                height: 40px;
                margin-right: 10px;
                cursor: pointer;
                .code {
                    width: 120px;
                    height: 40px;
                    border-radius: 4px;
                }
            }
        }
    }
}
</style>