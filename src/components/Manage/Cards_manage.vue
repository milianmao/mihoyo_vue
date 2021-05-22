<template>
	<a-card>
		<a-row type="flex" :gutter="[10, 20]">
			<a-col>
				<a-select
					:v-model="cardsListForm.project"
					placeholder="所有项目"
					style="width: 120px"
					allowClear
					width="180px"
					size="large"
				>
					<a-select-option
						v-for="item in projectItem"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					>
						{{ item.label }}
					</a-select-option>
				</a-select>
			</a-col>
			<a-col>
				<a-select
					:v-model="cardsListForm.level"
					placeholder="所有项目"
					style="width: 120px"
					allowClear
					width="180px"
					size="large"
				>
					<a-select-option
						v-for="item in versionItem"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					>
						{{ item.label }}
					</a-select-option>
				</a-select>
			</a-col>
			<a-col>
				<a-select
					:v-model="cardsListForm.time"
					placeholder="所有项目"
					style="width: 120px"
					allowClear
					width="180px"
					size="large"
				>
					<a-select-option
						v-for="item in agingItem"
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
					addon-before="创建者"
					size="large"
					placeholder="请输入内容"
					v-model="cardsListForm.creator"
					allowClear
				></a-input>
			</a-col>
			<a-col>
				<a-input
					addon-before="卡密"
					size="large"
					placeholder="请输入内容"
					v-model="cardsListForm.cdkey"
					allowClear
				></a-input>
			</a-col>
			<a-col>
				<a-input
					addon-before="使用者"
					size="large"
					placeholder="请输入内容"
					v-model="cardsListForm.using"
					allowClear
				></a-input>
			</a-col>
			<a-col>
				<a-button type="primary" icon="search" size="large"></a-button>
			</a-col>
			<a-col>
				<a-button type="danger" icon="switcher" size="large"></a-button>
			</a-col>
		</a-row>
		<a-table
			:data-source="data"
			:rowKey="
				(record, index) => {
					return index
				}
			"
		>
			<a-table-colum key="ID" title="ID"> </a-table-colum>
		</a-table>
	</a-card>
</template>
<script>
import { serch, version, aging } from '@/utils/select_option.js'
const data = [
	{
		ID: '1',
	},
]
export default {
	data() {
		return {
			data,
			projectItem: serch,
			versionItem: version,
			agingItem: aging,
			cardsListForm: {
				project: '',
				creator: '',
				level: 0,
				time: 0,
				cdkey: '',
				using: 'null',
				page_num: 1,
				page_size: 8,
			},
		}
	},
	methods: {},
}
</script>
