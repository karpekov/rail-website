<script lang="ts">
    import { fun } from '$lib/utils/dataLoader';
    import { onMount } from 'svelte';
    import { showMatrix } from '$lib/stores/theme';

    const activities = fun?.activities || [];

    let scrollEl: HTMLElement;
    let canLeft = false;
    let canRight = false;

    function updateScrollState() {
        if (!scrollEl) return;
        canLeft  = scrollEl.scrollLeft > 2;
        canRight = scrollEl.scrollLeft < scrollEl.scrollWidth - scrollEl.clientWidth - 2;
    }

    function scrollBy(delta: number) {
        scrollEl?.scrollBy({ left: delta, behavior: 'smooth' });
    }

    onMount(() => {
        updateScrollState();
    });
</script>

<section id="fun">
    <h2 class="h2 font-orbitron section-title">Fun & Outreach</h2>

    <p class="text-sm sm:text-base mb-8 font-opensans">
        Beyond cutting-edge research, RAIL Lab actively engages with our local community. From showcasing
        candy-distributing robots during Halloween to teaching robotics to local students, we're passionate
        about making technology accessible and exciting. Our lab members also enjoy regular social activities
        like hiking and rock climbing. Check out some of our recent activities below!
    </p>

    <!-- Scroll container with nav buttons -->
    <div class="scroll-outer">
        <!-- Left button -->
        <button
            class="scroll-btn scroll-btn-left"
            class:visible={canLeft}
            class:matrix-btn={$showMatrix}
            on:click={() => scrollBy(-310)}
            aria-label="Scroll left"
            tabindex={canLeft ? 0 : -1}
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"/>
            </svg>
        </button>

        <!-- Scrollable strip -->
        <div
            bind:this={scrollEl}
            class="scroll-strip"
            on:scroll={updateScrollState}
        >
            <div class="flex space-x-4 px-2">
                {#each activities as activity}
                    <div class="flex-none w-72 pt-2">
                        <div class="card p-4 h-full fun-card hover:bg-surface-200-700-token" class:matrix-card={$showMatrix}>
                            <div class="aspect-video mb-4 rounded-lg overflow-hidden">
                                <img
                                    src={activity.image}
                                    alt={activity.title}
                                    class="w-full h-full object-cover"
                                    loading="lazy"
                                    width="288" height="162"
                                />
                            </div>
                            <h3 class="text-base font-semibold mb-2">{activity.title}</h3>
                            <p class="text-xs text-surface-600-300-token mb-3">{activity.frequency}</p>
                            <p class="text-sm mb-4">{activity.description}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Right button -->
        <button
            class="scroll-btn scroll-btn-right"
            class:visible={canRight}
            class:matrix-btn={$showMatrix}
            on:click={() => scrollBy(310)}
            aria-label="Scroll right"
            tabindex={canRight ? 0 : -1}
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"/>
            </svg>
        </button>
    </div>
</section>

<style>
    /* ── Scroll container ─────────────────────────────────────────────────── */
    .scroll-outer {
        position: relative;
    }

    .scroll-strip {
        overflow-x: auto;
        padding-bottom: 1.5rem;
        padding-top: 0.5rem;
        width: 100%;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .scroll-strip::-webkit-scrollbar {
        display: none;
    }

    /* ── Scroll buttons ───────────────────────────────────────────────────── */
    .scroll-btn {
        position: absolute;
        top: calc(50% - 0.75rem); /* offset for strip's padding-bottom */
        transform: translateY(-50%);
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 9999px;
        border: 1.5px solid rgb(var(--color-primary-400));
        background: rgb(var(--color-surface-50));
        color: rgb(var(--color-primary-600));
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.25s ease, transform 0.25s ease,
                    box-shadow 0.2s ease, background 0.2s ease;
        z-index: 2;
    }

    .scroll-btn svg {
        width: 1rem;
        height: 1rem;
    }

    .scroll-btn.visible {
        opacity: 1;
        pointer-events: auto;
    }

    .scroll-btn:hover {
        background: rgb(var(--color-primary-500));
        color: #fff;
        box-shadow: 0 0 12px rgb(var(--color-primary-500) / 0.45);
        transform: translateY(-50%) scale(1.1);
    }

    .scroll-btn-left  { left:  0.5rem; }
    .scroll-btn-right { right: 0.5rem; }

    /* Matrix variant */
    .scroll-btn.matrix-btn {
        border-color: var(--mx-accent);
        background: #050505;
        color: var(--mx-accent);
    }

    .scroll-btn.matrix-btn:hover {
        background: var(--mx-accent);
        color: #000;
        box-shadow: var(--mx-glow-sm);
    }

    /* ── Card styles ──────────────────────────────────────────────────────── */
    .fun-card {
        transition: transform 0.2s ease-out,
                    box-shadow 0.2s ease;
    }

    :global(:not(.matrix-theme)) .fun-card:hover {
        box-shadow: 0 6px 24px rgba(var(--color-primary-500), 0.18),
                    0 2px 8px rgba(var(--color-primary-500), 0.08);
        transform: translateY(-2px);
    }

    :global(.matrix-theme) .fun-card {
        border: 1px solid var(--mx-accent-mid);
    }

    :global(.matrix-theme) .fun-card:hover {
        border-color: var(--mx-accent);
        box-shadow: 0 0 18px var(--mx-accent-half);
        transform: translateY(-2px);
        background-color: transparent !important;
    }

    /* ── Section title ────────────────────────────────────────────────────── */
    :global(:not(.matrix-theme)) .section-title {
        color: rgb(var(--color-primary-600));
        text-shadow: 0 0 16px rgba(var(--color-primary-500), 0.35),
                     0 0 32px rgba(var(--color-primary-500), 0.18);
    }
</style>
