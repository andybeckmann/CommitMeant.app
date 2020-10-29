<template>
	<div class="user--header">
		<div class="user--header-profile-picture">
			<img src="../assets/profile-picture.png">
			<div class="user--header-profile-picture-status">
			</div>
		</div>
		<ul>
			<li>
				<h1>Streak</h1>
				<span>3</span>
				<h2>Days</h2>
			</li>
			<li>
				<h1>Record</h1>
				<span>10</span>
				<h2>Days</h2>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'UserHeader'
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

		.user--header-profile-picture {
			max-width: 75px;
			max-height: 75px;
			position: relative;
		}

		.user--header-profile-picture-status {
			width: 30px;
			height: 30px;
			background: #9403fa;
			border: 3px solid #fff;
			border-radius: 25px;
			position: absolute;
			top: 24px;
			right: -17px;
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