<!-- Code preview component -->
<script lang="ts">
    import { copyToClipboard } from '$lib/utils/helpers';
    
    export let code: string;
    export let language: string = 'python';
    
    let copying = false;
    
    async function handleCopy() {
        copying = true;
        const success = await copyToClipboard(code);
        
        if (success) {
            setTimeout(() => {
                copying = false;
            }, 2000);
        } else {
            copying = false;
        }
    }
</script>

<div class="my-4 rounded overflow-hidden border border-gray-300 dark:border-gray-600">
    <div class="bg-gray-800 text-gray-200 px-4 py-2 flex justify-between items-center">
        <span class="font-mono text-sm">{language}</span>
        <button 
            class="px-2 py-1 rounded text-sm border border-gray-400 text-gray-200 hover:bg-gray-700 transition-colors"
            on:click={handleCopy}
        >
            {#if copying}
                <i class="fas fa-check mr-1"></i> Copied!
            {:else}
                <i class="fas fa-copy mr-1"></i> Copy
            {/if}
        </button>
    </div>    <pre class="m-0 bg-gray-900 text-gray-200 font-mono text-sm leading-relaxed overflow-x-auto max-h-[400px] overflow-y-auto"><code class="block p-4">{code}</code></pre>
</div>

<style>
    /* All styling handled by Tailwind CSS classes */
</style>
