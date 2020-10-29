<template>
	<div>
		<div class="app--menu-bar">
			<AppNavigation />
			<AppLogo />
		</div>
		<p>Settings</p>
		<AppFooter />
	</div>
</template>

<script>
	import AppNavigation from '@/components/AppNavigation.vue'
	import AppLogo from '@/components/AppLogo.vue'
	import AppFooter from '@/components/AppFooter.vue'

	export default {
		name: 'Settings',
		components: {
			AppNavigation, 
			AppLogo,
			AppFooter
		}
	}
</script>

<style scoped lang="scss">

</style>
