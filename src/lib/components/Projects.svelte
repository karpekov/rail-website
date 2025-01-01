<script>
    import { projects } from '$lib/utils/dataLoader';

    const current = projects?.current_projects || [];
    const completed = projects?.completed_projects || [];
</script>

<section id="projects">
    <h2 class="h2">Projects</h2>

    <div class="space-y-12">
        <!-- Current Projects -->
        {#if current.length > 0}
        <div class="space-y-6">
            <h3 class="h3">Current Projects</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {#each current as project}
                    <div class="flex flex-col h-full bg-surface-100-800-token rounded-lg overflow-hidden">
                        <div class="aspect-video">
                            <img src={project.image} alt="" class="w-full h-full object-cover" />
                        </div>
                        <div class="p-4 space-y-3 flex-grow">
                            <h4 class="h4">{project.title}</h4>
                            <p class="text-sm">{project.description}</p>
                            <div class="text-sm space-y-1 mt-auto pt-4">
                                <p class="font-semibold">Publication: {project.publication}</p>
                                <p>Team: {project.team.join(', ')}</p>
                                <p>Funding: {project.funding}</p>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        {/if}

    </div>
</section>