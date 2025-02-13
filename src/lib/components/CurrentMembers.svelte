<script lang="ts">
    import { people } from '$lib/utils/dataLoader';
    export let showMatrix = false;

    function scrollToMembers() {
        const section = document.getElementById('members');
        if (section) {
            const navbar = document.querySelector('.sticky');
            const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
            const extraPadding = 24;
            const offset = navbarHeight + extraPadding;

            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    function getRandomRobotAvatar() {
        const robotIndex = Math.floor(Math.random() * 24); // 0 to 23
        return `/images/robots/robot${robotIndex}_white.svg`;
    }

    // Filter current members
    const currentMembers = [...(people?.faculty || []), ...(people?.students || [])]
        .filter(member => member.status === 'current');

    // Define degree priority and senior roles
    const degreePriority = {
        'professor': 0,
        'postdoc': 1,
        'phd': 2,
        'ms': 3,
        'bs': 4
    };

    // Split members into senior (professor/postdoc/phd) and junior (others)
    const seniorMembers = currentMembers
        .filter(member => ['professor', 'postdoc', 'phd'].includes(member.degree))
        .sort((a, b) => {
            const degreeDiff = degreePriority[a.degree] - degreePriority[b.degree];
            if (degreeDiff !== 0) return degreeDiff;
            const yearA = a.year_joined || 9999;
            const yearB = b.year_joined || 9999;
            return yearA - yearB;
        });

    const juniorMembers = currentMembers
        .filter(member => !['professor', 'postdoc', 'phd'].includes(member.degree))
        .sort((a, b) => {
            const degreeDiff = degreePriority[a.degree] - degreePriority[b.degree];
            if (degreeDiff !== 0) return degreeDiff;
            const yearA = a.year_joined || 9999;
            const yearB = b.year_joined || 9999;
            return yearA - yearB;
        });

    function getProfileLink(member) {
        return member.website || member.linkedin || null;
    }
</script>

<section id="current-members">
    <div class="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <h2 class="text-center mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row justify-center items-center gap-1">
            Current RAIL Lab Members.
            <a
                href="#members"
                on:click|preventDefault={scrollToMembers}
                class:text-primary-500={!showMatrix}
                class:hover:text-primary-600={!showMatrix}
                class:matrix-link={showMatrix}
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
                            <a href={getProfileLink(member)} target="_blank" rel="noopener noreferrer" class="block">
                                <div class="person-card-image">
                                    <div class="flip-container">
                                        <div class="flipper">
                                            <div class="front">
                                                <img
                                                    src={showMatrix ? getRandomRobotAvatar() : member.photo}
                                                    alt={member.name}
                                                    class:robot-avatar={showMatrix}
                                                    class="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div class="back">
                                                <img
                                                    src={member.photo}
                                                    alt={member.name}
                                                    class="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        {:else}
                            <div class="person-card-image">
                                <div class="flip-container">
                                    <div class="flipper">
                                        <div class="front">
                                            <img
                                                src={showMatrix ? getRandomRobotAvatar() : member.photo}
                                                alt={member.name}
                                                class:robot-avatar={showMatrix}
                                                class="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div class="back">
                                            <img
                                                src={member.photo}
                                                alt={member.name}
                                                class="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/if}
                        <div class="text-center space-y-0 sm:space-y-0.5 w-full">
                            <p class="font-semibold text-center text-[12px] sm:text-[14px] break-words leading-none">
                                {member.name.split(' ').length > 2 ?
                                    member.name :
                                    member.name.split(' ').join('\n')}
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
                            <a href={getProfileLink(member)} target="_blank" rel="noopener noreferrer" class="block">
                                <div class="person-card-image">
                                    <div class="flip-container">
                                        <div class="flipper">
                                            <div class="front">
                                                <img
                                                    src={showMatrix ? getRandomRobotAvatar() : member.photo}
                                                    alt={member.name}
                                                    class:robot-avatar={showMatrix}
                                                    class="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div class="back">
                                                <img
                                                    src={member.photo}
                                                    alt={member.name}
                                                    class="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        {:else}
                            <div class="person-card-image">
                                <div class="flip-container">
                                    <div class="flipper">
                                        <div class="front">
                                            <img
                                                src={showMatrix ? getRandomRobotAvatar() : member.photo}
                                                alt={member.name}
                                                class:robot-avatar={showMatrix}
                                                class="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div class="back">
                                            <img
                                                src={member.photo}
                                                alt={member.name}
                                                class="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/if}
                        <div class="text-center space-y-0 sm:space-y-0.5 w-full">
                            <p class="font-semibold text-center text-[12px] sm:text-[14px] break-words leading-none">
                                {member.name.split(' ').length > 2 ?
                                    member.name :
                                    member.name.split(' ').join('\n')}
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

    /* Default ring style */
    :global(:not(.matrix-theme)) .person-card-image {
        @apply ring-2 ring-primary-500 hover:ring-4 hover:ring-primary-500;
    }

    /* Matrix theme ring style */
    :global(.matrix-theme) .person-card-image {
        @apply ring-2 hover:ring-4;
        --ring-color: #0F0;
        box-shadow: 0 0 0 2px #0F0;
    }

    :global(.matrix-theme) .person-card-image:hover {
        box-shadow: 0 0 0 4px #0F0, 0 0 10px #0F0;
    }

    .flip-container {
        @apply w-full h-full perspective-1000;
    }

    :global(.matrix-theme) .person-card-image:hover .flipper {
        transform: rotateY(180deg);
    }

    .flipper {
        @apply relative w-full h-full transition-transform duration-500;
        transform-style: preserve-3d;
    }

    .front, .back {
        @apply absolute w-full h-full backface-hidden rounded-full overflow-hidden;
    }

    .back {
        transform: rotateY(180deg);
    }

    /* Add these Tailwind utilities */
    .perspective-1000 {
        perspective: 1000px;
    }

    .backface-hidden {
        backface-visibility: hidden;
    }

    .robot-avatar {
        transform: scale(0.85);
    }

    .matrix-link {
        color: #0F0 !important;
        transition: all 0.2s ease;
    }

    .matrix-link:hover {
        color: #00FF00 !important;
        text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
    }
</style>
