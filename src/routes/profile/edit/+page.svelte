<!-- Edit Profile Page -->
<script lang="ts">    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { authStore, initAuth } from '$lib/auth/auth';
    
    // Form data
    let username = '';
    let bio = '';
      // Form state
    let isLoading = false;
    let error: string | null = null;
    let success = false;
    
    // Initialize on mount
    onMount(() => {
        initAuth();
        
        // Redirect if not logged in
        if (!$authStore.isAuthenticated) {
            goto('/login');
            return;
        }
        
        // Populate form fields with current user data
        if ($authStore.user) {
            username = $authStore.user.username;
            bio = $authStore.user.bio || '';
        }
    });
    
    // Handle form submission
    async function handleSubmit() {
        error = null;
        success = false;
        isLoading = true;
        
        if (!username.trim()) {
            error = 'Username is required';
            isLoading = false;
            return;
        }
        
        try {
            const response = await fetch(`/api/user/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${$authStore.token}`
                },
                body: JSON.stringify({
                    username,
                    bio
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update profile');
            }
              // Update auth store with new user data
            authStore.update(state => ({
                ...state,
                user: state.user ? {
                    ...state.user,
                    username,
                    bio
                } : null
            }));
            
            success = true;
            setTimeout(() => {
                goto('/profile');
            }, 1500);
        } catch (err: any) {
            console.error('Error updating profile:', err);
            error = err.message;
        } finally {
            isLoading = false;
        }
    }
</script>

<svelte:head>
    <title>Edit Profile | AutoHub</title>
    <meta name="description" content="Edit your profile on AutoHub" />
</svelte:head>

<Header />

<div class="container mx-auto px-4 py-8">
    <div class="max-w-md mx-auto">
        <h1 class="text-3xl font-bold mb-6">Edit Profile</h1>
        
        {#if error}
            <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                <p>{error}</p>
            </div>
        {/if}
        
        {#if success}
            <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
                <p>Profile updated successfully! Redirecting...</p>
            </div>
        {/if}
        
        <form on:submit|preventDefault={handleSubmit} class="bg-white p-6 rounded shadow-sm">
            <div class="mb-4">
                <label for="username" class="block mb-2 font-medium">Username</label>                <input
                    type="text"
                    id="username"
                    bind:value={username}
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors cursor-text"
                    disabled={isLoading}
                    required
                />
            </div>
            
            <div class="mb-6">
                <label for="bio" class="block mb-2 font-medium dark:text-gray-200">Bio</label>
                <textarea
                    id="bio"
                    bind:value={bio}
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:bg-gray-700 dark:text-white transition-colors cursor-text"
                    rows="4"
                    disabled={isLoading}
                    placeholder="Tell us a bit about yourself (optional)"
                ></textarea>
            </div>
            
            <div class="flex justify-between space-x-4">
                <a href="/profile" class="border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 transition-all shadow-sm hover:shadow text-sm font-medium">Cancel</a>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    class="border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 transition-all shadow-sm hover:shadow flex items-center justify-center text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    </div>
</div>

<Footer />
