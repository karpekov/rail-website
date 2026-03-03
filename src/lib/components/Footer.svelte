<script>
    import { showMatrix } from '$lib/stores/theme';

    const currentYear = new Date().getFullYear();
    const socialLinks = [
        {
            name: 'Homepage',
            url: 'https://rail.gatech.edu/',
            icon: `<svg class="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>`
        },
        {
            name: 'Google Scholar',
            url: 'https://scholar.google.com/citations?user=EYo_WkEAAAAJ&hl=en',
            icon: `<svg class="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                </svg>`
        },
        {
            name: 'YouTube',
            url: 'https://www.youtube.com/channel/UCxnm8iu1TS75YNXcAiI-nEw',
            icon: `<svg class="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>`
        }
    ];
</script>

<footer class="py-6 border-t border-surface-300-600-token" class:matrix-footer={$showMatrix}>
    <div class="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <!-- Desktop Layout -->
        <div class="hidden lg:flex justify-between items-start">
            <div class="flex items-center gap-8">
                <div class="text-sm text-surface-600-300-token" class:matrix-text={$showMatrix}>
                    © {currentYear} RAIL Lab.<br />All rights reserved.
                </div>
                <div class="h-8 w-px bg-surface-300-600-token" class:matrix-divider={$showMatrix}></div>
                <div class="flex gap-6" class:matrix-icons={$showMatrix}>
                    {#each socialLinks as link}
                        <a href={link.url} target="_blank" rel="noopener noreferrer"
                           class="text-surface-600-300-token hover:text-primary-500 transition-colors cursor-pointer"
                           title={link.name}>
                            {@html link.icon}
                        </a>
                    {/each}
                </div>
            </div>
            <div class="text-right text-sm text-surface-600-300-token" class:matrix-text={$showMatrix}>
                <p class="mb-1">
                    Designed and built by
                    <a href="https://www.alexkarpekov.com/" target="_blank" rel="noopener noreferrer"
                       class="text-primary-500 hover:underline" class:matrix-link={$showMatrix}>
                        Alexander Karpekov
                    </a>
                    with ♥️
                </p>
                <p>
                    using
                    <a href="https://svelte.dev/" target="_blank" rel="noopener noreferrer"
                       class="text-primary-500 hover:underline" class:matrix-link={$showMatrix}>
                        SvelteKit
                    </a>
                    and
                    <a href="https://skeleton.dev/" target="_blank" rel="noopener noreferrer"
                       class="text-primary-500 hover:underline" class:matrix-link={$showMatrix}>
                        Skeleton
                    </a>
                </p>
            </div>
        </div>

        <!-- Tablet Layout -->
        <div class="hidden sm:flex lg:hidden justify-between items-center">
            <div class="text-sm text-surface-600-300-token" class:matrix-text={$showMatrix}>
                © {currentYear} RAIL Lab.<br />All rights reserved.
            </div>
            <div class="flex gap-6" class:matrix-icons={$showMatrix}>
                {#each socialLinks as link}
                    <a href={link.url} target="_blank" rel="noopener noreferrer"
                       class="text-surface-600-300-token hover:text-primary-500 transition-colors cursor-pointer"
                       title={link.name}>
                        {@html link.icon}
                    </a>
                {/each}
            </div>
        </div>

        <!-- Mobile Layout -->
        <div class="flex sm:hidden flex-col items-center gap-4">
            <div class="flex gap-6" class:matrix-icons={$showMatrix}>
                {#each socialLinks as link}
                    <a href={link.url} target="_blank" rel="noopener noreferrer"
                       class="text-surface-600-300-token hover:text-primary-500 transition-colors cursor-pointer"
                       title={link.name}>
                        {@html link.icon}
                    </a>
                {/each}
            </div>
            <div class="text-sm text-center text-surface-600-300-token" class:matrix-text={$showMatrix}>
                © {currentYear} RAIL Lab. All rights reserved.
            </div>
        </div>
    </div>
</footer>

<style>
    .matrix-footer {
        background-color: var(--mx-bg-hero) !important;
        border-color: var(--mx-divider) !important;
    }

    .matrix-text {
        color: var(--mx-accent) !important;
    }

    .matrix-icons :global(svg) {
        color: var(--mx-accent) !important;
    }

    .matrix-icons a:hover :global(svg) {
        color: var(--mx-accent) !important;
        filter: drop-shadow(0 0 5px var(--mx-accent));
    }

    .matrix-divider {
        background-color: var(--mx-divider) !important;
    }

    .matrix-link {
        color: var(--mx-accent) !important;
    }

    .matrix-link:hover {
        color: var(--mx-accent) !important;
        text-shadow: 0 0 5px var(--mx-accent);
    }
</style>
