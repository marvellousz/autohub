<!-- Script detail page -->
<script lang="ts">
    import { page } from '$app/stores';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import CodePreview from '$lib/components/CodePreview.svelte';
    import CommentSection from '$lib/components/CommentSection.svelte';
    import { scripts, fetchScripts, isLoading, error } from '$lib/stores/scriptStore';
    import { downloadFile, generateFilename, formatDate, copyToClipboard } from '$lib/utils/helpers';    import { incrementDownloadCount } from '$lib/stores/scriptStore';    
    import { onMount } from 'svelte';
    import { authStore, initAuth } from '$lib/auth/auth';
    import type { Script } from '$lib/data/scripts';
      
    // Get the script ID from the URL
    const scriptId = $page.params.id;
    
    // Script details state
    let script: Script | null = null;
    let scriptLoading = true;
    let scriptError: string | null = null;
    
    // Fetch scripts on mount if not already loaded
    onMount(async () => {
        // Initialize auth
        initAuth();
        
        if ($scripts.length === 0) {
            await fetchScripts();
        }
        scriptLoading = false;
    });
      // Get the script details
    $: script = $scripts.find(s => s.id === scriptId) || null;
    
    // For copy button
    let copying = false;
    
    // Function to handle copy button click
    async function handleCopy() {
        if (!script) return;
        
        copying = true;
        const success = await copyToClipboard(script.code);
        
        if (success) {
            setTimeout(() => {
                copying = false;
            }, 2000);
        } else {
            copying = false;
        }
    }
      // Function to handle download button click
    async function handleDownload() {
        if (!script) return;
        
        const filename = generateFilename(script.title);
        downloadFile(filename, script.code);
        await incrementDownloadCount(script.id);
    }
</script>

<svelte:head>
    <title>{script ? script.title : 'Script Details'} - AutoHub</title>
    <meta name="description" content={script ? script.description : 'Python automation script details'} />
</svelte:head>

<Header />

<main class="min-h-screen">
    {#if $isLoading || scriptLoading}
        <section class="py-16">
            <div class="container mx-auto px-4 text-center">
                <div class="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p class="text-lg">Loading script details...</p>
            </div>
        </section>
    {:else if $error}
        <section class="py-16">
            <div class="container mx-auto px-4 text-center">
                <i class="fas fa-exclamation-circle text-5xl text-danger mb-4"></i>
                <h2 class="text-2xl font-bold mb-2">Error Loading Script</h2>
                <p class="mb-6">{$error}</p>
                <button class="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors" on:click={() => fetchScripts()}>
                    Try Again
                </button>
            </div>
        </section>
    {:else if script}
        <section class="bg-gray-800 text-white py-12">
            <div class="container mx-auto px-4">
                <h1 class="text-3xl md:text-4xl font-bold mb-2">{script.title}</h1>
                <div class="text-gray-300">
                    <span>By <strong>{script.author}</strong></span>
                    <span class="mx-2">•</span>
                    <span>{formatDate(script.dateAdded)}</span>
                    <span class="mx-2">•</span>
                    <span>{script.downloadCount} downloads</span>
                </div>
            </div>
        </section>
          <section class="py-12">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div class="lg:col-span-8">
                        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-8">
                            <h2 class="text-2xl font-bold mb-4">Description</h2>
                            <p class="text-gray-700 dark:text-gray-300">{script.description}</p>
                            
                            <div class="flex flex-wrap gap-2 mt-6">
                                {#each script.tags as tag}
                                    <span class="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{tag}</span>
                                {/each}
                                <span class="inline-block bg-gray-600 text-white px-3 py-1 rounded-full text-sm">{script.category}</span>
                            </div>
                        </div>
                        
                        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-8">
                            <h2 class="text-2xl font-bold mb-4">Source Code</h2>
                            <CodePreview code={script.code} language="python" />
                        </div>
                    </div>
                      <div class="lg:col-span-4">
                        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-8">
                            <h3 class="text-xl font-bold mb-6">Actions</h3>
                              <div class="flex flex-col gap-3">
                <button 
                                    class="w-full border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 transition-all shadow-sm hover:shadow flex items-center justify-center text-sm" 
                                    on:click={handleDownload}
                                >
                                    <i class="fas fa-download mr-2"></i> Download Script
                                </button>
                                
                                <button 
                                    class="w-full border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 transition-all shadow-sm hover:shadow flex items-center justify-center text-sm" 
                                    on:click={handleCopy}
                                >
                                    {#if copying}
                                        <i class="fas fa-check mr-2"></i> Copied!
                                    {:else}
                                        <i class="fas fa-copy mr-2"></i> Copy Code
                                    {/if}
                                </button>
                            </div>
                        </div>
                        
                        <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-8">
                            <h3 class="text-xl font-bold mb-4">Similar Scripts</h3>
                            
                            {#if $scripts.filter(s => s.id !== script.id && s.category === script.category).length === 0}
                                <p class="text-gray-600 dark:text-gray-300">No similar scripts found.</p>
                            {:else}
                                <ul class="divide-y divide-gray-200 dark:divide-gray-600">
                                    {#each $scripts.filter(s => s.id !== script.id && s.category === script.category).slice(0, 3) as similarScript}
                                        <li class="py-3 first:pt-0 last:pb-0">
                                            <a href="/scripts/{similarScript.id}" class="text-primary hover:underline font-medium">{similarScript.title}</a>
                                            <div class="flex flex-wrap gap-1 mt-1">
                                                {#each similarScript.tags.slice(0, 2) as tag}
                                                    <span class="inline-block bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">{tag}</span>
                                                {/each}
                                            </div>
                                        </li>
                                    {/each}
                                </ul>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Comments Section -->
        <CommentSection scriptId={scriptId} />    {:else}
        <section class="py-16">
            <div class="container mx-auto px-4 text-center">
                <i class="fas fa-exclamation-triangle text-5xl text-yellow-500 mb-4"></i>
                <h2 class="text-2xl font-bold mb-2">Script Not Found</h2>
                <p class="mb-6 text-gray-600 dark:text-gray-300">The script you're looking for doesn't exist or has been removed.</p>
                <a href="/scripts" class="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors">Browse All Scripts</a>
            </div>
        </section>
    {/if}
</main>

<Footer />

<style>
    /* All styling handled by Tailwind CSS classes */
</style>
