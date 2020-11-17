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
			<div class="user--settings-setting user--settings-avatar">
				<label>Avatar</label>
				<ul>
					<li v-for="(avatar, index) in this.avatarEmojis" :key="index" :index="index" @click="selectAvatar(index)" :class="{ 'active' : avatar.selected }">{{ avatar.char }}</li>
				</ul>
			</div>
			<div class="user--settings-setting">
				<label>Username</label>
				<input type="text" placeholder="andybeckmann">
			</div>
			<div class="user--settings-setting">
				<label>Password</label>
				<input type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;">
			</div>
			<div :class="{ 'disabled' : !this.isConfirmationNeeded }" class="user--settings-setting">
				<label>Confirm password</label>
				<input type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;">
			</div>
			<div class="user--settings-setting user--settings-setting-disable-flashing-goals">
				<input type="checkbox" role="checkbox" name="checkbox-option-one" id="checkbox-option-one" checked="" aria-checked="true">
				<label for="checkbox-option-one">Disable flashing goals</label>
			</div>
			<button class="update">Update</button>
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
		},

		methods: {
			selectAvatar(index) {

				for (let i in this.avatarEmojis) {
					if (this.avatarEmojis[i].selected == true) {
						this.avatarEmojis[i].selected = false
					}
				}

				this.avatarEmojis[index].selected = true
			}
		},

		data() {
			return {
				isConfirmationNeeded: false,

				avatarEmojis: [
					{ 
						id: 1,
						char: '🙂',
						selected: true
					},
					{ 
						id: 2,
						char: '😎' ,
						selected: false
					},
					{ 	
						id: 3,
						char: '😈' ,
						selected: false
					},
					{ 	
						id: 4,
						char: '👽',
						selected: false 
					},
					{ 	
						id: 5,
						char: '🤖',
						selected: false 
					},
					{ 	
						id: 6,
						char: '🦄',
						selected: false 
					},
					{ 	
						id: 7,
						char: '🐶',
						selected: false 
					},
					{ 	
						id: 8,
						char: '🐷',
						selected: false 
					},
					{ 	
						id: 9,
						char: '🦁',
						selected: false 
					},
					{ 	
						id: 10,
						char: '🐯',
						selected: false 
					}
				]
			}
		}
	}
</script>

<style scoped lang="scss">
	.user--settings-setting-disable-flashing-goals {
		padding: 15px 0;
		text-align: center;
	}

	.user--settings-avatar {
		ul {
			margin: 15px 0;
			padding: 0;
			list-style-type: none;
			display: flex;
			overflow-x: scroll;

			li {
				font-size: 75px;
				line-height: 80px;
				margin-right: 15px;
				border: 5px solid transparent;

				&.active {
					border: 5px dashed #e900ff;
					border-radius: 15px;
				}
			}
		}
	}

	.disabled {
		opacity: 0.25;
	}
</style>
