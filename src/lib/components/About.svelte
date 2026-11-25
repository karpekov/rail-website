<script lang="ts">
    import RAILLogo from './RAILLogo.svelte';
    import { onMount } from 'svelte';
    import { showMatrix } from '#lib/stores/theme.ts';

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
    <div class="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 pt-4 pb-0">
        <div bind:this={logoElement} class="flex flex-col lg:flex-row lg:items-center lg:gap-8 mb-3 min-h-[12rem]">
            <RAILLogo />

            <!--
                Wrapper holds the space of the full text at all times so typing
                never causes a layout shift when lines wrap.
                Ghost text is invisible but in-flow → its height = final text height.
                Typing h1 is absolutely positioned on top of the ghost.
            -->
            <div class="typing-wrapper mt-2 lg:mt-0">
                <!-- Ghost: in-flow, invisible, reserves the final text height -->
                <div
                    class="rail-h1 font-bold font-orbitron text-center lg:text-left ghost-title"
                    class:glow-text={$showMatrix}
                    aria-hidden="true"
                >{fullText}</div>

                <!-- Visible typing h1 overlaid on top -->
                <h1
                    class="rail-h1 font-orbitron text-primary-500 text-center lg:text-left typing-title"
                    class:typing-cursor={!typingDone}
                    class:glow-text={$showMatrix}
                    class:matrix-title={$showMatrix}
                    id="myText"
                >{displayText}</h1>
            </div>
        </div>

        <p class="text-md lg:text-xl pt-1 font-opensans">

            At RAIL Lab at <a href="https://www.gatech.edu/" target="_blank">Georgia Tech</a>,
            we work on robot planning and learning, multi-robot coordination, and human-aware decision-making.
            We study how robots can make sense of their surroundings, pick up on people's preferences,
            and work alongside people and other robots.
            Throughout, we care about building systems that can adapt to the people they work with
            and explain their decisions.

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
        text-shadow: 0 0 10px color-mix(in srgb, var(--color-primary-500) 50%, transparent),
                    0 0 20px color-mix(in srgb, var(--color-primary-500) 30%, transparent);
        letter-spacing: 0.05em;
    }

    .typing-cursor::after {
        content: '|';
        animation: cursor 1s infinite step-start;
    }

    @keyframes cursor {
        50% { opacity: 0; }
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
        color: var(--color-primary-600);
        text-decoration: underline;
        text-decoration-color: color-mix(in srgb, var(--color-primary-500) 40%, transparent);
        text-underline-offset: 2px;
        transition: color 0.15s ease, text-decoration-color 0.15s ease;
    }

    p :global(a:hover) {
        color: var(--color-primary-400);
        text-decoration-color: color-mix(in srgb, var(--color-primary-400) 80%, transparent);
    }

    :global(.matrix-theme) p :global(a) {
        color: var(--mx-accent);
        text-decoration-color: var(--mx-accent-half);
    }
</style>
