import Vue from 'vue'

const format = {
	// 卡密级别
	formatCardsLevel: (level) => {
		switch (level) {
			case 3:
				return '珀金版'
			case 2:
				return '黄金版'
			case 1:
				return '青铜版'
			default:
				return 'Error'
		}
	},
	formatDate: (stamp) => {
		if (stamp === 0) return 'Null'
		let now = new Date(stamp * 1000)
		let year = now.getFullYear()
		let month = now.getMonth() + 1
		let date = now.getDate()
		let hour = now.getHours()
		let minute = now.getMinutes()
		let second = now.getSeconds()
		return (
			year +
			'-' +
			month +
			'-' +
			date +
			' ' +
			hour +
			':' +
			minute +
			':' +
			second
		)
	},
	formatPowerLevel: (power) => {
		switch (true) {
			case power === 3:
				return '开发'

			case power === 2:
				return '超管'

			case power === 1:
				return '管理'

			case power === 0:
				return '用户'

			default:
				return 'Error'
		}
	},
}

Vue.prototype.$format = format
export default format
