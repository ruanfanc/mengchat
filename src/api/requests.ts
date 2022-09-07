import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";
// 二次封装
const instance = axios.create({
    baseURL: "/api",
    timeout: 5000,
})

// 拦截器
instance.interceptors.request.use((config: any) => {
    // 进度条开始
    nprogress.start();
    return config
});
instance.interceptors.response.use((res: { data: any; }) => {
    // 进度条结束
    nprogress.done();
    return res.data;
}, (error: any) => {
    nprogress.done();
    return Promise.reject(new Error('faile'))
})

export const requests = async<T>(config: AxiosRequestConfig): Promise<AxiosPromise<T>> => {
    const result = await instance(config)
    return result
}


