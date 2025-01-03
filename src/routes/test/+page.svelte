<script>
    // import Matrix from '$lib/components/Matrix.svelte';
    import JoinUs from '$lib/components/JoinUs.svelte';
    import NewCircuit from '$lib/components/NewCircuit.svelte';

    let showMatrix = false;
</script>


<!-- Any content you want to overlay on the matrix -->
<div class="p-8">
    <div class="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div class="h-[600px] w-full">
            <NewCircuit {showMatrix} />
        </div>
        <!-- <JoinUs /> -->
    </div>
</div>
