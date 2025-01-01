<script lang="ts">
    import { onMount } from 'svelte';

    // Props
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

    function calculateOptimalFontSize(width: number) {
        // Base font size on screen width
        if (width < 375) return 12;        // Extra small phones
        if (width < 768) return 14;        // Mobile
        if (width < 1024) return 16;       // Tablet
        return 20;                         // Desktop
    }

    function calculateOptimalColumns(width: number, fontSize: number) {
        // Each character needs some padding to prevent overlap
        const charWidth = fontSize * 0.8;  // Increased from 0.7 to ensure no overlap
        return Math.floor(width / charWidth);
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

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Calculate optimal font size and columns
        fontSize = calculateOptimalFontSize(width);
        const columns = calculateOptimalColumns(width, fontSize);

        // Initialize drops with calculated columns
        initializeDrops(columns);

        // Set initial canvas state
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = 'center';  // Center each character in its column
    }

    function draw(timestamp: number) {
        if (timestamp - lastFrameTime < frameDelay) {
            requestAnimationFrame(draw);
            return;
        }

        lastFrameTime = timestamp;

        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = textColor;
        ctx.font = `${fontSize}px monospace`;

        const charWidth = fontSize * 0.8;  // Match the calculation from calculateOptimalColumns

        for (let i = 0; i < drops.length; i++) {
            const char = characters[Math.floor(Math.random() * characters.length)];
            // Center the character in its column
            const x = (i * charWidth) + (charWidth / 2);
            ctx.fillText(char, x, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }

        requestAnimationFrame(draw);
    }

    onMount(() => {
        if (!canvas) return;

        ctx = canvas.getContext('2d')!;
        setupCanvas();

        const resizeObserver = new ResizeObserver(() => {
            setupCanvas();
        });
        resizeObserver.observe(canvas);

        requestAnimationFrame(draw);

        return () => {
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

