<script lang="ts">
    import RAILLogo from './RAILLogo.svelte';
    import { onMount } from 'svelte';
    import { showMatrix } from '$lib/stores/theme';

    let displayText = "";
    let typingDone = false;
    const fullText = "Robot Autonomy and Interactive Learning";
    const typingSpeed = 50;
    let logoElement: HTMLElement;
    export let onLogoIntersect: (isIntersecting: boolean) => void;

    onMount(() => {
        let currentChar = 0;
        const typingInterval = setInterval(() => {
            if (currentChar < fullText.length) {
                displayText = fullText.slice(0, currentChar + 1);
                currentChar++;
            } else {
                clearInterval(typingInterval);
                typingDone = true;
            }
        }, typingSpeed);

        const navHeight = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')
        ) || 80;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => onLogoIntersect(!entry.isIntersecting));
            },
            { threshold: 0, rootMargin: `-${navHeight}px 0px 0px 0px` }
        );

        if (logoElement) observer.observe(logoElement);

        return () => {
            clearInterval(typingInterval);
            if (logoElement) observer.unobserve(logoElement);
        };
    });
</script>

<section id="about">
    <div class="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 pt-8 pb-2">
        <div bind:this={logoElement} class="flex flex-col lg:flex-row lg:items-center lg:gap-8 mb-6 min-h-[12rem]">
            <RAILLogo />

            <!--
                Wrapper holds the space of the full text at all times so typing
                never causes a layout shift when lines wrap.
                Ghost h1 is invisible but in-flow → its height = final text height.
                Typing h1 is absolutely positioned on top of the ghost.
            -->
            <div class="typing-wrapper mt-4 lg:mt-0">
                <!-- Ghost: in-flow, invisible, reserves the final text height -->
                <h1
                    class="h1 font-orbitron text-center lg:text-left ghost-title"
                    class:glow-text={$showMatrix}
                    aria-hidden="true"
                >{fullText}</h1>

                <!-- Visible typing h1 overlaid on top -->
                <h1
                    class="h1 font-orbitron text-primary-500 text-center lg:text-left typing-title"
                    class:typing-cursor={!typingDone}
                    class:glow-text={$showMatrix}
                    class:matrix-title={$showMatrix}
                    id="myText"
                >{displayText}</h1>
            </div>
        </div>

        <p class="text-2xl font-bold pt-1 font-orbitron text-center" class:matrix-text={$showMatrix}>
            Advancing AI & Robotics for the Human World
        </p>
        <p class="text-md lg:text-xl pt-2 font-opensans">
            RAIL Lab at <a href="https://www.gatech.edu/" target="_blank">Georgia Tech</a>
            focuses on developing human-centered robotic and AI systems that can
            better assist and interact with humans in various contexts, from in-home to healthcare.
            Through interdisciplinary research combining robotics, AI,
            and human factors, we aim to create effective and transparent
            technologies that seamlessly integrate into everyday lives.
        </p>
    </div>
</section>

<style>
    :global(.font-orbitron) {
        font-family: 'Orbitron', sans-serif;
    }

    :global(.font-body) {
        font-family: 'Inter', sans-serif;
    }

    .glow-text {
        text-shadow: 0 0 10px rgb(var(--color-primary-500) / 0.5),
                    0 0 20px rgb(var(--color-primary-500) / 0.3);
        letter-spacing: 0.05em;
    }

    .typing-cursor::after {
        content: '|';
        animation: cursor 1s infinite step-start;
    }

    @keyframes cursor {
        50% { opacity: 0; }
    }

    .matrix-text {
        color: var(--mx-accent) !important;
    }

    .matrix-title {
        color: white !important;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5),
                     0 0 20px rgba(255, 255, 255, 0.3) !important;
    }

    /* Wrapper: position:relative so the typing-title can overlay the ghost */
    .typing-wrapper {
        position: relative;
        flex: 1;
    }

    /* Ghost: invisible but IN FLOW — its height = final wrapped text height.
       This locks the wrapper height before typing starts → no layout shift. */
    .ghost-title {
        visibility: hidden;
        user-select: none;
        pointer-events: none;
    }

    /* Typing h1: absolute so it overlays the ghost at position (0,0) */
    .typing-title {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }

    /* Inline links in the about paragraph */
    p :global(a) {
        color: rgb(var(--color-primary-600));
        text-decoration: underline;
        text-decoration-color: rgb(var(--color-primary-500) / 0.4);
        text-underline-offset: 2px;
        transition: color 0.15s ease, text-decoration-color 0.15s ease;
    }

    p :global(a:hover) {
        color: rgb(var(--color-primary-400));
        text-decoration-color: rgb(var(--color-primary-400) / 0.8);
    }

    :global(.matrix-theme) p :global(a) {
        color: var(--mx-accent);
        text-decoration-color: var(--mx-accent-half);
    }
</style>
