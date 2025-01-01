<script lang="ts">
    import { people } from '$lib/utils/dataLoader';
    export let showMatrix = false;

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
        <h2 class="text-center mb-4 sm:mb-6 md:mb-8">Current RAIL Lab Members:</h2>

        <!-- Senior Members Row -->
        <div class="mb-8">
            <div class="flex flex-wrap justify-center gap-6">
                {#each seniorMembers as member}
                    <div class="person-card">
                        {#if getProfileLink(member)}
                            <a href={getProfileLink(member)} target="_blank" rel="noopener noreferrer" class="block">
                                <div class="person-card-image">
                                    <img
                                        src={showMatrix ? "/images/people/robot.jpg" : member.photo}
                                        alt={member.name}
                                        class="w-full h-full object-cover"
                                    />
                                </div>
                            </a>
                        {:else}
                            <div class="person-card-image">
                                <img
                                    src={showMatrix ? "/images/people/robot.jpg" : member.photo}
                                    alt={member.name}
                                    class="w-full h-full object-cover"
                                />
                            </div>
                        {/if}
                        <p class="font-semibold text-center text-sm break-words">{member.alias}</p>
                        <p class="text-xs text-center opacity-75 break-words">{member.degree_detail}</p>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Junior Members Row -->
        {#if juniorMembers.length > 0}
            <div class="flex flex-wrap justify-center gap-6">
                {#each juniorMembers as member}
                    <div class="person-card">
                        {#if getProfileLink(member)}
                            <a href={getProfileLink(member)} target="_blank" rel="noopener noreferrer" class="block">
                                <div class="person-card-image">
                                    <img
                                        src={showMatrix ? "/images/people/robot.jpg" : member.photo}
                                        alt={member.name}
                                        class="w-full h-full object-cover"
                                    />
                                </div>
                            </a>
                        {:else}
                            <div class="person-card-image">
                                <img
                                    src={showMatrix ? "/images/people/robot.jpg" : member.photo}
                                    alt={member.name}
                                    class="w-full h-full object-cover"
                                />
                            </div>
                        {/if}
                        <p class="font-semibold text-center text-sm break-words">{member.name}</p>
                        <p class="text-xs text-center opacity-75 break-words">{member.degree_detail}</p>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</section>

<style>
    .person-card {
        transition: all 0.3s ease-in-out;
        @apply flex flex-col items-center space-y-2 w-14 sm:w-20;
    }

    .person-card-image {
        @apply w-14 h-14 sm:w-20 sm:h-20 rounded-full ring-2 ring-primary-500 overflow-hidden hover:ring-4 hover:ring-primary-500 transition-all;
    }
</style>
