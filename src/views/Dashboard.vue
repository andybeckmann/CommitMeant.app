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
		<div v-if="this.achievement" class="user--achievement">
			<div class="confetti animate">
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
				<div class="confetti-piece"></div>
			</div>
			100%<br />COMPLETE
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
							>&#10005;</button> 
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
					<button @click="addGoal" :disabled="isAddGoalButtonDisabled" class="user--add-goal-form-button" :class="{ 'active' : isAddGoalButtonPressed }">
						<div class="icon--toggle">
							<div class="user--add-goal-form-button-top"></div>
							<div class="user--add-goal-form-button-bottom"></div>
						</div>
					</button>
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
			 * POST blank days to performance[year][month]
			 */
			// IN PROGRESS
			async fillPerformanceGap(targetRecord, dateString, totalDaysRecorded, todaysDay) {

				totalDaysRecorded += 1

				if (todaysDay != totalDaysRecorded) {
					let gap = todaysDay - totalDaysRecorded

					console.log('The gap is: ' + gap)

					for (let i=0; i < gap; i++) {
						let idValue = totalDaysRecorded + i

						try {
							await axios.post(targetRecord, { 
									"date"					: dateString,
									"id"					: idValue,
									"score"					: 'zero',
									"totalGoals"			: 0,
									"totalCompletedGoals"	: 0
								}
							)
						} catch(e) {
							console.error(e)
						}
					}
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

				let recordExists = false
				let recordYear = null
				let recordMonth = null
				let totalDaysRecorded = 0

				for (let year in this.performance) {
					if (this.performance[year]["year"] == todaysYear) {
						recordYear = this.performance[year]["id"] - 1

						for (let month in this.performance[year]["months"]) {
							if(this.performance[year]["months"][month]["id"] == todaysMonth) {
								recordMonth = this.performance[year]["months"][month]["id"] - 1

								for (let day in this.performance[year]["months"][month]["days"]) {
									let dateString = todaysYear + '-' + todaysMonth + '-' + todaysDay
									totalDaysRecorded += 1

									if (this.performance[year]["months"][month]["days"][day]["date"] == dateString) {
										recordExists = true
									}
								}
							}
						}
					}
				}

				let dateString = todaysYear + '-' + todaysMonth + '-' + todaysDay
				let targetYear = recordYear
				let targetMonth = recordMonth
				let targetDay = todaysDay - 1

				if (recordExists == true) {

					let targetRecord = database + '/performance/' + targetYear + '/months/' + targetMonth + '/days/' + targetDay + '.json'
					this.totalGoals = this.calculateTotalGoals(goals)
					this.totalGoalsCompleted = this.calculateTodaysCompletedGoals(goals, completedToday)

					try {
						await axios.put(targetRecord, { 
								"date"					: dateString,
								"id"					: todaysDay,
								"score"					: this.score,
								"totalGoals"			: this.totalGoals,
								"totalCompletedGoals"	: this.totalGoalsCompleted
							}
						)
					} catch (e) {
						console.error(e)
					}
				} else if (recordExists == false) {
					
					if (todaysDay == 1) {

						if (todaysMonth == 1) {

							// 1 POST a new month into performance
						}

						// 2 POST a new month into performance[year]["months"]
					}

					// 3 POST new day in performance[year]["months"][month]["days"]

					let targetRecord = database + '/performance/' + targetYear + '/months/' + targetMonth + '/days.json'

					// But first, if there are any gaps, populate the target days array with scores of 0
					console.log(this.fillPerformanceGap(targetRecord, dateString, totalDaysRecorded, todaysDay))

					try {
						await axios.post(targetRecord, { 
								"date"					: dateString,
								"id"					: todaysDay,
								"score"					: this.score,
								"totalGoals"			: this.totalGoals,
								"totalCompletedGoals"	: this.totalGoalsCompleted
							}
						)

					} catch (e) {
						console.error(e)
						
					}

					recordExists = true
				}

				this.getPerformance()

				if (this.score == 'onehundred') {
					this.achievement = true
					let achievementInterval = setTimeout(() => {
						this.achievement = false
						clearInterval(achievementInterval)
					}, 2500)
				} else {
					this.achievement = false
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

				// UI variables
				isAddGoalFormVisible: false,
				isAddGoalFormFilled: false,
				isAddGoalButtonDisabled: true,
				isAddGoalButtonPressed: false,

				// Achievement messages
				achievement: false,

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
				border: 3px solid #fff;
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

	.user--achievement {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 3;
		font-size: 34px;
		animation: 1.5s achievementFadeOut linear forwards;
		opacity: 0;
		//background: rgba(146,22,244,.25);
		color: #fff;
		font-weight: bold;
		transform: scale(1);
		text-align: center;
		text-shadow: 2px 2px #8f16f4;

		.confetti {
			position: absolute;
		}

		.confetti .confetti-piece {
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
			display: block;
			left: 0;
			top: 0;
			width: 9px;
			height: 9px;
			border-radius: 50%;
			opacity: 0;
		}

		.confetti.animate .confetti-piece{
			animation: confettiPop 1.5s linear forwards;
		}

		@keyframes confettiPop {
			0% {
				opacity: 0;
				transform: translate3d(0, 0, 0);
			}

			1% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		.confetti .confetti-piece:nth-of-type(1) {
			transform: translate3d(90px, 30px, 0);
			background: #8f16f4;
		}

		.confetti .confetti-piece:nth-of-type(2) {
			transform: translate3d(-30px, 10px, 0);
			background: #bb8adb;
		}

		.confetti .confetti-piece:nth-of-type(3) {
			transform: translate3d(-60px, -40px, 0);
			background: #8f16f4;
		}

		.confetti .confetti-piece:nth-of-type(4) {
			transform: translate3d(75px, 30px, 0);
			background: #bb8adb;
		}

		.confetti .confetti-piece:nth-of-type(5) {
			transform: translate3d(45px, 90px, 0);
			background: #8f16f4;
		}

		.confetti .confetti-piece:nth-of-type(6) {
			transform: translate3d(25px, 45px, 0);
			background: #bb8adb;
		}

		.confetti .confetti-piece:nth-of-type(7) {
			transform: translate3d(15px, 35px, 0);
			background: #bb8adb;
		}

		.confetti .confetti-piece:nth-of-type(8) {
			transform: translate3d(65px, 30px, 0);
			background: #8f16f4;
		}

		.confetti .confetti-piece:nth-of-type(9) {
			transform: translate3d(20px, 80px, 0);
			background: #bb8adb;
		}

		.confetti .confetti-piece:nth-of-type(10) {
			transform: translate3d(45px, 75px, 0);
			background: #8f16f4;
		}

		.confetti .confetti-piece:nth-of-type(11) {
			transform: translate3d(-65px, 25px, 0);
			background: #8f16f4;
		}

		.confetti .confetti-piece:nth-of-type(12) {
			transform: translate3d(45px, -50px, 0);
			background: #bb8adb;
		}

		.confetti .confetti-piece:nth-of-type(13) {
			transform: translate3d(-45px, 90px, 0);
			background: #bb8adb;
		}

		.confetti .confetti-piece:nth-of-type(14) {
			transform: translate3d(45px, 20px, 0);
			background: #8f16f4;
		}

		.confetti .confetti-piece:nth-of-type(15) {
			transform: translate3d(-45px, -40px, 0);
			background: #bb8adb;
		}

		.confetti .confetti-piece:nth-of-type(16) {
			transform: translate3d(-45px, 90px, 0);
			background: #8f16f4;
		}

		.confetti .confetti-piece:nth-of-type(17) {
			transform: translate3d(-30px, 50px, 0);
			background: #bb8adb;
		}

		.confetti .confetti-piece:nth-of-type(18) {
			transform: translate3d(45px, -90px, 0);
			background: #8f16f4;
		}

		.confetti .confetti-piece:nth-of-type(19) {
			transform: translate3d(60px, 90px, 0);
			background: #bb8adb;
		}

		.confetti .confetti-piece:nth-of-type(20) {
			transform: translate3d(-75px, 80px, 0);
			background: #bb8adb;
		}
	}

	@keyframes achievementFadeOut {
		0% {
			opacity: 0;
			transform: scale(1);
		}
		50% {
			opacity: 1;
		}
		80% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: scale(1.5);
		}
	}

	.user--goals {
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
				line-height: 25px;

				.user--goals-item {
					color: #fff;
					font-size: 18px;
					width: 100%;
					border-bottom: 1px solid rgba(255,255,255,.4);
					position: relative;
					padding: 20px;
					overflow: hidden;
					display: flex;
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
					width: 25px;
					height: 25px;
					background: 0 0;
					border: 3px solid #fff;
					border-radius: 50%;
					display: block;
					position: relative;
					margin-top: 0;
					margin-left: 0;
					margin-right: 20px;
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
						top: 20px;
						right: 0;
						color: #fff;
						font-size: 20px;
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
		top: 55px;
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
			padding: 15px 15px 14px 15px;
			font-size: 22px;
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
				border-bottom: 5px solid #9703fa;
			}
		}

		.user--add-goal-form-button {
			position: absolute;
			z-index: 3;
			top: 0;
			right: 0;
			-webkit-appearance: none;
			border: 0;
			background: #ccc;
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

			&:disabled {
				background: #ccc;
			}

			&:focus {
				outline: none;
			}

			.user--add-goal-form-button-top {
				transform: rotate(0deg);
				bottom: -4px;
				position: relative;
				height: 5px;
				width: 25px;
				background: #fff;
				margin-bottom: 3px;
				border-radius: 10px;
			}

			.user--add-goal-form-button-bottom {
				transform: rotate(90deg);
				top: -4px;
				position: relative;
				height: 5px;
				width: 25px;
				background: #fff;
				margin-bottom: 3px;
				border-radius: 10px;
			}
		}

		.user--add-goal-form-fields {
			position: relative;
			height: 0;
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
