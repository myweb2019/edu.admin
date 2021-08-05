import baseConf from "./base.conf";

const prodConfig = {
    // 环境模块
    mode: 'production',
    // 控制台输出的级别
    logLevel: 'info',
    // 打包配置 https://cn.vitejs.dev/config/#build-options
    build: {
        // 设置最终构建的浏览器兼容目标
        target: 'modules',
        // 设置是否自动注入 动态导入 polyfill。
        polyfillDynamicImport: true,
        // 指定输出路径,文件夹名称dist
        outDir: 'dist',
        // 指定生成静态资源的存放路径 相对于outDir
        assetsDir: 'assets',
        // 小于此阈值的导入或引用资源将内联为 base64编码, 
        // 以避免额外的 http 请求,默认值4096
        assetsInlineLimit: 8192,
        // 是否启用/禁用 CSS 代码拆分，默认值true
        cssCodeSplit: false,
        // 构建后是否生成 source map 文件
        sourcemap: false,
        rollupOptions: {
            // https://rollupjs.org/guide/en/#core-functionality
            output: {
                // 是否配置单独的模块
                manualChunks: {
                    // 'element-plus': ['element-plus']
                }
            }
        },
        // 是否禁用最小化混淆，或是用来指定使用哪种混淆器
        minify: 'terser',
        // chunk 大小警告的限制
        chunkSizeWarningLimit: 800, 
    }
}
const BASECONFDATA = Object.assign(baseConf, prodConfig);
export default function prodConfigFun() {
    return BASECONFDATA
}