<template>
	<div>
		<div class="app--menu-bar">
			<AppNavigation />
			<AppLogo />
			<button @click="openForm" class="app--add-goal" :class="{ 'active' : isAddGoalButtonPressed }">
				<span>+</span>
			</button>
		</div>
		<UserHeader />
		<div class="user--goals">
			<ul>
				<li v-for="(goal, index) in goals" :key="goal.id" :index="index" ref="goal" :class="{ 'completed' : goal.completedToday }">
					<button @click="goal.completedToday = !goal.completedToday" :class="{ 'completed' : goal.completedToday }"></button>
					{{goal.description}}
					<button @click="deleteGoal(goal.id)" :data-key="goal" class="delete"></button>
				</li>
			</ul>
		</div>
		<div class="user--add-goal-form" :class="{ 'show' : isAddGoalFormVisible }">
			<div class="user--add-goal-form-fields">
				<label>{{ label }}</label>
				<input
					autofocus
					placeholder="Set a goal, see it through..."
					v-model="description"
					@keyup.enter="addGoal"
				>
				<button @click="addGoal">+</button>
			</div>
			<div class="user--add-goal-overlay" @click="closeForm">
			</div>
		</div>
		<UserPerformance />
		<AppFooter />
	</div>
</template>

<script>

	// CommitMeantApp.com
	// Version: 0.1
	// Author: Andy Beckmann
	// Website: ANDYBECKMANN.COM LLC

	// App components
	import AppNavigation from '@/components/AppNavigation.vue'
	import AppLogo from '@/components/AppLogo.vue'
	import AppFooter from '@/components/AppFooter.vue'

	// User components
	import UserHeader from '@/components/UserHeader.vue'
	import UserPerformance from '@/components/UserPerformance.vue'

	// Database
	import axios from 'axios'
	const database = 'http://localhost:3000/goals'

	export default {

		name: 'UserGoals',

		components: {
			AppNavigation,
			AppLogo,
			AppFooter,
			UserHeader,
			UserPerformance
		},

		methods: {
			async getGoals() {
				try {
					const res = await axios.get(database)
					this.goals = res.data
				} catch(e) {
					console.error(e)
				}
			},

			addGoal() {
				try {
					const res = axios.post(database, { description: this.description, completedToday: false })
					this.goals = [this.goals, res.data]
				} catch(e) {
					console.error(e)
				} finally {
					this.description = ''
					this.getGoals()
					this.closeForm()
				}
			},

			deleteGoal(id) {
				try {
					axios.delete(database + '/' + id)
						.then(() => {
							this.getGoals()
						})
				} catch(e) {
					console.error(e)
				}
			},

			openForm() {
				this.isAddGoalButtonPressed = !this.isAddGoalButtonPressed
				this.isAddGoalFormVisible = !this.isAddGoalFormVisible
			},

			closeForm() {
				this.isAddGoalButtonPressed = !this.isAddGoalButtonPressed
				this.isAddGoalFormVisible = !this.isAddGoalFormVisible
			}
		},

		created() {
			this.getGoals()
		},

		data() {
			return {
				goals: [],
				isAddGoalFormVisible: false,
				label: 'Add Goal',
				goal: {
					description: '',
					id: null
				},
				description: ''
			}
		}
	}
</script>

<style lang="scss">
	.app--menu-bar {
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #ccc;
	}

	.app--add-goal {
		color: #fff;
		font-size: 35px;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		position: relative;
		background: #eee;
		display: flex;
		color: #e900ff;
		justify-content: center;
		align-items: center;
		width: 55px;
		height: 55px;
		border: 0;
		border-left: 1px solid #ccc;
		cursor: pointer;

		&.active {
			background: #111;
			border-left: 1px solid #111;
			border-bottom: 1px solid #111;

			span {
				transform: rotate(45deg);
				font-size: 38px;
				color: #fff;
			}
		}

		&:focus {
			outline: none;
		}

		span {
			position: relative;
			top: -2px;
			transition: .1s ease-out transform;
		}
	}

	.user--goals{
		background: linear-gradient(180deg, #e900ff, #9703fa);
		border-radius: 15px;
		padding: 0;
		margin: 15px;

		ul {
			margin: 0;
			padding: 0;
			list-style: none;
			display: flex;
			flex-flow: column;
			border-radius: 15px;
			overflow: hidden;

			li {
				color: #fff;
				font-size: 18px;
				padding: 15px;
				width: 100%;
				border-bottom: 1px solid rgba(255,255,255,.4);
				animation: completedTask 1.5s infinite;
				position: relative;

				&:first-of-type{
					border-radius: 15px 15px 0 0;
					animation-delay: 0s;
				}

				&:nth-of-type(2) {
					animation-delay: .1s;
				}

				&:nth-of-type(3) {
					animation-delay: .2s;
				}

				&:nth-of-type(4) {
					animation-delay: .3s;
				}

				&:nth-of-type(5) {
					animation-delay: .4s;
				}

				&:nth-of-type(6) {
					animation-delay: .5s;
				}

				&:nth-of-type(7) {
					animation-delay: .6s;
				}

				&:nth-of-type(8) {
					animation-delay: .7s;
				}

				&:nth-of-type(9) {
					animation-delay: .8s;
				}

				&:nth-of-type(10) {
					animation-delay: .9s;
				}

				&:last-of-type{
					border-bottom: none;
					border-radius: 0 0 15px 15px;
				}

				&.completed {
					background: none;
					animation: none;
				}

				@keyframes completedTask {
					0% {
						background: #9703fa;
					}
					50% {
						background: #e900ff;
					}
					100% {
						background: #9703fa;
					}
				}

				button {
					width: 24px;
					height: 24px;
					background: 0 0;
					border: 3px solid #fff;
					border-radius: 25px;
					display: inline-block;
					content: "";
					margin-bottom: -5px;
					margin-right: 15px;
					cursor: pointer;

					&:focus {
						outline: none;
						border-color: (rgba(255, 255, 255, 0.5));
					}

					&.completed {
						background: #fff;
						position: relative;

						&:before {
							content: '';
							position: absolute;
							top: -7px;
							left: -6px;
							width: 25px;
							height: 25px;
							background: #fff;
							border-radius: 25px;
							display: inline-block;
							border: 3px solid #fff;
							content: "";
							margin-right: 15px;
							animation: scaleFadeOut .75s linear forwards;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}

					@keyframes scaleFadeOut {
						0% {
							transform: scale(1);
							opacity: 1;
						}

						100% {
							transform: scale(1.5);
							opacity: 0;
						}
					}

					&.delete {
						border: 0;
						position: absolute;
						width: 40px;
						height: 40px;
						top: 0;
						right: 0;

						&:before {
							content: '+';
							transform: rotate(45deg);
							font-size: 32px;
							color: rgba(255, 255, 255, 0.7);
							position: absolute;
							top: 10px;
							right: 5px;
							display: block;

						}
					}
				}
			}
		}
	}

	.user--add-goal-form {
		position: absolute;
		width: 100%;
		height: 100%;
		display: none;
		top: 56px;
		left: 0;

		&.show {
			display: block;

			.user--add-goal-form-fields {
				animation: addGoalSlideDown .05s linear forwards;
			}

			@keyframes addGoalSlideDown {
				0% {
					height: 0;
				}

				100% {
					height: 73px;
				}
			}
		}

		label{
			display: none;
		}

		input {
			width: 100%;
			padding: 20px 25px;
			font-size: 24px;
			border: 0;
			border-bottom: 5px solid #e900ff;
			position: relative;
			z-index: 2;
			font-style: italic;

			&:focus {
				outline: none;
				border-bototm: 5px solid #9703fa;
			}
		}

		button {
			position: absolute;
			z-index: 3;
			right: 15px;
			top: 12px;
			-webkit-appearance: none;
			border: 0;
			outline: none;
			border-radius: 50%;
			background: #e900ff;
			padding: 4px 12px;
			color: #fff;
			font-size: 30px;

			&:disabled {
				padding: 2px 10px;
				background: #fff;
				color: #eee;
				border: 3px solid #eee;
			}
		}

		.user--add-goal-form-fields {
			position: relative;
			height: 0;
			overflow: hidden;
		}

		.user--add-goal-overlay {
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.75);
			backdrop-filter: blur(2px);
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
		}

	}
</style>
