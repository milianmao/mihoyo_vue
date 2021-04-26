export function openNotificationWithIcon(type, message, description) {
	this.$notification[type]({
		message: message,
		description: description,
	})
}
// 带按钮的notification

export function openNotification(message, description, btnName) {
	const key = `open${Date.now()}`
	this.$notification.open({
		message: message,
		description: description,
		btn: (h) => {
			return h(
				'a-button',
				{
					props: {
						type: 'primary',
						size: 'small',
					},
					on: {
						click: () => this.$notification.close(key),
					},
				},
				btnName
			)
		},
		key,
		onClose: close,
	})
}

export function isEmpty(value) {
	return (
		value === undefined ||
		value === null ||
		(typeof value === 'object' && Object.keys(value).length === 0) ||
		(typeof value === 'string' &&
			(value.trim().length === 0 || value === '{}'))
	)
}
