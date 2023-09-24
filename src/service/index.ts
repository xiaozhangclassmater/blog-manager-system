import { useLoading } from "@/hooks/module/useLoading";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
const { open, close} = useLoading()
const serviceInstance = axios.create({
	baseURL: '/api',
	timeout: 5000,
})

// 请求拦截器
serviceInstance.interceptors.request.use((request)=> {
	open()
	return request
}, (err: AxiosError)=> {
	return Promise.reject(err)
})

// 响应拦截器
serviceInstance.interceptors.response.use((response: AxiosResponse)=> {
	close()
	return response.data
}, (err: AxiosError)=> {
	return Promise.reject(err)
})

const request = <R>(config: AxiosRequestConfig)=> {
	return serviceInstance.request<AxiosRequestConfig, R>(config)
}

export default request