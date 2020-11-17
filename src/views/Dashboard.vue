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
			<UserHeader 
				:score="this.stats.score" 
				:currentStreakDays="this.stats.currentStreakDays" 
				:currentRecordDays="this.stats.currentRecordDays" 
			/>
			<div class="user--goals">
				<ul>
					<li v-for="(goal, index) in goals" :key="index" :index="index" ref="goal" :class="{ 'completed' : goal.completedToday }">
						<div class="user--goals-item">
							<button 
								@click="toggleGoalStatus(goals, index, goal.description, goal.completedToday)" 
								:data-key="goal" 
								:class="{ 'completed' : goal.completedToday }
							"></button>
							{{ goal.description }}
							<button 
								@click="deleteGoal(index)" 
								:data-key="goal" 
								class="delete"
							></button> 
						</div>
					</li>
				</ul>
			</div>
			<div class="user--add-goal-form" :class="{ 'show' : isAddGoalFormVisible }">
				<div class="user--add-goal-form-fields">
					<label>{{ addGoalLabel }}</label>
					<input
						autofocus
						placeholder="Set a goal, see it through..."
						v-model="goal.description"
						v-on:keyup="enableSubmit"
						@keyup.enter="addGoal"
					>
					<button @click="addGoal" :disabled="isAddGoalButtonDisabled">+</button>
				</div>
				<div class="user--add-goal-overlay" @click="closeForm">
				</div>
			</div>
			<UserPerformance
				:performance="this.performance"
			/>
		</div>
		<AppFooter />
	</div>
</template>

<script>
	// App
	import AppNavigation from '@/components/AppNavigation.vue'
	import AppLogo from '@/components/AppLogo.vue'
	import AppFooter from '@/components/AppFooter.vue'

	// User
	import UserHeader from '@/components/UserHeader.vue'
	import UserPerformance from '@/components/UserPerformance.vue'

	// Databse
	import axios from 'axios'
	const database = 'https://commitmeant-f2536.firebaseio.com'

	export default {

		name: 'Dashboard',

		components: {
			AppNavigation,
			AppLogo,
			AppFooter,
			UserHeader,
			UserPerformance
		},

		methods: {

			/**
			 * GET stats[array] and assign to this.stats
			 */
			async getStats() {
				try {
					const res = await axios.get(database + '/stats/0.json')
					this.stats = res.data
				} catch(e) {
					console.error(e)
				}
			},

			/**
			 * GET goals[array] and assign to this.goals
			 */
			async getGoals() {
				try {
					const res = await axios.get(database + '/goals.json')
					this.goals = res.data
				} catch(e) {
					console.error(e)
				}
			},

			/**
			 * GET performance[array] and assign to this.performance
			 */
			async getPerformance() {
				try {
					const res = await axios.get(database + '/performance.json')
					this.performance = res.data
				} catch(e) {
					console.error(e)
				}
			},

			/**
			 * POST new goal into goals[array]
			 */
			async addGoal() {
				try {
					const res = await axios.post(database + '/goals.json', { description: this.goal.description, completedToday: false, id: this.goal.id })
					this.goals = [this.goals, res.data]
				} catch(e) {
					console.error(e)
				} finally {
					this.goal.description = ''
					this.getGoals()
					this.closeForm()
				}
			},

			/**
			 * DELETE request to delete targeted goal.id
			 */
			async deleteGoal(id) {
				try {
					await axios.delete(database + '/goals/' + id + '.json')
					
				} catch(e) {
					console.error(e)
				}
				this.getGoals()
			},

			/**
			 * PUT request to update goal.completedToday then run updatePerformance()
			 */
			async toggleGoalStatus(goals, index, description, completedToday) {

				try {
					await axios.put(database + '/goals/' + index + '.json', { description: description, completedToday: !completedToday })

				} catch(e) {
					console.error(e)

				} finally {
					// GET updated goals [array]
					this.getGoals()

					// Calculate todays score
					this.calculateTodaysScore(goals, completedToday)

					// PUT updated stats into stats [array]
					this.updateStats()

					// GET updated stats [array]
					this.getStats()

					// PUT or PUSH updated performance into performance [array]
					this.updatePerformance(goals, completedToday)

					// GET performance [array]
					this.getPerformance()
				}
			},

			/**
			 * Calculate number of completed goals
			 */
			calculateTodaysCompletedGoals(goals, completedToday) {

				let todaysCompletedGoals = 1

				for (let i in goals) {
					if (goals[i].completedToday == true) {
						todaysCompletedGoals += 1
					}
				}

				if (completedToday) {
					todaysCompletedGoals -= 2
				}

				return todaysCompletedGoals
			},

			/**
			 * Calculate number of total goals
			 */
			calculateTotalGoals(goals) {
				let goalCount = []

				for (let i in goals) {
					goalCount.push(i)
				}

				return goalCount.length
			},

			/**
			 * Calculate string for this.score
			 */
			calculateTodaysScore(goals, completedToday) {

				this.totalGoals = this.calculateTotalGoals(goals)
				this.totalGoalsCompleted = this.calculateTodaysCompletedGoals(goals, completedToday)

				let todaysScore = (this.totalGoalsCompleted / this.totalGoals)

				if ((this.totalGoalsCompleted / this.totalGoals) == 1) {
					this.score = 'onehundred'

				} else if (todaysScore <= 1 && todaysScore > 0) {
					this.score = 'fifty'

				} else {
					this.score = 'zero'
				}

				// Console debugging:
				/* 
				console.log("---------------------------------------")
				console.log("Today's totalGoals: " + this.totalGoals)
				console.log("Today's totalGoalsCompleted: " + this.totalGoalsCompleted)
				console.log("Today's score value: " + todaysScore)
				console.log("Today's score: " + this.score)
				*/
				
			},

			/**
			 * PUT request to the database to update stats [array]
			 */
			async updateStats() {
				try {
					const res = await axios.put(database + '/stats/0.json', { score: this.score, currentStreakDays: this.stats.currentStreakDays, currentRecordDays: this.stats.currentRecordDays, id: 1 })
					this.stats = res.data
				} catch(e) {
					console.error(e)
				}
			},

			/**
			 * PUT or PUSH request to update performance [array] depending on the existance of data for today
			 */
			async updatePerformance(goals, completedToday) {
				const 	today = new Date(),
						todaysMonth = today.getMonth() + 1,
						todaysYear = today.getFullYear(),
						todaysDay = today.getDate()

				for (let year in this.performance) {
					if (this.performance[year]["year"] == todaysYear) {

						for (let month in this.performance[year]["months"]) {
							if(this.performance[year]["months"][month]["id"] == todaysMonth) {

								for (let day in this.performance[year]["months"][month]["days"]) {
									let dateString = todaysYear + '-' + todaysMonth + '-' + todaysDay
									let targetYear = this.performance[year]["id"]
									let targetMonth = this.performance[year]["months"][month]["id"] - 1

									// For testing purposes, and due to starting at november, targetMonth and targetYear gets reset -- change these next two lines later
									targetMonth = 0
									targetYear = 0

									let targetRecord = database + '/performance/' + targetYear + '/months/' + targetMonth + '/days.json'

									this.totalGoals = this.calculateTotalGoals(goals)
									this.totalGoalsCompleted = this.calculateTodaysCompletedGoals(goals, completedToday)

									try {
										await axios.put(targetRecord, [
											{ 
												"date"					: dateString,
												"score"					: this.score,
												"totalGoals"			: this.totalGoals,
												"totalCompletedGoals"	: this.totalGoalsCompleted
											}
										])
									} catch (e) {
										console.error(e)
									}

									if (this.performance[year]["months"][month]["days"][day]["date"] === dateString) {
										/*let dateString = todaysYear + '-' + todaysMonth + '-' + todaysDay
										let targetYear = this.performance[year]["id"]
										let targetMonth = this.performance[year]["months"][month]["id"] - 1

										// For testing purposes, and due to starting at november, targetMonth and targetYear gets reset -- change these next two lines later
										targetMonth = 0
										targetYear = 0

										let targetRecord = database + '/performance/' + targetYear + '/months/' + targetMonth + '/days.json'

										await axios.put(targetRecord, { 
											"date"					: dateString,
											"score"					: this.score,
											"totalGoals"			: this.totalGoals,
											"totalCompletedGoals"	: this.totalCompletedGoals
										})*/
			
									} else {
										// 1 push new day into performance[year][month]["days"] [array]
									}

								}

							} else {

								// 1 push new month in performance[year]["months"] [array]
								// 2 push new day into performance[year][month]["days"] [array]

							}
						}

					} else {

						// 1 push new year in performance [array]
						// 2 push new month in performance[year]["months"] [array]
						// 3 push new day into performance[year][month]["days"] [array]

					}
				}

				this.getPerformance()
			},

			/**
			 * Open add goal form
			 */
			openForm() {

				this.isAddGoalButtonPressed = !this.isAddGoalButtonPressed
				this.isAddGoalFormVisible = !this.isAddGoalFormVisible
			},

			/**
			 * Close add goal form
			 */
			closeForm() {

				this.isAddGoalButtonPressed = !this.isAddGoalButtonPressed
				this.isAddGoalFormVisible = !this.isAddGoalFormVisible
			},

			/**
			 * Enable goal submission when text is entered
			 */
			enableSubmit() {

				this.isAddGoalButtonDisabled = false
			}
		},

		created() {
			this.getStats()
			this.getGoals()
			this.getPerformance()
		},

		data() {
			return {

				// UI variables
				isAddGoalFormVisible: false,
				isAddGoalFormFilled: false,
				isAddGoalButtonDisabled: true,
				isAddGoalButtonPressed: false,

				/**
				 * Initial stats [array] data
				 */
				stats: {
					score: '',
					currentStreakDays: null,
					currentRecordDays: null
				},

				/**
				 * Initial goals [array] data
				 */
				goals: [],
				addGoalLabel: 'Add Goal',
				goal: {
					completedToday: false,
					description: '',
					id: null
				},

				/**
				 * Initial performance [array] data
				 */
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
				margin-top: -3px;
				display: inline-block;
				vertical-align: text-top;
				width: 26px;
				height: 26px;
				box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
				background: #fff;
				border-radius: 50%;
			}

			&:hover + label:before {
				background: #fff;
			}

			&:checked + label:before {
				background: #e900ff;
				border: 4px solid #fff;
				width: 18px;
				height: 18px;
			}
		
			&:checked + label:after {
				content: '';
				color: #fff;
				position: absolute;
				left: 8px;
				top: -2px;
				font-size: 20px;
				font-weight: bold;
			}
		}

		button.submit, button.update {
			font-size: 18px;
			font-weight: bold;
			text-transform: uppercase;
			text-align: center;
			color: #fff;
			width: 100%;
			margin: 15px 0;
			padding: 24px;
			background-color: #e900ff;
			border: none;
			border-radius: 15px;
			cursor: pointer;

			&:focus {
				outline: none;
				border: 4px solid #9703fa;
				padding: 20px;
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
					padding: 15px;
					overflow: hidden;
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
					border-radius: 50%;
					display: inline-block;
					position: relative;
					margin-top: 0;
					margin-left: 0;
					margin-bottom: -5px;
					margin-right: 15px;
					cursor: pointer;
					-webkit-appearance: none;

					&:focus {
						outline: none;
						border-color: (rgba(255, 255, 255, 0.5));
					}

					&.completed {
						background: #fff;
						position: relative;

						&:after {
							content: '';
							position: absolute;
							top: -7px;
							left: -6px;
							width: 25px;
							height: 25px;
							background: #fff;
							border-radius: 50%;
							display: inline-block;
							border: 3px solid #fff;
							animation: scaleFadeOut .75s linear forwards;
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
