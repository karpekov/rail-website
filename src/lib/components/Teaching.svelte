<script lang="ts">
    import { teaching } from '$lib/utils/dataLoader';
    import { slide } from 'svelte/transition';

    export let showMatrix = false;

    let showPastCourses = false;

    // Filter courses by status
    const upcomingCourses = teaching.filter(course => course.status === 'upcoming');
    const currentCourses = teaching.filter(course => course.status === 'current');
    const pastCourses = teaching.filter(course => course.status === 'past');

    function togglePastCourses() {
        showPastCourses = !showPastCourses;
    }
</script>

<section id="teaching">
    <h2 class="h2 mb-6 font-orbitron section-title">Teaching</h2>

    <!-- Current and Upcoming Courses Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <!-- Current Courses -->
        {#if currentCourses.length > 0}
            <div>
                <h3 class="font-thin text-lg mb-4">Current Courses</h3>
                <div class="space-y-4">
                    {#each currentCourses as course}
                        <div class="p-4 rounded-lg bg-surface-100-800-token border-l-4 border-primary-500" class:matrix-card={showMatrix}>
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="font-bold">{course.name}</h4>
                                    {#if course.semester}
                                        <p class="text-sm opacity-75">{course.semester}</p>
                                    {/if}
                                    <p class="mt-2">{course.description}</p>
                                </div>
                                {#if course.website}
                                    <a
                                        href={course.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-primary-500 hover:text-primary-600 transition-colors"
                                        title="Course Website"
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
                </div>
            </div>
        {/if}

        <!-- Upcoming Courses -->
        {#if upcomingCourses.length > 0}
            <div>
                <h3 class="text-lg font-thin mb-4">Upcoming Courses</h3>
                <div class="space-y-4">
                    {#each upcomingCourses as course}
                        <div class="p-4 rounded-lg bg-surface-100-800-token border-l-4 border-primary-500" class:matrix-card={showMatrix}>
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="font-bold">{course.name}</h4>
                                    {#if course.semester}
                                        <p class="text-sm opacity-75">{course.semester}</p>
                                    {/if}
                                    <p class="mt-2">{course.description}</p>
                                </div>
                                {#if course.website}
                                    <a
                                        href={course.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-primary-500 hover:text-primary-600 transition-colors"
                                        title="Course Website"
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
                </div>
            </div>
        {/if}
    </div>

    <!-- Past Courses -->
    {#if pastCourses.length > 0}
        <div>
            <button
                class="flex items-center gap-2 text-lg font-thin mb-4"
                class:hover:text-primary-500={!showMatrix}
                class:hover:text-[#0F0]={showMatrix}
                on:click={togglePastCourses}
            >
                <svg
                    class="w-4 h-4 transition-transform"
                    class:rotate-90={showPastCourses}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                >
                    <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Past Courses
            </button>

            {#if showPastCourses}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4" transition:slide>
                    {#each pastCourses as course}
                        <div class="p-4 rounded-lg bg-surface-100-800-token border-l-4 border-primary-500" class:matrix-card={showMatrix}>
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="font-bold">{course.name}</h4>
                                    {#if course.semester}
                                        <p class="text-sm opacity-75">{course.semester}</p>
                                    {/if}
                                    <p class="mt-2">{course.description}</p>
                                </div>
                                {#if course.website}
                                    <a
                                        href={course.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-primary-500 hover:text-primary-600 transition-colors"
                                        title="Course Website"
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
                </div>
            {/if}
        </div>
    {/if}
</section>

<style>
    /* Matrix theme card styles */
    .matrix-card {
        border-color: #0F0 !important;
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
        transition: all 0.3s ease;
    }

    .matrix-card:hover {
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
        border-color: #0F0 !important;
    }

	:global(:not(.matrix-theme)) .section-title {
			text-shadow: 0 0 10px rgba(255, 255, 255, 0.5),
									0 0 20px rgba(255, 255, 255, 0.3);
	}
</style>