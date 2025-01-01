<script>
    import RAILLogo from '$lib/../../static/assets/RAIL.svg?raw';

    function modifySvg(svgContent) {
        return svgContent
            .replace('<svg', '<svg class="animated-svg h-full w-full"')
            .replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
    }

    const modifiedRAILSvg = modifySvg(RAILLogo);
</script>

<div class="flex items-center justify-center h-full">
    <div class="w-80 h-28 ml-8">
        <div class="w-full h-full text-primary-500 flex items-center justify-center">
            {@html modifiedRAILSvg}
        </div>
    </div>
</div>

<style>
    :global(.animated-svg) {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        animation: fuse 28s linear infinite;
    }

    @keyframes fuse {
        0% {
            stroke-dashoffset: 1000;
            filter: drop-shadow(0 0 2px currentColor);
        }
        28.57% {
            stroke-dashoffset: 0;
            filter: drop-shadow(0 0 10px currentColor);
        }
        100% {
            stroke-dashoffset: 0;
            filter: drop-shadow(0 0 10px currentColor);
        }
    }
</style>

<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">