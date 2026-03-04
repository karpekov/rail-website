<script lang="ts">
    import { onMount } from 'svelte';

    // Circumradius (px). Smaller = denser technical look.
    const R = 30;
    const COL_W = R * Math.sqrt(3);  // horizontal centre-to-centre (same row)
    const ROW_H = R * 1.5;           // vertical centre-to-centre (adjacent rows)
    const TICK_MS     = 180;  // ms between walk steps
    const DECAY       = 0.05; // opacity lost per tick
    const NUM_WALKERS = 5;
    const MIN_STEPS   = 5;    // shortest random walk (steps)
    const MAX_STEPS   = 40;   // longest random walk (steps)

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let vw = 0;
    let vh = 0;
    let cols = 0;
    let rows = 0;

    // Glow map — plain Map (no Svelte reactivity), keyed by "c-r"
    const glowMap = new Map<string, number>();

    interface Walker { c: number; r: number; steps: number; max: number }
    let walkers: Walker[] = [];

    // ── Geometry ────────────────────────────────────────────────────────────
    function hexCenter(c: number, r: number) {
        return {
            x: c * COL_W + (r % 2 === 0 ? 0 : COL_W / 2),
            y: r * ROW_H,
        };
    }

    function drawHexPath(cx: number, cy: number) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const θ = Math.PI / 6 + (Math.PI / 3) * i;
            const x = cx + R * Math.cos(θ);
            const y = cy + R * Math.sin(θ);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
    }

    function neighbours(c: number, r: number): Array<{c: number; r: number}> {
        const even = r % 2 === 0;
        const dc = even ? -1 : 0;
        return [
            { c: c - 1, r },
            { c: c + 1, r },
            { c: c + dc,     r: r - 1 },
            { c: c + dc + 1, r: r - 1 },
            { c: c + dc,     r: r + 1 },
            { c: c + dc + 1, r: r + 1 },
        ].filter(n => n.c >= 0 && n.c < cols && n.r >= 0 && n.r < rows);
    }

    function spawnWalker() {
        walkers.push({
            c: Math.floor(Math.random() * cols),
            r: Math.floor(Math.random() * rows),
            steps: 0,
            max: MIN_STEPS + Math.floor(Math.random() * (MAX_STEPS - MIN_STEPS + 1)),
        });
    }

    // ── Animation loop ───────────────────────────────────────────────────────
    let lastTick = 0;
    let rafId: number;

    function render(now: number) {
        rafId = requestAnimationFrame(render);
        if (!ctx) return;

        // ── Logic tick (throttled) ──────────────────────────────────────────
        if (now - lastTick >= TICK_MS) {
            lastTick = now;

            // Decay glow map
            for (const [key, op] of glowMap) {
                const next = op - DECAY;
                next > 0 ? glowMap.set(key, next) : glowMap.delete(key);
            }

            // Advance walkers
            const next: Walker[] = [];
            for (const w of walkers) {
                if (w.steps >= w.max) continue;
                const nb = neighbours(w.c, w.r);
                if (!nb.length) continue;
                const pick = nb[Math.floor(Math.random() * nb.length)];
                glowMap.set(`${pick.c}-${pick.r}`, 1.0);
                next.push({ ...w, c: pick.c, r: pick.r, steps: w.steps + 1 });
            }
            walkers = next;
            while (walkers.length < NUM_WALKERS) spawnWalker();
        }

        // ── Draw ────────────────────────────────────────────────────────────
        ctx.clearRect(0, 0, vw, vh);

        // Soft amber radial glow (logo area)
        const g = ctx.createRadialGradient(vw * 0.28, vh * 0.48, 0, vw * 0.28, vh * 0.48, vw * 0.45);
        g.addColorStop(0,   'rgba(232,168,0,0.07)');
        g.addColorStop(0.6, 'rgba(232,168,0,0.02)');
        g.addColorStop(1,   'rgba(232,168,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, vw, vh);

        // Hex grid
        ctx.lineWidth = 0.6;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const { x, y } = hexCenter(c, r);
                const op = glowMap.get(`${c}-${r}`) ?? 0;

                drawHexPath(x, y);

                if (op > 0) {
                    ctx.fillStyle   = `rgba(232,168,0,${+(op * 0.12).toFixed(3)})`;
                    ctx.fill();
                    ctx.strokeStyle = `rgba(232,168,0,${+Math.min(0.38, op * 0.3 + 0.1).toFixed(3)})`;
                } else {
                    ctx.strokeStyle = 'rgba(232,168,0,0.11)';
                }
                ctx.stroke();

                // Centre dot
                ctx.beginPath();
                ctx.arc(x, y, op > 0 ? 2.0 : 1.0, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(232,168,0,${+(op > 0 ? op * 0.55 : 0.12).toFixed(3)})`;
                ctx.fill();
            }
        }
    }

    // ── Sizing ───────────────────────────────────────────────────────────────
    function resize() {
        if (!canvas) return;
        vw    = canvas.offsetWidth;
        vh    = canvas.offsetHeight;
        // Match physical pixels for crisp lines on HiDPI
        const dpr = window.devicePixelRatio || 1;
        canvas.width  = vw * dpr;
        canvas.height = vh * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cols = Math.ceil(vw / COL_W) + 3;
        rows = Math.ceil(vh / ROW_H) + 3;
    }

    onMount(() => {
        ctx = canvas.getContext('2d')!;
        resize();
        for (let i = 0; i < NUM_WALKERS; i++) spawnWalker();
        rafId = requestAnimationFrame(render);

        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        return () => {
            cancelAnimationFrame(rafId);
            ro.disconnect();
        };
    });
</script>

<!-- aria-hidden: pure decoration -->
<canvas bind:this={canvas} class="hex-canvas" aria-hidden="true"></canvas>

<style>
    .hex-canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        display: block;
    }
</style>
