<script lang="ts">
    import RAILLogo from './RAILLogo.svelte';
    import { onMount } from 'svelte';

    let displayText = "";
    let fullText = "Robot Autonomy and Interactive Learning";
    let typingSpeed = 100; // milliseconds per character
    let logoElement: HTMLElement;
    export let onLogoIntersect: (isIntersecting: boolean) => void;
    export let showMatrix = false;

    onMount(() => {
        let currentChar = 0;
        const typingInterval = setInterval(() => {
            if (currentChar < fullText.length) {
                displayText = fullText.slice(0, currentChar + 1);
                currentChar++;
            } else {
                clearInterval(typingInterval);
            }
        }, typingSpeed);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    onLogoIntersect(!entry.isIntersecting);
                });
            },
            {
                threshold: 0,
                rootMargin: '-64px 0px 0px 0px' // Adjust based on your navbar height
            }
        );

        if (logoElement) {
            observer.observe(logoElement);
        }

        return () => {
            clearInterval(typingInterval);
            if (logoElement) {
                observer.unobserve(logoElement);
            }
        };
    });
</script>

<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
</svelte:head>

<section id="about">
    <div class="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 pt-8 pb-2">
        <div bind:this={logoElement} class="flex flex-col lg:flex-row lg:items-center lg:gap-8 mb-6 min-h-[12rem]">
            <RAILLogo {showMatrix} />
            <h1
                class="h1 font-orbitron text-primary-500 glow-text mt-4 lg:mt-0 text-center lg:text-left typing-cursor"
                class:matrix-title={showMatrix}
                id="myText"
            >
                {displayText}
            </h1>
        </div>

        <p class="text-2xl font-bold pt-1 font-orbitron text-center" class:matrix-text={showMatrix}>
            Connecting Robots to the Human World
        </p>
        <p class="text-md lg:text-xl pt-2 font-opensans">
            RAIL Lab at <a href="https://www.gatech.edu/", target="_blank">Georgia Tech</a>
            focuses on developing intelligent robotic and AI systems that can naturally
            interact with humans in various contexts, from healthcare to manufacturing.
            Through interdisciplinary research combining robotics, artificial intelligence,
            and human factors, we aim to create more intuitive and effective human-robot
            partnerships.
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
        color: #0F0 !important;
    }

    .matrix-text :global(a) {
        color: #0F0 !important;
        text-decoration: underline;
    }

    .matrix-text :global(a:hover) {
        color: #00FF00 !important;
        text-shadow: 0 0 5px #0F0;
    }

    .matrix-title {
        color: white !important;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5),
                    0 0 20px rgba(255, 255, 255, 0.3) !important;
    }
</style>