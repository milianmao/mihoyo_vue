import request from '@/utils/request'

export function ListProject(data) {
	return request({
		url: '/cards/list',
		method: 'post',
		data,
	})
}
