<!-- Login page -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { login, isAuthenticated } from '$lib/auth/auth';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    
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

<Header />

<main class="container mx-auto px-4 py-12 flex-grow">
    <div class="max-w-md mx-auto bg-white p-8 border rounded shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white">
        <h1 class="text-2xl font-bold mb-6">Log In</h1>
          {#if error}
            <div class="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-6" role="alert">
                <p>{error}</p>
            </div>
        {/if}
        
        <form on:submit|preventDefault={handleSubmit}>
            <div class="mb-4">
                <label for="email" class="block mb-2 font-medium dark:text-gray-200">Email</label>                <input
                    type="email"
                    id="email"
                    class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    bind:value={email}
                    placeholder="your.email@example.com"
                    required
                />
            </div>
            
            <div class="mb-6">
                <label for="password" class="block mb-2 font-medium dark:text-gray-200">Password</label>                <input
                    type="password"
                    id="password"
                    class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    bind:value={password}
                    placeholder="Your password"
                    required
                />
            </div>              <button
                type="submit"
                class="btn btn-primary w-full py-3 px-4 text-lg font-semibold disabled:opacity-50"
                disabled={isLoading}
            >
                <i class="fas fa-sign-in-alt mr-2"></i>
                {isLoading ? 'Logging in...' : 'Log In'}
            </button>
        </form>          <div class="mt-4 text-center">
            <p class="dark:text-gray-300">
                Don't have an account?
                <a href="/register" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">Register</a>            
            </p>
        </div>
    </div>
</main>

<Footer />
