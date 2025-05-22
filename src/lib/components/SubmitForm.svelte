<!-- Script submission form component -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { addScript } from '$lib/stores/scriptStore';
    import { validatePythonCode } from '$lib/utils/helpers';
    import { authStore, initAuth } from '$lib/auth/auth';
    import type { ScriptCategory } from '$lib/data/scripts';
      // Form data
    let title = '';
    let description = '';
    let code = '';
    let category: ScriptCategory = 'File Automation';
    let isPrivate = false;
    
    // Form state
    let isSubmitting = false;
    let error: string | null = null;
    let validationError: string | null = null;
    
    // Initialize auth on mount
    onMount(() => {
        initAuth();
    });
    
    // Validate the form
    function validateForm(): boolean {
        error = null;
        validationError = null;
        
        if (!title.trim()) {
            error = 'Title is required';
            return false;
        }
        
        if (title.trim().length < 5) {
            error = 'Title must be at least 5 characters';
            return false;
        }
        
        if (!description.trim()) {
            error = 'Description is required';
            return false;
        }
        
        if (description.trim().length < 20) {
            error = 'Description must be at least 20 characters';
            return false;
        }
        
        if (!code.trim()) {
            error = 'Code is required';
            return false;
        }
        
        // Validate Python code
        if (!validatePythonCode(code)) {
            validationError = 'The code appears to contain syntax errors';
            return false;
        }
        
        return true;
    }
    
    // Handle form submission
    async function handleSubmit() {
        if (!validateForm()) return;
        
        if (!$authStore.isAuthenticated) {
            error = 'You must be logged in to submit a script';
            return;
        }
        
        isSubmitting = true;
        error = null;
        
        try {
            const token = $authStore.token;
            
            const response = await fetch('/api/scripts/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    code,
                    category,
                    isPrivate
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit script');
            }
            
            // Add to store
            addScript(data.script);
            
            // Redirect to script page
            goto(`/scripts/${data.script.id}`);
        } catch (err: any) {
            error = err.message || 'An error occurred while submitting the script';
            console.error('Script submission error:', err);
        } finally {
            isSubmitting = false;
        }
    }
</script>

<section class="submit-form">
    <h2>Submit Your Automation Script</h2>
    <p>Share your Python script with the community. All code will be reviewed for quality and security.</p>
    
    <form on:submit|preventDefault={handleSubmit}>
        {#if error}
            <div class="error-message">
                {error}
            </div>
        {/if}
        
        <div class="form-group">
            <label for="title">Title</label>
            <input 
                type="text" 
                id="title" 
                name="title" 
                bind:value={title} 
                placeholder="E.g., File Organizer, PDF Merger, etc."
                required
                minlength="5"
                maxlength="100"
            />
        </div>
        
        <div class="form-group">
            <label for="description">Description</label>
            <textarea 
                id="description" 
                name="description" 
                bind:value={description} 
                placeholder="Describe what your script does, how to use it, and any dependencies"
                required
                minlength="20"
                rows="4"
            ></textarea>
        </div>
          <div class="form-group">
            <label for="category">Category</label>
            <select id="category" name="category" bind:value={category}>
                <option value="File Automation">File Automation</option>
                <option value="Data Processing">Data Processing</option>
                <option value="Web Scraping">Web Scraping</option>
                <option value="API Integration">API Integration</option>
                <option value="Database">Database</option>
                <option value="Network">Network</option>
            </select>
        </div>
        
        <div class="form-group code-input">
            <label for="code">Code</label>
            {#if validationError}
                <div class="validation-error">
                    {validationError}
                </div>
            {/if}
            <textarea 
                id="code" 
                name="code" 
                bind:value={code} 
                placeholder="Paste your Python code here..."
                required
                rows="15"
                class="code-editor"
            ></textarea>
            <div class="code-guidelines">
                <p>Guidelines:</p>
                <ul>
                    <li>Code must be written in Python</li>
                    <li>Include comments explaining complex sections</li>
                    <li>List any required packages/dependencies</li>
                    <li>Make sure your code is secure and doesn't contain sensitive information</li>
                </ul>
            </div>
        </div>
        
        <div class="form-group checkbox">
            <label>
                <input 
                    type="checkbox" 
                    name="isPrivate" 
                    bind:checked={isPrivate}
                />
                Make this script private (only you can view it)
            </label>
        </div>
        
        <div class="form-group submit-button">
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Script'}
            </button>
        </div>
    </form>
</section>

<style>
    .submit-form {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        background-color: #f8f9fa;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
        color: #333;
        margin-bottom: 0.5rem;
    }
    
    .form-group {
        margin-bottom: 1.5rem;
    }
    
    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
    }
    
    input, select, textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
    }
    
    .code-editor {
        font-family: monospace;
        background-color: #f5f5f5;
    }
    
    .checkbox input {
        width: auto;
        margin-right: 0.5rem;
    }
    
    .checkbox label {
        display: flex;
        align-items: center;
        font-weight: normal;
    }
    
    button {
        background-color: #4a6fa5;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    
    button:hover {
        background-color: #3a5a8c;
    }
    
    button:disabled {
        background-color: #95a5c6;
        cursor: not-allowed;
    }
    
    .error-message {
        background-color: #f8d7da;
        color: #721c24;
        padding: 0.75rem;
        border-radius: 4px;
        margin-bottom: 1.5rem;
    }
    
    .validation-error {
        color: #d63031;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
    }
    
    .code-guidelines {
        margin-top: 0.5rem;
        font-size: 0.9rem;
        color: #666;
    }
    
    .code-guidelines ul {
        padding-left: 1.5rem;
        margin-top: 0.25rem;
    }
</style>