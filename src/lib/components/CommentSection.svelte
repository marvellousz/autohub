<!-- Comment section component -->
<script lang="ts">    import { onMount } from 'svelte';
    import { authStore } from '$lib/auth/auth';
    
    export let scriptId: string;
      // State
    let comments: any[] = [];
    let isLoading = false;
    let error: string | null = null;
    let newComment = '';
    let isSubmitting = false;
    
    // Fetch comments
    async function fetchComments() {
        isLoading = true;
        error = null;
        
        try {
            const response = await fetch(`/api/scripts/${scriptId}/comments`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            
            comments = await response.json();
        } catch (err: any) {
            console.error('Error fetching comments:', err);
            error = err.message;
        } finally {
            isLoading = false;
        }
    }
    
    // Submit a new comment
    async function submitComment() {
        if (!newComment.trim()) return;
        if (!$authStore.isAuthenticated) {
            alert('Please log in to post a comment');
            return;
        }
        
        isSubmitting = true;
        
        try {
            const response = await fetch(`/api/scripts/${scriptId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${$authStore.token}`
                },
                body: JSON.stringify({
                    content: newComment,
                    username: $authStore.user?.username
                })
            });
            
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to post comment');
            }
              // Clear the input and refresh comments
            newComment = '';
            await fetchComments();
        } catch (err: any) {
            console.error('Error posting comment:', err);
            alert(`Error: ${err.message}`);
        } finally {
            isSubmitting = false;
        }
    }
    
    // Format the date
    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleString();
    }
    
    // Load comments on mount
    onMount(() => {
        fetchComments();
    });
</script>

<div class="comments-section mt-6 border-t pt-6">
    <h3 class="text-xl font-bold mb-4">Comments</h3>
    
    <!-- Comment form -->
    {#if $authStore.isAuthenticated}
        <div class="comment-form mb-6">
            <textarea
                class="w-full p-3 border rounded resize-none"
                rows="3"
                placeholder="Add a comment..."
                bind:value={newComment}
            ></textarea>
            <button
                class="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                on:click={submitComment}
                disabled={isSubmitting || !newComment.trim()}
            >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
        </div>
    {:else}
        <div class="bg-gray-100 p-4 rounded mb-6">
            <p>
                <a href="/login" class="text-blue-600 hover:underline">Log in</a> or 
                <a href="/register" class="text-blue-600 hover:underline">register</a> to post comments.
            </p>
        </div>
    {/if}
    
    <!-- Comments list -->
    {#if isLoading}
        <div class="text-center py-4">
            <div class="loading-spinner mb-2"></div>
            <p>Loading comments...</p>
        </div>
    {:else if error}
        <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p>Error: {error}</p>
            <button
                class="text-blue-600 hover:underline mt-2"
                on:click={fetchComments}
            >
                Try again
            </button>
        </div>
    {:else if comments.length === 0}
        <p class="text-gray-500 italic">No comments yet. Be the first to comment!</p>
    {:else}
        <div class="space-y-4">
            {#each comments as comment}
                <div class="comment p-4 border rounded">
                    <div class="flex justify-between mb-2">
                        <span class="font-medium">{comment.username}</span>
                        <span class="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p>{comment.content}</p>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .loading-spinner {
        border: 3px solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        border-top: 3px solid #3498db;
        width: 24px;
        height: 24px;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
