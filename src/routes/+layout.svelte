<script lang="ts">
	import '../app.postcss';
	import { Modal, initializeStores, storePopup } from '@skeletonlabs/skeleton';

	// Initialize stores
	initializeStores();
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>RAIL Lab @ Georgia Tech</title>
	<meta name="title" content="RAIL Lab @ Georgia Tech">
	<meta name="description" content="Robot Autonomy and Interactive Learning Lab at Georgia Institute of Technology">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://rail.gatech.edu/">
	<meta property="og:title" content="RAIL Lab @ Georgia Tech">
	<meta property="og:description" content="Robot Autonomy and Interactive Learning Lab at Georgia Institute of Technology">
	<meta property="og:image" content="%sveltekit.assets%/assets/social_media_preview.png">
	<meta property="og:image:width" content="1200">
	<meta property="og:image:height" content="630">

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image">
	<meta property="twitter:url" content="https://rail.gatech.edu/">
	<meta property="twitter:title" content="RAIL Lab @ Georgia Tech">
	<meta property="twitter:description" content="Robot Autonomy and Interactive Learning Lab at Georgia Institute of Technology">
	<meta property="twitter:image" content="%sveltekit.assets%/assets/social_media_preview.png">
</svelte:head>

<!-- Skeleton Modal -->
<Modal />

<div class="app min-h-screen">
	<slot />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
	}
</style>
