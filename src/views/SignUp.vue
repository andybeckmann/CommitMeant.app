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
			<label>Email<span>*</span></label>
			<input type="text" placeholder="contact@andybeckmann.com">
			<label>Password<span>*</span></label>
			<input type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;">
			<label>Confirm Password<span>*</span></label>
			<input type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;">
		</div>
		<AppFooter />
	</div>
</template>

<script>
	import AppNavigation from '@/components/AppNavigation.vue'
	import AppLogo from '@/components/AppLogo.vue'
	import AppFooter from '@/components/AppFooter.vue'

	export default {
		name: 'SignUp',
		components: {
			AppNavigation, 
			AppLogo,
			AppFooter
		}
	}
</script>

<style scoped lang="scss">
	
</style>
