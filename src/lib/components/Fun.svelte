<script lang="ts">
    import { fun } from '$lib/utils/dataLoader';
    const activities = fun?.activities || [];
</script>

<section id="fun">
    <h2 class="h2 font-orbitron section-title">Fun</h2>

    <!-- Horizontally Scrollable Cards -->
    <div class="overflow-x-auto pb-8 pt-2">
        <div class="flex space-x-4 px-2">
            {#each activities as activity}
                <div class="flex-none w-72 pt-2">
                    <div class="card p-4 h-full fun-card hover:bg-surface-200-700-token">
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

    .fun-card {
        transition: all 0.3s ease;
    }

    :global(:not(.matrix-theme)) .fun-card:hover {
        box-shadow: 0 0 20px rgba(var(--color-primary-500), 0.3);
        transform: translateY(-2px);
    }

    :global(.matrix-theme) .fun-card {
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
    }

    :global(.matrix-theme) .fun-card:hover {
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
        transform: translateY(-2px);
    }

    :global(.matrix-theme) .chip.variant-filled-primary {
        background-color: rgba(0, 255, 0, 0.2) !important;
        color: #0F0 !important;
    }

    :global(.matrix-theme) .chip.variant-filled-primary:hover {
        background-color: rgba(0, 255, 0, 0.3) !important;
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
    }

	:global(:not(.matrix-theme)) .section-title {
			text-shadow: 0 0 10px rgba(255, 255, 255, 0.5),
									0 0 20px rgba(255, 255, 255, 0.3);
	}
</style>