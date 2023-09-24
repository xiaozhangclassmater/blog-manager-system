import request from "@/service";
import { loginParams } from "@/types/module/login";

export function userLogin (data : loginParams) {
	return request<axiosResponseType<null>>({
		url: '/bff/admin/login',
		method: 'POST',
		data
	})
}