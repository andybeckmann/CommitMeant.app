<template>
	<div class="app--main">
		<div class="app--menu-bar">
			<AppNavigation />
			<AppLogo />
			<button @click="openForm" class="app--add-goal" :class="{ 'active' : isAddGoalButtonPressed }">
				<div class="icon--toggle">
					<div class="app--add-goal-toggle-top"></div>
					<div class="app--add-goal-toggle-bottom"></div>
				</div>
			</button>
		</div>
		<div class="user">
			<UserHeader v-bind:score="score" />
			<div class="user--goals">
				<ul>
					<li v-for="(goal, index) in goals" :key="goal.id" :index="index" ref="goal" :class="{ 'completed' : goal.completedToday }">
						<div class="user--goals-item">
							<button @click="toggleGoalStatus(goals, goal.id, goal.description, goal.completedToday)" :class="{ 'completed' : goal.completedToday }"></button>
							{{goal.description}}
							<button @click="deleteGoal(goal.id)" :data-key="goal" class="delete"></button>
						</div>
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
						v-on:keyup="enableSubmit"
						@keyup.enter="addGoal"
					>
					<button @click="addGoal" :disabled="isAddGoalButtonDisabled">+</button>
				</div>
				<div class="user--add-goal-overlay" @click="closeForm">
				</div>
			</div>
			<UserPerformance />
		</div>
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
	const database = 'http://localhost:3000'

	export default {

		name: 'UserGoals',

		components: {
			AppNavigation,
			AppLogo,
			AppFooter,
			UserHeader,
			UserPerformance
		},

		computed: {

			/**
			 * Calculates the number of currently completed goals
			 */
			calculateTodaysCompletedGoals() {

				let todaysCompletedGoals = 0

				for (let i=0; i < this.goals.length; i++) {
					if (this.goals[i].completedToday == true) {
						todaysCompletedGoals += 1
					}
				}

				return todaysCompletedGoals
			}

		},

		methods: {

			/**
			 * Initializes a get request to database to retreive goals array
			 */
			async getGoals() {
				try {
					const res = await axios.get(database + '/goals')
					this.goals = res.data
				} catch(e) {
					console.error(e)
				}
			},

			/**
			 * Initializes a post request to database to push new goal into goals array
			 */
			addGoal() {
				try {
					const res = axios.post(database + '/goals', { description: this.description, completedToday: false })
					this.goals = [this.goals, res.data]
				} catch(e) {
					console.error(e)
				} finally {
					this.description = ''
					this.getGoals()
					this.closeForm()
				}
			},

			/**
			 * Creates delete request to database to delete targetd goal.id
			 */
			deleteGoal(id) {
				try {
					axios.delete(database + '/goals/' + id)
						.then(() => {
							this.getGoals()
						})
				} catch(e) {
					console.error(e)
				}
			},

			/**
			 * Calculates the value to be assigned to this.score
			 */
			calculateTodaysScore() {

				this.totalGoals = this.goals.length
				console.log('todays total goals: ' + this.totalGoals)

				this.totalGoalsCompleted = this.calculateTodaysCompletedGoals + 1
				console.log('todays total completed goals: ' + this.totalGoalsCompleted)

				let todaysScore = (this.totalGoalsCompleted / this.totalGoals)
				console.log('todays score value: ' + todaysScore)

				if (todaysScore == 1) {
					this.score = 'onehundred'
				} else if (todaysScore <= 1 && todaysScore > 0) {
					this.score = 'fifty'
				} else {
					this.score = 'zero'
				}

				console.log('todays score class: ' + this.score)
				console.log('------------------------------------------')
			},

			/**
			 * Initializes a push/put request to the database to add/modify a day in the performance array
			 */
			toggleGoalStatus(goals, id, description, completedToday) {
				
				/*

				const today = new Date() 
				const todaysDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' today.getDate()

				let month = today.getMonth() + 1

				for (let = i; i < month.length; i++) {

					if (month[i].date == todaysDate) {

						// Update todays data
						axios.put(database + '/' + month + today.getFullYear() + '/' + this.id, { totalGoals: this.totalGoals, totalGoalsCompleted: this.totalGoalsCompleted, score: calculateTodaysCompletedGoalsValue(), id: this.id })
						
					} else {

						// Push new day into database
						axios.push(database + '/' + month + today.getFullYear(), { date: todaysDate, totalGoals: this.totalGoals, totalGoalsCompleted: this.totalGoalsCompleted, score: calculateTodaysCompletedGoalsValue(), id: this.id })
							.then(() => {

						})
					}
				}

				**/

				try {
					axios.put(database + '/goals/' + id, { description: description, completedToday: !completedToday })
						.then(() => {
							this.getGoals()
						})
				} catch(e) {
					console.error(e)
				} finally {
					this.getGoals()
					this.calculateTodaysScore()
				}

				//this.calculateTodaysScore()
			},

			/**
			 * Toggles isAddGoalButtonPressed and isAddGoalFormVisible between true/false to display form to add a new goal to the goals array
			 */
			openForm() {
				this.isAddGoalButtonPressed = !this.isAddGoalButtonPressed
				this.isAddGoalFormVisible = !this.isAddGoalFormVisible
			},

			/**
			 * Sets isAddGoalButtonDisabled to true after text has been entered and is used to set <button> disabled initially
			 */
			enableSubmit() {
				this.isAddGoalButtonDisabled = false;
			},

			/**
			 * 
			 */
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
				isAddGoalFormFilled: false,
				isAddGoalButtonDisabled: true,
				isAddGoalButtonPressed: false,

				label: 'Add Goal',
				description: '',
				goal: {
					description: '',
					id: null
				},

				day: {
					score: '',
				},

				score: '',

				performance: [
					{ 
						year: '',
						months: [
							{ 
								name: '',
								days: [
									{
										date: '',
										totalGoals: 0,
										totalGoalsCompleted: 0,
										score: 0,
									}
								]
							}
						]
					}
				]
			}
		}
	}
</script>

<style lang="scss">

	.app--main {
		padding-top: 56px;
		background: #eee;
	}

	.app--menu-bar {
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.app--add-goal {
		width: 55px;
		height: 55px;
		padding: 15px;
		background: #e900ff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border: none;
		outline: none;
		border-radius: 0;
		cursor: pointer;

		&.active {
			background: #111;

			.icon--toggle {
				transform: rotate(0);
			}
		}

		&.disabled {
			background: #fff;
		}

		&:focus {
			outline: none;
		}

		.icon--toggle {
			transform: rotate(45deg);
			transition: .15s ease-out transform;
		}

		.app--add-goal-toggle-top {
			transform: rotate(-45deg);
			bottom: -4px;
			position: relative;
			height: 5px;
			width: 25px;
			background: #fff;
			margin-bottom: 3px;
			border-radius: 10px;
		}

		.app--add-goal-toggle-bottom {
			transform: rotate(45deg);
			top: -4px;
			position: relative;
			height: 5px;
			width: 25px;
			background: #fff;
			margin-bottom: 3px;
			border-radius: 10px;
		}
	}

	.app--add-goal.disabled {
		background: #fff;
	}

	.user--settings {
		padding: 15px; 

		label {
			font-weight: bold;

			span {
				color: #9703fa;
			}
		}

		input[type=text], input[type=password] {
			font-size: 20px;
			margin: 15px 0;
			display: flex;
			border: 5px solid #e900ff;
			padding: 20px;
			border-radius: 15px;
			background: #fff;
			width: 100%;

			&:focus {
				outline: none;
				border-color: #9703fa;
			}
		}

		input[type=checkbox] {
			position: absolute;
			opacity: 0; 

			& + label {
				position: relative;
				cursor: pointer;
				padding: 0;
				margin-right: 15px;
				margin-top: 15px;
			}

			& + label:before {
				content: '';
				margin-right: 10px;
				margin-top: -2px;
				display: inline-block;
				vertical-align: text-top;
				width: 26px;
				height: 26px;
				border: 1px solid #ccc;
				background: #fff;
				border-radius: 3px;
			}

			&:hover + label:before {
				background: #eee;
			}

			&:checked + label:before {
				background: #111;
			}
		
			&:checked + label:after {
				content: '\000D7';
				color: #fff;
				position: absolute;
				left: 8px;
				top: -2px;
				font-size: 20px;
				font-weight: bold;
			}
		}
	}

	.user--goals{
		background: linear-gradient(180deg, #e900ff, #9703fa);
		border-radius: 15px;
		padding: 0;
		margin: 15px;
		border-top: 1px solid #eee;

		ul {
			margin: 0;
			padding: 0;
			list-style: none;
			display: flex;
			flex-flow: column;
			border-radius: 15px;
			overflow: hidden;

			li {
				animation: completedTask 1.5s infinite;

				.user--goals-item {
					color: #fff;
					font-size: 18px;
					width: 100%;
					border-bottom: 1px solid rgba(255,255,255,.4);
					position: relative;
					height: 0;
					padding: 0 15px;
					overflow: hidden;
					animation: .15s goalItemSlideDown linear forwards
				}

				@keyframes goalItemSlideDown {
					0% {
						height: 0;
						padding: 0 15px;
					}
					100% {
						height: 55px;
						padding: 15px;
					}
				}

				&:first-of-type {
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

				&:last-of-type {
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
			border-radius: 0;
			display: flex;
			outline: 0;

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
