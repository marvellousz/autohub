<!-- Registration page -->
<script lang="ts">    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { register, isAuthenticated } from '$lib/auth/auth';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    
    // Form data
    let username = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let bio = '';
    
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
        
        if (password !== confirmPassword) {
            error = 'Passwords do not match';
            return;
        }
        
        try {
            isLoading = true;
            await register({
                username,
                email,
                password,
                bio
            });
            
            // Redirect to home page on success
            goto('/');
        } catch (error) {
            const err = error as Error;
            error = err.message;
        } finally {
            isLoading = false;
        }
    }
</script>

<svelte:head>
    <title>Register | AutoHub</title>
    <meta name="description" content="Create an account on AutoHub - the best place for Python automation scripts" />
</svelte:head>

<Header />

<main class="container mx-auto px-4 py-12 flex-grow">
    <div class="max-w-md mx-auto bg-white p-8 border rounded shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white">
        <h1 class="text-2xl font-bold mb-6">Create an Account</h1>
          {#if error}
            <div class="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-6" role="alert">
                <p>{error}</p>
            </div>
        {/if}
        
        <form on:submit|preventDefault={handleSubmit}>            <div class="mb-4">
                <label for="username" class="block mb-2 font-medium dark:text-gray-200">Username</label>
                <input
                    type="text"
                    id="username"
                    class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    bind:value={username}
                    placeholder="Your username"
                />
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Optional. Will use email if not provided.</p>
            </div>
              <div class="mb-4">
                <label for="email" class="block mb-2 font-medium dark:text-gray-200">Email <span class="text-red-500">*</span></label>
                <input
                    type="email"
                    id="email"
                    class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    bind:value={email}
                    placeholder="your.email@example.com"
                    required
                />
            </div>
              <div class="mb-4">
                <label for="password" class="block mb-2 font-medium dark:text-gray-200">Password <span class="text-red-500">*</span></label>
                <input
                    type="password"
                    id="password"
                    class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    bind:value={password}
                    placeholder="Choose a secure password"
                    required
                />
            </div>
            
            <div class="mb-4">
                <label for="confirmPassword" class="block mb-2 font-medium dark:text-gray-200">Confirm Password <span class="text-red-500">*</span></label>
                <input
                    type="password"
                    id="confirmPassword"
                    class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    bind:value={confirmPassword}
                    placeholder="Confirm your password"
                    required
                />
            </div>
              <div class="mb-6">
                <label for="bio" class="block mb-2 font-medium dark:text-gray-200">Bio</label>
                <textarea
                    id="bio"
                    class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    bind:value={bio}
                    placeholder="A short bio about yourself (optional)"
                    rows="3"
                ></textarea>
            </div>
              <button
                type="submit"
                class="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 focus:ring-2 focus:ring-blue-300 focus:outline-none disabled:opacity-50 shadow-md hover:shadow-lg"
                disabled={isLoading}
            >
                <i class="fas fa-user-plus mr-2"></i>
                {isLoading ? 'Registering...' : 'Create Account'}
            </button>
        </form>          <div class="mt-4 text-center">
            <p class="dark:text-gray-300">
                Already have an account?
                <a href="/login" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">Log in</a>
            </p>        </div>
    </div>
</main>

<Footer />
