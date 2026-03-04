<script lang="ts">
    import { showMatrix } from '$lib/stores/theme';
    import { onMount } from 'svelte';

    function toggle() {
        $showMatrix = !$showMatrix;
    }

    let showGlow = false;
    let isHovered = false;

    const GLOW_DURATION_MS  =  4000;   // how long one glow lasts
    const INITIAL_DELAY_MS  = 30000;   // first glow 30 s after load
    const REPEAT_DELAY_MS   = 180000;  // then every 3 minutes

    onMount(() => {
        let glowOffTimer: ReturnType<typeof setTimeout>;
        let repeatInterval: ReturnType<typeof setInterval>;

        function triggerGlow() {
            showGlow = true;
            clearTimeout(glowOffTimer);
            glowOffTimer = setTimeout(() => { showGlow = false; }, GLOW_DURATION_MS);
        }

        const initialTimer = setTimeout(() => {
            triggerGlow();
            repeatInterval = setInterval(triggerGlow, REPEAT_DELAY_MS);
        }, INITIAL_DELAY_MS);

        return () => {
            clearTimeout(initialTimer);
            clearTimeout(glowOffTimer);
            clearInterval(repeatInterval);
        };
    });
</script>

<button
    class="toggle-btn"
    on:click={toggle}
    on:mouseenter={() => isHovered = true}
    on:mouseleave={() => isHovered = false}
    title={$showMatrix ? 'Switch to Light Mode' : 'Switch to Matrix Mode'}
    aria-label="Toggle theme"
>
    <div class="pill-wrap" class:matrix={$showMatrix} class:glowing={showGlow && !$showMatrix}>
        {#if !$showMatrix && (showGlow || isHovered)}
            <div class="fuse-bloom" class:hover-mode={isHovered && !showGlow} aria-hidden="true"></div>
            <div class="fuse-glow"  class:hover-mode={isHovered && !showGlow} aria-hidden="true"></div>
            <div class="fuse-dot"   class:hover-mode={isHovered && !showGlow} aria-hidden="true"></div>
        {/if}
        <div class="pill">
            <div class="knob" class:at-end={$showMatrix}></div>
        </div>
    </div>
</button>

<style>
    /* ── Button shell ─────────────────────────────────────────────────────── */
    .toggle-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s ease;
    }
    .toggle-btn:hover { background: rgba(0,255,0,.07); }

    /* hover-mode: fully visible, orbit only (no fade in/out animation) */
    .fuse-bloom.hover-mode,
    .fuse-glow.hover-mode {
        opacity: 1;
        animation: fuse-spin 2.4s linear infinite;
    }
    .fuse-dot.hover-mode {
        opacity: 1;
        animation: dot-orbit 2.4s linear infinite, dot-glow-pulse 1.8s ease-in-out infinite;
    }

    /* Speed up the orbit on hover */
    .toggle-btn:hover .fuse-bloom.hover-mode,
    .toggle-btn:hover .fuse-glow.hover-mode { animation-duration: 1.3s; }
    .toggle-btn:hover .fuse-dot.hover-mode   { animation-duration: 1.3s, 1.8s; }

    /* Speed up orbit during timed glow on hover; keep glow-appear duration */
    .toggle-btn:hover .fuse-bloom:not(.hover-mode) { animation-duration: 1.3s, 4s; }
    .toggle-btn:hover .fuse-glow:not(.hover-mode)  { animation-duration: 1.3s, 4s; }
    .toggle-btn:hover .fuse-dot:not(.hover-mode)   { animation-duration: 1.3s, 4s, 1.8s; }

    /* ── Pill wrapper ─────────────────────────────────────────────────────── */
    .pill-wrap {
        position: relative;
        width: 52px;
        height: 28px;
    }

    /* ── One-shot glow keyframes (4 s) ───────────────────────────────────── */

    /* Opacity envelope shared by all three fuse layers */
    @keyframes glow-appear {
        0%         { opacity: 0; }
        10%        { opacity: 1; }   /* 0.4 s ramp-up  */
        85%        { opacity: 1; }   /* hold until 3.4 s */
        100%       { opacity: 0; }   /* 0.6 s fade-out */
    }

    /* Pill flashes green then returns to gray */
    @keyframes pill-once {
        0%, 12% {
            background:   rgb(203,213,225);
            border-color: rgb(148,163,184);
            box-shadow:   0 1px 2px rgba(0,0,0,.14);
        }
        35%, 65% {
            background:   #000;
            border-color: rgba(0,255,0,.75);
            box-shadow:   0 0 0 1px rgba(0,255,0,.3), inset 0 0 20px rgba(0,255,0,.25);
        }
        88%, 100% {
            background:   rgb(203,213,225);
            border-color: rgb(148,163,184);
            box-shadow:   0 1px 2px rgba(0,0,0,.14);
        }
    }

    /* Knob flashes green then returns to white */
    @keyframes knob-once {
        0%, 12% {
            background: #fff;
            box-shadow: 0 1px 4px rgba(0,0,0,.3),
                        0 0 0px transparent,
                        0 0 0px transparent,
                        0 0 0px transparent;
        }
        35%, 65% {
            background: #00ff00;
            box-shadow: 0 0 4px #fff,
                        0 0 12px #0f0,
                        0 0 28px rgba(0,255,0,.85),
                        0 0 52px rgba(0,255,0,.45);
        }
        88%, 100% {
            background: #fff;
            box-shadow: 0 1px 4px rgba(0,0,0,.3),
                        0 0 0px transparent,
                        0 0 0px transparent,
                        0 0 0px transparent;
        }
    }

    /* ── Fuse layers (only rendered during glow) ─────────────────────────── */

    .fuse-bloom {
        position: absolute;
        inset: -10px;
        border-radius: 24px;
        pointer-events: none;
        background: conic-gradient(
            from 0deg,
            transparent        0deg,
            transparent        265deg,
            rgba(0,180,0,.06)  275deg,
            rgba(0,255,0,.22)  300deg,
            rgba(0,255,0,.60)  330deg,
            rgba(0,255,0,.95)  348deg,
            #00ff00            353deg,
            rgba(0,255,0,.85)  358deg,
            transparent        360deg
        );
        filter: blur(10px);
        animation: fuse-spin 2.4s linear infinite, glow-appear 4s ease-in-out 1 forwards;
        z-index: 0;
    }

    .fuse-glow {
        position: absolute;
        inset: -5px;
        border-radius: 19px;
        pointer-events: none;
        background: conic-gradient(
            from 0deg,
            transparent        0deg,
            transparent        278deg,
            rgba(0,255,0,.12)  290deg,
            rgba(0,255,0,.50)  318deg,
            rgba(0,255,0,.95)  344deg,
            #aaffaa            351deg,
            rgba(0,255,0,.88)  357deg,
            transparent        360deg
        );
        filter: blur(3px);
        animation: fuse-spin 2.4s linear infinite, glow-appear 4s ease-in-out 1 forwards;
        z-index: 1;
    }

    @keyframes fuse-spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
    }

    .fuse-dot {
        position: absolute;
        top: 0;
        left: 0;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        pointer-events: none;
        background: #ffffff;
        box-shadow:
            0 0  2px #fff,
            0 0  6px #0f0,
            0 0 14px rgba(0,255,0,.9),
            0 0 26px rgba(0,255,0,.55),
            0 0 40px rgba(0,255,0,.25);
        offset-path: path('M 14,0 L 38,0 A 14,14 0 0 1 38,28 L 14,28 A 14,14 0 0 1 14,0 Z');
        offset-distance: 0%;
        animation:
            dot-orbit      2.4s linear      infinite,
            glow-appear    4s   ease-in-out 1 forwards,
            dot-glow-pulse 1.8s ease-in-out infinite;
        z-index: 5;
    }

    @keyframes dot-orbit {
        from { offset-distance:   0%; }
        to   { offset-distance: 100%; }
    }

    @keyframes dot-glow-pulse {
        0%, 100% {
            box-shadow:
                0 0  2px #fff,
                0 0  6px #0f0,
                0 0 14px rgba(0,255,0,.9),
                0 0 26px rgba(0,255,0,.55),
                0 0 40px rgba(0,255,0,.25);
        }
        50% {
            box-shadow:
                0 0  4px #fff,
                0 0 10px #0f0,
                0 0 22px rgba(0,255,0,1),
                0 0 40px rgba(0,255,0,.75),
                0 0 60px rgba(0,255,0,.4);
        }
    }

    /* ── Inner pill face ─────────────────────────────────────────────────── */
    .pill {
        position: absolute;
        inset: 0;
        border-radius: 14px;
        border: 1.5px solid rgb(148,163,184);
        background: rgb(203,213,225);
        z-index: 3;
        transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    }

    /* One-shot flash when glow is triggered (light mode only) */
    .glowing .pill {
        animation: pill-once 4s ease-in-out 1 forwards;
    }

    /* Hover preview (light mode only) */
    .toggle-btn:hover .pill-wrap:not(.matrix) .pill {
        background:   #000;
        border-color: rgba(0,255,0,.75);
        box-shadow:   0 0 0 1px rgba(0,255,0,.3), inset 0 0 20px rgba(0,255,0,.25);
        transition:   background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    }

    /* Matrix mode */
    .pill-wrap.matrix .pill {
        background:   #0a0a0a;
        border-color: #0f0;
        animation: matrix-breathe 2s ease-in-out infinite;
    }

    @keyframes matrix-breathe {
        0%, 100% { box-shadow: 0 0  8px rgba(0,255,0,.5),  inset 0 0 10px rgba(0,255,0,.12); }
        50%       { box-shadow: 0 0 20px rgba(0,255,0,.85), inset 0 0 22px rgba(0,255,0,.28); }
    }

    /* ── Knob ────────────────────────────────────────────────────────────── */
    .knob {
        position: absolute;
        top: 50%;
        left: 3px;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        z-index: 4;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0,0,0,.3);
        transition: left 0.28s cubic-bezier(0.4, 0, 0.2, 1),
                    background 0.2s ease,
                    box-shadow 0.2s ease;
    }

    /* One-shot flash when glow is triggered (light mode only) */
    .glowing .knob:not(.at-end) {
        animation: knob-once 4s ease-in-out 1 forwards;
    }

    /* Hover preview (light mode only) */
    .toggle-btn:hover .pill-wrap:not(.matrix) .knob:not(.at-end) {
        background: #00ff00;
        box-shadow: 0 0 4px #fff,
                    0 0 12px #0f0,
                    0 0 28px rgba(0,255,0,.85),
                    0 0 52px rgba(0,255,0,.45);
        transition: background 0.2s ease, box-shadow 0.2s ease;
    }

    /* Matrix mode: knob slides right */
    .knob.at-end {
        left: calc(100% - 23px);
        animation: knob-matrix-pulse 1.5s ease-in-out infinite;
    }

    @keyframes knob-matrix-pulse {
        0%, 100% {
            background: #0f0;
            box-shadow: 0 0 5px #fff, 0 0 12px #0f0, 0 0 28px rgba(0,255,0,.8);
        }
        50% {
            background: #0f0;
            box-shadow: 0 0 8px #fff, 0 0 20px #0f0, 0 0 44px rgba(0,255,0,1), 0 0 64px rgba(0,255,0,.5);
        }
    }
</style>
