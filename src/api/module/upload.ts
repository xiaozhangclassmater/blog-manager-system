import request from "@/service";

export function uploadFile(data : FormData) {
	return request<axiosResponseType<string[]>>({
		url: '/bff/uploadFile/files',
		method: 'POST',
		data,
	})
}