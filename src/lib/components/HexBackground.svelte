<script lang="ts">
    import { onMount } from 'svelte';

    // Flat-top hexagon circumradius (px)
    const R = 46;
    // Derived geometry
    const COL_W  = R * Math.sqrt(3);      // horizontal distance between hex centers in same row
    const ROW_H  = R * 1.5;              // vertical distance between hex centers in adjacent rows

    let mounted = false;
    let vw = 0;
    let vh = 0;

    // Set of hex ids (col-row) currently in the "pulse" state
    let pulsing: Set<string> = new Set();

    $: cols = mounted ? Math.ceil(vw / COL_W) + 3 : 0;
    $: rows = mounted ? Math.ceil(vh / ROW_H) + 3 : 0;

    /** Pixel centre of a flat-top hex at grid position (c, r) */
    function hexCenter(c: number, r: number): { x: number; y: number } {
        // Even rows offset by half a column width
        const x = c * COL_W + (r % 2 === 0 ? 0 : COL_W / 2);
        const y = r * ROW_H;
        return { x, y };
    }

    /** SVG points string for a pointy-top hex centred at (cx, cy).
     *  Vertex angles start at 30° so the geometry matches the row-based
     *  offset layout (COL_W = R√3, ROW_H = 1.5R). */
    function hexPoints(cx: number, cy: number): string {
        return Array.from({ length: 6 }, (_, i) => {
            const θ = (Math.PI / 6) + (Math.PI / 3) * i;  // 30°, 90°, 150°…
            return `${cx + R * Math.cos(θ)},${cy + R * Math.sin(θ)}`;
        }).join(' ');
    }

    function refreshPulsing() {
        const ids: string[] = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                ids.push(`${c}-${r}`);
            }
        }
        // ~6 % of hexes pulse at any moment
        const n = Math.max(1, Math.floor(ids.length * 0.06));
        const shuffled = ids.slice().sort(() => Math.random() - 0.5).slice(0, n);
        pulsing = new Set(shuffled);
    }

    onMount(() => {
        mounted = true;
        vw = window.innerWidth;
        vh = window.innerHeight;
        refreshPulsing();

        const interval = setInterval(refreshPulsing, 3200);
        const onResize = () => { vw = window.innerWidth; vh = window.innerHeight; };
        window.addEventListener('resize', onResize);
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', onResize);
        };
    });
</script>

<!-- aria-hidden: pure decoration, invisible to screen readers -->
<div class="hex-wrap" aria-hidden="true">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <!-- Soft amber radial glow centred on the left-third of the hero (logo area) -->
            <radialGradient id="heroAmberGlow" cx="28%" cy="48%" r="45%" gradientUnits="objectBoundingBox">
                <stop offset="0%"   stop-color="#E8A800" stop-opacity="0.10" />
                <stop offset="60%"  stop-color="#E8A800" stop-opacity="0.03" />
                <stop offset="100%" stop-color="#E8A800" stop-opacity="0"    />
            </radialGradient>
        </defs>

        <!-- Warm glow layer behind the logo -->
        <rect width="100%" height="100%" fill="url(#heroAmberGlow)" />

        {#if mounted}
            {#each Array(rows) as _, r}
                {#each Array(cols) as _, c}
                    {@const { x, y } = hexCenter(c - 1, r - 1)}
                    {@const id = `${c}-${r}`}
                    {@const active = pulsing.has(id)}

                    <!-- Hex cell -->
                    {#if active}
                        <polygon points={hexPoints(x, y)} stroke="#E8A800" stroke-width="0.8" fill="#E8A800" fill-opacity="0.04">
                            <animate attributeName="fill-opacity"   values="0.04;0.14;0.04" dur="3.2s" repeatCount="indefinite" />
                            <animate attributeName="stroke-opacity" values="0.22;0.55;0.22" dur="3.2s" repeatCount="indefinite" />
                        </polygon>
                        <!-- Bright node dot -->
                        <circle cx={x} cy={y} r="2.5" fill="#E8A800" opacity="0.45">
                            <animate attributeName="r"       values="2.5;5;2.5"     dur="3.2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.45;0.9;0.45" dur="3.2s" repeatCount="indefinite" />
                        </circle>
                    {:else}
                        <polygon points={hexPoints(x, y)} fill="none" stroke="#E8A800" stroke-width="0.8" stroke-opacity="0.18" />
                        <circle cx={x} cy={y} r="1.8" fill="#E8A800" opacity="0.20" />
                    {/if}
                {/each}
            {/each}
        {/if}
    </svg>
</div>

<style>
    .hex-wrap {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
    }
</style>
