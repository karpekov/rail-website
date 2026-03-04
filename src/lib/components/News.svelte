<script lang="ts">
    import { news } from '$lib/utils/dataLoader';
    import { showMatrix } from '$lib/stores/theme';
    import { fly } from 'svelte/transition';
    import { trackEvent } from '$lib/utils/analytics';

    const INITIAL_SHOW = 5;
    const SHOW_MORE = 10;
    const STAGGER_MS = 70;

    const MONTH_ABBR: Record<string, string> = {
        January: 'Jan', February: 'Feb', March: 'Mar', April: 'Apr',
        May: 'May', June: 'Jun', July: 'Jul', August: 'Aug',
        September: 'Sep', October: 'Oct', November: 'Nov', December: 'Dec'
    };

    let allNews = news?.recent_news || [];
    let visibleCount = INITIAL_SHOW;
    // Captured just before each expansion so new items know their stagger offset.
    let prevCount = 0;

    function showMore() {
        prevCount = visibleCount;
        visibleCount = Math.min(visibleCount + SHOW_MORE, allNews.length);
        trackEvent('news_expand', { visible_count: visibleCount });
    }

    function parseDate(dateStr: string): { year: string; month: string } {
        const parts = dateStr.trim().split(/\s+/);
        let year = '';
        let monthKey = '';
        for (const p of parts) {
            if (/^\d{4}$/.test(p)) year = p;
            else if (MONTH_ABBR[p]) monthKey = p;
        }
        return { year, month: MONTH_ABBR[monthKey] ?? monthKey };
    }

    // Converts [text](url) markdown links to styled <a> tags.
    // Content comes from the trusted news.yaml authored by the team.
    function renderContent(content: string): string {
        return content.replace(
            /\[([^\]]+)\]\(([^)]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener noreferrer" class="news-inline-link">$1</a>'
        );
    }

    $: visibleNews = allNews.slice(0, visibleCount);
    $: hasMore = visibleCount < allNews.length;
</script>

<section id="news">
    <h2 class="h2 font-orbitron section-title">News</h2>

    {#if allNews.length > 0}
        <div class="news-card bg-surface-100-800-token" class:matrix-card={$showMatrix}>
            <div class="timeline" class:matrix-timeline={$showMatrix}>
                {#each visibleNews as item, i (item)}
                    {@const d = parseDate(item.date)}
                    <div
                        class="tl-row"
                        class:tl-last={i === visibleNews.length - 1 && !hasMore}
                        in:fly={{ y: 10, duration: 220, delay: i >= prevCount ? (i - prevCount) * STAGGER_MS : 0 }}
                    >
                        <div class="tl-date">
                            <span class="tl-year">{d.year}</span>
                            <span class="tl-month">{d.month}</span>
                        </div>
                        <div class="tl-spine">
                            <div class="tl-dot"></div>
                            <div class="tl-stem"></div>
                        </div>
                        <div class="tl-body">
                            <p>{@html renderContent(item.content)}</p>
                        </div>
                    </div>
                {/each}
            </div>

            {#if hasMore}
                <button
                    class="tl-more-row"
                    class:matrix-more={$showMatrix}
                    on:click={showMore}
                    aria-label="Read more news"
                >
                    <div class="tl-more-date"></div>
                    <div class="tl-more-spine">
                        <span class="more-pip"></span>
                        <span class="more-pip"></span>
                        <span class="more-pip"></span>
                    </div>
                    <div class="tl-more-label">read more news</div>
                </button>
            {/if}
        </div>
    {/if}
</section>

<style>
    /* ── Card wrapper ─────────────────────────────────────────────────── */
    .news-card {
        border-radius: 0.75rem;
        padding: 1.25rem 1.5rem 1rem;
    }

    .matrix-card {
        background: var(--mx-card-bg);
        border: 1px solid var(--mx-accent-mid);
        box-shadow: 0 0 14px var(--mx-accent-half), 0 0 5px var(--mx-accent-mid);
    }

    /* ── Timeline container ───────────────────────────────────────────── */
    .timeline {
        padding: 0.25rem 0 0;
    }

    /* ── Each news row ────────────────────────────────────────────────── */
    .tl-row {
        display: flex;
        align-items: stretch;
    }

    /* ── Left date column ─────────────────────────────────────────────── */
    .tl-date {
        width: 4.25rem;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding-right: 1.1rem;
        padding-top: 0.25rem;
        line-height: 1.25;
        gap: 0.05rem;
    }

    .tl-year {
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.03em;
        color: rgb(var(--color-primary-600));
    }

    .tl-month {
        font-size: 0.72rem;
        color: rgb(var(--color-surface-600));
        text-transform: uppercase;
        letter-spacing: 0.04em;
    }

    /* ── Spine: dot + connecting line ─────────────────────────────────── */
    .tl-spine {
        width: 1.25rem;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tl-dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: rgb(var(--color-primary-500));
        margin-top: 0.38rem;
        flex-shrink: 0;
        position: relative;
        z-index: 1;
    }

    .tl-stem {
        flex: 1;
        width: 2px;
        background: rgb(var(--color-primary-500) / 0.45);
        margin-top: 3px;
        min-height: 0.5rem;
        border-radius: 1px;
    }

    .tl-last .tl-stem {
        display: none;
    }

    /* ── Right content column ─────────────────────────────────────────── */
    .tl-body {
        flex: 1;
        padding-left: 1.1rem;
        padding-bottom: 1.1rem;
        padding-top: 0.18rem;
        font-size: 0.9rem;
        line-height: 1.55;
    }

    .tl-last .tl-body {
        padding-bottom: 0.25rem;
    }

    /* ── "Read more" expander ─────────────────────────────────────────── */
    .tl-more-row {
        display: flex;
        align-items: center;
        width: 100%;
        background: none;
        border: none;
        padding: 0.35rem 0 0.1rem;
        cursor: pointer;
        text-align: left;
    }

    .tl-more-date {
        width: 4.25rem;
        flex-shrink: 0;
    }

    .tl-more-spine {
        width: 1.25rem;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 3px 0;
    }

    .more-pip {
        display: block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgb(var(--color-primary-500) / 0.35);
        transition: background 0.22s ease, transform 0.22s ease;
    }

    .tl-more-label {
        padding-left: 1.1rem;
        font-size: 0.78rem;
        letter-spacing: 0.04em;
        color: rgb(var(--color-surface-600));
        opacity: 0;
        transform: translateX(-6px);
        transition: opacity 0.22s ease, transform 0.22s ease;
        white-space: nowrap;
    }

    .tl-more-row:hover .more-pip {
        background: rgb(var(--color-primary-500) / 0.85);
        transform: scale(1.3);
    }

    .tl-more-row:hover .tl-more-label {
        opacity: 1;
        transform: translateX(0);
    }

    /* Matrix more-row */
    .matrix-more .more-pip {
        background: var(--mx-accent-mid);
    }

    .matrix-more .tl-more-label {
        color: var(--mx-accent);
    }

    .matrix-more:hover .more-pip {
        background: var(--mx-accent);
        transform: scale(1.3);
    }

    .matrix-more:hover .tl-more-label {
        opacity: 1;
        transform: translateX(0);
    }

    /* ── Inline links (injected via {@html}) ──────────────────────────── */
    :global(.news-inline-link) {
        color: rgb(var(--color-primary-600));
        text-decoration: underline;
        text-decoration-color: rgb(var(--color-primary-500) / 0.35);
        text-underline-offset: 2px;
        transition: color 0.15s ease, text-decoration-color 0.15s ease;
    }

    :global(.news-inline-link:hover) {
        color: rgb(var(--color-primary-400));
        text-decoration-color: rgb(var(--color-primary-400) / 0.75);
    }

    /* ── Matrix theme overrides ───────────────────────────────────────── */
    .matrix-timeline .tl-year {
        color: var(--mx-accent);
    }

    .matrix-timeline .tl-month {
        color: var(--mx-accent-mid, rgba(0, 255, 70, 0.5));
    }

    .matrix-timeline .tl-dot {
        background: var(--mx-accent);
    }

    .matrix-timeline .tl-stem {
        background: var(--mx-accent-mid);
    }

    :global(.matrix-theme .news-inline-link) {
        color: var(--mx-accent) !important;
        text-decoration-color: var(--mx-accent-half) !important;
    }

    :global(.matrix-theme .news-inline-link:hover) {
        text-shadow: 0 0 8px var(--mx-accent-half);
    }

    /* ── Section title ────────────────────────────────────────────────── */
    :global(:not(.matrix-theme)) .section-title {
        color: rgb(var(--color-primary-600));
    }

    /* ── Mobile overrides (must be last to win the cascade) ──────────── */
    @media (max-width: 480px) {
        .tl-date, .tl-more-date {
            width: 2.9rem;
            padding-right: 0.65rem;
        }
    }

    @media (hover: none) {
        .tl-more-label {
            opacity: 0.7;
            transform: translateX(0);
        }
    }
</style>
