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

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full border border-gray-200 dark:border-gray-700">
    <div class="p-5">
        <h2 class="text-xl font-bold mb-2">
            <a href="/scripts/{script.id}" class="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200">{script.title}</a>
        </h2>
          <div class="mb-3 flex flex-wrap gap-2">
            {#each script.tags as tag}
                <span class="bg-blue-100 dark:bg-blue-800/40 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full">{tag}</span>
            {/each}
        </div>
        
        <p class="text-gray-600 dark:text-gray-300 mb-4">{truncateText(script.description, 150)}</p>
        
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            By <span class="font-medium text-gray-700 dark:text-gray-300">{script.author}</span> • 
            {script.downloadCount} downloads
        </div>        <div class="flex space-x-2">
            <button 
                class="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center text-sm shadow-sm hover:shadow transition-all" 
                on:click={handleCopy}
            >
                {#if copying}
                    <i class="fas fa-check mr-1"></i> Copied!
                {:else}
                    <i class="fas fa-copy mr-1"></i> Copy
                {/if}
            </button>
            
            <button 
                class="px-3 py-1.5 bg-blue-600 dark:bg-blue-700 rounded text-white hover:bg-blue-700 dark:hover:bg-blue-600 flex items-center text-sm shadow-sm hover:shadow transition-all" 
                on:click={handleDownload}
            >
                <i class="fas fa-download mr-1"></i> Download
            </button>
            
            <a 
                href="/scripts/{script.id}" 
                class="px-3 py-1.5 bg-gray-700 dark:bg-gray-800 rounded text-white hover:bg-gray-800 dark:hover:bg-gray-700 flex items-center text-sm shadow-sm hover:shadow transition-all"
            >
                <i class="fas fa-eye mr-1"></i> View
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
