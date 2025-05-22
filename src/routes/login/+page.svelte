<!-- Login page -->
<script lang="ts">    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { login, isAuthenticated } from '$lib/auth/auth';
    
    // Form data
    let email = '';
    let password = '';
    
    // Form state
    let isLoading = false;
    let error: string | null = null;
    
    onMount(() => {
        // If already authenticated, redirect to home page
        if ($isAuthenticated) {
            goto('/');
        }
    });
    
    async function handleSubmit() {
        // Reset error
        error = null;
        
        // Basic validation
        if (!email || !password) {
            error = 'Email and password are required';
            return;
        }
          // Login user
        try {
            isLoading = true;
            await login(email, password);
            
            // Redirect to home page on success
            goto('/');
        } catch (err) {
            error = (err as Error).message;
        } finally {
            isLoading = false;
        }
    }
</script>

<svelte:head>
    <title>Login | AutoHub</title>
    <meta name="description" content="Log in to AutoHub - the best place for Python automation scripts" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <div class="max-w-md mx-auto bg-white p-8 border rounded shadow-sm">
        <h1 class="text-2xl font-bold mb-6">Log In</h1>
        
        {#if error}
            <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                <p>{error}</p>
            </div>
        {/if}
        
        <form on:submit|preventDefault={handleSubmit}>
            <div class="mb-4">
                <label for="email" class="block mb-2 font-medium">Email</label>
                <input
                    type="email"
                    id="email"
                    class="w-full p-2 border rounded"
                    bind:value={email}
                    placeholder="your.email@example.com"
                    required
                />
            </div>
            
            <div class="mb-6">
                <label for="password" class="block mb-2 font-medium">Password</label>
                <input
                    type="password"
                    id="password"
                    class="w-full p-2 border rounded"
                    bind:value={password}
                    placeholder="Your password"
                    required
                />
            </div>
            
            <button
                type="submit"
                class="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition duration-200"
                disabled={isLoading}
            >
                {isLoading ? 'Logging in...' : 'Log In'}
            </button>
        </form>
        
        <div class="mt-4 text-center">
            <p>
                Don't have an account?
                <a href="/register" class="text-blue-600 hover:underline">Register</a>
            </p>
        </div>
    </div>
</div>
