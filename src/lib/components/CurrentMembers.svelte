<script lang="ts">
    import { onDestroy } from 'svelte';
    import { people } from '$lib/utils/dataLoader';
    import { showMatrix, showDark } from '$lib/stores/theme';
    import { trackEvent } from '$lib/utils/analytics';

    function scrollToMembers() {
        const section = document.getElementById('members');
        if (section) {
            const navbar = document.querySelector('.sticky');
            const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
            const offset = navbarHeight + 24;
            const offsetPosition = section.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    }

    function getRandomRobotAvatar() {
        const robotIndex = Math.floor(Math.random() * 24);
        return `/images/robots/robot${robotIndex}_white.svg`;
    }

    const currentMembers = [...(people?.faculty || []), ...(people?.students || [])]
        .filter(member => member.status === 'current');

    const degreePriority = { professor: 0, postdoc: 1, phd: 2, ms: 3, bs: 4 };

    const seniorMembers = currentMembers
        .filter(member => ['professor', 'postdoc', 'phd'].includes(member.degree))
        .sort((a, b) => {
            const diff = degreePriority[a.degree] - degreePriority[b.degree];
            return diff !== 0 ? diff : (a.year_joined || 9999) - (b.year_joined || 9999);
        });

    const juniorMembers = currentMembers
        .filter(member => !['professor', 'postdoc', 'phd'].includes(member.degree))
        .sort((a, b) => {
            const diff = degreePriority[a.degree] - degreePriority[b.degree];
            return diff !== 0 ? diff : (a.year_joined || 9999) - (b.year_joined || 9999);
        });

    function getProfileLink(member) {
        return member.website || member.linkedin || null;
    }

    // Pre-assign a robot avatar to each member so it stays stable across re-renders
    const allOrderedMembers = [...seniorMembers, ...juniorMembers];
    const robotAvatarMap = new Map(
        allOrderedMembers.map(member => [member.name, getRandomRobotAvatar()])
    );

    // Track which members have been flipped to robot
    let flippedMembers = new Set<string>();
    let flipTimeouts: ReturnType<typeof setTimeout>[] = [];

    function clearFlipTimeouts() {
        flipTimeouts.forEach(t => clearTimeout(t));
        flipTimeouts = [];
    }

    function startSequentialFlip() {
        clearFlipTimeouts();
        flippedMembers = new Set();
        allOrderedMembers.forEach((member, i) => {
            const t = setTimeout(() => {
                flippedMembers = new Set([...flippedMembers, member.name]);
            }, i * 150);
            flipTimeouts.push(t);
        });
    }

    $: if ($showMatrix) {
        startSequentialFlip();
    } else {
        clearFlipTimeouts();
        flippedMembers = new Set();
    }

    onDestroy(() => clearFlipTimeouts());
</script>

<section id="current-members">
    <div class="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <h2 class="text-center mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row justify-center items-center gap-1">
            Current RAIL Lab Members.
            <a
                href="#members"
                on:click|preventDefault={scrollToMembers}
                class:text-primary-500={!$showMatrix && !$showDark}
                class:hover:text-primary-600={!$showMatrix && !$showDark}
                class:matrix-link={$showMatrix}
                class:dark-link={$showDark && !$showMatrix}
            >
                More info and alums here.
            </a>
        </h2>

        <!-- Senior Members Row -->
        <div class="mb-4">
            <div class="flex flex-wrap justify-center gap-1 sm:gap-6">
                {#each seniorMembers as member}
                    <div class="person-card">
                        {#if getProfileLink(member)}
                            <a href={getProfileLink(member)} target="_blank" rel="noopener noreferrer" class="block"
                                on:click={() => trackEvent('member_card_click', { member_name: member.name, section: 'hero' })}>
                                <div class="person-card-image">
                                    <div class="flip-container">
                                        <div class="flipper" class:flipped={flippedMembers.has(member.name)}>
                                            <div class="front">
                                                <img
                                                    src={member.photo}
                                                    alt={member.name}
                                                    class="w-full h-full object-cover"
                                                    width="112" height="112"
                                                    loading="eager"
                                                />
                                            </div>
                                            <div class="back">
                                                <img
                                                    src={robotAvatarMap.get(member.name)}
                                                    alt={member.name}
                                                    class="robot-avatar w-full h-full object-cover"
                                                    width="112" height="112"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        {:else}
                            <div class="person-card-image">
                                <div class="flip-container">
                                    <div class="flipper" class:flipped={flippedMembers.has(member.name)}>
                                        <div class="front">
                                            <img
                                                src={member.photo}
                                                alt={member.name}
                                                class="w-full h-full object-cover"
                                                width="112" height="112"
                                                loading="eager"
                                            />
                                        </div>
                                        <div class="back">
                                            <img
                                                src={robotAvatarMap.get(member.name)}
                                                alt={member.name}
                                                class="robot-avatar w-full h-full object-cover"
                                                width="112" height="112"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/if}
                        <div class="text-center space-y-0 sm:space-y-0.5 w-full">
                            <p class="font-semibold text-center text-[12px] sm:text-[14px] break-words leading-none">
                                {member.name.split(' ').length > 2 ? member.name : member.name.split(' ').join('\n')}
                            </p>
                            <p class="text-[11px] sm:text-xs text-center opacity-75 break-words -mt-1 sm:mt-0">{member.degree_detail}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Junior Members Row -->
        {#if juniorMembers.length > 0}
            <div class="flex flex-wrap justify-center gap-1 sm:gap-6">
                {#each juniorMembers as member}
                    <div class="person-card">
                        {#if getProfileLink(member)}
                            <a href={getProfileLink(member)} target="_blank" rel="noopener noreferrer" class="block"
                                on:click={() => trackEvent('member_card_click', { member_name: member.name, section: 'hero' })}>
                                <div class="person-card-image">
                                    <div class="flip-container">
                                        <div class="flipper" class:flipped={flippedMembers.has(member.name)}>
                                            <div class="front">
                                                <img
                                                    src={member.photo}
                                                    alt={member.name}
                                                    class="w-full h-full object-cover"
                                                    width="64" height="64"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div class="back">
                                                <img
                                                    src={robotAvatarMap.get(member.name)}
                                                    alt={member.name}
                                                    class="robot-avatar w-full h-full object-cover"
                                                    width="64" height="64"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        {:else}
                            <div class="person-card-image">
                                <div class="flip-container">
                                    <div class="flipper" class:flipped={flippedMembers.has(member.name)}>
                                        <div class="front">
                                            <img
                                                src={member.photo}
                                                alt={member.name}
                                                class="w-full h-full object-cover"
                                                width="64" height="64"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div class="back">
                                            <img
                                                src={robotAvatarMap.get(member.name)}
                                                alt={member.name}
                                                class="robot-avatar w-full h-full object-cover"
                                                width="64" height="64"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/if}
                        <div class="text-center space-y-0 sm:space-y-0.5 w-full">
                            <p class="font-semibold text-center text-[12px] sm:text-[14px] break-words leading-none">
                                {member.name.split(' ').length > 2 ? member.name : member.name.split(' ').join('\n')}
                            </p>
                            <p class="text-[11px] sm:text-xs text-center opacity-75 break-words -mt-1 sm:mt-0">{member.degree_detail}</p>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</section>

<style>
    .person-card {
        transition: all 0.3s ease-in-out;
        @apply flex flex-col items-center space-y-2 w-20 sm:w-28;
    }

    .person-card-image {
        @apply w-16 h-16 sm:w-28 sm:h-28 rounded-full overflow-hidden transition-all;
    }

    :global(:not(.matrix-theme)) .person-card-image {
        /* outline renders in its own layer — not clipped by overflow:hidden
           or scaled away by transform — stays visible at all times */
        outline: 3px solid rgb(var(--color-primary-400));
        outline-offset: 0px;
        transition: outline-color 0.25s ease, outline-width 0.25s ease,
                    box-shadow 0.25s ease, transform 0.25s ease;
    }

    :global(:not(.matrix-theme)) .person-card-image:hover {
        outline: 3px solid rgb(var(--color-primary-400));
        outline-offset: 0px;
        box-shadow: 0 0 14px rgba(var(--color-primary-500), 0.35);
        transform: scale(1.07);
    }

    :global(.matrix-theme) .person-card-image {
        outline: 3px solid var(--mx-accent);
        outline-offset: 0px;
        transition: outline-color 0.25s ease, outline-width 0.25s ease,
                    box-shadow 0.25s ease, transform 0.25s ease;
    }

    :global(.matrix-theme) .person-card-image:hover {
        outline: 2px solid var(--mx-accent);
        box-shadow: var(--mx-glow-sm);
        transform: scale(1.07);
    }

    .flip-container {
        @apply w-full h-full;
        perspective: 1000px;
    }

    .flipper {
        @apply relative w-full h-full;
        transform-style: preserve-3d;
        transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
    }

    .flipper.flipped {
        transform: rotateY(180deg);
    }

    /* Hovering a converted card peeks back at the photo */
    :global(.matrix-theme) .person-card-image:hover .flipper.flipped {
        transform: rotateY(0deg);
    }

    .front, .back {
        @apply absolute w-full h-full rounded-full overflow-hidden;
        backface-visibility: hidden;
    }

    .back {
        transform: rotateY(180deg);
    }

    .robot-avatar {
        transform: scale(0.85);
    }

    .matrix-link {
        color: var(--mx-accent) !important;
        transition: all 0.2s ease;
    }

    .matrix-link:hover {
        color: var(--mx-accent) !important;
        text-shadow: 0 0 10px var(--mx-accent-half);
    }

    .dark-link {
        color: rgb(var(--color-primary-400));
        text-decoration: underline;
        text-decoration-color: rgba(232, 168, 0, 0.5);
        text-underline-offset: 3px;
        transition: color 0.2s ease, text-decoration-color 0.2s ease;
    }

    .dark-link:hover {
        color: var(--dk-text);
        text-decoration-color: rgba(237, 229, 204, 0.6);
    }
</style>
