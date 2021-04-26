<template>
	<a-card>
		<a-row type="flex" :gutter="[10, 20]">
			<a-col>
				<a-input
					addon-before="用户名"
					size="large"
					placeholder="请输入内容"
				></a-input>
			</a-col>
			<a-col>
				<a-input
					addon-before="QQ"
					size="large"
					placeholder="请输入内容"
				></a-input>
			</a-col>
			<a-col>
				<a-input
					addon-before="邮箱"
					size="large"
					placeholder="请输入内容"
				></a-input>
			</a-col>
			<a-col>
				<a-button type="primary" icon="search" size="large"></a-button>
			</a-col>
		</a-row>
		<a-row :gutter="[10, 20]">
			<a-col>
				<a-table
					:columns="columns"
					:data-source="users"
					:rowKey="
						(record, index) => {
							return index
						}
					"
					bordered
					:pagination="false"
				>
					>
					<a-slider
						slot-scope="text, record"
						slot="gen_times"
						v-model="record.gen_times"
						:max="3"
						:min="0"
						@afterChange="handelGenTime(record)"
					/>
					<span slot="power / status" slot-scope="text, record">
						<a-tag color="red" v-if="record.power === 3">{{
							$format.formatPowerLevel(record.power)
						}}</a-tag>
						<a-tag color="orange" v-else-if="record.power === 2">{{
							$format.formatPowerLevel(record.power)
						}}</a-tag>
						<a-tag color="green" v-else-if="record.power === 1">{{
							$format.formatPowerLevel(record.power)
						}}</a-tag>
						<a-tag color="purple" v-else-if="record.power === 0">{{
							$format.formatPowerLevel(record.power)
						}}</a-tag>
						<a-switch
							v-model="record.status"
							@change="changeStatus(record)"
							:disabled="record.sd"
						/>
					</span>
					<div slot="action" slot-scope="text, record">
						<a-tooltip>
							<template slot="title">
								权限
							</template>
							<a-button
								type="primary"
								icon="edit"
								@click="powerEdit(record)"
							></a-button>
						</a-tooltip>
						<a-tooltip>
							<template slot="title">
								删除
							</template>
							<a-button type="danger" icon="delete"></a-button>
						</a-tooltip>
					</div>
				</a-table>
				<a-pagination
					size="small"
					:total="total"
					show-size-changer
					show-quick-jumper
					:current-page="usersListForm.page_num"
					:page-size="usersListForm.page_size"
					:showSizeChanger="true"
					:pageSizeOptions="pageSizeOptions"
					:show-total="
						(total) => `共
				${total} 条`
					"
					style="margin-top:10px;"
					@Change="handleCurrentChange"
					@showSizeChange="handleSizeChange"
				/>
			</a-col>
		</a-row>
		<a-modal
			title="Title"
			:visible="visible"
			:confirm-loading="confirmLoading"
			@ok="handleOk"
			@cancel="visible = false"
		>
		</a-modal>
	</a-card>
</template>
<script>
import {
	getUsersList,
	usersChangeTimes,
	usersChangeStatus,
} from '@/api/user_manage.js'
const columns = [
	{
		title: 'ID',
		key: 'ID',
		customRender: (text, record, index) => index + 1,
		align: 'center',
	},
	{
		title: '创建日期',
		dataIndex: 'created_at',
		key: 'created_at',
		align: 'center',
	},
	{
		title: '用户名',
		dataIndex: 'user_name',
		key: 'user_name',
		align: 'center',
	},
	{
		title: 'QQ号',
		dataIndex: 'qq_number',
		key: 'qq_number',
		align: 'center',
	},
	{
		title: '邮箱',
		dataIndex: 'e_mail',
		key: 'e_mail',
		align: 'center',
	},
	{
		title: 'UIF生成次数',
		dataIndex: 'gen_times',
		key: 'gen_times',
		scopedSlots: { customRender: 'gen_times' },
		align: 'center',
	},
	{
		title: '级别/状态',
		key: 'power / status',
		scopedSlots: { customRender: 'power / status' },
		align: 'center',
	},
	{
		title: '操作',
		key: 'action',
		scopedSlots: { customRender: 'action' },
		align: 'center',
	},
]
export default {
	created() {
		this.getUsersList()
	},
	data() {
		return {
			columns,
			users: [],
			// 用户列表查询表单
			usersListForm: {
				user_name: '',
				qq_number: '',
				e_mail: '',
				page_num: 1,
				page_size: 8,
			},
			changeTimesForm: {
				id: 0,
				times: 0,
			},
			// 查询总数
			total: 0,
			pageSizeOptions: ['5', '8', '15', '20', '50', '100'],
			visible: false,
			confirmLoading: false,
		}
	},
	methods: {
		// 获取用户列表
		async getUsersList() {
			const { data: res } = await getUsersList(this.usersListForm)
			console.log(res)
			if (res.status !== 200)
				return this.$openNotificationWithIcon(
					'error',
					`获取失败: 状态码  ${res.status}`,
					res.msg
				)
			this.total = res.data.total
			this.users = res.data.items

			// 判断是否需要渲染操作控件
			let me = this.$store.state.userInfo
			console.log(me)
			if (this.users != null) {
				this.users.forEach((user) => {
					if (user.id === me.id) {
						user.sd = user.pd = true
						user.od = false
					} else if (user.power >= me.power) {
						user.sd = user.od = user.pd = true
					} else {
						user.sd = user.od = user.pd = false
					}
				})
			}
		},
		async handelGenTime(user) {
			this.changeTimesForm.id = user.id
			this.changeTimesForm.times = user.gen_times
			console.log(this.changeTimesForm)
			const { data: res } = await usersChangeTimes(this.changeTimesForm)
			if (res.status !== 200)
				return this.$openNotificationWithIcon(
					'error',
					`操作失败: 状态码  ${res.status}`,
					res.msg
				)
			this.$openNotificationWithIcon('success', `操作成功`, res.msg)
		},
		// 状态开关业务
		async changeStatus(user) {
			console.log(user)
			const { data: res } = await usersChangeStatus({
				id: user.id,
				status: user.status,
			})
			if (res.status !== 200)
				return this.$openNotificationWithIcon(
					'error',
					`操作失败: 状态码  ${res.status}`,
					res.msg
				)
			this.$openNotificationWithIcon('success', `操作成功`, res.msg)
		},
		// pageSize 改变业务
		handleSizeChange(current, size) {
			this.usersListForm.page_size = size
			this.getUsersList()
		},
		// currentPage 改变业务
		handleCurrentChange(page, pageSize) {
			this.usersListForm.page_num = page
			this.getUsersList()
		},
		handleOk() {},
		powerEdit(user) {
			this.visible = true
		},
	},
}
</script>
