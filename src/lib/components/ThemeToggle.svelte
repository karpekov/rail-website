<script lang="ts">
    import { showMatrix } from '$lib/stores/theme';

    function toggle() {
        $showMatrix = !$showMatrix;
    }
</script>

<!--
    Light-mode visual cycle (8 s, CSS-only, no JS timers):
      0–28%:   normal gray/white
      28–45%:  ease-in-out transition → black/green
      45–65%:  black/green (static)
      65–80%:  ease-in-out transition → gray/white
      80–100%: gray/white (static) — loops

    Fuse layers are three rotating conic-gradient divs; plus a CSS
    Motion-Path dot that orbits the pill border.
-->
<button
    class="toggle-btn"
    on:click={toggle}
    title={$showMatrix ? 'Switch to Light Mode' : 'Switch to Matrix Mode'}
    aria-label="Toggle theme"
>
    <div class="pill-wrap" class:matrix={$showMatrix}>
        {#if !$showMatrix}
            <div class="fuse-bloom" aria-hidden="true"></div>
            <div class="fuse-glow"  aria-hidden="true"></div>
            <div class="fuse-dot"   aria-hidden="true"></div>
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

    /* Speed up orbit on hover (keep 8 s cycle unchanged) */
    .toggle-btn:hover .fuse-bloom { animation-duration: 1.3s, 8s; }
    .toggle-btn:hover .fuse-glow  { animation-duration: 1.3s, 8s; }
    .toggle-btn:hover .fuse-dot   { animation-duration: 1.3s, 8s, 1.8s; }

    /* ── Pill wrapper ─────────────────────────────────────────────────────── */
    .pill-wrap {
        position: relative;
        width: 52px;
        height: 28px;
    }

    /* ════════════════════════════════════════════════════════════════════════
       CYCLE KEYFRAMES  (period = 8 s)
       ──────────────────────────────────────────────────────────────────────
       Same values at 0 % and 28 %  → browser holds them static (no interp).
       Same values at 45 % and 65 % → holds static.
       CSS interpolates naturally between 28→45 % and 65→80 %.
    ════════════════════════════════════════════════════════════════════════ */

    @keyframes pill-cycle {
        0%, 28%  {
            background:   rgb(203,213,225);
            border-color: rgb(148,163,184);
            box-shadow:   0 1px 2px rgba(0,0,0,.14), inset 0 0 0px rgba(0,0,0,0);
        }
        45%, 65% {
            background:   #000;
            border-color: rgba(0,255,0,.75);
            box-shadow:   0 0 0 1px rgba(0,255,0,.3), inset 0 0 20px rgba(0,255,0,.25);
        }
        80%, 100% {
            background:   rgb(203,213,225);
            border-color: rgb(148,163,184);
            box-shadow:   0 1px 2px rgba(0,0,0,.14), inset 0 0 0px rgba(0,0,0,0);
        }
    }

    @keyframes knob-cycle {
        0%, 28%  {
            background: #fff;
            box-shadow: 0 1px 4px rgba(0,0,0,.3),
                        0 0 0px rgba(0,0,0,0),
                        0 0 0px rgba(0,0,0,0),
                        0 0 0px rgba(0,0,0,0);
        }
        45%, 65% {
            background: #00ff00;
            box-shadow: 0 0 4px #fff,
                        0 0 12px #0f0,
                        0 0 28px rgba(0,255,0,.85),
                        0 0 52px rgba(0,255,0,.45);
        }
        80%, 100% {
            background: #fff;
            box-shadow: 0 1px 4px rgba(0,0,0,.3),
                        0 0 0px rgba(0,0,0,0),
                        0 0 0px rgba(0,0,0,0),
                        0 0 0px rgba(0,0,0,0);
        }
    }

    /* Shared opacity cycle for all fuse layers */
    @keyframes fuse-opacity-cycle {
        0%, 28%  { opacity: 0; }
        43%, 65% { opacity: 1; }
        80%, 100% { opacity: 0; }
    }

    /* ── Bloom layer (wide, heavy blur, long comet tail) ─────────────────── */
    .fuse-bloom {
        position: absolute;
        inset: -10px;
        border-radius: 24px;      /* 14 + 10 */
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
        animation: fuse-spin 2.4s linear infinite, fuse-opacity-cycle 8s ease-in-out infinite;
        z-index: 0;
    }

    /* ── Glow layer (medium blur, sharper tail) ──────────────────────────── */
    .fuse-glow {
        position: absolute;
        inset: -5px;
        border-radius: 19px;      /* 14 + 5 */
        pointer-events: none;
        background: conic-gradient(
            from 0deg,
            transparent        0deg,
            transparent        278deg,
            rgba(0,255,0,.12)  290deg,
            rgba(0,255,0,.50)  318deg,
            rgba(0,255,0,.95)  344deg,
            #aaffaa            351deg,  /* near-white hot core */
            rgba(0,255,0,.88)  357deg,
            transparent        360deg
        );
        filter: blur(3px);
        animation: fuse-spin 2.4s linear infinite, fuse-opacity-cycle 8s ease-in-out infinite;
        z-index: 1;
    }

    @keyframes fuse-spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
    }

    /* ── Moving dot: CSS Motion Path along the pill border ───────────────────
       Path traces the outer outline of the 52×28 pill (border-radius 14).
       offset-anchor defaults to 50 % 50 %, so the dot's center follows the path.
       The dot is sized 6×6 px; its center travels right on the pill edge.
    ─────────────────────────────────────────────────────────────────────────── */
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
        /* M 14,0 → top of left-end semicircle; L 38,0 → top straight edge;
           A 14,14 0 0 1 38,28 → right semicircle (clockwise);
           L 14,28 → bottom straight edge;
           A 14,14 0 0 1 14,0  → left semicircle (clockwise); Z */
        offset-path: path('M 14,0 L 38,0 A 14,14 0 0 1 38,28 L 14,28 A 14,14 0 0 1 14,0 Z');
        offset-distance: 0%;
        animation:
            dot-orbit          2.4s linear      infinite,
            fuse-opacity-cycle 8s   ease-in-out infinite,
            dot-glow-pulse     1.8s ease-in-out infinite;
        z-index: 5;  /* above pill (z3) and knob (z4 inside pill) */
    }

    @keyframes dot-orbit {
        from { offset-distance:   0%; }
        to   { offset-distance: 100%; }
    }

    /* Dot grows brighter at the peak of each glow pulse */
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
        border: 1.5px solid rgb(148,163,184);   /* fallback / matrix override anchor */
        background: rgb(203,213,225);            /* fallback */
        z-index: 3;
        animation: pill-cycle 8s ease-in-out infinite;
    }

    /* Matrix mode: override the cycling animation */
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
        background: #fff;    /* fallback */
        transition: left 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        animation: knob-cycle 8s ease-in-out infinite;
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
