<!-- Root layout component -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { initTheme } from '$lib/stores/themeStore';
    import '../app.css';
    
    onMount(() => {
        initTheme();
    });
</script>

<div class="flex flex-col min-h-screen bg-gradient-to-b from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <slot />
</div>
