import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
const path = require('path');

export default {
    /**
     * 基础公共配置 https://cn.vitejs.dev/config/#shared-options
     */

    // 项目根目录（index.html 文件所在的位置）默认process.cwd()
    root: process.cwd(),
    // 设置静态资源服务的文件相对路径
    publicDir: 'public',
    // 控制台输出的级别
    logLevel: 'error',
    // 用于加载 .env 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径
    envDir: process.cwd(),
    // 文件系统别名
    resolve: {
        alias: {
            '@assets': path.resolve(process.cwd(), 'src/assets')
        }
    },
    css: {
        postcss: {},
        // 配置scss 预处理器的选项
        preprocessorOptions: {
            scss: {},
        },
    },
    // 配置
    plugins: [
        vue(),
        styleImport({
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    ensureStyleFile: true,
                    resolveStyle: (name) => {
                        return `element-plus/lib/theme-chalk/${name}.css`;
                    },
                    resolveComponent: (name) => {
                        return `element-plus/lib/${name}`;
                    },
                }
            ]
        })
    ]
}