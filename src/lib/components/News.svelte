<script lang="ts">
    import { news } from '$lib/utils/dataLoader';
    import { scrollable } from '$lib/utils/scroll';
    import { showMatrix } from '$lib/stores/theme';

    const INITIAL_SHOW = 5;
    const SHOW_MORE_INCREMENT = 10;

    let visibleCount = INITIAL_SHOW;
    let allNews = news?.recent_news || [];

    function showMore() {
        visibleCount = Math.min(visibleCount + SHOW_MORE_INCREMENT, allNews.length);
    }

    $: hasMore = visibleCount < allNews.length;
</script>

<section id="news">
    <h2 class="h2 font-orbitron section-title">News</h2>
    {#if allNews.length > 0}
        <div class="card p-4 space-y-1">
            {#each allNews.slice(0, visibleCount) as item}
                <svelte:element
                    this={item.link ? 'a' : 'div'}
                    href={item.link || undefined}
                    target={item.link ? '_blank' : undefined}
                    rel={item.link ? 'noopener noreferrer' : undefined}
                    class="news-row border-b border-surface-300-600-token last:border-0 pb-4 pt-3 px-2 rounded-md -mx-2"
                    class:has-link={!!item.link}
                    class:matrix-row={$showMatrix}
                >
                    <div class="flex items-start justify-between gap-3">
                        <div>
                            <span class="font-bold">{item.date}</span>
                            <p class="mt-0.5">{item.content}</p>
                        </div>
                        {#if item.link}
                            <svg class="link-icon flex-shrink-0 mt-1 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        {/if}
                    </div>
                </svelte:element>
            {/each}

            {#if hasMore}
                <div class="flex justify-center pt-2">
                    <button class="btn variant-ghost-primary matrix-button" on:click={showMore}>
                        Show More News
                    </button>
                </div>
            {/if}
        </div>
    {/if}
</section>

<style>
    .news-row {
        display: block;
        text-decoration: none;
        color: inherit;
        transition: background-color 0.2s ease, padding-left 0.2s ease;
    }

    .news-row.has-link {
        cursor: pointer;
    }

    /* Link icon: faint by default, amber + visible on hover */
    .link-icon {
        opacity: 0.25;
        color: rgb(var(--color-surface-600));
        transition: opacity 0.2s ease, color 0.2s ease;
        flex-shrink: 0;
    }

    :global(:not(.matrix-theme)) .news-row.has-link:hover {
        background-color: rgba(var(--color-primary-500), 0.09);
        padding-left: 0.75rem;
    }

    :global(:not(.matrix-theme)) .news-row.has-link:hover .link-icon {
        opacity: 1;
        color: rgb(var(--color-primary-500));
    }

    .matrix-row.has-link:hover {
        background-color: var(--mx-accent-dim);
        padding-left: 0.75rem;
    }

    .matrix-row.has-link:hover .link-icon {
        opacity: 1;
        color: var(--mx-accent);
    }

    :global(.matrix-theme) .matrix-button {
        color: var(--mx-accent) !important;
        border-color: var(--mx-accent) !important;
    }

    :global(.matrix-theme) .matrix-button:hover {
        background-color: var(--mx-accent-dim) !important;
        box-shadow: var(--mx-glow-sm);
    }

    .matrix-link {
        color: var(--mx-accent) !important;
    }

    .matrix-link:hover {
        color: var(--mx-accent) !important;
        text-shadow: 0 0 10px var(--mx-accent-half);
    }

    :global(:not(.matrix-theme)) .section-title {
        color: rgb(var(--color-primary-600));
        text-shadow: 0 0 16px rgba(var(--color-primary-500), 0.35),
                     0 0 32px rgba(var(--color-primary-500), 0.18);
    }
</style>
