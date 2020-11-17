<template>
    <div class="user--performance">
		<div class="user--performance-day-indicators">
			<ul>
				<li>SUN</li>
				<li>WED</li>
				<li>SAT</li>
			</ul>
		</div>
		<ul class="user--performance-years">
			<li class="user--performance-year" v-for="(year, index) in performance" :key="index" :index="index" :class="{ 'show' : year.isSelectedYear }">
				<ul :id="year.year">
					<li v-for="(month, index) in year.months" :key="month.name" :index="index">
						<h1>{{ month.name }}</h1>
						<div class="user--performance-data">
							<ul class="user--performance-data-month">
								<li v-for="(day, index) in month.days" :key="day.date" :index="index" :class="day.score"></li>
							</ul>
						</div>
					</li>
				</ul>
			</li>
		</ul>
	</div>
	<div class="user--view-history">
		<ul>
			<li class="user--performance-year" v-for="(year, index) in performance" :key="year.year" :index="index">
				<a href="#" :class="[{ 'active ' : year.isSelectedYear }, 'user--view-history-year']" :data-key="year" @click="selectYear(this.performance.years, year)">{{ year.year }}</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		
		name: 'UserPerformance',

		props: {
			performance: Array
		},

		methods: {

			/**
			 * Displays selected year
			 */
			selectYear(years, year) {
				for (let i=0; i < this.performance.length; i++) {
					years[i].isSelectedYear = false
				}
				year.isSelectedYear = true
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
		background: #fff;
		height: 267px;
		overflow: hidden;

		ul {
			margin: 0;
			padding: 0;
			list-style: none;
			display: flex;
			align-items: right;
			padding-left: 10px;
			justify-content: right;
			flex-flow: row-reverse nowrap;
			align-content: flex-start;

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
			padding: 48px 15px 5px 18px;
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

		.user--performance-year {
			position: relative;
			width: 300px;
			height: 250px;
			overflow: hidden;
			margin-left: 50px;
			margin-right: 0;
			display: none;

			&.show {
				display: flex;
			}

			> ul {
				overflow-x: scroll;
			}
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
				flex-flow: column wrap;

				li {
					width: 25px;
					height: 25px;
					background: #fff;
					border: 4px dashed #cccccc;
					border-radius: 50%;
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
			flex-flow: row-reverse;
			justify-content: flex-end;
		}

		.user--view-history-year {
			text-decoration: none;
			padding: 8px 15px 10px;
			border-radius: 0 20px 20px 20px;
			margin-right: 5px;
			display: inline-block;
			color: rgba(255, 255, 255,0.5);
			font-size: 16px;
			border: 0;
			font-weight: bold;

			&.active {
				padding: 5px 12px 7px;
				border: 3px solid #fff;
				background: transparent;
				color: #fff;
			}
		}
	}
</style>
