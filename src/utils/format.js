import Vue from 'vue'

const format = {
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
}

Vue.prototype.$format = format
export default format
