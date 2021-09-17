import { createApp } from 'vue'
import VueAxios from 'vue-axios'

import App from './App.vue'
import plugins from './plugins/element-plus'
import router from './router/index'
import '@assets/css/global.css'
import { Request } from './utils/request'

let app = createApp(App as any);
// 注册路由，整个应用支持路由
app.use(router);
// 注册相关配置
app.use(plugins);
// 注册axios
app.use(VueAxios, Request.init());
app.mount('#app');

