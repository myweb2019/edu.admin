import { App } from 'vue';

// 引入element-plus组件
import {
    ElButton,
    ElLoading,
    ElMessage,
    ElMessageBox,
    ElNotification,
    ElForm,
    ElFormItem,
    ElInput,
    ElIcon,
} from 'element-plus'


const elements: Array<any> = [
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElIcon,
    ElLoading,
    ElMessage,
    ElMessageBox,
    ElNotification,
]

export default {
    install(app: App<any>) {
        elements.forEach((elements) => {
            app.use(elements)
        })
    },
}
