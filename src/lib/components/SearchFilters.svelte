<!-- Search and filters component -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { scripts, filterScripts } from '$lib/stores/scriptStore';
    import type { ScriptCategory } from '$lib/data/scripts';
    
    let searchTerm = '';
    let selectedCategories: ScriptCategory[] = [];
    let availableCategories: ScriptCategory[] = [];
    
    // Function to handle search input changes
    function handleSearch() {
        filterScripts(searchTerm, selectedCategories);
    }
    
    // Function to toggle category selection
    function toggleCategory(category: ScriptCategory) {
        if (selectedCategories.includes(category)) {
            selectedCategories = selectedCategories.filter(c => c !== category);
        } else {
            selectedCategories = [...selectedCategories, category];
        }
        filterScripts(searchTerm, selectedCategories);
    }
    
    // Get available categories on mount
    onMount(() => {
        const unsubscribe = scripts.subscribe(currentScripts => {
            // Extract unique categories
            const categories = new Set<ScriptCategory>();
            currentScripts.forEach(script => categories.add(script.category));
            availableCategories = Array.from(categories);
        });
        
        // Clean up subscription
        return unsubscribe;
    });
</script>

<div class="search-filters mb-4">
    <div class="search-bar">
        <input 
            type="text" 
            class="form-control search-input" 
            placeholder="Search scripts by title, description, or tags..." 
            bind:value={searchTerm}
            on:input={handleSearch}
        />
        <button class="button button-primary search-button" on:click={handleSearch}>
            <i class="fas fa-search"></i> Search
        </button>
    </div>
    
    <div class="filters mt-3">
        <h4 class="mb-2">Categories</h4>
        <div class="category-filters">
            {#each availableCategories as category}
                <button 
                    class="button filter-item" 
                    class:button-primary={selectedCategories.includes(category)} 
                    class:button-outline={!selectedCategories.includes(category)}
                    on:click={() => toggleCategory(category)}
                >
                    {category}
                </button>
            {/each}
        </div>
    </div>
</div>

<style>
    .category-filters {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
</style>
