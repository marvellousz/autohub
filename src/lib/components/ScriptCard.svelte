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

<div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden h-full border border-primary-200 dark:border-primary-800 card-hover group">
    <div class="p-6">
        <h2 class="text-xl font-bold mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
            <a href="/scripts/{script.id}" class="text-gray-800 dark:text-gray-100 hover:gradient-text transition-all duration-300">{script.title}</a>
        </h2>
          <div class="mb-4 flex flex-wrap gap-2">
            {#each script.tags as tag}
                <span class="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/40 dark:to-secondary-900/40 text-primary-800 dark:text-primary-300 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm hover:scale-105 transition-transform duration-200">{tag}</span>
            {/each}
        </div>
        
        <p class="text-primary-700 dark:text-primary-300 mb-4 leading-relaxed">{truncateText(script.description, 150)}</p>
        
        <div class="text-sm text-primary-600 dark:text-primary-400 mb-5 flex items-center">
            <i class="fas fa-user-circle mr-2 text-primary-500"></i>
            By <span class="font-semibold text-primary-700 dark:text-primary-300 ml-1">{script.author}</span> 
            <span class="mx-2">•</span>
            <i class="fas fa-download mr-1 text-secondary-500"></i>
            <span class="font-semibold text-secondary-600 dark:text-secondary-400">{script.downloadCount}</span> downloads
        </div>        <div class="flex flex-wrap gap-2">
            <button 
                class="px-4 py-2 border border-primary-300 dark:border-primary-700 rounded-xl text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 flex items-center text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group" 
                on:click={handleCopy}
            >
                {#if copying}
                    <i class="fas fa-check mr-2 text-green-500 group-hover:scale-110 transition-transform"></i> Copied!
                {:else}
                    <i class="fas fa-copy mr-2 group-hover:scale-110 transition-transform"></i> Copy
                {/if}
            </button>
            
            <button 
                class="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 flex items-center text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group" 
                on:click={handleDownload}
            >
                <i class="fas fa-download mr-2 group-hover:scale-110 transition-transform"></i> Download
            </button>
            
            <a 
                href="/scripts/{script.id}" 
                class="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 flex items-center text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
                <i class="fas fa-eye mr-2 group-hover:scale-110 transition-transform"></i> View
            </a>
        </div>
    </div>
</div>

<style>
    /* All styling handled by Tailwind CSS classes */
</style>
