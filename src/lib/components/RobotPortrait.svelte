<script lang="ts">
    import { onMount, tick } from 'svelte';

    export let photo: string;
    export let gif: string | undefined = undefined;
    export let alt = '';
    export let width = 112;
    export let height = 112;
    export let loading: 'eager' | 'lazy' = 'lazy';

    let gifSrc = '';
    let showGif = false;
    let gifImage: HTMLImageElement | undefined;

    async function startGif() {
        if (!gif || gifSrc) return;
        gifSrc = gif;
        await tick();
        if (gifImage?.complete && gifImage.naturalWidth) showGif = true;
    }

    function reveal() {
        showGif = true;
    }

    onMount(() => {
        if (!gif) return;
        if (document.readyState === 'complete') startGif();
        else window.addEventListener('load', startGif, { once: true });
        return () => window.removeEventListener('load', startGif);
    });
</script>

<!-- PNG shows immediately. The GIF starts downloading after the rest of the page has loaded, then loops. -->
<div class="relative h-full w-full" role="presentation">
    <img
        src={photo}
        {alt}
        class="h-full w-full object-cover"
        class:invisible={showGif}
        {width}
        {height}
        {loading}
    />
    {#if gifSrc}
        <img
            bind:this={gifImage}
            src={gifSrc}
            alt=""
            class="absolute inset-0 h-full w-full object-cover"
            class:invisible={!showGif}
            {width}
            {height}
            on:load={reveal}
        />
    {/if}
</div>
