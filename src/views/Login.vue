<template>
	<div class="body_bg">
		<div class="title">
			<svg viewBox="0 0 400 200">
				<text x="0" y="70%">超限工坊管理系统</text>
			</svg>
		</div>
		<div
			:class="{
				card: true,
				cardanimation: cardanimationable,
				recardanimation: recardanimationable,
			}"
		>
			<!-- 头像绘制区域 -->
			<div
				class="avatar_box"
				style="z-index:999;transform: translate(-50%, -50%);"
			>
				<img src="../assets/logo.png" />
			</div>
			<!-- 登录区域 -->
			<div :class="{ login: true, import: !importable }">
				<!-- 登录表单区域 -->
				<a-form-model
					:model="loginForm"
					ref="loginFormRef"
					:rules="loginFormRules"
				>
					<a-form-model-item prop="user_name">
						<a-input
							v-model="loginForm.user_name"
							style="width:200px"
							placeholder="username"
						>
							<a-icon slot="prefix" type="user" />
						</a-input>
					</a-form-model-item>
					<a-form-model-item porp="password">
						<a-input
							v-model="loginForm.password"
							style="width:200px"
							placeholder="password"
							type="password"
						>
							<a-icon slot="prefix" type="lock" />
						</a-input>
					</a-form-model-item>
					<a-form-model-item>
						<a-button
							type="primary"
							style="margin-right:10px;"
							@click="login"
						>
							登录
						</a-button>
						<a-button type="default" @click="toRegister">
							注册
						</a-button>
					</a-form-model-item>
				</a-form-model>
			</div>
			<!-- 注册区域 -->
			<div :class="{ import: importable }">
				<a-form-model
					:model="registerForm"
					class="registered_form"
					ref="registerFormRef"
					:rules="registerFormRules"
					:label-col="labelCol"
				>
					<a-form-model-item label="用户名" prop="user_name">
						<a-input
							v-model="registerForm.user_name"
							style="width:200px"
							placeholder="用户名"
						>
						</a-input>
					</a-form-model-item>
					<a-form-model-item label="密码" prop="password">
						<a-input
							v-model="registerForm.password"
							style="width:200px"
							placeholder="密码"
						>
						</a-input>
					</a-form-model-item>
					<a-form-model-item label="QQ" prop="qq_number">
						<a-input
							v-model="registerForm.qq_number"
							style="width:200px"
							placeholder="QQ"
						>
						</a-input>
					</a-form-model-item>
					<a-form-model-item label="邮箱" prop="e_mail">
						<a-input
							v-model="registerForm.e_mail"
							style="width:200px"
							placeholder="邮箱"
						>
						</a-input>
					</a-form-model-item>
					<a-form-model-item>
						<!-- 注册按钮区域 -->
						<div class="register_btns">
							<a-button type="info" @click="toClean"
								>清空</a-button
							>
							<a-button type="primary" @click="register"
								>注册</a-button
							>
						</div>
					</a-form-model-item>
					<!-- 登录按钮区域 -->
					<div class="login_btns">
						<a-button type="success" @click="reLogin"
							>前往登录</a-button
						>
					</div>
				</a-form-model>
			</div>
		</div>
	</div>
</template>
<script>
import { Login, Register } from '@/api/user.js'
export default {
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
			recardanimationable: false,
			cardanimationable: false,
			importable: true,
			labelCol: { span: 4 },
			loginForm: {
				user_name: 'Himeko',
				password: '123456',
			},
			// 表单验证规则对象
			loginFormRules: {
				// 用户名验证规则
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
				],
				// 密码验证规则
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{
						min: 6,
						max: 35,
						message: '密码长度在 6 到 35 个字符内',
						trigger: 'blur',
					},
				],
			},
			// 注册表单绑定对象
			registerForm: {
				user_name: '',
				password: '',
				qq_number: '',
				e_mail: '',
			},
			// 表单验证规则对象
			registerFormRules: {
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
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{
						min: 6,
						max: 35,
						message: '密码长度在 6 到 35 个字符内',
						trigger: 'blur',
					},
					{ validator: checkRules, trigger: 'blur' },
				],
				qq_number: [{ validator: checkRules, trigger: 'blur' }],
				e_mail: [{ validator: checkRules, trigger: 'blur' }],
			},
		}
	},
	methods: {
		toRegister() {
			this.cardanimationable = true
			this.importable = false
			this.recardanimationable = false
		},
		reLogin() {
			this.cardanimationable = false
			this.importable = true
			this.recardanimationable = true
			this.toClean()
		},

		login() {
			this.$refs.loginFormRef.validate(async (valid) => {
				if (!valid) return
				const { data: res } = await Login(this.loginForm)
				console.log(res)
				if (res.status !== 200)
					// 登录失败
					return this.$openNotificationWithIcon(
						'error',
						'登录失败：状态码 ' + res.status,
						res.msg
					)
				// 登录成功业务
				this.$openNotificationWithIcon(
					'success',
					'登录成功',
					'欢迎用户' + res.data.user_name
				)
				this.$router.push('/home')
			})
		},
		// 重置表单
		toClean() {
			this.$refs.registerFormRef.resetFields()
		},
		register() {
			this.$refs.registerFormRef.validate(async (valid) => {
				if (!valid) return
				const { data: res } = await Register(this.registerForm)
				console.log(res)
				// 注册失败
				if (res.status !== 200)
					return this.$openNotificationWithIcon(
						'error',
						'注册失败：状态码 ' + res.status,
						res.msg
					)
				// 注册成功
				this.$openNotificationWithIcon('success', '注册成功', '请登录')
				this.reLogin()
			})
		},
	},
}
</script>
<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Homemade+Apple&family=Sacramento&display=swap');
.body_bg {
	/*透视距离*/
	perspective: 1600px;
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: linear-gradient(120deg, #40b3ff, #d97aff);
	overflow: hidden;
}
.card {
	position: relative;
	transform-style: preserve-3d;
	width: 400px;
	height: 500px;
	background-color: #ffffff;
	box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.05);
	border-radius: 5%;
}
.avatar_box {
	width: 130px;
	height: 130px;
	border: 1px solid #eee;
	border-radius: 50%;
	padding: 5px;
	box-shadow: 0 0 10px #ddd;
	position: absolute;
	left: 50%;
	background-color: #fff;
	float: left;
	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: #eee;
	}
}
.login,
.registered {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: #ffffff;
	border-radius: 5%;
}
.login {
	position: absolute;
}
.import {
	display: none;
}
.registered_form {
	position: absolute;
	transform-style: preserve-3d;
	transform: rotateY(-180deg);
	bottom: 15%;
	width: 100%;
	left: -10%;
	box-sizing: border-box;
	margin: 0 auto;
}
@keyframes rotate {
	0% {
		transform: rotateY(0deg);
	}
	100% {
		transform: rotateY(180deg);
	}
}
@keyframes rotate-reverse {
	100% {
		transform: rotateY(0deg);
	}
	0% {
		transform: rotateY(180deg);
	}
}
.cardanimation {
	animation: rotate 0.5s cubic-bezier(0.76, -0.51, 0.29, 1.5) forwards;
}
.recardanimation {
	animation: rotate-reverse 0.5s cubic-bezier(0.76, -0.51, 0.29, 1.5) forwards;
}
.login_btns {
	position: absolute;
	bottom: -20%;
}
svg {
	width: 600px;
	height: 300px;
	margin: auto;
}
svg text {
	text-transform: uppercase;
	animation: stroke 5s infinite alternate;
	letter-spacing: 10px;
	font-size: 30px;
}
@keyframes stroke {
	0% {
		fill: rgba(72, 138, 20, 0);
		stroke: rgba(54, 95, 160, 1);
		stroke-dashoffset: 25%;
		stroke-dasharray: 0 50%;
		stroke-width: 0.8;
	}
	50% {
		fill: rgba(72, 138, 20, 0);
		stroke: rgba(54, 95, 160, 1);
		stroke-width: 1.2;
	}
	70% {
		fill: rgba(72, 138, 20, 0);
		stroke: rgba(54, 95, 160, 1);
		stroke-width: 1.5;
	}
	90%,
	100% {
		fill: rgba(72, 138, 204, 1);
		stroke: rgba(54, 95, 160, 0);
		stroke-dashoffset: -25%;
		stroke-dasharray: 50% 0;
		stroke-width: 0;
	}
}
</style>
