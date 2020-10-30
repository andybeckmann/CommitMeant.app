<template>
    <div class="user--performance">
		<div class="user--performance-day-indicators">
			<ul>
				<li>SUN</li>
				<li>WED</li>
				<li>SAT</li>
			</ul>
		</div>
		<div class="user--performance-data-year">
			<ul>
				<li>
					<h1>Jan</h1>
					<div class="user--performance-data">
						<ul class="user--performance-data-month">
							<li v-for="node in user.userPerformance.jan" :key="node.score" :class="node.score"></li>
						</ul>
					</div>
				</li>
				<li>
					<h1>February</h1>
					<div class="user--performance-data">
						<ul class="user--performance-data-month">
							<li v-for="node in user.userPerformance.feb" :key="node.score" :class="node.score"></li>
						</ul>
					</div>
				</li>
				<li>
					<h1>March</h1>
					<div class="user--performance-data">
						<ul class="user--performance-data-month">
							<li v-for="node in user.userPerformance.mar" :key="node.score" :class="node.score"></li>
						</ul>
					</div>
				</li>
				<li>
					<h1>April</h1>
					<div class="user--performance-data">
						<ul class="user--performance-data-month">
							<li v-for="node in user.userPerformance.apr" :key="node.score" :class="node.score"></li>
						</ul>
					</div>
				</li>
				<li>
					<h1>May</h1>
					<div class="user--performance-data">
						<ul class="user--performance-data-month">
							<li v-for="node in user.userPerformance.may" :key="node.score" :class="node.score"></li>
						</ul>
					</div>
				</li>
				<li>
					<h1>June</h1>
					<div class="user--performance-data">
						<ul class="user--performance-data-month">
							<li v-for="node in user.userPerformance.jun" :key="node.score" :class="node.score"></li>
						</ul>
					</div>
				</li>
				<li>
					<h1>July</h1>
					<div class="user--performance-data">
						<ul class="user--performance-data-month">
							<li v-for="node in user.userPerformance.jul" :key="node.score" :class="node.score"></li>
						</ul>
					</div>
				</li>
				<li>
					<h1>August</h1>
					<div class="user--performance-data">
						<ul class="user--performance-data-month">
							<li v-for="node in user.userPerformance.aug" :key="node.score" :class="node.score"></li>
						</ul>
					</div>
				</li>
				<li>
					<h1>September</h1>
					<div class="user--performance-data">
						<ul class="user--performance-data-month">
							<li v-for="node in user.userPerformance.sep" :key="node.score" :class="node.score"></li>
						</ul>
					</div>
				</li>
				<li>
					<h1>October</h1>
					<div class="user--performance-data">
						<ul class="user--performance-data-month">
							<li v-for="node in user.userPerformance.oct" :key="node.score" :class="node.score"></li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<div class="user--view-history">
		<ul>
			<li>
				<a href="#" class="user--view-history-year active">2020</a>
			</li>
			<li>
				<a href="#" class="user--view-history-year">2019</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'UserPerformance',
		data() {
			return {
				user: {
					userPerformance: {
						jan: [
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }
						],
						feb: [
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }
						],
						mar: [
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }
						], 
						apr: [
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }
						],
						may: [
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }
						],
						jun: [
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }
						],
						jul: [
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }
						],
						aug: [
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' },
							{ score: 'zero' }, 
							{ score: 'zero' },
							{ score: 'zero' }
						],
						sep: [
							{ score: 'fifty' }, 
							{ score: 'fifty' }, 
							{ score: 'onehundred' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'fifty' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'onehundred' }, 
							{ score: 'fifty' }, 
							{ score: 'onehundred' }, 
							{ score: 'onehundred' }, 
							{ score: 'fifty' }, 
							{ score: 'fifty' }, 
							{ score: 'onehundred' }, 
							{ score: 'onehundred' }, 
							{ score: 'fifty' }, 
							{ score: 'onehundred' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'onehundred' }, 
							{ score: 'fifty' }, 
							{ score: 'fifty' }, 
							{ score: 'onehundred' }, 
							{ score: 'zero' }, 
							{ score: 'onehundred' }, 
							{ score: 'fifty' }, 
							{ score: 'onehundred' }, 
							{ score: 'zero' },
							{ score: 'zero' }
						],
						oct: [
							{ score: 'onehundred' }, 
							{ score: 'onehundred' }, 
							{ score: 'fifty' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'fifty' }, 
							{ score: 'zero' }, 
							{ score: 'fifty' }, 
							{ score: 'zero' }, 
							{ score: 'onehundred' }, 
							{ score: 'onehundred' }, 
							{ score: 'onehundred' }, 
							{ score: 'onehundred' }, 
							{ score: 'fifty' }, 
							{ score: 'zero' }, 
							{ score: 'onehundred' }, 
							{ score: 'onehundred' }, 
							{ score: 'zero' }, 
							{ score: 'onehundred' }, 
							{ score: 'zero' }, 
							{ score: 'zero' }, 
							{ score: 'onehundred' }, 
							{ score: 'zero' }, 
							{ score: 'fifty' }, 
							{ score: 'onehundred' }, 
							{ score: 'zero' }, 
							{ score: 'onehundred' }, 
							{ score: 'fifty' }, 
							{ score: 'onehundred' }, 
							{ score: 'onehundred' },
							{ score: 'onehundred' }
						],
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user--performance {
		margin: 15px;
		padding: 15px;
		border: 1px solid #ccc;
		border-radius: 15px 15px 0 0;
		display: flex;
		position: relative;

		ul {
			margin: 0;
			padding: 0;
			list-style: none;
			display: flex;
			align-items: right;
			padding-left: 60px;
			overflow-x: scroll;
			justify-content: right;

			li {
				margin-right: 15px;

				h1 {
					font-size: 18px;
					font-weight: 400;
				}
			}
		}

		.user--performance-day-indicators ul {
			display: flex;
			flex-start: flex-end;
			flex-flow: column;
			padding: 48px 18px 5px;
			font-size: 14px;
			position: absolute;
			left: 0px;
			background: #fff;

			li:nth-of-type(1) {
				font-weight: 700;
			}

			li:nth-of-type(2) {
				margin: 63px 0;
			}

			li:nth-of-type(3) {
				font-weight: 700;
			}

			li:first-of-type h1 {
				color: #999;
			}
		}

		.user--performance-data-year {
			position: relative;
			width: 280px;
			height: 235px;
			overflow: hidden;
			margin-left: 70px;
		}

		.user--performance-data {
			display: flex;

			ul {
				margin: 0;
				padding: 0;
				width: 130px;
				height: 182px;
				list-style: none;
				display: flex;
				flex-flow: wrap;

				li {
					width: 25px;
					height: 25px;
					background: #fff;
					border: 4px dashed #cccccc;
					border-radius: 25px;
					margin-right: 1px;
					margin-bottom: 1px;

					// 50% Daily Goals Completed
					&.fifty {
						background: #bc89df;
						border: none;
					}

					// 100% Daily Goals Completed
					&.onehundred {
						background: #9403fa;
						border: none;
					}
				}
			}
		}
	}

	.user--view-history {
		width: calc(100% - 30px);
		margin: -15px 15px 15px;
		background: #9703fa;
		border: 0;
		font-size: 14px;
		text-transform:uppercase;
		padding: 15px 15px;
		border-radius: 0 0 15px 15px;

		ul {
			list-style-type: none;
			margin: 0;
			padding: 0;
			display: flex;
		}

		.user--view-history-year {
			text-decoration: none;
			padding: 10px 15px;
			border-radius: 20px;
			margin-right: 5px;
			display: inline-block;
			color: rgba(255, 255, 255,0.5);
			font-size: 16px;
			border: 0;
			font-weight: bold;

			&.active {
				padding: 7px 12px;
				border: 3px solid #fff;
				background: transparent;
				color: #fff;
			}
		}
	}
</style>
