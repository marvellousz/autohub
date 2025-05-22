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

<div class="code-preview-wrapper">
    <div class="code-preview-header">
        <span>{language}</span>
        <button class="copy-button" on:click={handleCopy}>
            {#if copying}
                <i class="fas fa-check"></i> Copied!
            {:else}
                <i class="fas fa-copy"></i> Copy
            {/if}
        </button>
    </div>
    <pre class="code-preview"><code>{code}</code></pre>
</div>

<style>
    .code-preview-wrapper {
        margin: 1rem 0;
        border-radius: 0.25rem;
        overflow: hidden;
        border: 1px solid var(--gray-300);
    }
    
    .code-preview-header {
        background-color: var(--gray-800);
        color: var(--gray-200);
        padding: 0.5rem 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .copy-button {
        background: transparent;
        border: 1px solid var(--gray-400);
        color: var(--gray-200);
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .copy-button:hover {
        background-color: var(--gray-700);
    }
    
    .code-preview {
        margin: 0;
        padding: 1rem;
        background-color: var(--gray-900);
        color: var(--gray-200);
        font-family: var(--font-mono);
        font-size: 0.9rem;
        line-height: 1.5;
        overflow-x: auto;
        max-height: 400px;
        overflow-y: auto;
    }
</style>
