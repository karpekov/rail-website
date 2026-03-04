<script lang="ts">
    import { teaching } from '$lib/utils/dataLoader';
    import { slide } from 'svelte/transition';
    import { showMatrix } from '$lib/stores/theme';

    let showPastCourses = false;

    const upcomingCourses = teaching.filter(course => course.status === 'upcoming');
    const currentCourses = teaching.filter(course => course.status === 'current');
    const pastCourses = teaching.filter(course => course.status === 'past');

    function togglePastCourses() {
        showPastCourses = !showPastCourses;
    }
</script>

<section id="teaching">
    <h2 class="h2 mb-6 font-orbitron section-title">Teaching</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {#if currentCourses.length > 0}
            <div>
                <h3 class="font-thin text-lg mb-4">Current Courses</h3>
                <div class="space-y-4">
                    {#each currentCourses as course}
                        <svelte:element
                            this={course.website ? 'a' : 'div'}
                            href={course.website || undefined}
                            target={course.website ? '_blank' : undefined}
                            rel={course.website ? 'noopener noreferrer' : undefined}
                            class="relative block p-4 rounded-lg bg-surface-100-800-token border-l-4 border-primary-500 course-card"
                            class:matrix-card={$showMatrix}
                            class:has-link={!!course.website}
                        >
                            {#if course.website}
                                <svg class="course-link-icon absolute top-3 right-3 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            {/if}
                            <h4 class="font-bold pr-6">{course.name}</h4>
                            {#if course.semester}
                                <p class="text-sm opacity-75">{course.semester}</p>
                            {/if}
                            <p class="mt-2">{course.description}</p>
                        </svelte:element>
                    {/each}
                </div>
            </div>
        {/if}

        {#if upcomingCourses.length > 0}
            <div>
                <h3 class="text-lg font-thin mb-4">Upcoming Courses</h3>
                <div class="space-y-4">
                    {#each upcomingCourses as course}
                        <svelte:element
                            this={course.website ? 'a' : 'div'}
                            href={course.website || undefined}
                            target={course.website ? '_blank' : undefined}
                            rel={course.website ? 'noopener noreferrer' : undefined}
                            class="relative block p-4 rounded-lg bg-surface-100-800-token border-l-4 border-primary-500 course-card"
                            class:matrix-card={$showMatrix}
                            class:has-link={!!course.website}
                        >
                            {#if course.website}
                                <svg class="course-link-icon absolute top-3 right-3 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            {/if}
                            <h4 class="font-bold pr-6">{course.name}</h4>
                            {#if course.semester}
                                <p class="text-sm opacity-75">{course.semester}</p>
                            {/if}
                            <p class="mt-2">{course.description}</p>
                        </svelte:element>
                    {/each}
                </div>
            </div>
        {/if}
    </div>

    {#if pastCourses.length > 0}
        <div>
            <button
                class="flex items-center gap-2 text-lg font-thin mb-4 past-toggle"
                on:click={togglePastCourses}
            >
                <svg
                    class="w-4 h-4 transition-transform"
                    class:rotate-90={showPastCourses}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                >
                    <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Past Courses
            </button>

            {#if showPastCourses}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4" transition:slide>
                    {#each pastCourses as course}
                        <svelte:element
                            this={course.website ? 'a' : 'div'}
                            href={course.website || undefined}
                            target={course.website ? '_blank' : undefined}
                            rel={course.website ? 'noopener noreferrer' : undefined}
                            class="relative block p-4 rounded-lg bg-surface-100-800-token border-l-4 border-primary-500 course-card"
                            class:matrix-card={$showMatrix}
                            class:has-link={!!course.website}
                        >
                            {#if course.website}
                                <svg class="course-link-icon absolute top-3 right-3 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            {/if}
                            <h4 class="font-bold pr-6">{course.name}</h4>
                            {#if course.semester}
                                <p class="text-sm opacity-75">{course.semester}</p>
                            {/if}
                            <p class="mt-2">{course.description}</p>
                        </svelte:element>
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
</section>

<style>
    .course-card {
        transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                    box-shadow 0.4s ease,
                    background-color 0.2s ease;
        text-decoration: none;
        color: inherit;
        display: block;
    }

    .course-card.has-link {
        cursor: pointer;
    }

    /* Link icon: faint by default, amber + full opacity on hover */
    .course-link-icon {
        opacity: 0.2;
        color: rgb(var(--color-surface-600));
        transition: opacity 0.2s ease, color 0.2s ease;
    }

    :global(:not(.matrix-theme)) .course-card.has-link:hover {
        background-color: rgb(var(--color-surface-200));
        box-shadow: 0 4px 18px rgba(var(--color-primary-500), 0.15);
        transform: translateX(4px);
    }

    :global(:not(.matrix-theme)) .course-card.has-link:hover .course-link-icon {
        opacity: 1;
        color: rgb(var(--color-primary-500));
    }

    .matrix-card {
        border-color: var(--mx-accent) !important;
        box-shadow: 0 0 10px var(--mx-accent-mid);
    }

    .matrix-card.has-link:hover {
        box-shadow: 0 0 20px var(--mx-accent-half);
        transform: translateX(4px);
    }

    .matrix-card.has-link:hover .course-link-icon {
        opacity: 1;
        color: var(--mx-accent);
    }

    /* Fully-global override to beat the higher-specificity :not(.matrix-theme) rule */
    :global(.matrix-theme .course-card.has-link:hover .course-link-icon) {
        opacity: 1 !important;
        color: var(--mx-accent) !important;
    }

    :global(.matrix-theme) .course-link {
        color: var(--mx-accent) !important;
    }

    :global(.matrix-theme) .course-link:hover {
        color: var(--mx-accent) !important;
        filter: drop-shadow(0 0 4px var(--mx-accent));
    }

    :global(.matrix-theme) .past-toggle:hover {
        color: var(--mx-accent);
    }

    :global(:not(.matrix-theme)) .section-title {
        color: rgb(var(--color-primary-600));
        text-shadow: 0 0 16px rgba(var(--color-primary-500), 0.35),
                     0 0 32px rgba(var(--color-primary-500), 0.18);
    }
</style>
