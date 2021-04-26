<template>
	<div class="info_card">
		<a-card>
			<a-avatar :size="150" :src="avatar" />
			<a-row
				v-for="item in userItems"
				:key="item.qq_number"
				type="flex"
				justify="space-between"
				:gutter="10"
			>
				<a-col :span="6">
					<a-icon
						:type="item.icon"
						style="font-size:20px ; margin-right:10px;"
					/>
					<span>{{ item.name }}</span>
				</a-col>
				<a-col>
					<span>{{ userInfo[item.field] }}</span>
				</a-col>
			</a-row>
		</a-card>
		<a-card>
			<a-row type="flex" :gutter="[10, 30]">
				<a-col>
					<span style="font-size:18px;">卡密信息</span>
				</a-col>
			</a-row>
			<a-row :gutter="[10, 30]" type="flex">
				<a-col>
					<a-select
						placeholder="请选择项目"
						style="width: 120px"
						@change="handleChange"
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
					<a-button
						type="primary"
						icon="sync"
						style="margin-left:5px;"
						@click="getUserKeyInfo"
					></a-button>
				</a-col>
			</a-row>
			<a-row :gutter="[10, 30]" type="flex">
				<a-col>
					<a-icon type="crown"></a-icon>
					<span>卡密级别:</span>
				</a-col>
				<a-col>
					<span>{{ $format.formatCardsLevel(cardInfo.level) }}</span>
				</a-col>
			</a-row>
			<a-row :gutter="[10, 30]" type="flex">
				<a-col>
					<a-icon type="clock-circle" />
					<span>到期时间:</span>
				</a-col>
				<a-col>
					<span>{{ $format.formatDate(cardInfo.expire_time) }}</span>
				</a-col>
			</a-row>
			<a-row :gutter="[10, 30]">
				<a-col>
					<a-icon type="file" />
					<span>当前卡密:</span>
				</a-col>
				<a-col>
					<a-textarea
						v-model="cardInfo.current_card"
						placeholder="NULL"
						:auto-size="{ minRows: 5, maxRows: 5 }"
					></a-textarea>
				</a-col>
			</a-row>
		</a-card>
	</div>
</template>
<script>
import { getUserInfo, getUserKeyInfo } from '@/api/user.js'
import avatar from '@/assets/default_avatar.png'
import { serch } from '@/utils/select_option.js'
import '@/utils/format.js'
export default {
	created() {
		this.getUserInfo()
	},
	data() {
		return {
			avatar: avatar,
			// 当前用户信息
			userInfo: {
				id: 0,
				user_name: '',
				qq_number: '',
				e_mail: '',
				status: false,
				power: 0,
				gen_times: 0,
				avatar: '',
				created_at: 0,
			},
			userItems: [
				{ name: 'ID:', icon: 'idcard', field: 'id' },
				{
					name: '用户名:',
					icon: 'user',
					field: 'user_name',
				},
				{
					name: 'QQ:',
					icon: 'qq',
					field: 'qq_number',
				},
				{
					name: '邮箱:',
					icon: 'mail',
					field: 'e_mail',
				},
				{
					name: '级别:',
					icon: 'security-scan',
					field: 'power',
				},
				{
					name: 'UIF次数:',
					icon: 'safety-certificate',
					field: 'gen_times',
				},
				{
					name: '创建日期:',
					icon: 'calendar',
					field: 'created_at',
				},
			],
			optionItem: serch,
			// 用户卡密信息
			cardInfo: {
				user_name: '',
				expire_time: 0,
				current_card: 'null',
				cards_record: [],
				level: 0,
			},
			project: '',
		}
	},
	methods: {
		async getUserInfo() {
			const { data: res } = await getUserInfo()
			// 保存用户信息
			this.$store.commit('saveUserInfo', res.data)
			this.userInfo = res.data
		},
		async handleChange(value) {
			if (value) {
				this.project = value
				// 查询卡密信息
				this.getUserKeyInfo()
			} else {
				this.cardInfo = {
					user_name: '',
					expire_time: 0,
					current_card: 'null',
					cards_record: [],
					level: 0,
				}
				return
			}
		},
		async getUserKeyInfo() {
			const { data: res } = await getUserKeyInfo({
				project: this.project,
			})
			console.log(res)
			if (res.status !== 200)
				return this.$openNotificationWithIcon(
					'error',
					'获取失败：状态码 ' + res.status,
					res.msg
				)
			this.cardInfo = res.data
		},
	},
}
</script>
<style lang="less" scoped>
.info_card {
	display: flex;
	justify-content: space-between;
}
.ant-card {
	box-shadow: 0 0 0 2px #bbb;
	width: 49%;
	height: 60%;
}
.ant-avatar {
	left: 50%;
	transform: translateX(-50%);
	margin-bottom: 5%;
}
</style>
