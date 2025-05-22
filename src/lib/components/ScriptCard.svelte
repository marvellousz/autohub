<!-- Script card component for displaying a script entry -->
<script lang="ts">
    import { copyToClipboard, downloadFile, generateFilename, truncateText } from '$lib/utils/helpers';
    import { incrementDownloadCount } from '$lib/stores/scriptStore';
    import type { Script } from '$lib/data/scripts';
    
    export let script: Script;

    // State for copy button
    let copying = false;
    
    // Function to handle copy button click
    async function handleCopy() {
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
        const filename = generateFilename(script.title);
        downloadFile(filename, script.code);
        await incrementDownloadCount(script.id);
    }
</script>

<div class="card mb-4">
    <div class="card-body">
        <h2 class="card-title">
            <a href="/scripts/{script.id}" class="script-title">{script.title}</a>
        </h2>
        
        <div class="tags mb-2">
            {#each script.tags as tag}
                <span class="tag">{tag}</span>
            {/each}
            <span class="badge badge-secondary ml-2">{script.category}</span>
        </div>
        
        <p class="card-text">{truncateText(script.description, 150)}</p>
        
        <div class="script-meta mb-3">
            <small>
                By <strong>{script.author}</strong> • 
                {script.downloadCount} downloads
            </small>
        </div>
        
        <div class="script-actions">
            <button class="button button-outline" on:click={handleCopy}>
                {#if copying}
                    <i class="fas fa-check"></i> Copied!
                {:else}
                    <i class="fas fa-copy"></i> Copy Code
                {/if}
            </button>
            
            <button class="button button-primary" on:click={handleDownload}>
                <i class="fas fa-download"></i> Download
            </button>
            
            <a href="/scripts/{script.id}" class="button button-secondary">
                <i class="fas fa-eye"></i> View Details
            </a>
        </div>
    </div>
</div>

<style>
    .script-title {
        color: var(--dark);
        transition: color 0.2s;
    }
    
    .script-title:hover {
        color: var(--primary);
        text-decoration: none;
    }
    
    .script-meta {
        color: var(--gray-600);
    }
    
    .ml-2 {
        margin-left: 0.5rem;
    }
</style>
