<!-- Scripts browse page -->
<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import ScriptCard from '$lib/components/ScriptCard.svelte';
    import SearchFilters from '$lib/components/SearchFilters.svelte';
    import { filteredScripts, filterScripts, fetchScripts, isLoading, error } from '$lib/stores/scriptStore';    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import type { ScriptCategory } from '$lib/data/scripts';
      // Fetch scripts and reset filters on page load
    onMount(async () => {
        // Fetch scripts from the database
        await fetchScripts();
        filterScripts('', []);
    });
</script>

<svelte:head>
    <title>Browse Scripts - AutoHub</title>
    <meta name="description" content="Browse and search through our collection of Python automation scripts." />
</svelte:head>

<Header />

<main class="min-h-screen">
    <section class="bg-gray-800 text-white py-12">
        <div class="container mx-auto px-4">
            <h1 class="text-3xl md:text-4xl font-bold mb-2">Browse Scripts</h1>
            <p class="text-xl text-gray-300">Discover and download Python automation scripts for your projects</p>
        </div>
    </section>
    
    <section class="py-12">
        <div class="container mx-auto px-4">
            <div class="mb-8">
                <SearchFilters />
            </div>
            
            <div>
                {#if $isLoading}
                    <div class="text-center py-16">
                        <div class="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p class="text-lg">Loading scripts...</p>
                    </div>
                {:else if $error}
                    <div class="text-center py-16">
                        <i class="fas fa-exclamation-circle text-5xl text-danger mb-4"></i>
                        <h3 class="text-xl font-bold mb-2">Error Loading Scripts</h3>
                        <p class="mb-6 text-gray-600 dark:text-gray-300">{$error}</p>
                        <button class="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors" on:click={() => fetchScripts()}>
                            Try Again
                        </button>
                    </div>
                {:else if $filteredScripts.length === 0}
                    <div class="text-center py-16">
                        <i class="fas fa-search text-5xl text-gray-400 mb-4"></i>
                        <h3 class="text-xl font-bold mb-2">No Scripts Found</h3>
                        <p class="mb-6 text-gray-600 dark:text-gray-300">Try adjusting your search criteria or browse all scripts.</p>
                        <button class="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors" on:click={() => filterScripts('', [])}>
                            View All Scripts
                        </button>
                    </div>
                {:else}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {#each $filteredScripts as script}
                            <div>
                                <ScriptCard {script} />
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </section>
</main>

<Footer />

<style>
    /* All styling handled by Tailwind CSS classes */
</style>
