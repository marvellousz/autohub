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
        
        // Get category from URL if present
        const urlCategory = $page.url.searchParams.get('category');
        
        if (urlCategory) {
            filterScripts('', [urlCategory as ScriptCategory]);
        } else {
            filterScripts('', []);
        }
    });
</script>

<svelte:head>
    <title>Browse Scripts - AutoHub</title>
    <meta name="description" content="Browse and search through our collection of Python automation scripts." />
</svelte:head>

<Header />

<main>
    <section class="page-header">
        <div class="container">
            <h1>Browse Scripts</h1>
            <p>Discover and download Python automation scripts for your projects</p>
        </div>
    </section>
    
    <section class="scripts-content py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <SearchFilters />
                </div>
            </div>
            
            <div class="row">
                {#if $isLoading}
                    <div class="col">
                        <div class="loading-container text-center py-5">
                            <div class="loading-spinner mb-3"></div>
                            <p>Loading scripts...</p>
                        </div>
                    </div>
                {:else if $error}
                    <div class="col">
                        <div class="error-container text-center py-5">
                            <i class="fas fa-exclamation-circle fa-3x mb-3" style="color: var(--danger);"></i>
                            <h3>Error Loading Scripts</h3>
                            <p>{$error}</p>
                            <button class="button button-primary mt-3" on:click={() => fetchScripts()}>
                                Try Again
                            </button>
                        </div>
                    </div>
                {:else if $filteredScripts.length === 0}
                    <div class="col">
                        <div class="empty-results text-center py-5">
                            <i class="fas fa-search fa-3x mb-3"></i>
                            <h3>No Scripts Found</h3>
                            <p>Try adjusting your search criteria or browse all scripts.</p>
                            <button class="button button-primary mt-3" on:click={() => filterScripts('', [])}>
                                View All Scripts
                            </button>
                        </div>
                    </div>
                {:else}
                    {#each $filteredScripts as script}
                        <div class="col-md-6 mb-4">
                            <ScriptCard {script} />
                        </div>
                    {/each}
                {/if}
            </div>
        </div>
    </section>
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
    
    .empty-results {
        color: var(--gray-600);
    }
</style>
