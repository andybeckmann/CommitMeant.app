<template>
	<div class="app--main">
		<div class="app--menu-bar">
			<AppNavigation />
			<AppLogo />
			<button @click="openForm" class="app--add-goal disabled" :class="{ 'active' : isAddGoalButtonPressed }">
				<span></span>
			</button>
		</div>
		<div class="user--settings">
			<p>Logged out</p>
		</div>
		<AppFooter />
	</div>
</template>

<script>
	import AppNavigation from '@/components/AppNavigation.vue'
	import AppLogo from '@/components/AppLogo.vue'
	import AppFooter from '@/components/AppFooter.vue'

	export default {
		name: 'LogOut',
		components: {
			AppNavigation,
			AppLogo,
			AppFooter
		}
	}
</script>

<style lang="scss" scoped>
	
</style>