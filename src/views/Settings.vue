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
			<div class="user--settings-setting user--settings-setting-disable-flashing-goals">
				<input type="checkbox" role="checkbox" name="checkbox-option-one" id="checkbox-option-one" checked="" aria-checked="true">
				<label for="checkbox-option-one">Disable flashing goals</label>
			</div>
			<div class="user--settings-setting">
				<label>Avatar</label>
				<input type="text" placeholder="picture.jpg">
			</div>
			<div class="user--settings-setting">
				<label>Email</label>
				<input type="text" placeholder="contact@andybeckmann.com">
			</div>
			<div class="user--settings-setting">
				<label>Password</label>
				<input type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;">
			</div>
		</div>
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
	.user--settings-setting-disable-flashing-goals {
		text-align: center;
	}
</style>
