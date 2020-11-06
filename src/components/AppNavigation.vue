<template>
	<div>
		<nav>
			<button id="app--main-menu-toggle" class="app--main-menu-toggle" :class="{ 'active' : isMenuButtonPressed }" @click="toggleMenu">
				<div class="app--main-menu-toggle-top"></div>
				<div class="app--main-menu-toggle-middle"></div>
				<div class="app--main-menu-toggle-bottom"></div>
			</button>
			<div id="app--main-menu" class="app--main-menu" :class="{ 'show' : isMenuVisible }">
				<ul>
					<li>
						<router-link to="/login">Log in</router-link>
					</li>
					<li>
						<router-link to="/signup">Sign up</router-link>
					</li>
					<li>
						<router-link to="/">Dashboard</router-link>
					</li>
					<li>
						<router-link to="/settings">Settings</router-link>
					</li>
					<li>
						<router-link to="/logout">Log out</router-link>
					</li>
				</ul>
				<div class="app--main-menu-overlay">
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
	export default {
		name: 'AppNavigation',
		methods: {
			toggleMenu() {
				this.isMenuButtonPressed = !this.isMenuButtonPressed
				this.isMenuVisible = !this.isMenuVisible
			}
		},
		data() {
			return {
				isMenuButtonPressed: false,
				isMenuVisible: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app--main-menu-toggle {
		width: 55px;
		height: 55px;
		padding: 15px;
		background: #9703fa;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border: none;
		outline: none;
		border-radius: 0;
		cursor: pointer;

		div {
			height: 5px;
			width: 25px;
			background: #fff;
			margin-bottom: 3px;
			border-radius: 10px;

			&.app--main-menu-toggle-top {
				transition: .15s ease-out transform, .15s ease-out bottom;
			}

			&.app--main-menu-toggle-middle {
				transition: .15s ease-out opacity;
			}

			&.app--main-menu-toggle-bottom {
				transition: .15s ease-out transform, .15s ease-out top;
				margin-bottom: 0;
			}
		}

		&.active {
			background: #111;

			.app--main-menu-toggle-top {
				transform: rotate(-45deg);
				bottom: -4px;
				position: relative;
			}

			.app--main-menu-toggle-middle {
				display: none;
			}

			.app--main-menu-toggle-bottom {
				transform: rotate(45deg);
				top: -4px;
				position: relative;
			}
		}
	}
	.app--main-menu {
		height: 0;
		overflow: hidden;
		display: none;

		&.show {
			display: block;

			ul {
				background: #eee;

				li {
					a {
						animation: .1s menuSlideDown linear forwards;
						background: #eee;
						color: #111;
					}

					@keyframes menuSlideDown {
						0% {
							height: 0px;
							padding: 0 15px;
							overflow: hidden;
						}

						100% {
							height: 63px;
							padding-top: 15px;
							padding-bottom: 15px;
							overflow: visible;
						}
					}
				}
			}
		}

		ul {
			margin: 0;
			padding: 0;
			list-style: none;
			position: absolute;
			z-index: 2;
			width: 100%;
			border-bottom: 5px solid #e900ff;

			li {
				a {
					text-decoration: none;
					font-size: 22px;
					line-height: 150%;
					background: #eee;
					border-top: 1px solid #ccc;
					width: 100%;
					display: block;
					color: #111;
					padding: 0 15px;
					height: 0;
					overflow: hidden;
				}
			}
		} 

		.app--main-menu-overlay {
			width: 100%;
			height: 100vh;
			background: rgba(0, 0, 0, 0.75);
			backdrop-filter: blur(2px);
			position: absolute;
			left: 0;
			z-index: 1;
		} 
	}
</style>