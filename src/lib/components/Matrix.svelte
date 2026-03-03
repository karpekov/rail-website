<script lang="ts">
    import { onMount } from 'svelte';

    export let frameDelay = 50;
    export let textColor = '#0F0';
    export let backgroundColor = 'black';
    export let opacity = 0.05;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789あいうえおかきくけこさしすせそたちつてとなにぬねのはゆよらりるれろわをん";
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let drops: number[] = [];
    let lastFrameTime = 0;
    let fontSize: number;
    let animFrameId: number;

    function calculateOptimalFontSize(width: number) {
        if (width < 375) return 12;
        if (width < 768) return 14;
        if (width < 1024) return 16;
        return 20;
    }

    function calculateOptimalColumns(width: number, fontSize: number) {
        return Math.floor(width / (fontSize * 0.8));
    }

    function initializeDrops(columns: number) {
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = -Math.floor(Math.random() * canvas.height / fontSize);
        }
    }

    function setupCanvas() {
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        fontSize = calculateOptimalFontSize(width);
        const columns = calculateOptimalColumns(width, fontSize);
        initializeDrops(columns);
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = 'center';
    }

    function draw(timestamp: number) {
        if (timestamp - lastFrameTime < frameDelay) {
            animFrameId = requestAnimationFrame(draw);
            return;
        }
        lastFrameTime = timestamp;

        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = textColor;
        ctx.font = `${fontSize}px monospace`;

        const charWidth = fontSize * 0.8;
        for (let i = 0; i < drops.length; i++) {
            const char = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(char, (i * charWidth) + (charWidth / 2), drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }

        animFrameId = requestAnimationFrame(draw);
    }

    onMount(() => {
        if (!canvas) return;

        ctx = canvas.getContext('2d')!;
        setupCanvas();

        const resizeObserver = new ResizeObserver(() => setupCanvas());
        resizeObserver.observe(canvas);

        function handleVisibilityChange() {
            if (document.hidden) {
                cancelAnimationFrame(animFrameId);
            } else {
                lastFrameTime = 0;
                animFrameId = requestAnimationFrame(draw);
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);
        animFrameId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animFrameId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            resizeObserver.disconnect();
        };
    });
</script>

<canvas
    bind:this={canvas}
    class="w-full h-full"
    style="background-color: {backgroundColor};"
/>

<style>
    canvas {
        display: block;
        image-rendering: pixelated;
    }
</style>
