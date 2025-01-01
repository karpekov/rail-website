<script lang="ts">
    import { fun } from '$lib/utils/dataLoader';
    const activities = fun?.activities || [];
</script>

<section id="fun">
    <h2 class="h2">Fun</h2>

    <!-- Horizontally Scrollable Cards -->
    <div class="overflow-x-auto pb-4">
        <div class="flex space-x-4 px-2">
            {#each activities as activity}
                <div class="flex-none w-72">
                    <div class="card p-4 h-full">
                        <div class="aspect-video mb-4 rounded-lg overflow-hidden">
                            <img
                                src={activity.image}
                                alt={activity.title}
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <h3 class="h3 mb-2">{activity.title}</h3>
                        <p class="text-xs text-surface-600-300-token mb-3">{activity.date}</p>
                        <p class="text-sm mb-4">{activity.fullDescription}</p>
                        <div class="flex flex-wrap gap-2">
                            {#each activity.tags as tag}
                                <span class="chip variant-filled-primary text-xs">{tag}</span>
                            {/each}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    /* Hide scrollbar but keep functionality */
    .overflow-x-auto {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .overflow-x-auto::-webkit-scrollbar {
        display: none;
    }
</style>