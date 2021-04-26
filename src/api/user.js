import request from '@/utils/request'

// 登录
export function Login(data) {
	return request({
		url: '/login',
		method: 'post',
		data,
	})
}

// 注册

export function Register(data) {
	return request({
		url: '/register',
		method: 'post',
		data,
	})
}

// 获取用户信息
export function getUserInfo() {
	return request({
		url: '/user/info',
		method: 'post',
	})
}

// 查询用户卡密信息
export function getUserKeyInfo(data) {
	return request({
		url: '/user/card',
		method: 'post',
		data,
	})
}

// 激活CDK

export function activeCDK(data) {
	return request({
		url: '/user/activate',
		method: 'post',
		data,
	})
}

// 生成uif
export function GenUIF() {
	return request({
		url: '/user/uif',
		method: 'post',
	})
}
