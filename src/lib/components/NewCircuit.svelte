<script lang="ts">
    export let showMatrix = false;

    // Configuration
    const numLines = 100;
    const maxFanOffset = 100;

    // Generate lines data
    function generateLines(width: number, height: number) {
        const lines = [];
        const startX = 0;
        const endX = width * 0.8;
        const spacingY = height / (numLines + 1);

        for (let i = 1; i <= numLines; i++) {
            const startY = spacingY * i;
            const fanOffset = ((i - (numLines / 2)) / (numLines / 2)) * maxFanOffset;
            const endY = startY + fanOffset;

            lines.push({
                startX,
                startY,
                endX,
                endY
            });
        }

        return lines;
    }

    // We'll use 800x600 as our SVG viewBox dimensions
    const width = 800;
    const height = 600;
    const lines = generateLines(width, height);
</script>

<div class="w-full h-full">
    <svg width="100%" height="100%" viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid slice">
        {#each lines as line}
            <!-- Line -->
            <path
                d="M{line.startX} {line.startY}
                   H{line.endX * 0.6}
                   L{line.endX} {line.endY}"
                class="circuit-line"
                fill="none"
                stroke-width="1.5"
            />

            <!-- Endpoint circle -->
            <circle
                cx={line.endX}
                cy={line.endY}
                r="3"
                class="circuit-node"
            />
        {/each}
    </svg>
</div>

<style>
    .circuit-line {
        stroke: rgb(var(--color-primary-500) / 0.3);
        stroke-linecap: square;
        stroke-linejoin: miter;
    }

    .circuit-node {
        fill: rgb(var(--color-primary-500) / 0.5);
    }

    :global(.matrix-theme) .circuit-line {
        stroke: rgb(0 255 0 / 0.3);
    }

    :global(.matrix-theme) .circuit-node {
        fill: rgb(0 255 0 / 0.5);
    }
</style>