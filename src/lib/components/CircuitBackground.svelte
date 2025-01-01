<script>
    import { onMount } from 'svelte';

    let mounted = false;
    let viewportWidth = 0;
    let viewportHeight = 0;

    onMount(() => {
        mounted = true;
        updateViewportSize();
        window.addEventListener('resize', updateViewportSize);

        // Give time for all SVG elements to be rendered
        setTimeout(() => {
            // Dynamic line movement
            const lines = document.querySelectorAll('.circuit-line');
            lines.forEach(line => {
                const animate = () => {
                    line.style.transition = 'none';
                    line.style.strokeDashoffset = '0';
                    setTimeout(() => {
                        line.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
                        line.style.strokeDashoffset = '16';
                    }, 100);

                    setTimeout(animate, 3000 + Math.random() * 2000);
                };

                setTimeout(animate, Math.random() * 2000);
            });

            // Random shape pulsing
            function updatePulsing() {
                const shapes = document.querySelectorAll('.tech-shape, .tech-circle');
                shapes.forEach(shape => shape.classList.remove('pulsing'));

                const numToAnimate = Math.floor(shapes.length * 0.2);
                const shuffled = Array.from(shapes).sort(() => Math.random() - 0.5);

                shuffled.slice(0, numToAnimate).forEach(shape => {
                    shape.classList.add('pulsing');
                });
            }

            // Initial pulsing
            updatePulsing();

            // Set up interval for pulsing
            const pulsingInterval = setInterval(updatePulsing, 4000);

            // Cleanup
            return () => {
                clearInterval(pulsingInterval);
                window.removeEventListener('resize', updateViewportSize);
            };
        }, 100); // Small delay to ensure SVG is rendered
    });

    function updateViewportSize() {
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
    }

    $: numCols = Math.ceil(viewportWidth / 100) + 1;
    $: numRows = Math.ceil(viewportHeight / 100) + 100;
</script>

<div class="circuit-pattern w-full h-full">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {#each Array(numRows) as _, i}
            {#each Array(numCols) as _, j}
                <g transform={`translate(${j * 100}, ${i * 100})`}>
                    <!-- Circuit board paths -->
                    <path class="circuit-line"
                        d="M10 10h30v30h30"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-dasharray="4,4"
                        opacity="0.6"
                    />
                    <path class="circuit-line"
                        d="M80 50v30h-30v20"
                        fill=none
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-dasharray="4,4"
                        opacity="0.6"
                    />

                    <!-- Circles -->
                    <circle class="tech-circle"
                        cx="10" cy="10" r="4"
                        fill="currentColor"
                        opacity="0.7"
                    />
                    <circle class="tech-circle"
                        cx="80" cy="80" r="4"
                        fill="currentColor"
                        opacity="0.7"
                    />
                    <circle class="tech-circle"
                        cx="40" cy="40" r="3"
                        fill="currentColor"
                        opacity="0.7"
                    />

                    <!-- Rectangle -->
                    <rect class="tech-shape"
                        x="70" y="10"
                        width="8" height="8"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="1.5"
                        opacity="0.9"
                    />

                    <!-- Triangle -->
                    <polygon class="tech-shape"
                        points="15,60 25,60 20,70"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="1.5"
                        opacity="0.9"
                    />
                </g>
            {/each}
        {/each}
    </svg>
</div>

<style>
    .circuit-pattern {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }

    .tech-shape.pulsing, .tech-circle.pulsing {
        animation: pulse 3s infinite;
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 0.2;
            filter: brightness(1);
        }
        50% {
            opacity: 1;
            filter: brightness(3);
        }
    }

    :global(.dark) .circuit-pattern {
        color: theme('colors.primary.500');
    }

    :global(.light) .circuit-pattern {
        color: theme('colors.primary.500');
    }
</style>