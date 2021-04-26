<template>
	<a-card>
		<a-row :gutter="[10, 20]">
			<a-col>
				<a-button
					type="danger"
					style="margin-right:5px;"
					@click="GenUIF"
					>生成UIF</a-button
				>
				<a-button
					type="primary"
					v-clipboard:error="onError"
					v-clipboard:copy="uif"
					v-clipboard:success="onCopy"
					>复制UIF</a-button
				>
			</a-col>
			<a-col>
				<a-textarea
					:auto-size="{ minRows: 5, maxRows: 5 }"
					v-model="uif"
				></a-textarea>
			</a-col>
			<a-col>
				<div class="text">
					<h2>UIF说明:</h2>
					<h4>
						1. 新账号初始有
						<span>3次</span>
						生成次数, 请
						<span>妥善保存</span>
						生成的UIF
					</h4>
					<h4>
						2. 除非进行
						<span>改用户名</span>, <span>改密码</span>,
						<span>改QQ</span>,
						<span>改邮箱</span>
						的操作, 否则生成的UIF
						<span>一直可用</span>
					</h4>
					<h4>
						3. UIF是识别身份的令牌,
						用于客户端登录连接到服务器(无需密码), 所以请
						<span>不要泄露UIF</span>
						给TA人
					</h4>
				</div>
			</a-col>
		</a-row>
	</a-card>
</template>
<script>
import { GenUIF } from '@/api/user.js'
export default {
	data() {
		return {
			uif: '',
		}
	},
	methods: {
		async GenUIF() {
			if (!this.$isEmpty(this.uif)) return
			const { data: res } = await GenUIF()
			if (res.status !== 200)
				return this.$openNotificationWithIcon(
					'error',
					`生成失败:${res.status}`,
					`错误信息:${res.msg}`
				)
			this.uif = res.data
			this.$openNotification(
				'生成成功',
				'生成次数有限! 请妥善保管!',
				'确定'
			)
		},
		onCopy() {
			this.$message.success('复制成功')
		},
		onError() {
			this.$message.warning('复制失败')
		},
	},
}
</script>
<style lang="less" scoped>
.text {
	margin-top: 15px;

	h2 {
		margin-bottom: 15px;
	}

	h4 {
		margin-bottom: 10px;
		span {
			margin-left: 5px;
			margin-right: 5px;
			font-size: 20px;
			font-weight: bolder;
			color: #f00;
		}
	}
}
</style>
