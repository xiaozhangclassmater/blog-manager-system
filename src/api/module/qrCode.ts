import request from "@/service";

export function createQrcode () {
	return request({
		url: '/bff/qrCode/createQrCode',
		method: 'get'
	})
}