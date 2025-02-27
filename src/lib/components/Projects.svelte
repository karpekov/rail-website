<script lang="ts">
    import { projects } from '$lib/utils/dataLoader';
    import { scrollable } from '$lib/utils/scroll';
    export let showMatrix = false;

    // Tag colors using Tableau10 scheme
    const tagColors = {
        all: '#666666',  // Gray for "All" filter
        hcai: '#ff7f0e',  // Orange
        robo: '#d62728',  // Red
        multi: '#2ca02c', // Green
        xai: '#1f77b4'    // Dark blue
    };

    const tagLabels = {
        all: 'All Projects',
        hcai: 'Human-Centered AI',
        robo: 'Robotics',
        multi: 'Multi-Agent Systems',
        xai: 'Explainable AI'
    };

    let activeFilter = 'all';
    const INITIAL_SHOW = 9;
    const SHOW_MORE_INCREMENT = 8;
    let visibleCount = INITIAL_SHOW;

    $: filteredProjects = [...(projects?.project_list || [])]
        .filter(project => project.featured)
        .sort((a, b) => b.year - a.year)
        .filter(project => activeFilter === 'all' || project.tags.includes(activeFilter));

    $: hasMore = visibleCount < filteredProjects.length;

    function showMore() {
        visibleCount = Math.min(visibleCount + SHOW_MORE_INCREMENT, filteredProjects.length);
    }

    function setFilter(tag: string) {
        activeFilter = tag;
        visibleCount = INITIAL_SHOW;
    }
</script>

<section id="projects">
    <h2 class="h2 font-orbitron section-title">Featured Projects</h2>

    <!-- Filter Chips -->
    <div class="flex flex-wrap gap-2 mt-4 mb-6">
        <button
            class="px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 filter-chip cursor-pointer"
            class:active={activeFilter === 'all'}
            style="background-color: {showMatrix ?
                   activeFilter === 'all' ? 'rgba(0, 255, 0, 0.2)' : 'transparent' :
                   activeFilter === 'all' ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
                   color: {showMatrix ? '#0F0' : 'rgba(255, 255, 255, 0.9)'};
                   border: {showMatrix ? '1px solid #0F0' : '1px solid rgba(255, 255, 255, 0.3)'};
                   box-shadow: {showMatrix && activeFilter === 'all' ? '0 0 15px rgba(0, 255, 0, 0.5)' : 'none'}"
            on:click={() => setFilter('all')}
        >
            All
        </button>
        {#each Object.entries(tagLabels).filter(([key]) => key !== 'all') as [tag, label]}
            <button
                class="px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 filter-chip cursor-pointer"
                class:active={activeFilter === tag}
                style="background-color: {showMatrix ?
                       activeFilter === tag ? 'rgba(0, 255, 0, 0.2)' : 'transparent' :
                       activeFilter === tag ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
                       color: {showMatrix ? '#0F0' : 'rgba(255, 255, 255, 0.9)'};
                       border: {showMatrix ? '1px solid #0F0' : '1px solid rgba(255, 255, 255, 0.3)'};
                       box-shadow: {showMatrix && activeFilter === tag ? '0 0 15px rgba(0, 255, 0, 0.5)' : 'none'}"
                on:click={() => setFilter(tag)}
            >
                {label}
            </button>
        {/each}
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {#each filteredProjects.slice(0, visibleCount) as project}
            <div
                class="flex flex-col h-full bg-surface-100-800-token rounded-lg overflow-hidden project-card max-w-sm mx-auto w-full relative hover:bg-surface-200-700-token group"
            >
                <!-- Image container with border -->
                <div class="p-3 pb-0">
                    <div class="rounded-lg overflow-hidden border border-surface-300-600-token">
                        <img src={project.image} alt="" class="w-full h-auto" />
                    </div>
                </div>

                <div class="p-3 space-y-2 flex-grow">
                    <!-- Title and Publication -->
                    <div class="space-y-2">
                        <h4 class="font-medium text-base">{project.short_title || project.full_title}</h4>
                        <!-- Venue chip -->
                        <div class="publication-chip">
                            {project.venue} '{(project.year % 100).toString().padStart(2, '0')}
                        </div>
                        <!-- Tags -->
                        {#if project.tags && project.tags.length > 0}
                            <div class="flex flex-wrap gap-1.5 mt-1 mb-2">

                                {#each project.tags as tag}
                                    <span
                                        class="px-2 py-0.5 rounded-full text-xs font-medium"
                                        style="background-color: {showMatrix ? 'transparent' :
                                               tag === activeFilter ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.15)'};
                                               color: {showMatrix ? '#0F0' :
                                               tag === activeFilter ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
                                               border: {showMatrix ? '1px solid #0F0' : 'none'}"
                                        title={tagLabels[tag]}
                                    >
                                        {tag.toUpperCase()}
                                    </span>
                                {/each}
                            </div>
                        {/if}
                    </div>

                    <!-- Description -->
                    <p class="text-sm opacity-80">{project.full_title}</p>

                    <!-- Team -->
                    <p class="text-xs">
                        <span class="opacity-60">Team:</span> {project.team.join(', ')}
                    </p>

                    <!-- Links -->
                    <div class="flex flex-wrap gap-2 pt-2 items-center project-links">
                        {#if project.website}
                            <a
                                href={project.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="chip variant-soft-primary hover:variant-filled-primary transition-all flex-none"
                                class:matrix-chip={showMatrix}
                                title="Project Website"
                            >
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                </svg>
                                <span class="ml-1 text-sm">Home</span>
                            </a>
                        {/if}
                        {#if project.pdf}
                            <a
                                href={project.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="chip variant-soft-primary hover:variant-filled-primary transition-all"
                                class:matrix-chip={showMatrix}
                                title="View Paper"
                            >
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
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="chip variant-soft-primary hover:variant-filled-primary transition-all"
                                class:matrix-chip={showMatrix}
                                title="View Code"
                            >
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                                </svg>
                                <span class="ml-1 text-sm">Code</span>
                            </a>
                        {/if}
                        {#if project.video}
                            <a
                                href={project.video}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="chip variant-soft-primary hover:variant-filled-primary transition-all"
                                class:matrix-chip={showMatrix}
                                title="Watch Demo"
                            >
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

    {#if hasMore}
        <div class="flex justify-center mt-8">
            <button
                class="btn variant-ghost-primary"
                class:matrix-button={showMatrix}
                on:click={showMore}
            >
                Discover More Projects
            </button>
        </div>
    {/if}
</section>

<style>
    /* Matrix theme card styles */
    .project-card {
        transition: all 0.3s ease;
    }

    :global(:not(.matrix-theme)) .project-card:hover {
        box-shadow: 0 0 20px rgba(var(--color-primary-500), 0.3);
        transform: translateY(-2px);
    }

    :global(.matrix-theme) .project-card {
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
    }

    :global(.matrix-theme) .project-card:hover {
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
        transform: translateY(-2px);
    }

    .publication-chip {
        @apply inline-flex px-2 py-0.5 text-xs rounded-full border transition-colors duration-200;
    }

    :global(:not(.matrix-theme)) .publication-chip {
        @apply text-primary-500 border-primary-500;
    }

    :global(.matrix-theme) .publication-chip {
        color: #0F0;
        border-color: #0F0;
    }

    .project-links a {
        @apply transition-colors duration-200;
    }

    :global(:not(.matrix-theme)) .project-links a:hover {
        @apply text-primary-500;
    }

    :global(.matrix-theme) .project-links a:hover {
        color: #0F0;
        text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
    }

    .matrix-button {
        color: #0F0 !important;
        border-color: #0F0 !important;
    }

    .matrix-button:hover {
        background-color: rgba(0, 255, 0, 0.1) !important;
        box-shadow: 0 0 10px #0F0;
    }

	:global(:not(.matrix-theme)) .section-title {
			text-shadow: 0 0 10px rgba(255, 255, 255, 0.5),
									0 0 20px rgba(255, 255, 255, 0.3);
	}

    .matrix-chip {
        background-color: rgba(0, 255, 0, 0.1) !important;
        color: #0F0 !important;
        border: 1px solid #0F0 !important;
    }

    .matrix-chip:hover {
        background-color: rgba(0, 255, 0, 0.2) !important;
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
    }

    .filter-chip {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    :global(:not(.matrix-theme)) .filter-chip:hover {
        background-color: rgba(0, 0, 0, 0.03);
        box-shadow: 0 0 12px rgb(99 154 255 / 0.3);
    }

    :global(.matrix-theme) .filter-chip:hover {
        background-color: rgba(0, 255, 0, 0.1);
        box-shadow: 0 0 12px rgba(0, 255, 0, 0.5);
    }
</style>