<!-- User Profile Page -->
<script lang="ts">    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { authStore, initAuth } from '$lib/auth/auth';
    import { scripts, fetchScripts, deleteScript } from '$lib/stores/scriptStore';
    import ScriptCard from '$lib/components/ScriptCard.svelte';
    import UserCommentCard from '$lib/components/UserCommentCard.svelte';
    import type { Script } from '$lib/data/scripts';
    import type { CommentInterface } from '$lib/server/db/commentRepository';
    
    // User scripts and comments
    let userScripts: Script[] = [];
    let userComments: CommentInterface[] = [];
    let isLoadingComments = false;
    let commentsError: string | null = null;
    
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

        // Fetch user's comments
        await fetchUserComments();
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

    // Fetch user's comments
    async function fetchUserComments() {
        if (!$authStore.user) return;

        isLoadingComments = true;
        commentsError = null;

        try {
            const response = await fetch(`/api/users/${$authStore.user.username}/comments`);
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }

            userComments = await response.json();

            // Enrich comments with script titles
            userComments = userComments.map(comment => ({
                ...comment,
                scriptTitle: $scripts.find(s => s.id === comment.scriptId)?.title
            }));
        } catch (err: any) {
            console.error('Error fetching user comments:', err);
            commentsError = err.message;
        } finally {
            isLoadingComments = false;
        }
    }
</script>

<svelte:head>
    <title>My Profile | AutoHub</title>
    <meta name="description" content="Manage your profile and scripts on AutoHub" />
</svelte:head>

<Header />

<div class="container mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-8">My Profile</h1>
    
    {#if $authStore.isLoading}
        <div class="text-center py-8">
            <div class="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p class="text-lg">Loading profile...</p>
        </div>
    {:else if $authStore.isAuthenticated}
        <div class="max-w-6xl mx-auto">
            <!-- Account Information -->
            <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-8">
                <h2 class="text-xl font-bold mb-4">Account Information</h2>
                
                <div class="mb-4">
                    <strong class="block text-gray-600 dark:text-gray-300 mb-1">Username:</strong>
                    <p>{$authStore.user?.username || ''}</p>
                </div>
                
                <div class="mb-4">
                    <strong class="block text-gray-600 dark:text-gray-300 mb-1">Email:</strong>
                    <p>{$authStore.user?.email || ''}</p>
                </div>
                
                <div class="mb-4">
                    <strong class="block text-gray-600 dark:text-gray-300 mb-1">Joined:</strong>
                    <p>{$authStore.user?.joinDate ? new Date($authStore.user.joinDate).toLocaleDateString() : ''}</p>
                </div>
                
                {#if $authStore.user?.bio}
                    <div class="mb-4">
                        <strong class="block text-gray-600 dark:text-gray-300 mb-1">Bio:</strong>
                        <p class="whitespace-pre-line">{$authStore.user.bio}</p>
                    </div>
                {/if}
                
                <a href="/profile/edit" class="inline-block border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 transition-all shadow-sm hover:shadow text-sm font-medium">
                    <i class="fas fa-edit mr-2"></i>
                    Edit Profile
                </a>
            </div>

            <div class="grid lg:grid-cols-2 gap-8">
                <!-- User's Scripts -->
                <div>
                    <h2 class="text-2xl font-bold mb-6">My Scripts</h2>
                    
                    {#if userScripts.length === 0}
                        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
                            <p class="mb-4 text-gray-600 dark:text-gray-300">You haven't submitted any scripts yet.</p>
                            <a href="/submit" class="inline-block border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 transition-all shadow-sm hover:shadow text-sm font-medium">
                                <i class="fas fa-upload mr-2"></i>
                                Submit your first script
                            </a>
                        </div>
                    {:else}
                        <div class="space-y-4">
                            {#each userScripts as script}
                                <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                                    <div class="flex-1">
                                        <ScriptCard {script} />
                                    </div>
                                    <div class="p-4 flex justify-end border-t border-gray-200 dark:border-gray-600">
                                        <button 
                                            class="border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 transition-all shadow-sm hover:shadow flex items-center text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed" 
                                            on:click={() => handleDelete(script.id)}
                                            disabled={isDeleting}
                                        >
                                            <i class="fas fa-trash mr-2 text-red-500"></i>
                                            {#if isDeleting}
                                                <i class="fas fa-spinner fa-spin mr-2"></i> Deleting...
                                            {:else}
                                                Delete Script
                                            {/if}
                                        </button>
                                    </div>
                                </div>
                            {/each}
                        </div>
                        
                        {#if deleteError}
                            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mt-6">
                                {deleteError}
                            </div>
                        {/if}
                    {/if}
                </div>

                <!-- User's Comments -->
                <div>
                    <h2 class="text-2xl font-bold mb-6">My Comments</h2>

                    {#if isLoadingComments}
                        <div class="text-center py-8">
                            <div class="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p>Loading comments...</p>
                        </div>
                    {:else if commentsError}
                        <div class="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded p-4 mb-6">
                            <div class="flex items-center text-red-700 dark:text-red-400">
                                <i class="fas fa-exclamation-circle mr-2"></i> Error: {commentsError}
                            </div>
                            <button
                                on:click={fetchUserComments}
                                class="text-blue-600 dark:text-blue-400 hover:underline mt-2 flex items-center text-sm"
                            >
                                <i class="fas fa-sync-alt mr-1.5"></i> Try again
                            </button>
                        </div>
                    {:else if userComments.length === 0}
                        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
                            <p class="text-gray-600 dark:text-gray-300">You haven't commented on any scripts yet.</p>
                        </div>
                    {:else}
                        <div class="space-y-4">
                            {#each userComments as comment}
                                <UserCommentCard {comment} />
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    {:else}
        <p class="text-center py-8">Please <a href="/login" class="text-primary hover:underline">log in</a> to view your profile.</p>
    {/if}
</div>

<Footer />

<style>
    /* All styling handled by Tailwind CSS classes */
</style>
