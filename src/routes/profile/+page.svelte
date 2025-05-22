<!-- User Profile Page -->
<script lang="ts">    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { authStore, initAuth } from '$lib/auth/auth';
    import { scripts, fetchScripts, deleteScript } from '$lib/stores/scriptStore';
    import ScriptCard from '$lib/components/ScriptCard.svelte';
    import type { Script } from '$lib/data/scripts';
    
    // User scripts
    let userScripts: Script[] = [];
    
    // Initialize on mount
    onMount(async () => {
        initAuth();
        
        // Redirect if not logged in
        if (!$authStore.isAuthenticated) {
            goto('/login');
            return;
        }
        
        // Fetch scripts if needed
        if ($scripts.length === 0) {
            await fetchScripts();
        }
    });
    
    // Filter scripts by user ID
    $: {
        if ($authStore.user && $scripts.length > 0) {
            userScripts = $scripts.filter(script => 
                script.author === $authStore.user?.username
            );
        }
    }
    
    // Delete state
    let isDeleting = false;
    let deleteError: string | null = null;
    
    // Handle script deletion
    async function handleDelete(scriptId: string) {
        if (!confirm('Are you sure you want to delete this script? This action cannot be undone.')) {
            return;
        }
        
        isDeleting = true;
        deleteError = null;
        
        try {
            await deleteScript(scriptId);
        } catch (err: any) {
            deleteError = err.message;
        } finally {
            isDeleting = false;
        }
    }
</script>

<svelte:head>
    <title>My Profile | AutoHub</title>
    <meta name="description" content="Manage your profile and scripts on AutoHub" />
</svelte:head>

<Header />

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">My Profile</h1>
    
    {#if $authStore.isLoading}
        <div class="loading">Loading profile...</div>
    {:else if $authStore.isAuthenticated}
        <div class="profile-container">
            <div class="bg-white p-6 rounded shadow-sm mb-8">                <h2 class="text-xl font-bold mb-3">Account Information</h2>
                
                <div class="mb-4">
                    <strong class="block mb-1">Username:</strong>
                    <p>{$authStore.user?.username || ''}</p>
                </div>
                
                <div class="mb-4">
                    <strong class="block mb-1">Email:</strong>
                    <p>{$authStore.user?.email || ''}</p>
                </div>
                
                <div class="mb-4">
                    <strong class="block mb-1">Joined:</strong>
                    <p>{$authStore.user?.joinDate ? new Date($authStore.user.joinDate).toLocaleDateString() : ''}</p>
                </div>
                
                {#if $authStore.user?.bio}
                    <div class="mb-4">
                        <strong class="block mb-1">Bio:</strong>
                        <p>{$authStore.user.bio}</p>
                    </div>
                {/if}
                
                <a href="/profile/edit" class="btn btn-primary">Edit Profile</a>
            </div>
            
            <h2 class="text-2xl font-bold mb-4">My Scripts</h2>
            
            {#if userScripts.length === 0}
                <div class="no-scripts py-4">
                    <p>You haven't submitted any scripts yet.</p>
                    <a href="/submit" class="btn btn-primary mt-2">Submit your first script</a>
                </div>
            {:else}                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {#each userScripts as script}
                        <div class="script-card bg-white p-4 rounded shadow-sm">
                            <ScriptCard {script} />
                            <div class="mt-4 flex justify-end">
                                <button 
                                    class="btn btn-danger" 
                                    on:click={() => handleDelete(script.id)}
                                    disabled={isDeleting}
                                >
                                    {#if isDeleting}Deleting...{:else}Delete Script{/if}
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
                
                {#if deleteError}
                    <div class="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
                        {deleteError}
                    </div>
                {/if}
            {/if}
        </div>
    {:else}
        <p>Please <a href="/login" class="text-blue-600 hover:underline">log in</a> to view your profile.</p>
    {/if}
</div>

<Footer />

<style>
    .profile-container {
        max-width: 1000px;
        margin: 0 auto;
    }
    
    .loading {
        text-align: center;
        padding: 2rem;
    }
    
    .no-scripts {
        background-color: #f8f9fa;
        border-radius: 8px;
        text-align: center;
        padding: 2rem;
    }
    
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
    }
    
    .btn-primary:hover {
        background-color: var(--primary-dark);
    }
    
    .btn-danger {
        background-color: #dc3545;
        color: white;
        border: none;
    }
    
    .btn-danger:hover {
        background-color: #c82333;
    }
    
    .btn-danger:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
    }
    
    .script-card {
        display: flex;
        flex-direction: column;
    }
    
    .error-message {
        margin-top: 1rem;
        padding: 0.75rem;
        border-radius: 0.25rem;
    }
</style>
