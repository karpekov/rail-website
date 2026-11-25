<script lang="ts">
	import { onMount } from 'svelte';
	// Not '@vercel/analytics/sveltekit': version 2.0 still uses $app/stores, which SvelteKit 3 removed.
	import { inject } from '@vercel/analytics';
	import { dev } from '$app/env';
	import NavBar from '#lib/components/NavBar.svelte';
	import About from '#lib/components/About.svelte';
	import News from '#lib/components/News.svelte';
	import Projects from '#lib/components/Projects.svelte';
	import Members from '#lib/components/Members.svelte';
	import CurrentMembers from '#lib/components/CurrentMembers.svelte';
	import Teaching from '#lib/components/Teaching.svelte';
	import Fun from '#lib/components/Fun.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import HexBackground from '#lib/components/HexBackground.svelte';
	import Matrix from '#lib/components/Matrix.svelte';
	import { showMatrix, showDark } from '#lib/stores/theme.ts';
	import { browser } from '$app/env';

	// Mirror the active theme onto <html> so overscroll / rubber-band areas
	// match the page chrome. We use a class on <html> rather than inline
	// styles so the same CSS vars that drive the components drive the edges too.
	$: if (browser) {
		const html = document.documentElement;
		html.classList.toggle('theme-dark',   $showDark && !$showMatrix);
		html.classList.toggle('theme-matrix', $showMatrix);
	}

	let showNavLogo = false;

	function handleLogoIntersection(isHidden: boolean) {
		showNavLogo = isHidden;
	}

	onMount(() => inject({ mode: dev ? 'development' : 'production' }));
</script>

<div class:matrix-theme={$showMatrix} class:dark-theme={$showDark && !$showMatrix}>
	<NavBar showLogo={showNavLogo} />

	<main class="pt-0">
		<!-- Hero section with circuit/matrix background -->
		<div class="bg-surface-100 relative" class:bg-black={$showMatrix} class:bg-[#080D18]={$showDark && !$showMatrix}>
			{#if $showMatrix}
				<div class="absolute inset-0 z-10 opacity-[0.3]">
					<Matrix />
				</div>
		{:else}
			<div class="absolute inset-0 z-10">
				<HexBackground />
			</div>
		{/if}
			<div class="relative z-20 stack-y-2 sm:stack-y-3 md:stack-y-4 py-4 sm:py-5 md:py-6">
				<About onLogoIntersect={handleLogoIntersection} />
				<CurrentMembers />
			</div>
		</div>

		<!-- Rest of the content -->
		<div class="bg-surface-50" class:bg-[#111]={$showMatrix} class:bg-[#0D1525]={$showDark && !$showMatrix}>
			<div class="section-container">
				<News />
			</div>

			<div class="line-divider"></div>

			<div class="section-container">
				<Projects />
			</div>

			<div class="line-divider"></div>

			<div class="section-container">
				<Members />
			</div>

			<div class="line-divider"></div>

			<div class="section-container">
				<Teaching />
			</div>

			<div class="line-divider"></div>

			<div class="section-container pb-0">
				<Fun />
			</div>

		</div>
	</main>

	<Footer />
</div>

<style>
	:global(html) {
		scroll-padding-top: var(--navbar-height);
	}

	:global(section) {
		scroll-margin-top: var(--navbar-height);
	}

	:global(.section-container) {
		width: 100%;
		max-width: 72rem;
		margin-inline: auto;
		padding: 2rem 1rem;
	}

	@media (min-width: 640px) {
		:global(.section-container) {
			padding: 2.5rem 1.5rem;
		}
	}

	@media (min-width: 768px) {
		:global(.section-container) {
			padding-inline: 2rem;
		}
	}

	:global(.section-container:last-child) {
		padding-bottom: 0;
	}

	:global(.line-divider) {
		width: 100%;
		margin-block: 0.5rem;
		border-top: 1px solid var(--color-surface-300);
		opacity: 0.3;
	}

	:global(.matrix-theme) {
		/* Override Skeleton surface tokens for matrix dark mode */
		--color-surface-50: rgb(0 0 0);
		--color-surface-100: rgb(5 5 5);
		--color-surface-200: rgb(45 45 45);
		--color-surface-300: rgb(45 45 45);
		--color-surface-400: rgb(20 20 20);
		--color-surface-500: rgb(25 25 25);
		--color-surface-600: rgb(30 30 30);
		--color-surface-700: rgb(35 35 35);
		--color-surface-800: rgb(40 40 40);
		--color-surface-900: rgb(45 45 45);
		color-scheme: dark;
		/* Skeleton reads --theme-font-color-base from the body-level token and
		   won't flip it to white just from color-scheme on this div. Force it. */
		color: white;
	}

	:global(.matrix-theme .bg-surface-100) {
		background-color: var(--mx-bg-hero) !important;
	}

	:global(.matrix-theme .bg-surface-50) {
		background-color: var(--mx-bg-content) !important;
	}

	:global(.matrix-theme .sticky) {
		background-color: var(--mx-overlay) !important;
	}

	:global(.matrix-theme .rail-card) {
		background-color: var(--mx-card-bg) !important;
		border: 1px solid var(--mx-card-bg);
	}


	:global(.matrix-theme .border-surface-300) {
		border-color: #FFFFFF !important;
	}

	:global(.matrix-theme #mobile-menu) {
		background-color: var(--mx-overlay) !important;
	}

	:global(.matrix-theme .rail-h2),
	:global(.matrix-theme h2) {
		color: var(--mx-accent) !important;
		text-shadow: var(--mx-glow-md) !important;
	}

	/* ── Dark (deep navy) theme overrides ───────────────────────────────────── */
	:global(.dark-theme) {
		/* Flip Skeleton surface tokens to deep dark blue/navy scale */
		--color-surface-50: rgb(8 13 24);
		--color-surface-100: rgb(13 21 37);
		--color-surface-200: rgb(17 30 51);
		--color-surface-300: rgb(26 45 74);
		--color-surface-400: rgb(38 62 102);
		--color-surface-500: rgb(54 84 136);
		--color-surface-600: rgb(74 112 168);
		--color-surface-700: rgb(100 142 198);
		--color-surface-800: rgb(130 168 220);
		--color-surface-900: rgb(165 198 235);
		color-scheme: dark;
		color: var(--dk-text);
	}

	:global(.dark-theme .bg-surface-100) {
		background-color: var(--dk-bg-hero) !important;
	}

	:global(.dark-theme .bg-surface-50) {
		background-color: var(--dk-bg-content) !important;
	}

	:global(.dark-theme .sticky) {
		background-color: var(--dk-overlay) !important;
	}

	:global(.dark-theme .rail-card) {
		background-color: var(--dk-card-bg) !important;
		border: 1px solid var(--dk-divider);
	}

	:global(.dark-theme #mobile-menu) {
		background-color: var(--dk-overlay) !important;
	}

	:global(.dark-theme .rail-h2),
	:global(.dark-theme h2),
	:global(.dark-theme .section-title) {
		color: var(--color-primary-400) !important;
		text-shadow: 0 0 18px rgba(232, 168, 0, 0.35), 0 0 6px rgba(232, 168, 0, 0.15) !important;
	}
</style>
