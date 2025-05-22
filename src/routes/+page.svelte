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

<main>
    <section class="hero">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h1 class="hero-title">Discover Python Automation Scripts</h1>
                    <p class="hero-subtitle">Browse, search, and download curated Python scripts to automate your tasks.</p>
                    <div class="hero-actions">
                        <a href="/scripts" class="button button-primary">Browse Scripts</a>
                        <a href="/submit" class="button button-outline" style="color: white; border-color: white;">Submit Your Script</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section class="features py-5">
        <div class="container">
            <h2 class="text-center mb-5">Why Use AutoHub?</h2>
            
            <div class="row">
                <div class="col-md-4">
                    <div class="feature-card text-center mb-4">
                        <i class="fas fa-search feature-icon"></i>
                        <h3>Discover</h3>
                        <p>Find automation scripts for various tasks from web scraping to file operations.</p>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="feature-card text-center mb-4">
                        <i class="fas fa-download feature-icon"></i>
                        <h3>Download</h3>
                        <p>Easily download ready-to-use Python scripts to solve your automation needs.</p>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="feature-card text-center mb-4">
                        <i class="fas fa-share-alt feature-icon"></i>
                        <h3>Share</h3>
                        <p>Contribute your own automation scripts to help the Python community.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section class="featured py-5" style="background-color: var(--gray-100);">
        <div class="container">
            <h2 class="text-center mb-5">Featured Scripts</h2>
            
            {#if $isLoading}
                <div class="text-center py-5">
                    <div class="loading-spinner mb-3"></div>
                    <p>Loading scripts...</p>
                </div>
            {:else if featuredScripts.length === 0}
                <div class="text-center py-5">
                    <p>No scripts found. Be the first to submit one!</p>
                    <a href="/submit" class="button button-primary mt-3">Submit a Script</a>
                </div>
            {:else}
                <div class="row">
                    {#each featuredScripts as script}
                        <div class="col-md-6 col-lg-3 mb-4">
                            <ScriptCard {script} />
                        </div>
                    {/each}
                </div>
            {/if}
            
            <div class="text-center mt-4">
                <a href="/scripts" class="button button-primary">View All Scripts</a>
            </div>
        </div>
    </section>
    
    <section class="categories py-5">
        <div class="container">
            <h2 class="text-center mb-5">Browse By Category</h2>
            
            <div class="row">
                <div class="col-md-6 col-lg-3 mb-4">
                    <a href="/scripts?category=Web%20Scraping" class="category-card">
                        <div class="card">
                            <div class="card-body text-center">
                                <i class="fas fa-spider category-icon"></i>
                                <h3>Web Scraping</h3>
                                <p>Extract data from websites</p>
                            </div>
                        </div>
                    </a>
                </div>
                
                <div class="col-md-6 col-lg-3 mb-4">
                    <a href="/scripts?category=File%20Automation" class="category-card">
                        <div class="card">
                            <div class="card-body text-center">
                                <i class="fas fa-file-code category-icon"></i>
                                <h3>File Automation</h3>
                                <p>Process and organize files</p>
                            </div>
                        </div>
                    </a>
                </div>
                
                <div class="col-md-6 col-lg-3 mb-4">
                    <a href="/scripts?category=API%20Integration" class="category-card">
                        <div class="card">
                            <div class="card-body text-center">
                                <i class="fas fa-exchange-alt category-icon"></i>
                                <h3>API Integration</h3>
                                <p>Connect with web services</p>
                            </div>
                        </div>
                    </a>
                </div>
                
                <div class="col-md-6 col-lg-3 mb-4">
                    <a href="/scripts?category=Data%20Processing" class="category-card">
                        <div class="card">
                            <div class="card-body text-center">
                                <i class="fas fa-database category-icon"></i>
                                <h3>Data Processing</h3>
                                <p>Transform and analyze data</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>
</main>

<Footer />

<style>
    main {
        min-height: 100vh;
    }
    
    .hero {
        padding: 5rem 0;
        background-color: var(--primary);
        color: var(--white);
        text-align: center;
    }
    
    .hero-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }
    
    .hero-subtitle {
        font-size: 1.25rem;
        margin-bottom: 2rem;
        opacity: 0.9;
    }
    
    .hero-actions {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }
    
    .feature-icon, .category-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: var(--primary);
    }
    
    .feature-card {
        padding: 1.5rem;
        height: 100%;
    }
    
    .category-card {
        display: block;
        color: inherit;
        height: 100%;
    }
    
    .category-card:hover {
        text-decoration: none;
    }
    
    .category-card .card {
        height: 100%;
        transition: transform 0.3s ease;
    }
    
    .category-card:hover .card {
        transform: translateY(-5px);
    }
</style>
