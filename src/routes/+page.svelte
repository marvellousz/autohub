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

<main class="min-h-screen">    <section class="py-24 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 text-white text-center relative overflow-hidden">
        <!-- Animated background elements -->
        <div class="absolute inset-0 bg-black/20"></div>
        <div class="absolute top-0 left-0 w-full h-full">
            <div class="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
            <div class="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style="animation-delay: 2s;"></div>
            <div class="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float" style="animation-delay: 4s;"></div>
            <div class="absolute bottom-32 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-float" style="animation-delay: 1s;"></div>
        </div>
        
        <div class="container mx-auto px-4 relative z-10">
            <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-glow">Discover Python Automation Scripts</h1>
            <p class="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">Browse, search, and download curated Python scripts to automate your tasks. Join our community of developers building the future of automation.</p>
            
            <div class="flex flex-col sm:flex-row gap-6 justify-center">
                <a href="/scripts" class="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white hover:bg-white/30 px-8 py-4 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg font-semibold flex items-center justify-center group hover:scale-105">
                    <i class="fas fa-search mr-3 text-xl group-hover:scale-110 transition-transform"></i> Browse Scripts
                </a>
                <a href="/submit" class="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white hover:bg-white/30 px-8 py-4 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg font-semibold flex items-center justify-center group hover:scale-105">
                    <i class="fas fa-upload mr-3 text-xl group-hover:scale-110 transition-transform"></i> Submit Your Script
                </a>
            </div>
        </div>
    </section>
      <section class="py-20 bg-gradient-to-b from-primary-50 via-white to-primary-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-16 dark:text-white">
                <span class="gradient-text">Why Use AutoHub?</span>
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center card-hover border border-primary-200 dark:border-primary-800 group">
                    <div class="inline-block p-4 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-search text-4xl text-primary-600 dark:text-primary-400"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Discover</h3>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">Find automation scripts for various tasks from web scraping to file operations. Explore our curated collection of high-quality Python scripts.</p>
                </div>
                
                <div class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center card-hover border border-primary-200 dark:border-primary-800 group">
                    <div class="inline-block p-4 bg-gradient-to-br from-secondary-100 to-accent-100 dark:from-secondary-900/50 dark:to-accent-900/50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-download text-4xl text-secondary-600 dark:text-secondary-400"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 dark:text-white group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors">Download</h3>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">Easily download ready-to-use Python scripts to solve your automation needs. One-click downloads with instant access to source code.</p>
                </div>
                
                <div class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center card-hover border border-primary-200 dark:border-primary-800 group">
                    <div class="inline-block p-4 bg-gradient-to-br from-accent-100 to-primary-100 dark:from-accent-900/50 dark:to-primary-900/50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-share-alt text-4xl text-accent-600 dark:text-accent-400"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">Share</h3>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">Contribute your own automation scripts to help the Python community. Build your reputation as a developer and help others.</p>
                </div>
            </div>
        </div>
    </section>
      <section class="py-20 bg-gradient-to-b from-primary-50 via-white to-primary-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-16 dark:text-white">
                <span class="gradient-text">Featured Scripts</span>
            </h2>
            
            {#if $isLoading}
                <div class="text-center py-16">
                    <div class="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                    <p class="text-lg text-gray-600 dark:text-gray-400 loading-dots">Loading scripts</p>
                </div>
            {:else if featuredScripts.length === 0}
                <div class="text-center py-16">
                    <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 max-w-md mx-auto border border-primary-200 dark:border-primary-800">
                        <i class="fas fa-code text-6xl text-primary-500 mb-6"></i>
                        <h3 class="text-2xl font-bold mb-4 dark:text-white">No Scripts Yet</h3>
                        <p class="text-gray-600 dark:text-gray-300 mb-8">Be the first to submit an automation script to our community!</p>
                        <a href="/submit" class="btn btn-primary px-8 py-3 text-lg font-semibold">
                            <i class="fas fa-upload mr-2"></i> Submit a Script
                        </a>
                    </div>
                </div>
            {:else}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {#each featuredScripts as script}
                        <div class="transform hover:scale-105 transition-transform duration-300">
                            <ScriptCard {script} />
                        </div>
                    {/each}
                </div>
            {/if}        <div class="text-center mt-12">
                <a href="/scripts" class="inline-flex items-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl hover:from-primary-600 hover:to-secondary-600 px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold group hover:scale-105">
                    <i class="fas fa-list mr-3 text-xl group-hover:scale-110 transition-transform"></i> View All Scripts
                </a>
            </div>        </div>    
    </section>
</main>

<Footer />

<style>
    /* All styling handled by Tailwind CSS classes */
</style>
