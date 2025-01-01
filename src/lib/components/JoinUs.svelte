<script lang="ts">
    import Matrix from '$lib/components/Matrix.svelte';
    export let showMatrix = false;
    export let onClose: () => void;
</script>

<!-- Outer container with backdrop -->
<div class="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
     on:click|self={onClose}
     role="dialog"
     aria-modal="true">
   <!-- Modal content -->
    <div class="relative w-full max-w-4xl bg-surface-100-800-token rounded-lg shadow-xl overflow-hidden max-h-[90vh] mt-16 md:mt-0"
         class:matrix-card={showMatrix}>
        {#if showMatrix}
            <div class="absolute inset-0 opacity-20">
                <Matrix />
            </div>
        {/if}
        <section id="join" class="p-6 sm:p-10 relative z-20 overflow-y-auto max-h-[calc(90vh-4rem)]">
            <h2 class="h2 font-orbitron section-title mb-8">Join Us</h2>

            <div class="prose prose-lg dark:prose-invert">
                <p class="lead">
                    We are actively seeking collaborations with passionate, curious, and dedicated individuals
                    who are interested in robotics and human-robot interaction research.
                </p>

                <h3 class="h3 mt-8">PhD Positions</h3>
                <p>
                    PhD admissions are handled through Georgia Tech's College of Computing. Prospective students
                    should apply through the official admission process. We encourage interested candidates to
                    highlight their relevant experience and research interests in their application materials.
                </p>

                <h3 class="h3 mt-6">Research Opportunities</h3>
                <p>
                    The best way to get involved with our lab is through on of the courses we offer.
                    These courses provide an excellent opportunity to work on research projects while earning
                    course credit. Interested students should:
                </p>
                <ul>
                    <li>Review our current research projects and publications</li>
                    <li>Prepare a brief proposal outlining their research interests</li>
                    <li>Contact Dr. Chernova well before the semester starts to discuss potential projects</li>
                </ul>

                <div class="alert variant-soft-primary mt-8">
                    <p>
                        <strong>Getting Started:</strong> Interested students should reach out at least 4-6 weeks
                        before the semester begins to allow time for project planning and course registration.
                    </p>
                </div>
            </div>
        </section>
    </div>
</div>

<style>
    :global(:not(.matrix-theme)) .section-title {
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5),
                    0 0 20px rgba(255, 255, 255, 0.3);
    }

    :global(.matrix-theme) .prose {
        color: white;
        position: relative;
        z-index: 20;
    }

    :global(.matrix-theme) .prose strong {
        color: #fff;
    }

    :global(.matrix-theme) .prose h3 {
        color: #0F0;
    }

    :global(.matrix-theme) .alert {
        border-color: #0F0;
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
    }

    .matrix-card {
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
    }

    :global(.matrix-theme) .bg-surface-100-800-token {
        border: 1px solid #0F0;
    }

    :global(:not(.matrix-theme)) .bg-surface-100-800-token {
        border: 1px solid rgb(99 154 255 / 0.3);
        box-shadow: 0 0 20px rgb(99 154 255 / 0.1);
    }
</style>