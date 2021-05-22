<template>
	<a-card>
		<a-row type="flex" :gutter="[10, 20]">
			<a-col>
				<a-select
					:v-model="projectListForm.project"
					placeholder="请选择项目"
					style="width: 160px"
					allowClear
					size="large"
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
				<a-input
					addon-before="用户名"
					size="large"
					placeholder="请输入内容"
					v-model="projectListForm.user_name"
					allowClear
				></a-input>
			</a-col>
			<a-col>
				<a-input
					addon-before="QQ"
					size="large"
					placeholder="请输入内容"
					v-model="projectListForm.qq_number"
					allowClear
				></a-input>
			</a-col>
			<a-col>
				<a-input
					addon-before="邮箱"
					size="large"
					placeholder="请输入内容"
					v-model="projectListForm.e_mail"
					allowClear
				></a-input>
			</a-col>
			<a-col>
				<a-button
					type="primary"
					icon="search"
					size="large"
					@click="listProject"
				></a-button>
			</a-col>
		</a-row>
		<a-table border style="width:100%;"> </a-table>
	</a-card>
</template>
<script>
import { serch } from '@/utils/select_option.js'
import { ListProject } from '@/api/card_manage.js'
export default {
	created() {
		this.listProject()
	},
	data() {
		return {
			optionItem: serch,
			// 项目列表查询表单
			projectListForm: {
				project: 'Honkai3RD',
				user_name: '',
				qq_number: '',
				e_mail: '',
				page_num: 1,
				page_size: 8,
			},
		}
	},
	methods: {
		async listProject() {
			const { data: res } = await ListProject(this.projectListForm)
			console.log(res)
		},
	},
}
</script>
