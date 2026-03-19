<script lang="ts">
    import Matrix from '$lib/components/Matrix.svelte';
    import { showMatrix, showDark } from '$lib/stores/theme';
    export let onClose: () => void;

    // Hardcoded dark-mode values — the modal renders outside .dark-theme so
    // CSS custom properties from that context are unavailable here.
    const dk = {
        bg:      '#080D18',
        border:  '#1A2D4A',
        text:    '#E2E8F4',
        muted:   '#7A9CC4',
        amber:   '#FBBF24',
        amberDim:'#E8A800',
        alertBg: 'rgba(232,168,0,0.08)',
        overlay: 'rgba(0,0,0,0.65)',
    };
</script>

<!-- Outer container with backdrop -->
<div class="fixed inset-0 z-[100] backdrop-blur-sm flex items-center justify-center p-4"
     style="background-color: {$showMatrix ? 'rgba(0,0,0,0.8)' : $showDark ? dk.overlay : 'rgba(0,0,0,0.5)'};"
     on:click|self={onClose}
     role="dialog"
     aria-modal="true">
    <!-- Modal content -->
    <div class="relative w-full max-w-4xl rounded-lg shadow-xl overflow-hidden max-h-[90vh] mt-16 md:mt-0"
         style={$showMatrix
             ? 'background-color: #000; border: 1px solid #0F0; box-shadow: 0 0 20px rgba(0,255,0,0.3);'
             : $showDark
                 ? `background-color: ${dk.bg}; border: 1px solid ${dk.amber};`
                 : 'background-color: rgb(var(--color-surface-100)); border: 1px solid rgb(99 154 255 / 0.3); box-shadow: 0 0 20px rgb(99 154 255 / 0.1);'}>
        {#if $showMatrix}
            <div class="absolute inset-0 opacity-20">
                <Matrix />
            </div>
        {/if}
        <section id="join" class="p-8 sm:p-10 relative z-20 overflow-y-auto max-h-[calc(90vh-4rem)]"
                 style={$showDark && !$showMatrix ? `color: ${dk.text};` : ''}>
            <h2 class="h2 font-orbitron mb-8"
                style={$showMatrix
                    ? 'color: #0F0; text-shadow: 0 0 10px #0F0, 0 0 20px #0F0;'
                    : $showDark
                        ? `color: ${dk.amber}; text-shadow: 0 0 18px rgba(232,168,0,0.35), 0 0 6px rgba(232,168,0,0.15);`
                        : 'color: rgb(var(--color-primary-600)); text-shadow: 0 0 16px rgba(var(--color-primary-500),0.35), 0 0 32px rgba(var(--color-primary-500),0.18);'}>
                Join Us
            </h2>

            <div class="prose prose-sm sm:prose-lg" class:matrix-prose={$showMatrix} class:dark-prose={$showDark && !$showMatrix}>
                <p class="lead">
                    We are actively seeking collaborations with passionate, curious, and dedicated individuals
                    who are interested in robotics and human-robot interaction research.
                </p>

                <h3 class="h3 mt-8"
                    style={$showMatrix
                        ? 'color: #0F0; text-shadow: 0 0 10px rgba(0,255,0,0.3);'
                        : $showDark ? `color: ${dk.amberDim};` : ''}>
                    PhD Positions
                </h3>
                <p>
                    PhD admissions are handled through Georgia Tech's College of Computing. Prospective students
                    should apply through the official admission process. We encourage interested candidates to
                    highlight their relevant experience and research interests in their application materials.
                </p>

                <h3 class="h3 mt-6"
                    style={$showMatrix
                        ? 'color: #0F0; text-shadow: 0 0 10px rgba(0,255,0,0.3);'
                        : $showDark ? `color: ${dk.amberDim};` : ''}>
                    Research Opportunities
                </h3>
                <p>
                    The best way to get involved with our lab is through one of the courses we offer.
                    These courses provide an excellent opportunity to work on research projects while earning
                    course credit. Interested students should:
                </p>
                <ul>
                    <li>Review our current research projects and publications</li>
                    <li>Prepare a brief proposal outlining their research interests</li>
                    <li>Contact Dr. Chernova well before the semester starts to discuss potential projects</li>
                </ul>

                <div class="alert mt-8"
                     class:variant-soft-primary={!$showMatrix && !$showDark}
                     style={$showMatrix
                         ? 'background-color: rgba(0,255,0,0.1); border: 1px solid #0F0; box-shadow: 0 0 10px rgba(0,255,0,0.3); color: #fff; border-radius: 0.5rem; padding: 1rem 1.25rem;'
                         : $showDark
                             ? `background-color: ${dk.alertBg}; border: 1px solid ${dk.border}; border-radius: 0.5rem; padding: 1rem 1.25rem; color: ${dk.text};`
                             : ''}>
                    <p style={$showMatrix ? 'color: #fff;' : ''}>
                        <strong style={$showMatrix ? 'color: #fff;' : $showDark ? `color: ${dk.amber};` : ''}>Getting Started:</strong> Interested students should reach out at least 4-6 weeks
                        before the semester begins to allow time for project planning and course registration.
                    </p>
                </div>
            </div>
        </section>
    </div>
</div>

<style>
    /* ── Matrix prose: white text for all children ──────────────────────── */
    .matrix-prose {
        color: #fff;
        position: relative;
        z-index: 20;
    }

    .matrix-prose :global(p),
    .matrix-prose :global(li),
    .matrix-prose :global(strong) {
        color: #fff;
    }

    .matrix-prose :global(a) {
        color: #0F0;
    }

    /* ── Shared prose list styles ───────────────────────────────────────── */
    :global(.prose ul) {
        list-style-type: disc;
        padding-left: 1.5em;
        margin-top: 1em;
        margin-bottom: 1em;
    }

    :global(.prose li) {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }

    /* ── Light mode h3 ──────────────────────────────────────────────────── */
    :global(:not(.matrix-theme)) .prose :global(h3) {
        color: rgb(var(--color-primary-500));
    }

    /* ── Dark mode prose ─────────────────────────────────────────────────── */
    .dark-prose {
        color: #E2E8F4;
    }

    .dark-prose :global(p),
    .dark-prose :global(li) {
        color: #E2E8F4;
    }

    .dark-prose :global(strong) {
        color: #FBBF24;
    }

    .dark-prose :global(a) {
        color: #FBBF24;
    }
</style>
