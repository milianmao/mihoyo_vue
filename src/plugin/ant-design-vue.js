import Vue from 'vue'
import 'ant-design-vue/dist/antd.css'
import {
	FormModel,
	Input,
	Icon,
	Button,
	notification,
	Layout,
	Menu,
	Avatar,
	Popover,
	Card,
	Row,
	Col,
	Tag,
	Select,
	message,
} from 'ant-design-vue'

Vue.use(FormModel)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Avatar)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tag)
Vue.use(Select)
Vue.use(Popover)
Vue.prototype.$notification = notification
Vue.prototype.$message = message
