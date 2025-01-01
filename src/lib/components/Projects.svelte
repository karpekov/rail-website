<script lang="ts">
    import { projects } from '$lib/utils/dataLoader';
    import { scrollable } from '$lib/utils/scroll';
    export let showMatrix = false;

    const INITIAL_SHOW = 8;
    const SHOW_MORE_INCREMENT = 8;
    let visibleCount = INITIAL_SHOW;

    const featuredProjects = [...(projects?.project_list || [])]
        .filter(project => project.featured);

    $: hasMore = visibleCount < featuredProjects.length;

    function showMore() {
        visibleCount = Math.min(visibleCount + SHOW_MORE_INCREMENT, featuredProjects.length);
    }
</script>

<section id="projects">
    <h2 class="h2 font-orbitron section-title">Featured Projects</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {#each featuredProjects.slice(0, visibleCount) as project}
            <div class="flex flex-col h-full bg-surface-100-800-token rounded-lg overflow-hidden project-card max-w-sm mx-auto w-full relative hover:bg-surface-200-700-token">
                <!-- Image container with border -->
                <div class="p-3 pb-0">
                    <div class="rounded-lg overflow-hidden border border-surface-300-600-token">
                        <img src={project.image} alt="" class="w-full h-auto" />
                    </div>
                </div>

                <div class="p-3 space-y-2 flex-grow">
                    <!-- Title and Publication -->
                    <div class="space-y-1">
                        <h4 class="font-medium text-base">{project.short_title || project.full_title}</h4>
                        <span class="publication-chip">{project.venue}</span>
                    </div>

                    <!-- Description -->
                    <p class="text-sm opacity-80">{project.full_title}</p>

                    <!-- Team -->
                    <p class="text-xs">
                        <span class="opacity-60">Team:</span> {project.team.join(', ')}
                    </p>

                    <!-- Links -->
                    <div class="flex gap-2 pt-2 project-links">
                        {#if project.github}
                            <a href={project.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                                </svg>
                            </a>
                        {/if}
                        {#if project.youtube}
                            <a href={project.youtube} target="_blank" rel="noopener noreferrer" title="YouTube">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                </svg>
                            </a>
                        {/if}
                    </div>
                </div>

                {#if project.link}
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View Publication"
                        class="external-link"
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

    .external-link {
        @apply absolute bottom-3 right-3 transition-all duration-200;
    }

    :global(:not(.matrix-theme)) .external-link {
        @apply text-primary-500;
    }

    :global(:not(.matrix-theme)) .external-link:hover {
        @apply text-primary-600 scale-110;
    }

    :global(.matrix-theme) .external-link {
        color: #0F0;
    }

    :global(.matrix-theme) .external-link:hover {
        text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        transform: scale(1.1);
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
</style>