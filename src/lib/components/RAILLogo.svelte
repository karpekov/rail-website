<script>
    import RAILLogo from '$lib/../../static/assets/RAIL.svg?raw';
    import { showMatrix } from '$lib/stores/theme';

    function modifySvg(svgContent) {
        return svgContent
            .replace('<svg', '<svg class="animated-svg h-full w-full"')
            .replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
    }

    const modifiedRAILSvg = modifySvg(RAILLogo);
</script>

<div class="flex items-center justify-center h-full">
    <div class="w-80 h-28 ml-8">
        <div class="w-full h-full flex items-center justify-center" class:text-primary-500={!$showMatrix} class:matrix-logo={$showMatrix}>
            {@html modifiedRAILSvg}
        </div>
    </div>
</div>

<style>
    .matrix-logo {
        color: var(--mx-accent);
    }

    :global(.matrix-theme) .matrix-logo :global(.animated-svg) {
        filter: drop-shadow(0 0 10px var(--mx-accent));
    }

    :global(.animated-svg) {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        animation: fuse 8s linear 1 forwards;
    }

    @keyframes fuse {
        to {
            stroke-dashoffset: 0;
        }
    }

    :global(.matrix-theme) :global(.animated-svg) {
        animation: fuse-matrix 8s linear 1 forwards;
    }

    @keyframes fuse-matrix {
        from {
            stroke-dashoffset: 1000;
            filter: drop-shadow(0 0 2px currentColor);
        }
        to {
            stroke-dashoffset: 0;
            filter: drop-shadow(0 0 10px currentColor);
        }
    }
</style>
