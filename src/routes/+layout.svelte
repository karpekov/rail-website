<script lang="ts">
	import '../app.postcss';
	import { Modal, initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();
</script>

<svelte:head>
	<!-- Google Fonts — loaded once here for the whole app -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Inter:wght@400;500;700&display=swap" rel="stylesheet">

	<!-- Primary Meta Tags -->
	<title>RAIL Lab @ Georgia Tech</title>
	<meta name="title" content="RAIL Lab @ Georgia Tech">
	<meta name="description" content="Robot Autonomy and Interactive Learning Lab at Georgia Institute of Technology">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://rail.gatech.edu/">
	<meta property="og:title" content="RAIL Lab @ Georgia Tech">
	<meta property="og:description" content="Robot Autonomy and Interactive Learning Lab at Georgia Institute of Technology">
	<meta property="og:image" content="https://rail.gatech.edu/assets/social-card.png">
	<meta property="og:image:width" content="1200">
	<meta property="og:image:height" content="630">
	<meta property="og:image:alt" content="RAIL — Robot Autonomy and Interactive Learning at Georgia Tech">
	<meta property="og:site_name" content="RAIL Lab @ Georgia Tech">

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:url" content="https://rail.gatech.edu/">
	<meta name="twitter:title" content="RAIL Lab @ Georgia Tech">
	<meta name="twitter:description" content="Robot Autonomy and Interactive Learning Lab at Georgia Institute of Technology">
	<meta name="twitter:image" content="https://rail.gatech.edu/assets/social-card.png">
	<meta name="twitter:image:alt" content="RAIL — Robot Autonomy and Interactive Learning at Georgia Tech">
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
