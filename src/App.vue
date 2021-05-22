<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>
<script>
export default {
	name: 'app',
	created() {
		if (!this.$isEmpty(sessionStorage.user)) {
			this.$store.commit('saveUserInfo', JSON.parse(sessionStorage.user))
		}
	},
}
</script>
<style>
#app {
	height: 100%;
}
</style>
