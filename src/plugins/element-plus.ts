import { App } from 'vue';

// 引入element-plus组件
import {
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElIcon,
    ElContainer,
    ElHeader,
    ElMain,
    ElAside,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElTable,
    ElTableColumn,
    ElCard,
    ElTag,
    ElButtonGroup
} from 'element-plus'


const elements: Array<any> = [
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElIcon,
    ElContainer,
    ElHeader,
    ElMain,
    ElAside,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElTable,
    ElTableColumn,
    ElCard,
    ElTag,
    ElButtonGroup
]

export default {
    install(app: App<any>) {
        elements.forEach((elements) => {
            app.use(elements)
        })
    },
}
