<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import About from '$lib/components/About.svelte';
	import News from '$lib/components/News.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Members from '$lib/components/Members.svelte';
	import CurrentMembers from '$lib/components/CurrentMembers.svelte';
	import Teaching from '$lib/components/Teaching.svelte';
	import Fun from '$lib/components/Fun.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CircuitBackground from '$lib/components/CircuitBackground.svelte';
	import Matrix from '$lib/components/Matrix.svelte';
	import { scrollIntoView } from '$lib/actions/scroll';
	import JoinUs from '$lib/components/JoinUs.svelte';

	let showNavLogo = false;
	let showMatrix = false;
	let showJoinUs = false;

	function handleLogoIntersection(isHidden: boolean) {
		showNavLogo = isHidden;
	}

	function scrollToSection(sectionId: string) {
		if (sectionId === 'join') {
			showJoinUs = true;
		} else {
			scrollIntoView(sectionId);
		}
	}

	function closeJoinUs() {
		showJoinUs = false;
	}
</script>

<div class:matrix-theme={showMatrix}>
	<NavBar {scrollToSection} showLogo={showNavLogo} bind:showMatrix />

	<main class="pt-0">
		<!-- Hero section with circuit/matrix background -->
		<div class="bg-surface-100-800-token relative" class:bg-black={showMatrix}>
			<div class="absolute inset-0 z-10 opacity-[0.3]">
				{#if showMatrix}
					<Matrix />
				{:else}
					<CircuitBackground />
				{/if}
			</div>
			<div class="relative z-20 space-y-4 sm:space-y-6 md:space-y-8 py-6 sm:py-8 md:py-10">
				<About onLogoIntersect={handleLogoIntersection} {showMatrix} />
				{#if showJoinUs}
					<JoinUs {showMatrix} onClose={closeJoinUs} />
				{/if}
				<CurrentMembers {showMatrix} />
			</div>
		</div>

		<!-- Rest of the content -->
		<div class="bg-surface-50-900-token" class:bg-[#111]={showMatrix}>
			<div class="section-container">
				<News {showMatrix} />
			</div>

			<div class="line-divider" />

			<div class="section-container">
				<Projects {showMatrix} />
			</div>

			<div class="line-divider" />

			<div class="section-container">
				<Members {showMatrix} />
			</div>

			<div class="line-divider" />

			<div class="section-container">
				<Teaching {showMatrix} />
			</div>

			<div class="line-divider" />

			<div class="section-container pb-0">
				<Fun />
			</div>

		</div>
	</main>

	<Footer {showMatrix} />
</div>

<style lang="postcss">
	:global(html) {
		scroll-padding-top: 80px; /* Match navbar height */
	}

	:global(section) {
		scroll-margin-top: 80px;
	}

	:global(section > h1, section > h2) {
		@apply mb-8 sm:mb-10 md:mb-12;
	}

	:global(.section-container) {
		@apply container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16;
	}

	:global(.section-container:last-child) {
		padding-bottom: 0;
	}

	:global(.line-divider) {
		@apply w-full border-t border-surface-300-600-token opacity-30 my-2;
	}

	:global(.matrix-theme) {
		/* Override surface token colors for matrix theme with darker shades */
		--color-surface-50: 0 0 0;        /* #000000 - Pure black */
		--color-surface-100: 5 5 5;       /* #050505 - Nearly black */
		--color-surface-200: 45 45 45;    /* #0A0A0A - Very dark black */
		--color-surface-300: 45 45 45;    /* #0F0F0F */
		--color-surface-400: 20 20 20;    /* #141414 */
		--color-surface-500: 25 25 25;    /* #191919 */
		--color-surface-600: 30 30 30;    /* #1E1E1E */
		--color-surface-700: 35 35 35;    /* #232323 */
		--color-surface-800: 40 40 40;    /* #282828 */
		--color-surface-900: 45 45 45;    /* #2D2D2D */
	}

	/* Background colors for main sections */
	:global(.matrix-theme .bg-surface-100-800-token) {
		background-color: black !important;
	}

	:global(.matrix-theme .bg-surface-50-900-token) {
		background-color: #050505 !important;
	}

	/* Navbar and Footer specific styles */
	:global(.matrix-theme .sticky) {
		background-color: rgba(0, 0, 0, 0.95) !important;
	}

	/* Card styles for better visibility */
	:global(.matrix-theme .card) {
		background-color: #0D0D0D !important;
		border: 1px solid #0D0D0D;
	}

	/* Project cards and other content cards */
	:global(.matrix-theme .variant-filled-surface) {
		background-color: #19F819 !important;
		border: 1px solid #19F819;
	}

	/* Divider lines */
	:global(.matrix-theme .border-surface-300-600-token) {
		border-color: #FFFFFF !important;
	}

	/* General theme settings */
	:global(.matrix-theme) {
		color-scheme: dark;
	}

	/* Mobile menu background */
	:global(.matrix-theme #mobile-menu) {
		background-color: rgba(0, 0, 0, 0.95) !important;
	}

	:global(.matrix-theme .h2) {
		color: #0F0 !important;
		text-shadow: 0 0 10px #0F0, 0 0 20px #0F0 !important;
	}

	/* For any h2 elements that don't use the h2 class */
	:global(.matrix-theme h2) {
		color: #0F0 !important;
		text-shadow: 0 0 10px #0F0, 0 0 20px #0F0 !important;
	}
</style>
