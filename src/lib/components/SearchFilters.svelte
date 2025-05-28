<!-- Search and filters component -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { scripts, filterScripts } from '$lib/stores/scriptStore';
    import type { ScriptCategory } from '$lib/data/scripts';
      let searchTerm = '';
    
    // Function to handle search input changes
    function handleSearch() {
        filterScripts(searchTerm, []);
    }
</script>

<div class="mb-4">
    <div class="flex flex-col sm:flex-row gap-2">
        <div class="relative flex-1">            <input 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors cursor-text" 
                placeholder="Search scripts by title, description, or tags..." 
                bind:value={searchTerm}
                on:input={handleSearch}
            />
        </div>
        <button 
            class="border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 transition-all shadow-sm hover:shadow flex items-center justify-center text-sm font-medium"
            on:click={handleSearch}
        >            <i class="fas fa-search mr-2"></i>
            Search
        </button>
    </div>
</div>

<style>
    /* All styling handled by Tailwind CSS classes */
</style>
