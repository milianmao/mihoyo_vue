<template style="height:100%;">
	<a-layout id="components-layout-demo-custom-trigger">
		<a-layout-sider v-model="collapsed" :trigger="null" collapsible>
			<div class="logo">
				<a-avatar shape="square" :size="32" :src="jiui" />
				<span style="color:#fff;">超限工坊</span>
			</div>
			<a-menu
				:default-selected-keys="['1']"
				:default-open-keys="['sub1']"
				mode="inline"
				theme="dark"
				:inline-collapsed="collapsed"
				router
				:inlineIndent="10"
			>
				<!-- 一级菜单 -->
				<a-sub-menu
					v-for="item in items"
					:index="item.path"
					:key="item.path"
				>
					<template slot="title">
						<i :class="item.icon" class="action"></i>
						<span>{{ item.name }}</span>
					</template>
					<!-- 二级菜单 -->
					<a-menu-item
						v-for="subItem in item.children"
						:index="subItem.path"
						:key="subItem.path"
					>
						<!-- <i :class="subItem.icon"></i> -->
						<span>{{ subItem.name }}</span>
						<router-link :to="subItem.path"></router-link>
					</a-menu-item>
				</a-sub-menu>
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<a-layout-header style="background: #fff; padding: 0">
				<a-icon
					class="trigger"
					:type="collapsed ? 'menu-unfold' : 'menu-fold'"
					@click="() => (collapsed = !collapsed)"
				/>
				<a-popover>
					<template slot="content">
						<p @click="toUserInfo">个人信息</p>
						<p @click="loginout">登出</p>
					</template>
					<a-avatar :size="50" :src="img" />
				</a-popover>
			</a-layout-header>
			<a-layout-content
				:style="{
					margin: '24px 16px',
					padding: '24px',
					background: '#fff',
					minHeight: '280px',
				}"
			>
				<router-view></router-view>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<script>
import { getMenuList } from '@/api/api.js'
import avatar from '@/assets/default_avatar.png'
import jiui from '@/assets/jiui.png'
export default {
	created() {
		this.getMenuList()
	},
	data() {
		return {
			collapsed: false,
			items: [],
			img: avatar,
			jiui: jiui,
		}
	},
	methods: {
		async getMenuList() {
			const { data: res } = await getMenuList()
			if (res.status !== 200 || res.data === null)
				return this.$openNotificationWithIcon(
					'error',
					'获取失败：状态码 ' + res.status,
					res.msg
				)
			this.items = JSON.parse(res.data)
		},
		toUserInfo() {
			this.$router.push('/user_info')
		},
		// 登出业务
		loginout() {
			this.$store.commit('clearUserInfo')
			this.$router.push('/login')
		},
	},
}
</script>
<style lang="less" scoped>
#components-layout-demo-custom-trigger .trigger {
	font-size: 18px;
	line-height: 64px;
	padding: 0 24px;
	cursor: pointer;
	transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
	color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
	height: 32px;
	background: rgba(255, 255, 255, 0.2);
	margin: 16px;
}
.ant-layout {
	height: 100%;
}
.ant-layout-header {
	padding-right: 20px !important;
}
.ant-popover p {
	display: block;
	text-align: center;
	width: 100%;
	margin-bottom: 4px;
	&:hover {
		background-color: rgb(197, 192, 192);
	}
}
.logo {
	overflow: hidden;
}
.logo .ant-avatar {
	margin-left: 0;
}
.logo span {
	margin-left: 10px;
	font-size: 15px;
}
.ant-layout-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
