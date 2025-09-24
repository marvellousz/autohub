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

<div class="container mx-auto px-4 py-12">
    <div class="max-w-2xl mx-auto">
        <h1 class="text-4xl font-bold mb-8 text-center">
            <span class="gradient-text">Edit Profile</span>
        </h1>
        
        {#if error}
            <div class="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6" role="alert">
                <p class="text-red-600 dark:text-red-400 flex items-center">
                    <i class="fas fa-exclamation-triangle mr-2"></i> {error}
                </p>
            </div>
        {/if}
        
        {#if success}
            <div class="bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6" role="alert">
                <p class="text-green-600 dark:text-green-400 flex items-center">
                    <i class="fas fa-check-circle mr-2"></i> Profile updated successfully! Redirecting...
                </p>
            </div>
        {/if}
        
        <form on:submit|preventDefault={handleSubmit} class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-primary-200 dark:border-primary-800">
            <div class="mb-6">
                <label for="username" class="block text-lg font-semibold mb-3 dark:text-gray-300 text-gray-800">
                    <i class="fas fa-user mr-2 text-primary-500"></i> Username
                </label>
                <input
                    type="text"
                    id="username"
                    bind:value={username}
                    class="w-full px-4 py-3 border border-primary-300 dark:border-primary-700 rounded-xl text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white transition-all duration-300"
                    disabled={isLoading}
                    required
                />
            </div>
            
            <div class="mb-8">
                <label for="bio" class="block text-lg font-semibold mb-3 dark:text-gray-300 text-gray-800">
                    <i class="fas fa-align-left mr-2 text-secondary-500"></i> Bio
                </label>
                <textarea
                    id="bio"
                    bind:value={bio}
                    class="w-full px-4 py-3 border border-primary-300 dark:border-primary-700 rounded-xl text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none dark:bg-gray-800 dark:text-white transition-all duration-300"
                    rows="4"
                    disabled={isLoading}
                    placeholder="Tell us a bit about yourself (optional)"
                ></textarea>
            </div>
            
            <div class="flex justify-center space-x-6">
                <a href="/profile" class="btn btn-secondary px-6 py-3 text-lg font-semibold">
                    <i class="fas fa-times mr-2"></i> Cancel
                </a>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    class="btn btn-primary px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {#if isLoading}
                        <i class="fas fa-spinner fa-spin mr-2"></i> Saving...
                    {:else}
                        <i class="fas fa-save mr-2"></i> Save Changes
                    {/if}
                </button>
            </div>
        </form>
    </div>
</div>

<Footer />
