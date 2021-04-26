module.exports = {
	lintOnSave: process.env.NODE_ENV === 'development',
	productionSourceMap: false,
	devServer: {
		port: 80,
		open: true,
		proxy: {
			// 把key的路径代理到target位置
			[process.env.VUE_APP_BASE_API]: {
				//需要代理的路径   例如 '/api'
				target: `http://127.0.0.1:7000/api/v1`, //代理到 目标路径
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					// 修改路径数据
					['^' + process.env.VUE_APP_BASE_API]: '', // 举例 '^/api:""' 把路径中的/api字符串删除
				},
			},
		},
	},
}
