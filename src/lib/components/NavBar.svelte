<script lang="ts">
    import { fade, fly } from 'svelte/transition';

    function scrollToSection(sectionId: string) {
        const section = document.getElementById(sectionId);
        if (section) {
            const isMobile = window.innerWidth < 768; // md breakpoint

            // Get actual navbar height
            const navbar = document.querySelector('.sticky');
            const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;

            // Add extra padding
            const extraPadding = isMobile ? 16 : 24;
            const offset = navbarHeight + extraPadding;

            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if it's open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    }

    export let showLogo = false;
    export let showMatrix = false;

</script>

<!-- Navigation Bar -->
<div class="sticky top-0 z-50 bg-surface-100-800-token/98 backdrop-blur-lg w-full p-2 md:p-4 shadow-lg">
    <nav class="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 flex justify-between items-center">
        <!-- Logo container with transition -->
        {#if showLogo}
            {#if showMatrix}
            <div class="h-12 md:h-12 matrix-logo-glow flex items-center">
                <img
                    src="/assets/rail-logo-new-green.svg"
                    alt="RAIL Lab Logo"
                    class="h-10 w-auto object-contain"
                />
            </div>
            {:else}
            <div class="h-12 md:h-12 regular-logo-glow flex items-center">
                <img
                    src="/assets/rail-logo-new-white.svg"
                    alt="RAIL Lab Logo"
                    class="h-10 w-auto object-contain"
                />
            </div>
            {/if}

        {:else}
            <div class="h-12 md:h-12 invisible">
                <!-- Invisible placeholder to maintain layout -->
                <div class="h-full w-[120px]"></div>
            </div>
        {/if}

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-4">
            <button
                class="btn btn-sm variant-ghost"
                on:click={() => {
                    console.log('About button clicked');
                    scrollToSection('about');
                }}
            >
                About
            </button>
            <button
                class="btn btn-sm variant-ghost"
                on:click={() => {
                    console.log('News button clicked');
                    scrollToSection('news');
                }}
            >
                News
            </button>
            <button class="btn btn-sm variant-ghost" on:click={() => scrollToSection('projects')}>Projects</button>
            <button class="btn btn-sm variant-ghost" on:click={() => scrollToSection('members')}>Members</button>
            <button class="btn btn-sm variant-ghost" on:click={() => scrollToSection('teaching')}>Teaching</button>
            <button class="btn btn-sm variant-ghost" on:click={() => scrollToSection('fun')}>Fun</button>
            <button
                class="btn btn-sm variant-filled-primary join-us-btn"
                class:matrix-join-btn={showMatrix}
                on:click={() => {
                    scrollToSection('join');
                    document.querySelector('#mobile-menu').classList.add('hidden');
                }}
            >
                Join Us
            </button>
            <div class="ml-4">
                <button
                    class="btn btn-sm rounded-token hover:variant-soft-primary"
                    on:click={() => showMatrix = !showMatrix}
                    title="Toggle Theme"
                >
                    <span class="hidden md:inline-block">
                        <div class="w-12 h-6 flex items-center bg-surface-600-300-token rounded-full px-0.5">
                            <div
                                class="w-5 h-5 rounded-full transition-all duration-[200ms]"
                                class:translate-x-6={!showMatrix}
                                class:matrix-glow={showMatrix}
                                class:bg-surface-50-900-token={!showMatrix}
                            />
                        </div>
                    </span>
                    <span class="md:hidden">
                        <div class="w-12 h-6 flex items-center bg-surface-600-300-token rounded-full px-0.5">
                            <div
                                class="w-5 h-5 rounded-full transition-all duration-[200ms]"
                                class:translate-x-6={!showMatrix}
                                class:matrix-glow={showMatrix}
                                class:bg-surface-50-900-token={!showMatrix}
                            />
                        </div>
                    </span>
                </button>
            </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="md:hidden flex items-center space-x-2">
            <button
                class="btn btn-sm rounded-token hover:variant-soft-primary"
                on:click={() => showMatrix = !showMatrix}
                title="Toggle Theme"
            >
                <div class="w-12 h-6 flex items-center bg-surface-600-300-token rounded-full px-0.5">
                    <div
                        class="w-5 h-5 rounded-full transition-all duration-[200ms]"
                        class:translate-x-6={!showMatrix}
                        class:matrix-glow={showMatrix}
                        class:bg-surface-50-900-token={!showMatrix}
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

    <!-- Mobile Menu (Hidden by default) -->
    <div id="mobile-menu" class="hidden md:hidden container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div class="flex flex-col space-y-1 py-3">
            <button
                class="btn btn-sm variant-ghost text-left px-4 py-2"
                on:click={() => {
                    scrollToSection('about');
                    document.querySelector('#mobile-menu').classList.add('hidden');
                }}
            >
                About
            </button>
            <button
                class="btn btn-sm variant-ghost text-left px-4 py-2"
                on:click={() => {
                    scrollToSection('news');
                    document.querySelector('#mobile-menu').classList.add('hidden');
                }}
            >
                News
            </button>
            <button
                class="btn btn-sm variant-ghost text-left px-4 py-2"
                on:click={() => {
                    scrollToSection('projects');
                    document.querySelector('#mobile-menu').classList.add('hidden');
                }}
            >
                Projects
            </button>
            <button
                class="btn btn-sm variant-ghost text-left px-4 py-2"
                on:click={() => {
                    scrollToSection('members');
                    document.querySelector('#mobile-menu').classList.add('hidden');
                }}
            >
                Members
            </button>
            <button
                class="btn btn-sm variant-ghost text-left px-4 py-2"
                on:click={() => {
                    scrollToSection('teaching');
                    document.querySelector('#mobile-menu').classList.add('hidden');
                }}
            >
                Teaching
            </button>
            <button
                class="btn btn-sm variant-ghost text-left px-4 py-2"
                on:click={() => {
                    scrollToSection('fun');
                    document.querySelector('#mobile-menu').classList.add('hidden');
                }}
            >
                Fun
            </button>
            <button
                class="btn w-full variant-filled-primary join-us-btn"
                class:matrix-join-btn={showMatrix}
                on:click={() => {
                    scrollToSection('join');
                    document.querySelector('#mobile-menu').classList.add('hidden');
                }}
            >
                Join Us
            </button>
        </div>
    </div>
</div>

<style>
    /* Matrix theme button styles */
    :global(.matrix-theme) .btn.variant-ghost {
        color: #fff !important;
    }

    :global(.matrix-theme) .btn.variant-ghost:hover {
        background-color: rgba(0, 255, 0, 0.1) !important;
        color: #0F0 !important;
        box-shadow: 0 0 10px #0F0;
    }

    /* Regular theme button styles */
    .btn.variant-ghost:hover {
        background-color: rgba(var(--color-primary-500), 0.1) !important;
        color: rgb(var(--color-primary-500)) !important;
    }

    /* Add specific border styles for the ghost variant buttons */
    .btn.variant-ghost {
        border: 1px solid transparent;
        transition: border-color 0.2s ease;
    }

    .btn.variant-ghost:hover {
        border-color: rgb(var(--color-primary-500));
    }

    /* Mobile menu items in matrix theme */
    :global(.matrix-theme) #mobile-menu .btn.variant-ghost:hover {
        background-color: rgba(0, 255, 0, 0.1) !important;
        color: #0F0 !important;
        box-shadow: 0 0 10px #0F0;
    }

    .btn-icon {
        @apply inline-flex items-center justify-center rounded-token h-6 w-6 overflow-hidden;
    }

    .matrix-glow {
        background-color: #0F0;
        box-shadow: 0 0 10px #0F0, 0 0 20px #0F0;
    }

    .bg-surface-50-900-token {
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% {
            box-shadow: none;
        }
        50% {
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(0, 255, 0, 0.3);
        }
        100% {
            box-shadow: none;
        }
    }

    .matrix-logo-glow {
        filter: drop-shadow(0 0 10px rgba(0, 255, 0, 0.5));
        transition: filter 0.3s ease;
    }

    .matrix-logo-glow:hover {
        filter: drop-shadow(0 0 15px rgba(0, 255, 0, 0.7));
    }

    .regular-logo-glow {
        filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
        transition: filter 0.3s ease;
    }

    .regular-logo-glow:hover {
        filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.7));
    }

    .join-us-btn {
        @apply font-semibold shadow-lg;
        animation: subtle-pulse 2s infinite;
        transition: all 0.3s ease;
    }

    .join-us-btn:hover {
        /* transform: translateY(-2px); */
        filter: brightness(1.2);
        box-shadow: 0 8px 16px -2px rgba(var(--color-primary-500), 0.3);
    }

    .matrix-join-btn {
        background-color: #0F0 !important;
        color: black !important;
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
    }

    .matrix-join-btn:hover {
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.7),
                    0 8px 16px -2px rgba(0, 255, 0, 0.5);
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }

    @keyframes subtle-pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.03);
        }
    }
</style>