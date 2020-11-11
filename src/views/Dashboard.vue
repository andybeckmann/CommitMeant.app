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
					<li v-for="(goal, index) in goals" :key="index" :index="index" ref="goal" :class="{ 'completed' : this.goal.completedToday }">
						<div class="user--goals-item">
							<button 
								@click="toggleGoalStatus(goals, goal.id, goal.description, goal.completedToday)" 
								:data-key="goal" 
								:class="{ 'completed' : goal.completedToday }
							"></button>
							{{goal.description}}
							<button 
								@click="deleteGoal(goal.id)" 
								:data-key="goal" 
								class="delete"
							></button> 
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
	import AppNavigation from '@/components/AppNavigation.vue'
	import AppLogo from '@/components/AppLogo.vue'
	import AppFooter from '@/components/AppFooter.vue'
	import UserHeader from '@/components/UserHeader.vue'
	import UserPerformance from '@/components/UserPerformance.vue'

	import axios from 'axios'
	const database = 'http://localhost:3000'

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
			 * GET goals[array] and assign to this.goals
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
			 * GET stats[array] and assign to this.stats
			 */
			async getStats() {
				try {
					const res = await axios.get(database + '/stats/1')
					this.stats = res.data
				} catch(e) {
					console.error(e)
				}
			},

			/**
			 * GET performance[array] and assign to this.performance
			 */
			async getPerformance() {
				try {
					const res = await axios.get(database + '/performance')
					this.performance = res.data
				} catch(e) {
					console.error(e)
				}
			},

			/**
			 * POST new goal into goals[array]
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
			 * DELETE request to database to delete targeted goal.id
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
			 * Calculate number of completed goals
			 */
			calculateTodaysCompletedGoals(completedToday) {

				let todaysCompletedGoals = 1

				for (let i=0; i < this.goals.length; i++) {
					if (this.goals[i].completedToday == true) {
						todaysCompletedGoals += 1
					}
				}

				if (completedToday) {
					todaysCompletedGoals -= 2
				}

				return todaysCompletedGoals
			},

			/**
			 * Calculate string for this.score
			 */
			calculateTodaysScore(completedToday) {
				this.totalGoals = this.goals.length
				this.totalGoalsCompleted = this.calculateTodaysCompletedGoals(completedToday)

				let todaysScore = (this.totalGoalsCompleted / this.totalGoals)

				if ((this.totalGoalsCompleted / this.totalGoals) == 1) {
					this.score = 'onehundred'

				} else if (todaysScore <= 1 && todaysScore > 0) {
					this.score = 'fifty'

				} else {
					this.score = 'zero'
				}

				console.log("-----------------------------------------")
				console.log("Today's Total goals: " + this.totalGoals)
				console.log("Today's Total completed goals: " + this.totalGoalsCompleted)
				console.log("Today's Score value: " + todaysScore)
				console.log("Today's Score class: " + this.score)
				console.log("-----------------------------------------")
			},

			/**
			 * PUT request to the database to update stats [array]
			 */
			updateStats() {
				try {
					axios.put(database + '/stats/1', { score: this.score, currentStreakDays: this.stats.currentStreakDays, currentRecordDays: this.stats.currentRecordDays })
				} catch(e) {
					console.error(e)
				}
			},

			/**
			 * PUSH or PUT request to the database to add or modify a day in performance [array]
			 */
			toggleGoalStatus(goals, id, description, completedToday) {

				/**
				 * The magic
				 */

				// Variables for the magic
				const 	today = new Date(),
						todaysMonth = today.getMonth() + 1,
						todaysYear = today.getFullYear(),
						todaysDay = today.getDate()

				try {
					// PUT request to the database to update target goal.completedToday value
					axios.put(database + '/goals/' + id, { description: description, completedToday: !completedToday })
						.then(() => {
							// Refresh goals
							this.getGoals()
						})

				} catch(e) {
					console.error(e)

				} finally {
					// Calculate todays score
					this.calculateTodaysScore(completedToday)

					// Update stats [array]
					this.updateStats()

					// Get updated stats [array]
					this.getStats()
				}

				for (let year in this.performance) {
					if (this.performance[year]["year"] == todaysYear) {

						for (let month in this.performance[year]["months"]) {
							if(this.performance[year]["months"][month]["id"] == todaysMonth) {

								for (let day in this.performance[year]["months"][month]["days"]) {
									let dateString = todaysYear + '-' + todaysMonth + '-' + todaysDay

									if (this.performance[year]["months"][month]["days"][day]["date"] === dateString) {
										/*try {
											// PUT request to the database to update target performance[year]["months"][month]["days"][day]["score"]
											let currentDayTarget = 
												'/performance/' + this.performance[year]["id"] + 
												'/months/' + this.performance[year]["id"][months]["id"] + 
												'/days/' + this.performance[year]["months"][month]["days"][day]["id"]

											console.log('Todays score in the db should be: ' + this.score)

											axios.put(database + currentTarget, { 
												"score"					: score,
												"totalGoals"			: this.totalGoals,
												"totalCompletedGoals"	: this.totalCompletedGoals,
												"id"					: id
											})

											console.log('Todays score in the db is now: ' + this.performance[year]["months"][month]["days"][day]["score"])

										} catch(e) {
											console.error(e)

										}*/
			
									} else {
										// push new day into performance[year][month]["days"] [array]
									}

								}

							} else {

								// push new month in performance[year]["months"] [array]
								// push new day into performance[year][month]["days"] [array]

							}
						}

					} else {

						// push new year in performance [array]
						// push new month in performance[year]["months"] [array]
						// push new day into performance[year][month]["days"] [array]

					}
				}
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
				goals: [],

				isAddGoalFormVisible: false,
				isAddGoalFormFilled: false,
				isAddGoalButtonDisabled: true,
				isAddGoalButtonPressed: false,

				label: 'Add Goal',
				description: '',
				goal: {
					completedToday: false,
					description: '',
					id: null
				},

				day: {
					score: '',
				},

				stats: {
					score: '',
					currentStreakDays: null,
					currentRecordDays: null
				},

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
