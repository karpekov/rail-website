<script lang="ts">
    import { getModalStore } from '@skeletonlabs/skeleton';
    import JoinUs from '$lib/components/JoinUs.svelte';
    import { showMatrix } from '$lib/stores/theme';
    import RailSvgRaw from '$lib/../../static/assets/RAIL.svg?raw';

    function inlineNavLogo(svg: string): string {
        return svg
            .replace('<svg', '<svg class="nav-rail-logo h-full w-auto"')
            .replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
    }

    const navLogoHtml = inlineNavLogo(RailSvgRaw);

    const modalStore = getModalStore();

    function openJoinUsModal() {
        modalStore.trigger({
            type: 'component',
            component: {
                ref: JoinUs,
                props: {
                    onClose: () => modalStore.close()
                }
            }
        });
    }

    function scrollToSection(sectionId: string) {
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

            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    }

    export let showLogo = false;
</script>

<!-- Navigation Bar -->
<div class="sticky top-0 z-50 bg-surface-100-800-token/98 backdrop-blur-lg w-full p-2 md:p-4 shadow-lg">
    <nav class="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 flex justify-between items-center">
        <!-- Logo container with transition -->
        {#if showLogo}
            <div
                class="h-14 lg:h-12 flex items-center"
                class:matrix-logo-glow={$showMatrix}
                class:regular-logo-glow={!$showMatrix}
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
        <div class="hidden lg:flex items-center space-x-4">
            <button class="btn btn-sm variant-ghost" on:click={() => scrollToSection('about')}>About</button>
            <button class="btn btn-sm variant-ghost" on:click={() => scrollToSection('news')}>News</button>
            <button class="btn btn-sm variant-ghost" on:click={() => scrollToSection('projects')}>Projects</button>
            <button class="btn btn-sm variant-ghost" on:click={() => scrollToSection('members')}>Members</button>
            <button class="btn btn-sm variant-ghost" on:click={() => scrollToSection('teaching')}>Teaching</button>
            <button class="btn btn-sm variant-ghost" on:click={() => scrollToSection('fun')}>Fun</button>
            <button
                class="btn btn-sm variant-filled-primary join-us-btn"
                class:matrix-join-btn={$showMatrix}
                on:click={openJoinUsModal}
            >
                Join Us
            </button>
            <div class="ml-4">
                <button
                    class="btn btn-sm rounded-token hover:variant-soft-primary"
                    on:click={() => $showMatrix = !$showMatrix}
                    title="Toggle Theme"
                >
                    <span class="hidden md:inline-block">
                        <div class="w-12 h-6 flex items-center bg-surface-600-300-token rounded-full px-0.5">
                            <div
                                class="w-5 h-5 rounded-full transition-all duration-[200ms]"
                                class:translate-x-6={!$showMatrix}
                                class:matrix-glow={$showMatrix}
                                class:bg-surface-50-900-token={!$showMatrix}
                            />
                        </div>
                    </span>
                </button>
            </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="lg:hidden flex items-center space-x-2">
            <button
                class="btn btn-sm rounded-token hover:variant-soft-primary"
                on:click={() => $showMatrix = !$showMatrix}
                title="Toggle Theme"
            >
                <div class="w-12 h-6 flex items-center bg-surface-600-300-token rounded-full px-0.5">
                    <div
                        class="w-5 h-5 rounded-full transition-all duration-[200ms]"
                        class:translate-x-6={!$showMatrix}
                        class:matrix-glow={$showMatrix}
                        class:bg-surface-50-900-token={!$showMatrix}
                    />
                </div>
            </button>
            <button class="btn btn-sm variant-ghost p-2" on:click={() => document.querySelector('#mobile-menu').classList.toggle('hidden')}>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
    </nav>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden lg:hidden container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div class="flex flex-col space-y-1 py-3">
            <button class="btn btn-sm variant-ghost text-left px-4 py-2" on:click={() => scrollToSection('about')}>About</button>
            <button class="btn btn-sm variant-ghost text-left px-4 py-2" on:click={() => scrollToSection('news')}>News</button>
            <button class="btn btn-sm variant-ghost text-left px-4 py-2" on:click={() => scrollToSection('projects')}>Projects</button>
            <button class="btn btn-sm variant-ghost text-left px-4 py-2" on:click={() => scrollToSection('members')}>Members</button>
            <button class="btn btn-sm variant-ghost text-left px-4 py-2" on:click={() => scrollToSection('teaching')}>Teaching</button>
            <button class="btn btn-sm variant-ghost text-left px-4 py-2" on:click={() => scrollToSection('fun')}>Fun</button>
            <button
                class="btn w-full variant-filled-primary join-us-btn"
                class:matrix-join-btn={$showMatrix}
                on:click={openJoinUsModal}
            >
                Join Us
            </button>
        </div>
    </div>
</div>

<style>
    /* Matrix theme button hover */
    :global(.matrix-theme) .btn.variant-ghost {
        color: #fff !important;
    }

    :global(.matrix-theme) .btn.variant-ghost:hover {
        background-color: var(--mx-accent-dim) !important;
        color: var(--mx-accent) !important;
        box-shadow: var(--mx-glow-sm);
    }

    :global(.matrix-theme) #mobile-menu .btn.variant-ghost:hover {
        background-color: var(--mx-accent-dim) !important;
        color: var(--mx-accent) !important;
        box-shadow: var(--mx-glow-sm);
    }

    /* Default theme button hover */
    .btn.variant-ghost {
        border: 1px solid transparent;
        transition: border-color 0.2s ease;
    }

    .btn.variant-ghost:hover {
        background-color: rgba(var(--color-primary-500), 0.1) !important;
        color: rgb(var(--color-primary-500)) !important;
        border-color: rgb(var(--color-primary-500));
    }

    .matrix-glow {
        background-color: var(--mx-accent);
        box-shadow: var(--mx-glow-md);
    }

    /* Subtle Easter egg: toggle knob occasionally hints at matrix mode */
    .bg-surface-50-900-token {
        animation: pulse 30s infinite;
    }

    @keyframes pulse {
        0%   { box-shadow: none; }
        10%  { box-shadow: 0 0 10px var(--mx-accent-half, rgba(0,255,0,0.5)), 0 0 20px var(--mx-accent-mid, rgba(0,255,0,0.3)); background-color: var(--mx-accent, #0F0); }
        20%  { box-shadow: none; background-color: transparent; }
    }

    .matrix-logo-glow {
        filter: drop-shadow(0 0 10px var(--mx-accent-half, rgba(0,255,0,0.5)));
        transition: filter 0.3s ease;
    }

    .matrix-logo-glow:hover {
        filter: drop-shadow(0 0 15px var(--mx-accent-strong, rgba(0,255,0,0.7)));
    }

    .regular-logo-glow {
        filter: drop-shadow(0 0 8px rgba(232, 168, 0, 0.5));
        transition: filter 0.3s ease;
    }

    .regular-logo-glow:hover {
        filter: drop-shadow(0 0 14px rgba(232, 168, 0, 0.75));
    }

    :global(.nav-rail-logo) {
        height: 2.75rem;
        width: auto;
    }

    .join-us-btn {
        @apply font-semibold shadow-lg;
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
