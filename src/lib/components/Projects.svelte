<script lang="ts">
    import { projects } from '$lib/utils/dataLoader';
    import { scrollable } from '$lib/utils/scroll';
    import { showMatrix } from '$lib/stores/theme';
    import { fly, fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { trackEvent } from '$lib/utils/analytics';

    const tagLabels = {
        all: 'All Projects',
        hcai: 'Human-Centered AI',
        robo: 'Robotics',
        multi: 'Multi-Agent Systems',
        xai: 'Explainable AI'
    };

    let activeFilter = 'all';
    let prevFilter = 'all';
    const INITIAL_SHOW = 9;
    const SHOW_MORE_INCREMENT = 8;
    let visibleCount = INITIAL_SHOW;
    // Incremented each time filter changes to force {#key} re-render
    let filterKey = 0;

    $: filteredProjects = [...(projects?.project_list || [])]
        .filter(project => project.featured)
        .sort((a, b) => b.year - a.year)
        .filter(project => activeFilter === 'all' || project.tags.includes(activeFilter));

    $: hasMore = visibleCount < filteredProjects.length;

    function showMore() {
        visibleCount = Math.min(visibleCount + SHOW_MORE_INCREMENT, filteredProjects.length);
    }

    function setFilter(tag: string) {
        if (tag === activeFilter) return;
        prevFilter = activeFilter;
        activeFilter = tag;
        visibleCount = INITIAL_SHOW;
        filterKey++;
        trackEvent('project_filter', { filter: tag });
    }
</script>

<section id="projects">
    <h2 class="h2 font-orbitron section-title">Featured Projects</h2>

    <!-- Filter Chips — styled entirely via CSS, no inline styles -->
    <div class="flex flex-wrap gap-2 mt-4 mb-6">
        <button
            class="px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 filter-chip"
            class:active={activeFilter === 'all'}
            on:click={() => setFilter('all')}
        >
            All
        </button>
        {#each Object.entries(tagLabels).filter(([key]) => key !== 'all') as [tag, label]}
            <button
                class="px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 filter-chip"
                class:active={activeFilter === tag}
                on:click={() => setFilter(tag)}
            >
                {label}
            </button>
        {/each}
    </div>

    {#key filterKey}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8" out:fade={{ duration: 120 }}>
        {#each filteredProjects.slice(0, visibleCount) as project, i}
            <div
                class="flex flex-col h-full bg-surface-100-800-token rounded-lg overflow-hidden project-card max-w-sm mx-auto w-full relative group"
                in:fly={{ y: 28, duration: 320, delay: i * 45, easing: cubicOut }}
            >
                <div class="p-3 pb-0">
                    <div class="rounded-lg overflow-hidden border border-surface-300-600-token">
                        <img
                            src={project.image}
                            alt=""
                            class="w-full h-auto"
                            loading="lazy"
                        />
                    </div>
                </div>

                <div class="p-3 space-y-2 flex-grow">
                    <div class="space-y-2">
                        <h4 class="font-medium text-base">{project.short_title || project.full_title}</h4>
                        <div class="publication-chip">
                            {project.venue} '{(project.year % 100).toString().padStart(2, '0')}
                        </div>
                        {#if project.tags && project.tags.length > 0}
                            <div class="flex flex-wrap gap-1.5 mt-1 mb-2">
                                {#each project.tags as tag}
                                    <span
                                        class="tag-chip px-2 py-0.5 rounded-full text-xs font-medium"
                                        class:tag-active={tag === activeFilter}
                                        title={tagLabels[tag]}
                                    >
                                        {tag.toUpperCase()}
                                    </span>
                                {/each}
                            </div>
                        {/if}
                    </div>

                    <p class="text-sm opacity-80">{project.full_title}</p>
                    <p class="text-xs">
                        <span class="opacity-60">Team:</span> {project.team.join(', ')}
                    </p>

                    <div class="flex flex-wrap gap-2 pt-2 items-center project-links">
                        {#if project.website}
                            <a href={project.website} target="_blank" rel="noopener noreferrer"
                               class="chip variant-soft-primary transition-all flex-none matrix-chip {!$showMatrix ? 'hover:variant-filled-primary' : ''}"
                               title="Project Website">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                </svg>
                                <span class="ml-1 text-sm">Home</span>
                            </a>
                        {/if}
                        {#if project.pdf}
                            <a href={project.pdf} target="_blank" rel="noopener noreferrer"
                               class="chip variant-soft-primary transition-all matrix-chip {!$showMatrix ? 'hover:variant-filled-primary' : ''}"
                               title="View Paper">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <line x1="10" y1="9" x2="8" y2="9" />
                                </svg>
                                <span class="ml-1 text-sm">PDF</span>
                            </a>
                        {/if}
                        {#if project.github}
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                               class="chip variant-soft-primary transition-all matrix-chip {!$showMatrix ? 'hover:variant-filled-primary' : ''}"
                               title="View Code">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                                </svg>
                                <span class="ml-1 text-sm">Code</span>
                            </a>
                        {/if}
                        {#if project.video}
                            <a href={project.video} target="_blank" rel="noopener noreferrer"
                               class="chip variant-soft-primary transition-all matrix-chip {!$showMatrix ? 'hover:variant-filled-primary' : ''}"
                               title="Watch Demo">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                </svg>
                                <span class="ml-1 text-sm">Video</span>
                            </a>
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
    </div>
    {/key}

    {#if hasMore}
        <div class="flex justify-center mt-8">
            <button class="btn variant-ghost-primary matrix-button" on:click={showMore}>
                Discover More Projects
            </button>
        </div>
    {/if}
</section>

<style>
    .project-card {
        transition: transform 0.2s ease-out,
                    box-shadow 0.2s ease;
        overflow: hidden;
    }

    :global(:not(.matrix-theme)) .project-card:hover {
        /* 4% black tint — just perceptible without the heavy shift of surface-200 */
        background-image: linear-gradient(rgba(0,0,0,0.02), rgba(0,0,0,0.02));
    }

    /* Shimmer pseudo-element */
    .project-card::before {
        content: '';
        position: absolute;
        top: 0; left: -80%;
        width: 60%; height: 100%;
        background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(var(--color-primary-400), 0.12) 50%,
            transparent 60%
        );
        transform: skewX(-15deg);
        transition: left 0.55s ease;
        pointer-events: none;
        z-index: 1;
    }

    .project-card:hover::before {
        left: 140%;
    }

    :global(:not(.matrix-theme)) .project-card:hover {
        box-shadow: 0 6px 24px rgba(var(--color-primary-500), 0.18),
                    0 2px 8px rgba(var(--color-primary-500), 0.08);
        transform: translateY(-2px);
    }

    :global(.matrix-theme) .project-card::before {
        background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(0, 255, 0, 0.08) 50%,
            transparent 60%
        );
    }

    :global(.matrix-theme) .project-card {
        border: 1px solid var(--mx-accent-mid);
    }

    :global(.matrix-theme) .project-card:hover {
        border-color: var(--mx-accent);
        box-shadow: 0 0 20px var(--mx-accent-half), 0 0 8px var(--mx-accent-mid);
        transform: translateY(-2px);
    }

    /* Filter chips */
    .filter-chip {
        color: rgb(var(--color-surface-700));
        border: 1px solid rgb(var(--color-surface-400));
        background-color: transparent;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .filter-chip.active {
        background-color: rgb(var(--color-primary-400));
        border-color: rgb(var(--color-primary-400));
        color: #1a1000;
        box-shadow: 0 2px 8px rgb(var(--color-primary-300) / 0.5);
    }

    :global(:not(.matrix-theme)) .filter-chip:not(.active):hover {
        color: rgb(var(--color-primary-800));
        border-color: rgb(var(--color-primary-300));
        background-color: rgb(var(--color-primary-50));
    }

    :global(.matrix-theme) .filter-chip {
        color: var(--mx-accent);
        border: 1px solid var(--mx-accent);
    }

    :global(.matrix-theme) .filter-chip.active {
        background-color: var(--mx-accent) !important;
        color: #000 !important;
        border-color: var(--mx-accent) !important;
        box-shadow: 0 0 12px var(--mx-accent-half), 0 0 4px var(--mx-accent);
    }

    :global(.matrix-theme .filter-chip:not(.active):hover) {
        background-color: var(--mx-accent-dim) !important;
        color: var(--mx-accent) !important;
        border-color: var(--mx-accent) !important;
        box-shadow: 0 0 12px var(--mx-accent-half) !important;
    }

    /* Tag chips */
    .tag-chip {
        background-color: rgb(var(--color-primary-50));   /* #FFFBEB very faint yellow */
        color: rgb(var(--color-primary-800));              /* #705000 dark amber */
        border: 1.5px solid rgb(var(--color-primary-200)); /* #FDE68A soft yellow border */
        transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
    }

    .tag-chip.tag-active {
        background-color: rgb(var(--color-primary-400));  /* #FBBF24 solid amber */
        border-color: rgb(var(--color-primary-400));
        color: #1a1000;
    }

    :global(.matrix-theme) .tag-chip {
        background-color: transparent;
        color: var(--mx-accent);
        border: 1px solid var(--mx-accent);
    }

    :global(.matrix-theme .tag-chip.tag-active) {
        background-color: var(--mx-accent) !important;
        color: #000 !important;
        border-color: var(--mx-accent) !important;
        box-shadow: 0 0 8px var(--mx-accent-half);
    }

    .publication-chip {
        @apply inline-flex px-2 py-0.5 text-xs rounded-full border transition-colors duration-200;
    }

    :global(:not(.matrix-theme)) .publication-chip {
        @apply text-primary-500 border-primary-500;
    }

    :global(.matrix-theme) .publication-chip {
        color: var(--mx-accent);
        border-color: var(--mx-accent);
    }

    .project-links a {
        @apply transition-colors duration-200;
    }

    :global(:not(.matrix-theme)) .project-links a:hover {
        /* variant-filled-primary background = amber; force dark text so it stays readable */
        color: rgb(30, 20, 0) !important;
    }

    :global(:not(.matrix-theme)) .project-links a:hover svg {
        color: rgb(30, 20, 0) !important;
    }

    :global(.matrix-theme) .project-links a:hover {
        color: var(--mx-accent);
        text-shadow: 0 0 10px var(--mx-accent-half);
    }

    /* Both rules fully global so hover (later) cleanly wins over base */
    :global(.matrix-theme .matrix-chip) {
        background-color: var(--mx-accent-dim) !important;
        color: var(--mx-accent) !important;
        border: 1px solid var(--mx-accent) !important;
    }

    :global(.matrix-theme .matrix-chip:hover) {
        background-color: #0f0 !important;
        color: #000 !important;
        border-color: #0f0 !important;
        box-shadow: none !important;
        text-shadow: none !important;
    }

    /* "Discover more" / generic ghost button in matrix */
    :global(.matrix-theme .matrix-button) {
        color: var(--mx-accent) !important;
        border: 1px solid var(--mx-accent) !important;
        outline: none !important;
        background-color: transparent !important;
        box-shadow: none !important;
    }

    :global(.matrix-theme .matrix-button:hover) {
        background-color: var(--mx-accent-dim) !important;
        box-shadow: 0 0 10px var(--mx-accent-half) !important;
    }

    :global(:not(.matrix-theme)) .section-title {
        color: rgb(var(--color-primary-600));
        text-shadow: 0 0 16px rgba(var(--color-primary-500), 0.35),
                     0 0 32px rgba(var(--color-primary-500), 0.18);
    }
</style>
