<script lang="ts">
    import { showDark, showMatrix, toggleDark } from '$lib/stores/theme';
</script>

<button
    class="toggle-btn"
    on:click={toggleDark}
    title={$showDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    aria-label="Toggle dark mode"
    disabled={$showMatrix}
>
    <div class="pill-wrap" class:dark={$showDark}>
        <div class="pill">
            <div class="knob" class:at-end={$showDark}>
                {#if $showDark}
                    <!-- Moon icon -->
                    <svg viewBox="0 0 24 24" fill="currentColor" class="icon">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
                    </svg>
                {:else}
                    <!-- Sun icon -->
                    <svg viewBox="0 0 24 24" fill="currentColor" class="icon">
                        <circle cx="12" cy="12" r="5"/>
                        <line x1="12" y1="1" x2="12" y2="3"/>
                        <line x1="12" y1="21" x2="12" y2="23"/>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                        <line x1="1" y1="12" x2="3" y2="12"/>
                        <line x1="21" y1="12" x2="23" y2="12"/>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>
                {/if}
            </div>
        </div>
    </div>
</button>

<style>
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
        opacity: 1;
        transition: opacity 0.2s ease, background 0.2s ease;
    }

    .toggle-btn:disabled {
        opacity: 0.35;
        cursor: not-allowed;
    }

    .toggle-btn:not(:disabled):hover {
        background: rgba(237, 229, 204, 0.12);
    }

    /* ── Pill wrapper ─────────────────────────────────────────────────────── */
    .pill-wrap {
        position: relative;
        width: 52px;
        height: 28px;
    }

    /* ── Inner pill face ──────────────────────────────────────────────────── */
    .pill {
        position: absolute;
        inset: 0;
        border-radius: 14px;
        border: 1.5px solid rgb(148, 163, 184);
        background: rgb(203, 213, 225);
        z-index: 3;
        transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    }

    .pill-wrap.dark .pill {
        background: #232630;
        border-color: #606880;
        box-shadow: inset 0 0 12px rgba(144, 152, 188, 0.08);
    }

    .toggle-btn:not(:disabled):hover .pill-wrap:not(.dark) .pill {
        background: #232630;
        border-color: #606880;
    }

    /* ── Knob ─────────────────────────────────────────────────────────────── */
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
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: left 0.28s cubic-bezier(0.4, 0, 0.2, 1),
                    background 0.25s ease,
                    box-shadow 0.25s ease;
        color: rgb(148, 163, 184);
    }

    .knob.at-end {
        left: calc(100% - 23px);
        background: #30333D;
        color: #9098BC;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    }

    .icon {
        width: 11px;
        height: 11px;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
    }

    /* Moon is filled, not stroked */
    .knob.at-end .icon {
        fill: currentColor;
        stroke: none;
    }
</style>
