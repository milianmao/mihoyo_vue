<template>
	<a-card>
		<a-row type="flex" :gutter="[10, 30]">
			<a-col>
				<a-select
					:v-model="activateForm.project"
					placeholder="请选择项目"
					style="width: 120px"
					allowClear
					width="180px"
				>
					<a-select-option
						v-for="item in optionItem"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					>
						{{ item.label }}
					</a-select-option>
				</a-select>
			</a-col>
			<a-col>
				<a-button
					type="primary"
					icon="caret-right"
					style="margin-right:5px;"
					@click="activeCDK"
				></a-button>
				<a-button
					type="danger"
					icon="sync"
					@click="resetInfo"
				></a-button>
			</a-col>
		</a-row>
		<a-row :gutter="[10, 30]">
			<a-col>
				<a-textarea
					placeholder="请输入CDK"
					:auto-size="{ minRows: 5, maxRows: 5 }"
					v-model="activateForm.cdk"
				></a-textarea>
			</a-col>
		</a-row>
	</a-card>
</template>
<script>
import { serch } from '@/utils/select_option.js'
import { activeCDK } from '@/api/user.js'
export default {
	data() {
		return {
			optionItem: serch,
			// 激活表单
			activateForm: {
				project: '',
				cdk: '',
			},
		}
	},
	methods: {
		async activeCDK() {
			if (
				this.$isEmpty(this.activateForm.project) &&
				this.$isEmpty(this.activateForm.cdk)
			)
				return
			const { data: res } = await activeCDK()
			console.log(res)
			if (res.status !== 200)
				return this.$openNotificationWithIcon(
					'error',
					`激活失败:${res.status}`,
					`错误信息:${res.msg}`
				)
			this.$openNotificationWithIcon(
				'success',
				`到期时间:${this.format.formatDate(res.data.expire_time)}`,
				`激活成功`
			)
		},
		resetInfo() {
			this.activateForm.project = ''
			this.activateForm.cdk = ''
		},
	},
}
</script>
