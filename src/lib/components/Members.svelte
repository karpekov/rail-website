<script>
    import { people } from '$lib/utils/dataLoader';

    // Combine faculty and students
    const allMembers = [...(people?.faculty || []), ...(people?.students || [])];

    // Define degree priority
    const degreePriority = {
        'professor': 0,
        'postdoc': 1,
        'phd': 2,
        'ms': 3,
        'bs': 4
    };

    // Split and sort current members by degree and year_joined
    const currentMembers = allMembers
        .filter(member => member.status === 'current')
        .sort((a, b) => {
            // First compare by degree priority
            const degreeDiff = degreePriority[a.degree] - degreePriority[b.degree];
            if (degreeDiff !== 0) return degreeDiff;

            // If same degree, sort by year_joined (ascending - earlier years first)
            const yearA = a.year_joined || 9999;
            const yearB = b.year_joined || 9999;
            return yearA - yearB;
        });

    // Sort alumni by graduation year descending
    const alumni = allMembers
        .filter(member => member.status === 'alum')
        .sort((a, b) => b.graduation - a.graduation);

    function getProfileLink(member) {
        return member.website || member.linkedin || null;
    }
</script>

<section id="members">
    <h2 class="h2">Lab Members</h2>

    <!-- Current Members -->
    <div class="mb-12">
        <h3 class="h3 mb-6">Current Members</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {#each currentMembers as member}
                <div class="flex flex-col items-center space-y-2 p-3 rounded-lg bg-surface-100-800-token">
                    <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-surface-300-600-token overflow-hidden">
                        <img src={member.photo} alt={member.name} class="w-full h-full object-cover" />
                    </div>

                    <!-- Social Links -->
                    <div class="flex gap-2 mt-2">
                        {#if member.website}
                            <a href={member.website} target="_blank" rel="noopener noreferrer" class="text-sm" title="Personal Website">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                </svg>
                            </a>
                        {/if}
                        {#if member.linkedin}
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" class="text-sm" title="LinkedIn">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                                </svg>
                            </a>
                        {/if}
                        {#if member.github}
                            <a href={member.github} target="_blank" rel="noopener noreferrer" class="text-sm" title="GitHub">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                                </svg>
                            </a>
                        {/if}
                        {#if member.scholar}
                            <a href={member.scholar} target="_blank" rel="noopener noreferrer" class="text-sm" title="Google Scholar">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                                </svg>
                            </a>
                        {/if}
                        {#if member.twitter}
                            <a href={member.twitter} target="_blank" rel="noopener noreferrer" class="text-sm" title="X (Twitter)">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>
                        {/if}
                    </div>

                    <div class="text-center space-y-1">
                        <h4 class="font-bold text-sm sm:text-base">{member.name}</h4>
                        <p class="text-xs sm:text-sm">{member.degree_detail}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Alumni -->
    {#if alumni.length > 0}
        <div>
            <h3 class="h3 mb-6">Lab Alumni</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {#each alumni as member}
                    <div class="flex flex-col items-center space-y-2 p-3 rounded-lg bg-surface-100-800-token">
                        <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-surface-300-600-token overflow-hidden">
                            <img src={member.photo} alt={member.name} class="w-full h-full object-cover" />
                        </div>

                        <!-- Social Links -->
                        <div class="flex gap-2 mt-2">
                            {#if member.website}
                                <a href={member.website} target="_blank" rel="noopener noreferrer" class="text-sm" title="Personal Website">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                    </svg>
                                </a>
                            {/if}
                            {#if member.linkedin}
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" class="text-sm" title="LinkedIn">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                                    </svg>
                                </a>
                            {/if}
                            {#if member.github}
                                <a href={member.github} target="_blank" rel="noopener noreferrer" class="text-sm" title="GitHub">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                                    </svg>
                                </a>
                            {/if}
                            {#if member.scholar}
                                <a href={member.scholar} target="_blank" rel="noopener noreferrer" class="text-sm" title="Google Scholar">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                                    </svg>
                                </a>
                            {/if}
                            {#if member.twitter}
                                <a href={member.twitter} target="_blank" rel="noopener noreferrer" class="text-sm" title="X (Twitter)">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                    </svg>
                                </a>
                            {/if}
                            {#if member.bluesky}
                                <a href={member.bluesky} target="_blank" rel="noopener noreferrer" class="text-sm" title="Bluesky">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M15.41 11.58c.21-.21.21-.55 0-.76l-3.12-3.12a.533.533 0 0 0-.76 0l-3.12 3.12c-.21.21-.21.55 0 .76.21.21.55.21.76 0l2.24-2.24v6.82c0 .3.24.54.54.54s.54-.24.54-.54V9.34l2.24 2.24c.1.1.24.16.38.16s.27-.05.38-.16zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                                    </svg>
                                </a>
                            {/if}
                        </div>

                        <div class="text-center space-y-1">
                            <h4 class="font-bold text-sm sm:text-base">{member.name}</h4>
                            <p class="text-xs sm:text-sm">{member.degree_detail}</p>
                            <div class="text-xs opacity-75">
                                <p>Graduated in {member.graduation}</p>
                                {#if member.next_role}
                                    <p class="mt-1">→ {member.next_role}</p>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</section>