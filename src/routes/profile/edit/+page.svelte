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
                <label for="username" class="block mb-2 font-medium">Username</label>
                <input
                    type="text"
                    id="username"
                    bind:value={username}
                    class="w-full p-2 border rounded"
                    disabled={isLoading}
                    required
                />
            </div>
            
            <div class="mb-6">
                <label for="bio" class="block mb-2 font-medium">Bio</label>
                <textarea
                    id="bio"
                    bind:value={bio}
                    class="w-full p-2 border rounded resize-none"
                    rows="4"
                    disabled={isLoading}
                    placeholder="Tell us a bit about yourself (optional)"
                ></textarea>
            </div>
            
            <div class="flex justify-between">
                <a href="/profile" class="btn btn-secondary">Cancel</a>
                <button type="submit" class="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    </div>
</div>

<Footer />

<style>
    .btn {
        display: inline-block;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        cursor: pointer;
        text-decoration: none;
        transition: background-color 0.2s;
    }
    
    .btn-primary {
        background-color: var(--primary);
        color: white;
        border: none;
    }
    
    .btn-primary:hover {
        background-color: var(--primary-dark);
    }
    
    .btn-secondary {
        background-color: #f8f9fa;
        color: #333;
    }
    
    .btn-secondary:hover {
        background-color: #e9ecef;
    }
</style>
