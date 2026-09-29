<script lang="ts">
    import { onDestroy } from 'svelte';
    import { people, labRobots } from '$lib/utils/dataLoader';
    import RobotPortrait from '$lib/components/RobotPortrait.svelte';
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

    const allOrderedMembers = currentMembers.slice().sort((a, b) => {
        const diff = degreePriority[a.degree] - degreePriority[b.degree];
        return diff !== 0 ? diff : (a.year_joined || 9999) - (b.year_joined || 9999);
    });

    function getProfileLink(member) {
        return member.website || member.linkedin || null;
    }

    // Two lines when a name splits cleanly. One word stays on a single line.
    // A very long given name keeps the first word up top and the rest below.
    function nameLines(name: string): [string, string] {
        const parts = name.trim().split(/\s+/).filter(Boolean);
        if (parts.length <= 1) return [parts[0] || '', ''];
        // "Stretch 4" is one name; the digit is not a last name.
        if (/^\d+$/.test(parts[parts.length - 1])) return [parts.join(' '), ''];
        if (parts.length === 2) return [parts[0], parts[1]];
        const given = parts.slice(0, -1).join(' ');
        if (given.length > 16) return [parts[0], parts.slice(1).join(' ')];
        return [given, parts[parts.length - 1]];
    }

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

    onDestroy(() => {
        clearFlipTimeouts();
    });
</script>

<section id="current-members">
    <div class="members-wrap">
        <h2 class="hero-members-heading">
            <span>Current RAIL Lab Members.</span>
            <a href="#members" class="hero-members-link" on:click|preventDefault={scrollToMembers}>
                <span class="link-long">More info and alums <span class="here">here</span>.</span>
                <span class="link-short">More info <span class="here">here</span>.</span>
            </a>
        </h2>

        <div class="members-slot">
        <div class="members-flow">
                {#each allOrderedMembers as member, i}
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
                                                    loading={i < 9 ? 'eager' : 'lazy'}
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
                        <div class="member-caption">
                            <p class="member-name">
                                <span>{nameLines(member.name)[0]}</span>
                                <span>{nameLines(member.name)[1] || '\u00a0'}</span>
                            </p>
                            <p class="member-meta">{member.degree_detail}</p>
                        </div>
                    </div>
                {/each}

        {#if labRobots.some(robot => robot.status !== 'alum')}
                {#each labRobots.filter(robot => robot.status !== 'alum') as robot}
                    {@const robotLines = nameLines(robot.name)}
                    <div class="person-card">
                        {#if robot.video}
                            <a href={robot.video} target="_blank" rel="noopener noreferrer" class="block"
                                on:click={() => trackEvent('member_card_click', { member_name: robot.name, section: 'hero' })}>
                                <div class="person-card-image">
                                    <RobotPortrait
                                        photo={robot.photo}
                                        gif={robot.gif}
                                        alt={robot.name}
                                        width="112"
                                        height="112"
                                        loading="lazy"
                                    />
                                </div>
                            </a>
                        {:else}
                            <div class="person-card-image">
                                <RobotPortrait
                                    photo={robot.photo}
                                    gif={robot.gif}
                                    alt={robot.name}
                                    width="112"
                                    height="112"
                                    loading="lazy"
                                />
                            </div>
                        {/if}
                        <div class="member-caption">
                            <p class="member-name">
                                <span>{robotLines[0]}</span>
                                {#if robotLines[1]}<span>{robotLines[1]}</span>{/if}
                            </p>
                            <p class="member-meta">{robot.company_name}</p>
                        </div>
                    </div>
                {/each}
        {/if}
        </div>
        </div>
    </div>
</section>

<style>
    .members-wrap {
        width: 100%;
        max-width: 80rem;
        margin-inline: auto;
        padding-inline: 0.5rem;
    }

    .members-slot {
        container-type: inline-size;
        container-name: members;
        width: 100%;
    }

    /* 5 across on phones, 6 on medium, 9 on wide.
       A short last row is centered. A last row of 3 or fewer stays on the left. */
    .members-flow {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        column-gap: 0.65rem;
        row-gap: 0.5rem;
        width: 100%;
        margin-inline: auto;
    }

    .person-card {
        container-type: inline-size;
        transition: transform 0.3s ease-in-out;
        flex: 0 0 calc((100% - 4 * 0.65rem) / 5);
        width: calc((100% - 4 * 0.65rem) / 5);
        max-width: none;
        @apply flex flex-col items-center gap-1;
    }

    @container (max-width: 539px) {
        .members-flow:has(> :nth-child(5n + 1):last-child),
        .members-flow:has(> :nth-child(5n + 2):last-child),
        .members-flow:has(> :nth-child(5n + 3):last-child) {
            justify-content: flex-start;
        }
    }

    @container (min-width: 540px) and (max-width: 979px) {
        .members-flow {
            column-gap: 0.7rem;
            row-gap: 0.65rem;
        }

        .person-card {
            flex-basis: calc((100% - 5 * 0.7rem) / 6);
            width: calc((100% - 5 * 0.7rem) / 6);
        }

        .members-flow:has(> :nth-child(6n + 1):last-child),
        .members-flow:has(> :nth-child(6n + 2):last-child),
        .members-flow:has(> :nth-child(6n + 3):last-child) {
            justify-content: flex-start;
        }
    }

    @container (min-width: 980px) {
        .members-flow {
            column-gap: 0.65rem;
            row-gap: 0.7rem;
            max-width: 66rem;
        }

        .person-card {
            flex-basis: calc((100% - 8 * 0.65rem) / 9);
            width: calc((100% - 8 * 0.65rem) / 9);
        }

        .members-flow:has(> :nth-child(9n + 1):last-child),
        .members-flow:has(> :nth-child(9n + 2):last-child),
        .members-flow:has(> :nth-child(9n + 3):last-child) {
            justify-content: flex-start;
        }
    }

    .person-card > a {
        display: block;
        width: min(100%, 6.75rem);
        margin-inline: auto;
    }

    .person-card-image {
        width: min(100%, 6.75rem);
        margin-inline: auto;
        aspect-ratio: 1;
        @apply rounded-full overflow-hidden transition-all;
    }

    @container members (min-width: 980px) {
        .person-card > a .person-card-image,
        .person-card > .person-card-image {
            width: 90%;
            max-width: 6.75rem;
            margin-inline: auto;
        }
    }

    .member-caption {
        width: 100%;
        max-width: 6.75rem;
        text-align: center;
    }

    .member-name {
        font-weight: 600;
        line-height: 1.15;
        font-size: clamp(9px, 14cqi, 13px);
    }

    .member-name span {
        display: block;
    }

    .member-meta {
        line-height: 1.15;
        font-size: clamp(8px, 11.5cqi, 11px);
        opacity: 0.75;
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

    .hero-members-heading {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: baseline;
        gap: 0.35rem;
        margin-top: 1rem;
        margin-bottom: 1.25rem;
        white-space: nowrap;
        text-align: center;
        font-size: clamp(11.5px, 3.9vw, 16px);
        line-height: 1.25;
        font-weight: 700;
    }

    @media (min-width: 640px) {
        .hero-members-heading {
            margin-top: 0;
            margin-bottom: 0.75rem;
            font-size: 16px;
        }
    }

    @media (min-width: 768px) {
        .hero-members-heading {
            margin-bottom: 1rem;
        }
    }

    .link-short {
        display: inline;
    }

    .link-long {
        display: none;
    }

    @media (min-width: 640px) {
        .link-short {
            display: none;
        }

        .link-long {
            display: inline;
        }
    }

    .here {
        text-decoration: underline;
        text-underline-offset: 2px;
    }

    .hero-members-link {
        color: rgb(var(--color-primary-500));
    }

    .hero-members-link:hover {
        color: rgb(var(--color-primary-600));
    }

    /* Dark theme headings are bright yellow. This line should read like light
       mode: normal text, with a softer gold on the link. */
    :global(.dark-theme) .hero-members-heading {
        color: var(--dk-text) !important;
        text-shadow: none !important;
    }

    :global(.dark-theme) .hero-members-link {
        color: #d9c49a !important;
        text-shadow: none !important;
        transition: color 0.15s ease;
    }

    :global(.dark-theme) .hero-members-link:hover {
        color: rgb(var(--color-primary-400)) !important;
    }

    :global(.matrix-theme) .hero-members-link {
        color: var(--mx-accent) !important;
    }

    :global(.matrix-theme) .hero-members-link:hover {
        text-shadow: 0 0 10px var(--mx-accent-half);
    }
</style>
