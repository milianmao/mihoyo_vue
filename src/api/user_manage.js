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

// 修改用户信息

export function usersChangeInfos(data) {
	return request({
		url: '/users/infos',
		method: 'post',
		data,
	})
}

// 修改用户权限
export function usersChangePower(data) {
	return request({
		url: '/users/power',
		method: 'post',
		data,
	})
}

// 删除用户UID
export function usersCleanUID(data) {
	return request({
		url: '/users/clean',
		method: 'post',
		data,
	})
}
