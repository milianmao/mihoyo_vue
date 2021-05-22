<template>
	<a-card>
		<a-row type="flex" :gutter="[10, 20]">
			<a-col>
				<a-input
					addon-before="用户名"
					size="large"
					placeholder="请输入内容"
					v-model="usersListForm.user_name"
					allowClear
				></a-input>
			</a-col>
			<a-col>
				<a-input
					addon-before="QQ"
					size="large"
					placeholder="请输入内容"
					v-model="usersListForm.qq_number"
					allowClear
				></a-input>
			</a-col>
			<a-col>
				<a-input
					addon-before="邮箱"
					size="large"
					placeholder="请输入内容"
					v-model="usersListForm.e_mail"
					allowClear
				></a-input>
			</a-col>
			<a-col>
				<a-button
					type="primary"
					icon="search"
					size="large"
					@click="getUsersList"
				></a-button>
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
					:loading="loading"
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
								编辑
							</template>
							<a-button
								type="primary"
								icon="edit"
								@click="InfoEdit(record)"
							></a-button>
						</a-tooltip>
						<a-tooltip>
							<template slot="title">
								权限
							</template>
							<a-button
								type="primary"
								icon="tool"
								@click="powerEdit(record)"
							></a-button>
						</a-tooltip>
						<a-tooltip>
							<template slot="title">
								删除
							</template>
							<a-popconfirm
								placement="top"
								title="是否删除该用户"
								ok-text="删除"
								cancel-text="取消"
								@confirm="usersCleanUID(record)"
								@cancel="cancelDelete"
							>
								<a-button
									type="danger"
									icon="delete"
								></a-button>
							</a-popconfirm>
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
		<!-- 信息编辑 -->
		<a-modal
			title="信息更改"
			:visible="visible"
			:confirm-loading="confirmLoading"
			@ok="changeInfos"
			@cancel="visible = false"
		>
			<a-form-model
				:model="infoForm"
				:label-col="labelCol"
				:wrapper-col="wrapperCol"
				:rules="infoFormRules"
				ref="infoFormRef"
			>
				<a-form-model-item label="ID: ">
					<a-input :value="infoForm.id" disabled></a-input>
				</a-form-model-item>

				<a-form-model-item label="用户名: " prop="user_name">
					<a-input v-model="infoForm.user_name" clearable></a-input>
				</a-form-model-item>

				<a-form-model-item label="QQ号: " prop="qq_number">
					<a-input v-model="infoForm.qq_number" clearable></a-input>
				</a-form-model-item>

				<a-form-model-item label="邮箱: " prop="e_mail">
					<a-input v-model="infoForm.e_mail" clearable></a-input>
				</a-form-model-item>
			</a-form-model>
		</a-modal>
		<!-- 权限修改 -->
		<a-modal
			title="权限修改"
			:visible="powerEditVisible"
			:confirm-loading="powerConfirmLoading"
			@ok="changePower"
			@cancel="powerEditVisible = false"
		>
			<a-radio-group name="radioGroup" v-model="curOperUser.power">
				<a-radio :value="2">
					超管
				</a-radio>
				<a-radio :value="1">
					管理
				</a-radio>
				<a-radio :value="0">
					用户
				</a-radio>
			</a-radio-group>
		</a-modal>
	</a-card>
</template>
<script>
import {
	getUsersList,
	usersChangeTimes,
	usersChangeStatus,
	usersChangeInfos,
	usersChangePower,
	usersCleanUID,
} from '@/api/user_manage.js'
import _ from 'loadsh'
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
		// 验证字符串是否有特殊字符
		const checkSpecialKey = (str) => {
			var specialKey = "(){}''\\[]<>！￥……（）【】‘；：”“'。，、？‘"
			for (var i = 0; i < str.length; i++) {
				if (specialKey.indexOf(str.substr(i, 1)) !== -1) return false
			}
			return true
		}
		// 自定义表单验证函数
		const checkRules = (rule, value, callback) => {
			if (!value) return callback()
			setTimeout(() => {
				switch (rule.fullField) {
					case 'qq_number':
						const qqErr = new Error('请输入正确的QQ号')
						if (isNaN(value)) return callback(qqErr)
						if (value.length < 5 || value.length > 15)
							return callback(qqErr)
						return callback()
					case 'e_mail':
						const emErr = new Error('请输入正确的邮箱')
						const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
						if (value.length < 8 || value.length > 128)
							return callback(emErr)
						if (!mailReg.test(value)) return callback(emErr)
						return callback()
					default:
						const err = new Error('请不要输入奇奇怪怪的符号')
						if (!checkSpecialKey(value)) return callback(err)
						return callback()
				}
			}, 100)
		}
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
			infoForm: {
				id: 0,
				user_name: '',
				qq_number: '',
				e_mail: '',
			},
			// 查询总数
			total: 0,
			pageSizeOptions: ['5', '8', '15', '20', '50', '100'],
			visible: false,
			confirmLoading: false,
			loading: false,
			labelCol: { span: 4 },
			wrapperCol: { span: 14 },
			// 表单验证规则对象
			infoFormRules: {
				user_name: [
					{
						required: true,
						message: '请输入用户名',
						trigger: 'blur',
					},
					{
						min: 3,
						max: 32,
						message: '用户名长度在 3 到 32 个字符内',
						trigger: 'blur',
					},
					{ validator: checkRules, trigger: 'blur' },
				],
				qq_number: [{ validator: checkRules, trigger: 'blur' }],
				e_mail: [{ validator: checkRules, trigger: 'blur' }],
			},
			powerEditVisible: false,
			powerConfirmLoading: false,
			// 当前操作用户详细数据
			curOperUser: {
				id: 0,
				user_name: '',
				qq_number: '',
				e_mail: '',
				status: false,
				power: 0,
				gen_times: 0,
				avatar: '',
				created_at: '',
			},
		}
	},
	methods: {
		// 获取用户列表
		async getUsersList() {
			this.loading = true
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
			this.loading = false
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
		changeInfos() {
			this.confirmLoading = true
			this.$refs.infoFormRef.validate(async (valid) => {
				if (!valid) return
				const { data: res } = await usersChangeInfos(this.infoForm)
				console.log(res)
				if (res.status !== 200)
					return this.$openNotificationWithIcon(
						'error',
						`修改失败：状态码${res.status}`,
						res.msg
					)
				this.$openNotificationWithIcon(
					'success',
					`修改成功：状态码${res.status}`,
					res.msg
				)
				this.confirmLoading = false
				this.visible = false
				this.getUsersList()
			})
		},
		InfoEdit(user) {
			this.visible = true
			this.infoForm = _.cloneDeep(user)
		},
		powerEdit(user) {
			this.curOperUser = _.cloneDeep(user)
			this.powerEditVisible = true
		},
		async changePower() {
			this.powerConfirmLoading = true
			const { data: res } = await usersChangePower({
				id: this.curOperUser.id,
				power: this.curOperUser.power,
			})
			console.log(res)
			if (res.status !== 200)
				return this.$openNotificationWithIcon(
					'error',
					`修改失败：状态码${res.status}`,
					res.msg
				)
			this.$openNotificationWithIcon(
				'success',
				`修改成功：状态码${res.status}`,
				res.msg
			)
			this.powerConfirmLoading = false
			this.powerEditVisible = false
			this.getUsersList()
		},
		async usersCleanUID(user) {
			const { data: res } = await usersCleanUID()
		},
		cancelDelete() {
			this.$message.info('取消清除')
		},
	},
}
</script>
