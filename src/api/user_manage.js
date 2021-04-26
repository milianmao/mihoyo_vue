import request from '@/utils/request'

// 获取用户列表
export function getUsersList(data) {
	return request({
		url: '/users/list',
		method: 'post',
		data,
	})
}
// 修改用户UIF次数
export function usersChangeTimes(data) {
	return request({
		url: '/users/times',
		method: 'post',
		data,
	})
}

// 修改用户状态

export function usersChangeStatus(data) {
	return request({
		url: '/users/status',
		method: 'post',
		data,
	})
}
