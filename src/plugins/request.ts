import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { useRouter, Router } from 'vue-router';
const ENV = import.meta.env;

export class Request {
    public static axiosInstance: AxiosInstance;
    private static router: Router = useRouter();

    public static init() {
        // 创建axios实例
        this.axiosInstance = axios.create({
            baseURL: ENV.MODE == 'development' ? '/api' : ENV.BASE_URL,
            timeout: 6000,
        })
        // 初始化拦截器
        this.initInterceptors();
        return axios;
    }

    // 初始化拦截器
    public static initInterceptors() {
        // 设置post请求头
        this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        /**
         * 请求拦截器
         * 每次请求前，如果存在token则在请求头中携带token
         */
        this.axiosInstance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                // 登录流程控制中，根据本地是否存在token判断用户的登录情况
                // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
                // 后端根据携带的token判断用户的登录情况，并返回给我们对应的状态码
                const token = localStorage.getItem('ACCESS_TOKEN');
                if (token) {
                    config.headers.Authorization = token;
                }
                return config;
            },
            (error: any) => {
                // 对请求错误做些什么
                console.log(error);
            }
        );

        /**
         * 响应拦截器
         */
        this.axiosInstance.interceptors.response.use(
            // 请求成功
            (response: AxiosResponse) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    Request.errorHandle(response);
                    return Promise.reject(response.data);
                }
            },
            // 请求失败
            (error: any) => {
                const { response } = error;
                if (response) {
                    // 请求已发出，但是不在2xx的范围
                    Request.errorHandle(response);
                    return Promise.reject(response.data);
                } else {
                    // 处理断网的情况
                    ElMessage.error('网络连接异常,请稍后再试!');
                }
            }
        )
    }

    /**
     * http握手错误
     * @param res 响应回调,根据不同响应进行不同操作
     */
    private static errorHandle(res: any) {
        // 状态码判断
        switch (res.status) {
            case 401:
                ElMessage.error('登录失效，请重新登录');
                this.router.replace({
                    path: '/login',
                })
                break;
            case 403:
                ElMessage.error('无权限访问');
                break;
            case 404:
                ElMessage.error('接口不存在');
                break;
            case 422:
                ElMessage.error(res.data.msg);
                break;
            default:
                ElMessage.error('接口错误');
        }
    }

    /**
     * get请求
     * @param url 请求地址
     * @param params 请求参数
     * @returns 请求结果
     */
    public get(url: string, params?: Object): Promise<AxiosResponse> {
        return Request.axiosInstance({
            url,
            method: 'get',
            params,
        })
    }

    /**
     * post 请求
     * @param url 请求地址
     * @param params 请求参数
     * @returns 请求结果
     */
    public post(url: string, params?: Object): Promise<AxiosResponse> {
        return Request.axiosInstance({
            url,
            method: 'post',
            data: params,
        })
    }
}
