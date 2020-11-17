<template>
	<div class="user--header">
		<div class="user--header-avatar">
			<div class="user--header-avatar-emoji">🐶</div>
			<div class="user--header-avatar-status" :class="score"></div>
		</div>
		<ul>
			<li>
				<h1>Streak</h1>
				<span>{{ currentStreakDays }}</span>
				<h2>Days</h2>
			</li>
			<li>
				<h1>Record</h1>
				<span>{{ currentRecordDays }}</span>
				<h2>Days</h2>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		
		name: 'UserHeader',

		props: {
			score: String,
			currentStreakDays: Number,
			currentRecordDays: Number
		}

	}
</script>

<style lang="scss" scoped>
	.user--header {
		margin: 15px;
		display: flex;
		border: 5px solid #e900ff;
		padding: 15px;
		border-radius: 0 15px 15px 0;
		margin-left: 0;
		border-left: 0;
		background: #fff;

		.user--header-avatar {
			width: 75px;
			height: 75px;
			position: relative;
			font-size: 75px;

			.user--header-avatar-emoji {
				margin-top: -10px;
			}
		}

		.user--header-avatar-status {
			width: 30px;
			height: 30px;
			position: absolute;
			top: 24px;
			right: -17px;
			background: #fff;
			border: 4px dashed #cccccc;
			border-radius: 50%;
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