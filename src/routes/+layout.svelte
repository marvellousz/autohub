<!-- Root layout component -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { initTheme } from '$lib/stores/themeStore';
    
    onMount(() => {
        initTheme();
    });
</script>

<slot />
