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

<div class="container mx-auto px-4 py-8">
    <div class="max-w-md mx-auto bg-white p-8 border rounded shadow-sm">
        <h1 class="text-2xl font-bold mb-6">Create an Account</h1>
        
        {#if error}
            <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                <p>{error}</p>
            </div>
        {/if}
        
        <form on:submit|preventDefault={handleSubmit}>
            <div class="mb-4">
                <label for="username" class="block mb-2 font-medium">Username</label>
                <input
                    type="text"
                    id="username"
                    class="w-full p-2 border rounded"
                    bind:value={username}
                    placeholder="Your username"
                />
                <p class="text-sm text-gray-500 mt-1">Optional. Will use email if not provided.</p>
            </div>
            
            <div class="mb-4">
                <label for="email" class="block mb-2 font-medium">Email <span class="text-red-500">*</span></label>
                <input
                    type="email"
                    id="email"
                    class="w-full p-2 border rounded"
                    bind:value={email}
                    placeholder="your.email@example.com"
                    required
                />
            </div>
            
            <div class="mb-4">
                <label for="password" class="block mb-2 font-medium">Password <span class="text-red-500">*</span></label>
                <input
                    type="password"
                    id="password"
                    class="w-full p-2 border rounded"
                    bind:value={password}
                    placeholder="Choose a secure password"
                    required
                />
            </div>
            
            <div class="mb-4">
                <label for="confirmPassword" class="block mb-2 font-medium">Confirm Password <span class="text-red-500">*</span></label>
                <input
                    type="password"
                    id="confirmPassword"
                    class="w-full p-2 border rounded"
                    bind:value={confirmPassword}
                    placeholder="Confirm your password"
                    required
                />
            </div>
            
            <div class="mb-6">
                <label for="bio" class="block mb-2 font-medium">Bio</label>
                <textarea
                    id="bio"
                    class="w-full p-2 border rounded"
                    bind:value={bio}
                    placeholder="A short bio about yourself (optional)"
                    rows="3"
                ></textarea>
            </div>
            
            <button
                type="submit"
                class="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition duration-200"
                disabled={isLoading}
            >
                {isLoading ? 'Registering...' : 'Create Account'}
            </button>
        </form>
        
        <div class="mt-4 text-center">
            <p>
                Already have an account?
                <a href="/login" class="text-blue-600 hover:underline">Log in</a>
            </p>
        </div>
    </div>
</div>

<Footer />
