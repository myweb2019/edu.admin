/**
 * 如果要配置测试环境，同下
 */

import baseConf from "./base.conf";
const devConfig = {
    // 环境模块
    mode: 'development',
    // 控制台输出的级别
    logLevel: 'error',
    // 设置是否会清空上一次控制台打印信息
    clearScreen: false,
    // 启动服务配置 https://cn.vitejs.dev/config/#server-options
    server: {
        // 指定服务器应该监听哪个 IP 地址
        host: '127.0.0.1',
        // 指定开发服务器端口
        port: '3000',
        // 若端口已被占是否会直接退出
        strictPort: true,
        // 是否强制使依赖预构建
        force: true,
        // 服务代理
        proxy: {
            '^/api/.*': {
                target: 'http://zx.edu.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        },
    }
}
// 合并2个配置对象
const BASECONFDATA = Object.assign(baseConf, devConfig);
export default function devConfigFun() {
    return BASECONFDATA
}