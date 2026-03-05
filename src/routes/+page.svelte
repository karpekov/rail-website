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
	import HexBackground from '$lib/components/HexBackground.svelte';
	import Matrix from '$lib/components/Matrix.svelte';
	import { scrollIntoView } from '$lib/utils/scroll';
	import JoinUs from '$lib/components/JoinUs.svelte';
	import { showMatrix, showDark } from '$lib/stores/theme';
	import { browser } from '$app/environment';

	// Mirror the active theme onto <html> so overscroll / rubber-band areas
	// match the page chrome. We use a class on <html> rather than inline
	// styles so the same CSS vars that drive the components drive the edges too.
	$: if (browser) {
		const html = document.documentElement;
		html.classList.toggle('theme-dark',   $showDark && !$showMatrix);
		html.classList.toggle('theme-matrix', $showMatrix);
	}

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

<div class:matrix-theme={$showMatrix} class:dark-theme={$showDark && !$showMatrix}>
	<NavBar {scrollToSection} showLogo={showNavLogo} />

	<main class="pt-0">
		<!-- Hero section with circuit/matrix background -->
		<div class="bg-surface-100-800-token relative" class:bg-black={$showMatrix} class:bg-[#141518]={$showDark && !$showMatrix}>
			{#if $showMatrix}
				<div class="absolute inset-0 z-10 opacity-[0.3]">
					<Matrix />
				</div>
		{:else}
			<div class="absolute inset-0 z-10">
				<HexBackground />
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
		<div class="bg-surface-50-900-token" class:bg-[#111]={$showMatrix} class:bg-[#1C1E24]={$showDark && !$showMatrix}>
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
		/* Skeleton reads --theme-font-color-base from the body-level token and
		   won't flip it to white just from color-scheme on this div. Force it. */
		color: white;
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

	/* ── Dark (warm charcoal) theme overrides ───────────────────────────────── */
	:global(.dark-theme) {
		/* Flip Skeleton surface tokens to dark slate scale */
		--color-surface-50:  20 21 24;
		--color-surface-100: 28 30 36;
		--color-surface-200: 35 38 48;
		--color-surface-300: 48 51 61;
		--color-surface-400: 60 64 80;
		--color-surface-500: 74 80 104;
		--color-surface-600: 96 104 128;
		--color-surface-700: 120 128 160;
		--color-surface-800: 144 152 188;
		--color-surface-900: 176 184 212;
		color-scheme: dark;
		color: var(--dk-text);
	}

	:global(.dark-theme .bg-surface-100-800-token) {
		background-color: var(--dk-bg-hero) !important;
	}

	:global(.dark-theme .bg-surface-50-900-token) {
		background-color: var(--dk-bg-content) !important;
	}

	:global(.dark-theme .sticky) {
		background-color: var(--dk-overlay) !important;
	}

	:global(.dark-theme .card) {
		background-color: var(--dk-card-bg) !important;
		border: 1px solid var(--dk-divider);
	}

	:global(.dark-theme #mobile-menu) {
		background-color: var(--dk-overlay) !important;
	}

	:global(.dark-theme .h2),
	:global(.dark-theme h2),
	:global(.dark-theme .section-title) {
		color: rgb(var(--color-primary-400)) !important;
		text-shadow: 0 0 18px rgba(232, 168, 0, 0.35), 0 0 6px rgba(232, 168, 0, 0.15) !important;
	}
</style>
