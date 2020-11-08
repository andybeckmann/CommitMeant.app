<template>
	<div class="app--view">
		<router-view/>
	</div>
</template>

<script>
	export default {

		name: 'App',
		
		components: {
			
		}
	}
</script>

<style lang="scss">
	* {
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;
	}

	body {
		padding: 0;
		margin: 0;
		font-family: 'Lato', sans-serif;
		background: #9703fa;
	}

	img {
		max-width: 100%;
		height: auto;
	}

	.app--view {
		background: #fff;
	}
</style>
