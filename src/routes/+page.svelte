<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import ScriptCard from '$lib/components/ScriptCard.svelte';
    import { scripts, fetchScripts, isLoading } from '$lib/stores/scriptStore';
    import type { Script } from '$lib/data/scripts';
    import { onMount } from 'svelte';
    
    // Get featured scripts (top 4 by download count)
    let featuredScripts: Script[] = [];
    
    // Fetch scripts on mount
    onMount(() => {
        fetchScripts();
    });
    
    $: {
        featuredScripts = [...$scripts]
            .sort((a, b) => b.downloadCount - a.downloadCount)
            .slice(0, 4);
    }
</script>

<svelte:head>
    <title>AutoHub - Python Automation Scripts</title>
    <meta name="description" content="Browse, search, and download curated Python automation scripts for web scraping, file automation, and more." />
</svelte:head>

<Header />

<main class="min-h-screen">    <section class="py-20 bg-blue-600 dark:bg-blue-800 text-white text-center">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Discover Python Automation Scripts</h1>
            <p class="text-xl mb-8 text-white/90">Browse, search, and download curated Python scripts to automate your tasks.</p><div class="flex flex-col sm:flex-row gap-4 justify-center">                <a href="/scripts" class="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 px-6 py-3 transition-all shadow-sm hover:shadow text-sm font-medium flex items-center justify-center">
                    <i class="fas fa-search mr-2"></i> Browse Scripts
                </a>
                <a href="/submit" class="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 px-6 py-3 transition-all shadow-sm hover:shadow text-sm font-medium flex items-center justify-center">
                    <i class="fas fa-upload mr-2"></i> Submit Your Script
                </a>
            </div>
        </div>
    </section>
      <section class="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12 dark:text-white">Why Use AutoHub?</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                    <div class="inline-block p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">
                        <i class="fas fa-search text-3xl text-blue-600 dark:text-blue-400"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 dark:text-white">Discover</h3>
                    <p class="text-gray-600 dark:text-gray-300">Find automation scripts for various tasks from web scraping to file operations.</p>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                    <div class="inline-block p-3 bg-green-100 dark:bg-green-900/50 rounded-full mb-4">
                        <i class="fas fa-download text-3xl text-green-600 dark:text-green-400"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 dark:text-white">Download</h3>
                    <p class="text-gray-600 dark:text-gray-300">Easily download ready-to-use Python scripts to solve your automation needs.</p>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                    <div class="inline-block p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full mb-4">
                        <i class="fas fa-share-alt text-3xl text-purple-600 dark:text-purple-400"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 dark:text-white">Share</h3>
                    <p class="text-gray-600 dark:text-gray-300">Contribute your own automation scripts to help the Python community.</p>
                </div>
            </div>
        </div>
    </section>
      <section class="py-16 bg-gray-100 dark:bg-gray-800">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">Featured Scripts</h2>
            
            {#if $isLoading}
                <div class="text-center py-12">
                    <div class="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p>Loading scripts...</p>
                </div>
            {:else if featuredScripts.length === 0}
                <div class="text-center py-12">
                    <p class="mb-4">No scripts found. Be the first to submit one!</p>
                    <a href="/submit" class="bg-primary text-white hover:bg-primary-dark px-6 py-2 rounded-lg transition-colors">Submit a Script</a>
                </div>
            {:else}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {#each featuredScripts as script}
                        <div>
                            <ScriptCard {script} />
                        </div>
                    {/each}
                </div>
            {/if}        <div class="text-center mt-8">
                <a href="/scripts" class="inline-flex items-center border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 transition-all shadow-sm hover:shadow text-sm font-medium">
                    <i class="fas fa-list mr-2"></i> View All Scripts
                </a>
            </div>        </div>    
    </section>
</main>

<Footer />

<style>
    /* All styling handled by Tailwind CSS classes */
</style>
