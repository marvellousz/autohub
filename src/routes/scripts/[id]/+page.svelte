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

<main>
    {#if $isLoading || scriptLoading}
        <section class="loading-section py-5">
            <div class="container text-center">
                <div class="loading-spinner mb-3"></div>
                <p>Loading script details...</p>
            </div>
        </section>
    {:else if $error}
        <section class="error-section py-5">
            <div class="container text-center">
                <i class="fas fa-exclamation-circle fa-3x mb-3" style="color: var(--danger);"></i>
                <h2>Error Loading Script</h2>
                <p>{$error}</p>
                <button class="button button-primary mt-3" on:click={() => fetchScripts()}>
                    Try Again
                </button>
            </div>
        </section>
    {:else if script}
        <section class="page-header">
            <div class="container">
                <h1>{script.title}</h1>
                <div class="script-meta">
                    <span>By <strong>{script.author}</strong></span>
                    <span>• {formatDate(script.dateAdded)}</span>
                    <span>• {script.downloadCount} downloads</span>
                </div>
            </div>
        </section>
        
        <section class="script-content py-5">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h2 class="card-title mb-3">Description</h2>
                                <p class="card-text">{script.description}</p>
                                
                                <div class="tags mt-4">
                                    {#each script.tags as tag}
                                        <span class="tag">{tag}</span>
                                    {/each}
                                    <span class="badge badge-secondary ml-2">{script.category}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card mb-4">
                            <div class="card-body">
                                <h2 class="card-title mb-3">Source Code</h2>
                                <CodePreview code={script.code} language="python" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-4">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h3 class="mb-4">Actions</h3>
                                
                                <div class="script-actions-vertical">
                                    <button class="button button-primary mb-3 w-100" on:click={handleDownload}>
                                        <i class="fas fa-download"></i> Download Script
                                    </button>
                                    
                                    <button class="button button-outline mb-3 w-100" on:click={handleCopy}>
                                        {#if copying}
                                            <i class="fas fa-check"></i> Copied!
                                        {:else}
                                            <i class="fas fa-copy"></i> Copy Code
                                        {/if}
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card mb-4">
                            <div class="card-body">
                                <h3 class="mb-3">Similar Scripts</h3>
                                
                                {#if $scripts.filter(s => s.id !== script.id && s.category === script.category).length === 0}
                                    <p>No similar scripts found.</p>
                                {:else}
                                    <ul class="similar-scripts">
                                        {#each $scripts.filter(s => s.id !== script.id && s.category === script.category).slice(0, 3) as similarScript}
                                            <li>
                                                <a href="/scripts/{similarScript.id}">{similarScript.title}</a>
                                                <div class="tags mini-tags">
                                                    {#each similarScript.tags.slice(0, 2) as tag}
                                                        <span class="mini-tag">{tag}</span>
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
            </div>
        </section>
        
        <!-- Comments Section -->
        <CommentSection scriptId={scriptId} />
    {:else}
        <section class="not-found py-5">
            <div class="container text-center">
                <i class="fas fa-exclamation-triangle fa-3x mb-3"></i>
                <h2>Script Not Found</h2>
                <p>The script you're looking for doesn't exist or has been removed.</p>
                <a href="/scripts" class="button button-primary mt-3">Browse All Scripts</a>
            </div>
        </section>
    {/if}
</main>

<Footer />

<style>
    main {
        min-height: 100vh;
    }
    
    .page-header {
        padding: 3rem 0;
        background-color: var(--gray-800);
        color: var(--white);
    }
    
    .page-header h1 {
        margin-bottom: 0.5rem;
    }
    
    .script-meta {
        font-size: 1rem;
        color: var(--gray-300);
    }
    
    .script-actions-vertical {
        display: flex;
        flex-direction: column;
    }
    
    .w-100 {
        width: 100%;
    }
    
    .similar-scripts {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .similar-scripts li {
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--gray-200);
    }
    
    .similar-scripts li:last-child {
        border-bottom: none;
    }
    
    .mini-tags {
        margin-top: 0.25rem;
    }
    
    .mini-tag {
        display: inline-block;
        padding: 0.1rem 0.3rem;
        margin-right: 0.3rem;
        font-size: 0.65rem;
        line-height: 1;
        border-radius: 10rem;
        color: var(--white);
        background-color: var(--primary);
    }
    
    .not-found {
        color: var(--gray-600);
    }
</style>
