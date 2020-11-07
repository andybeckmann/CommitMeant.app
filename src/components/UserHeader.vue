<template>
	<div class="user--header">
		<div class="user--header-profile-picture">
			<img src="../assets/profile-picture.png">
			<div class="user--header-profile-picture-status" :class="score"></div>
		</div>
		<ul>
			<li>
				<h1>Streak</h1>
				<span>{{ stats.currentStreakDays }}</span>
				<h2>Days</h2>
			</li>
			<li>
				<h1>Record</h1>
				<span>{{ stats.currentRecordDays }}</span>
				<h2>Days</h2>
			</li>
		</ul>
	</div>
</template>

<script>
	// Database
	import axios from 'axios'
	const database = 'http://localhost:3000'

	export default {
		name: 'UserHeader',
		props: {
			score: String
		},
		methods: {
			async getStats() {
				try {
					const res = await axios.get(database + '/stats/1')
					this.stats = res.data
				} catch(e) {
					console.error(e)
				}
			},
		},
		data() {
			return {
				stats: [
					{ 
						currentStreakDays: "",
						currentRecordDays: ""
					}

				]
			}
		},
		created() {
			this.getStats()
		}
	}
</script>

<style lang="scss" scoped>
	.user--header {
		margin: 15px;
		display: flex;
		border: 5px solid #e900ff;
		padding: 20px;
		border-radius: 0 15px 15px 0;
		margin-left: 0;
		border-left: 0;
		background: #fff;

		.user--header-profile-picture {
			max-width: 75px;
			max-height: 75px;
			position: relative;
		}

		.user--header-profile-picture-status {
			width: 30px;
			height: 30px;
			position: absolute;
			top: 24px;
			right: -17px;
			background: #fff;
			border: 4px dashed #cccccc;
			border-radius: 25px;
			margin-right: 1px;
			margin-bottom: 1px;

			// 50% Daily Goals Completed
			&.fifty {
				background: #bc89df;
				border: none;

				&:before {
					background: #bc89df;
					transform: scale(1);
					opacity: 1;
					animation: scaleFadeOutFifty .75s linear forwards;
					width: 30px;
					height: 30px;
					position: absolute;
					top: 0;
					left: 0;
					content: '';
					border-radius: 25px;
				}
			}

			@keyframes scaleFadeOutFifty {
				0% {
					transform: scale(1);
					opacity: 1;
				}

				100% {
					transform: scale(1.5);
					opacity: 0;
				}
			}

			// 100% Daily Goals Completed
			&.onehundred {
				background: #9403fa;
				border: none;

				&:before {
					background: #9403fa;
					transform: scale(1);
					opacity: 1;
					animation: scaleFadeOutOnehundred .75s linear forwards;
					width: 30px;
					height: 30px;
					position: absolute;
					top: 0;
					left: 0;
					content: '';
					border-radius: 25px;
				}
			}

			@keyframes scaleFadeOutOnehundred {
				0% {
					transform: scale(1);
					opacity: 1;
				}

				100% {
					transform: scale(1.5);
					opacity: 0;
				}
			}
		}

		ul {
			margin: 0;
			padding: 0;
			list-style: none;
			display: flex;

			li {
				margin-left: 45px;

				&:first-child h1 {
					font-weight: 700;
				}

				h1 {
					margin-top: 8px;
					font-size: 16px;
					font-weight: 400;
					text-transform: uppercase;
				}

				h2 {
					font-size: 14px;
					font-weight: 400;
					text-transform: uppercase;
					display: inline;
					color: #777;
				}

				span {
					font-size: 24px;
					margin-right: 5px;
				}
			}
		}
	}
</style>