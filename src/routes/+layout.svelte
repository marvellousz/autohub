<!-- Root layout component -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { initTheme } from '$lib/stores/themeStore';
    import '../app.css';
    
    onMount(() => {
        initTheme();
    });
</script>

<div class="flex flex-col min-h-screen">
    <slot />
</div>
