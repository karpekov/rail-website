<script lang="ts">
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
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
	import { scrollIntoView } from '$lib/utils/scroll';
	import JoinUs from '$lib/components/JoinUs.svelte';
	import { showMatrix } from '$lib/stores/theme';

	let showNavLogo = false;
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

	injectAnalytics();
</script>

<div class:matrix-theme={$showMatrix}>
	<NavBar {scrollToSection} showLogo={showNavLogo} />

	<main class="pt-0">
		<!-- Hero section with circuit/matrix background -->
		<div class="bg-surface-100-800-token relative" class:bg-black={$showMatrix}>
			{#if $showMatrix}
				<div class="absolute inset-0 z-10 opacity-[0.3]">
					<Matrix />
				</div>
			{:else}
				<div class="absolute inset-0 z-10 opacity-[0.2]">
					<CircuitBackground />
				</div>
			{/if}
			<div class="relative z-20 space-y-4 sm:space-y-6 md:space-y-8 py-6 sm:py-8 md:py-10">
				<About onLogoIntersect={handleLogoIntersection} />
				{#if showJoinUs}
					<JoinUs onClose={closeJoinUs} />
				{/if}
				<CurrentMembers />
			</div>
		</div>

		<!-- Rest of the content -->
		<div class="bg-surface-50-900-token" class:bg-[#111]={$showMatrix}>
			<div class="section-container">
				<News />
			</div>

			<div class="line-divider" />

			<div class="section-container">
				<Projects />
			</div>

			<div class="line-divider" />

			<div class="section-container">
				<Members />
			</div>

			<div class="line-divider" />

			<div class="section-container">
				<Teaching />
			</div>

			<div class="line-divider" />

			<div class="section-container pb-0">
				<Fun />
			</div>

		</div>
	</main>

	<Footer />
</div>

<style lang="postcss">
	:global(html) {
		scroll-padding-top: var(--navbar-height);
	}

	:global(section) {
		scroll-margin-top: var(--navbar-height);
	}

	:global(section > h1, section > h2) {
		@apply mb-8 sm:mb-10 md:mb-12;
	}

	:global(.section-container) {
		@apply container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-8 sm:py-10;
	}

	:global(.section-container:last-child) {
		padding-bottom: 0;
	}

	:global(.line-divider) {
		@apply w-full border-t border-surface-300-600-token opacity-30 my-2;
	}

	:global(.matrix-theme) {
		/* Override Skeleton surface tokens for matrix dark mode */
		--color-surface-50:  0 0 0;
		--color-surface-100: 5 5 5;
		--color-surface-200: 45 45 45;
		--color-surface-300: 45 45 45;
		--color-surface-400: 20 20 20;
		--color-surface-500: 25 25 25;
		--color-surface-600: 30 30 30;
		--color-surface-700: 35 35 35;
		--color-surface-800: 40 40 40;
		--color-surface-900: 45 45 45;
		color-scheme: dark;
	}

	:global(.matrix-theme .bg-surface-100-800-token) {
		background-color: var(--mx-bg-hero) !important;
	}

	:global(.matrix-theme .bg-surface-50-900-token) {
		background-color: var(--mx-bg-content) !important;
	}

	:global(.matrix-theme .sticky) {
		background-color: var(--mx-overlay) !important;
	}

	:global(.matrix-theme .card) {
		background-color: var(--mx-card-bg) !important;
		border: 1px solid var(--mx-card-bg);
	}

	:global(.matrix-theme .variant-filled-surface) {
		background-color: var(--mx-accent-bright) !important;
		border: 1px solid var(--mx-accent-bright);
	}

	:global(.matrix-theme .border-surface-300-600-token) {
		border-color: #FFFFFF !important;
	}

	:global(.matrix-theme #mobile-menu) {
		background-color: var(--mx-overlay) !important;
	}

	:global(.matrix-theme .h2),
	:global(.matrix-theme h2) {
		color: var(--mx-accent) !important;
		text-shadow: var(--mx-glow-md) !important;
	}
</style>
