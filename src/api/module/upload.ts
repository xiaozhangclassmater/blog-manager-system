import request from "@/service";

export function uploadFile(data : FormData) {
	return request<axiosResponseType<string[]>>({
		url: '/bff/uploadFile/files',
		method: 'POST',
		data,
	})
}
export function downloadCraftImg(data : { fileUrls : string[]}) {
	return request<axiosResponseType<{
     url : string,
     filename : string
    }>>({
	url: '/bff/uploadFile/waterMackImgDownload',
	method: 'POST',
	data
})
}