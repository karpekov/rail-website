<script lang="ts">
    import { news } from '$lib/utils/dataLoader';
    import { scrollable } from '$lib/utils/scroll';
    export let showMatrix = false;

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
        <div class="card p-4 space-y-4">
            {#each allNews.slice(0, visibleCount) as item}
                <div class="border-b border-surface-300-600-token last:border-0 pb-4">
                    <div class="flex justify-between items-start gap-4">
                        <div>
                            <span class="font-bold">{item.date}</span>
                            <p>{item.content}</p>
                        </div>
                        {#if item.link}
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-primary-500 hover:text-primary-600 transition-colors flex-shrink-0 mt-1"
                                class:matrix-link={showMatrix}
                                title="Read more"
                            >
                                <svg
                                    class="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            </a>
                        {/if}
                    </div>
                </div>
            {/each}

            {#if hasMore}
                <div class="flex justify-center pt-2">
                    <button
                        class="btn variant-ghost-primary"
                        class:matrix-button={showMatrix}
                        on:click={showMore}
                    >
                        Show More News
                    </button>
                </div>
            {/if}
        </div>
    {/if}
</section>

<style>
    .matrix-button {
        color: #0F0 !important;
        border-color: #0F0 !important;
    }

    .matrix-button:hover {
        background-color: rgba(0, 255, 0, 0.1) !important;
        box-shadow: 0 0 10px #0F0;
    }

    .matrix-link {
        color: #0F0 !important;
    }

    .matrix-link:hover {
        color: #00FF00 !important;
        text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
    }

	:global(:not(.matrix-theme)) .section-title {
			text-shadow: 0 0 10px rgba(255, 255, 255, 0.5),
									0 0 20px rgba(255, 255, 255, 0.3);
	}
</style>