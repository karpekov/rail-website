<script lang="ts">
    import { showMatrix } from '$lib/stores/theme';
    import { trackEvent } from '$lib/utils/analytics';

    export let inMenu = false;

    function toggle() {
        trackEvent('matrix_easter_egg_click');
        $showMatrix = !$showMatrix;
    }
</script>

{#if inMenu}
    <!-- Mobile menu version: a mystery list item at the bottom -->
    <button class="menu-item" on:click={toggle} class:active={$showMatrix}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="icon" aria-hidden="true">
            <!-- Robot head -->
            <rect x="4" y="7" width="16" height="13" rx="2" stroke-width="1.4"/>
            <!-- Antenna -->
            <line x1="12" y1="7" x2="12" y2="3" stroke-width="1.4"/>
            <circle cx="12" cy="2.5" r="1" fill="currentColor" stroke-width="0"/>
            <!-- Eyes -->
            <rect x="7.5" y="11" width="3" height="2.5" rx="0.5" stroke-width="1.2"/>
            <rect x="13.5" y="11" width="3" height="2.5" rx="0.5" stroke-width="1.2"/>
            <!-- Mouth grid -->
            <line x1="8" y1="16.5" x2="16" y2="16.5" stroke-width="1.2"/>
            <line x1="10" y1="15" x2="10" y2="18" stroke-width="1"/>
            <line x1="14" y1="15" x2="14" y2="18" stroke-width="1"/>
        </svg>
        <span>{$showMatrix ? 'Exit ⬛' : '...'}</span>
    </button>
{:else}
    <!-- Desktop version: barely visible icon button -->
    <button
        class="egg-btn"
        class:engaged={$showMatrix}
        on:click={toggle}
        aria-label="???"
        tabindex="-1"
    >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="icon" aria-hidden="true">
            <!-- Robot head -->
            <rect x="4" y="7" width="16" height="13" rx="2" stroke-width="1.4"/>
            <!-- Antenna -->
            <line x1="12" y1="7" x2="12" y2="3" stroke-width="1.4"/>
            <circle cx="12" cy="2.5" r="1" fill="currentColor" stroke-width="0"/>
            <!-- Eyes -->
            <rect x="7.5" y="11" width="3" height="2.5" rx="0.5" stroke-width="1.2"/>
            <rect x="13.5" y="11" width="3" height="2.5" rx="0.5" stroke-width="1.2"/>
            <!-- Mouth grid -->
            <line x1="8" y1="16.5" x2="16" y2="16.5" stroke-width="1.2"/>
            <line x1="10" y1="15" x2="10" y2="18" stroke-width="1"/>
            <line x1="14" y1="15" x2="14" y2="18" stroke-width="1"/>
        </svg>
    </button>
{/if}

<style>
    /* ── Desktop easter egg button ───────────────────────────────────────── */
    .egg-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 1px;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.15;
        transition: opacity 0.3s ease, background 0.3s ease;
        color: currentColor;
    }

    .egg-btn:hover {
        background: rgba(10, 12, 10, 0.7);
        color: #0f0;
        animation: hover-pulse 1.2s ease-in-out infinite;
    }

    @keyframes hover-pulse {
        0%, 100% { opacity: 0.6; }
        50%       { opacity: 1; }
    }

    .egg-btn.engaged {
        opacity: 0.7;
        color: #0f0;
        animation: robot-pulse 2s ease-in-out infinite;
    }

    @keyframes robot-pulse {
        0%, 100% { opacity: 0.7; }
        50%       { opacity: 0.9; }
    }

    .icon {
        width: 18px;
        height: 18px;
        transition: filter 0.3s ease;
    }

    .egg-btn:hover .icon {
        filter: drop-shadow(0 0 4px rgba(0, 255, 0, 0.85));
    }

    .egg-btn.engaged .icon {
        filter: drop-shadow(0 0 6px rgba(0, 255, 0, 0.9));
    }

    /* ── Mobile menu version ─────────────────────────────────────────────── */
    .menu-item {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 0.875rem;
        opacity: 0.25;
        color: currentColor;
        transition: opacity 0.2s ease, color 0.2s ease;
        text-align: left;
    }

    .menu-item:hover {
        opacity: 0.55;
    }

    .menu-item.active {
        opacity: 0.8;
        color: #0f0;
    }

    .menu-item .icon {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
    }

    .menu-item span {
        letter-spacing: 0.05em;
    }
</style>
