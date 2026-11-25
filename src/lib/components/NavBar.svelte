<script lang="ts">
    import JoinUs from '#lib/components/JoinUs.svelte';
    import { showMatrix } from '#lib/stores/theme.ts';
    import DarkToggle from '#lib/components/DarkToggle.svelte';
    import MatrixEasterEgg from '#lib/components/MatrixEasterEgg.svelte';
    import RailSvgRaw from '../../../static/assets/RAIL.svg?raw';
    import { trackEvent } from '#lib/utils/analytics.ts';

    function inlineNavLogo(svg: string): string {
        return svg
            .replace('<svg', '<svg class="nav-rail-logo h-full w-auto"')
            .replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
    }

    const navLogoHtml = inlineNavLogo(RailSvgRaw);

    let joinUsOpen = false;

    function openJoinUsModal(location: 'desktop' | 'mobile' = 'desktop') {
        trackEvent('join_us_click', { location });
        joinUsOpen = true;
    }

    function scrollToSection(sectionId: string) {
        closeMenu();
        const section = document.getElementById(sectionId);
        if (section) {
            const isMobile = window.innerWidth < 768;
            const navbar = document.querySelector('.sticky');
            const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
            const extraPadding = isMobile ? 16 : 24;
            const offset = navbarHeight + extraPadding;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    }

    export let showLogo = false;

    let menuOpen = false;

    function toggleMenu() { menuOpen = !menuOpen; }
    function closeMenu()  { menuOpen = false; }
</script>

<!-- Navigation Bar -->
<div class="sticky top-0 z-50  backdrop-blur-lg w-full p-2 md:p-4 shadow-lg">
    <nav class="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 flex justify-between items-center">
        <!-- Logo container with transition -->
        {#if showLogo}
            <div
                class="h-14 lg:h-12 flex items-center"
                class:matrix-logo-glow={$showMatrix}
                class:text-primary-500={!$showMatrix}
                style={$showMatrix ? 'color: var(--mx-accent)' : ''}
                aria-label="RAIL Lab Logo"
            >
                {@html navLogoHtml}
            </div>
        {:else}
            <div class="h-12 md:h-12 invisible">
                <div class="h-full w-[120px]"></div>
            </div>
        {/if}

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center stack-x-4">
            <button class="rail-btn rail-btn-sm rail-ghost" on:click={() => scrollToSection('about')}>About</button>
            <button class="rail-btn rail-btn-sm rail-ghost" on:click={() => scrollToSection('news')}>News</button>
            <button class="rail-btn rail-btn-sm rail-ghost" on:click={() => scrollToSection('projects')}>Projects</button>
            <button class="rail-btn rail-btn-sm rail-ghost" on:click={() => scrollToSection('members')}>Members</button>
            <button class="rail-btn rail-btn-sm rail-ghost" on:click={() => scrollToSection('teaching')}>Teaching</button>
            <button class="rail-btn rail-btn-sm rail-ghost" on:click={() => scrollToSection('fun')}>Fun</button>
            <button
                class="rail-btn rail-btn-sm rail-filled-primary join-us-btn"
                class:matrix-join-btn={$showMatrix}
                on:click={() => openJoinUsModal('desktop')}
            >
                Join Us
            </button>
            <div class="ml-4 flex items-center gap-2">
                <DarkToggle />
                <MatrixEasterEgg />
            </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="lg:hidden flex items-center stack-x-2">
            <MatrixEasterEgg />
            <DarkToggle />
            <button class="rail-btn rail-btn-sm rail-ghost p-2" on:click={toggleMenu} aria-label="Menu" aria-expanded={menuOpen}>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
    </nav>

    <!-- Mobile Menu -->
    {#if menuOpen}
        <div id="mobile-menu" class="lg:hidden container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
            <div class="flex flex-col stack-y-1 py-3">
                <button class="rail-btn rail-btn-sm rail-ghost text-left px-4 py-2" on:click={() => scrollToSection('about')}>About</button>
                <button class="rail-btn rail-btn-sm rail-ghost text-left px-4 py-2" on:click={() => scrollToSection('news')}>News</button>
                <button class="rail-btn rail-btn-sm rail-ghost text-left px-4 py-2" on:click={() => scrollToSection('projects')}>Projects</button>
                <button class="rail-btn rail-btn-sm rail-ghost text-left px-4 py-2" on:click={() => scrollToSection('members')}>Members</button>
                <button class="rail-btn rail-btn-sm rail-ghost text-left px-4 py-2" on:click={() => scrollToSection('teaching')}>Teaching</button>
                <button class="rail-btn rail-btn-sm rail-ghost text-left px-4 py-2" on:click={() => scrollToSection('fun')}>Fun</button>
                <button
                    class="rail-btn w-full rail-filled-primary join-us-btn"
                    class:matrix-join-btn={$showMatrix}
                    on:click={() => { closeMenu(); openJoinUsModal('mobile'); }}
                >
                    Join Us
                </button>
            </div>
        </div>
    {/if}
</div>

<!-- Transparent backdrop — closes menu when tapping outside -->
{#if menuOpen}
    <div
        class="fixed inset-0 z-40 lg:hidden"
        on:click={closeMenu}
        on:keydown={(e) => e.key === 'Escape' && closeMenu()}
        role="button"
        tabindex="-1"
        aria-label="Close menu"
    ></div>
{/if}

<JoinUs bind:open={joinUsOpen} />

<style>
    /* Default theme button */
    .rail-btn.rail-ghost {
        border: 1px solid transparent;
        transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
    }

    :global(:not(.matrix-theme)) .rail-btn.rail-ghost:hover {
        background-color: rgba(var(--color-primary-500), 0.1);
        color: var(--color-primary-500);
        border-color: var(--color-primary-500);
    }

    /* Matrix theme nav buttons — fully global to beat scoped light-theme rules */
    :global(.matrix-theme .rail-btn.rail-ghost) {
        color: #fff !important;
        border: 1px solid var(--mx-accent-mid) !important;
        background-color: transparent !important;
    }

    :global(.matrix-theme .rail-btn.rail-ghost:hover),
    :global(.matrix-theme #mobile-menu .rail-btn.rail-ghost:hover) {
        background-color: var(--mx-accent-dim) !important;
        color: var(--mx-accent) !important;
        border-color: var(--mx-accent) !important;
        box-shadow: var(--mx-glow-sm) !important;
    }


    .matrix-logo-glow {
        filter: drop-shadow(0 0 10px var(--mx-accent-half, rgba(0,255,0,0.5)));
        transition: filter 0.3s ease;
    }

    .matrix-logo-glow:hover {
        filter: drop-shadow(0 0 15px var(--mx-accent-strong, rgba(0,255,0,0.7)));
    }

    :global(.nav-rail-logo) {
        height: 2.75rem;
        width: auto;
    }

    .join-us-btn {
        font-weight: 600;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        animation: subtle-pulse 2s infinite;
        transition: all 0.3s ease;
    }

    .join-us-btn:hover {
        filter: brightness(1.2);
        box-shadow: 0 8px 16px -2px rgba(var(--color-primary-500), 0.3);
    }

    .matrix-join-btn {
        background-color: var(--mx-accent) !important;
        color: black !important;
        box-shadow: 0 0 10px var(--mx-accent-half);
    }

    .matrix-join-btn:hover {
        box-shadow: 0 0 20px var(--mx-accent-strong),
                    0 8px 16px -2px var(--mx-accent-half);
    }

    @keyframes subtle-pulse {
        0%, 100% { transform: scale(1); }
        50%       { transform: scale(1.03); }
    }
</style>
