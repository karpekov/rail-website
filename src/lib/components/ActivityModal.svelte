<script lang="ts">
    import type { ModalComponent } from '@skeletonlabs/skeleton';

    export let parent: ModalComponent;
    export let activity: any;

    $: {
        console.log('Activity in modal:', activity);
    }
</script>

{#if activity}
    <div class="card p-4 w-full max-w-lg mx-auto">
        <div class="w-full h-48 sm:h-40 rounded-lg overflow-hidden mb-4">
            <img
                src={activity.image}
                alt={activity.title}
                class="w-full h-full object-cover"
            />
        </div>

        <div class="space-y-4">
            <h3 class="h3">{activity.title}</h3>
            <p class="text-sm">{activity.fullDescription}</p>

            <div class="flex flex-wrap gap-2 text-sm">
                <span class="font-semibold">Date:</span>
                <span>{activity.date}</span>
            </div>
        </div>
    </div>
{:else}
    <div class="p-4">
        <p>No activity data available</p>
    </div>
{/if}