<!-- Comment section component -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { authStore } from '$lib/auth/auth';
    
    export let scriptId: string;
    export let authorId = '';
      
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
    
    // Handle comment deletion
    async function deleteComment(commentId: string, commentUserId: string) {
        if (!$authStore.isAuthenticated || 
            ($authStore.user?.id !== commentUserId && $authStore.user?.id !== authorId)) {
            return;
        }

        if (!confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`/api/scripts/${scriptId}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${$authStore.token}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to delete comment');
            }

            // Refresh comments after deletion
            await fetchComments();
        } catch (err: any) {
            console.error('Error deleting comment:', err);
            alert(`Error: ${err.message}`);
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

<div class="comments-section mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
    <div class="max-w-xl mx-auto">
        <!-- Title -->
        <h3 class="text-base font-bold mb-3 dark:text-gray-100 flex items-center">
            <i class="far fa-comments mr-2"></i> Comments
        </h3>
        
        <!-- Comment form -->
        {#if $authStore.isAuthenticated}
            <div class="comment-form mb-4">
                <div class="relative">
                    <textarea
                        rows="1"
                        bind:value={newComment}
                        placeholder="Share your thoughts..."
                        class="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors resize-none"
                    ></textarea>
                    <div class="absolute bottom-2 right-2 text-xs text-primary-500 dark:text-primary-400">
                        {newComment.length}
                    </div>
                </div>
                <div class="mt-1.5 flex justify-end">
                    <button
                        on:click={submitComment}
                        disabled={isSubmitting || !newComment.trim()}
                        class="border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 transition-all shadow-sm hover:shadow flex items-center justify-center text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {#if isSubmitting}
                            <i class="fas fa-spinner fa-spin mr-1"></i> Posting...
                        {:else}
                            <i class="fas fa-paper-plane mr-1"></i> Post
                        {/if}
                    </button>
                </div>
            </div>
        {:else}
            <div class="text-sm mb-4 max-w-xl">
                <a href="/login" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">Log in</a> or 
                <a href="/register" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">register</a> 
                to join the discussion
            </div>
        {/if}
        
        <!-- Comments list -->
        {#if isLoading}
            <div class="text-center py-4 max-w-xl">
                <div class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-blue-600 dark:border-blue-400 border-r-transparent"></div>
                <p class="text-sm text-primary-600 dark:text-primary-400">Loading comments...</p>
            </div>
        {:else if error}
            <div class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded p-3 mb-4 text-sm max-w-xl">
                <div class="flex items-center text-red-700 dark:text-red-400">
                    <i class="fas fa-exclamation-circle mr-2"></i> Error: {error}
                </div>
                <button
                    on:click={fetchComments}
                    class="text-blue-600 dark:text-blue-400 hover:underline mt-1 flex items-center text-xs"
                >
                    <i class="fas fa-sync-alt mr-1.5"></i> Try again
                </button>
            </div>
        {:else if comments.length === 0}
            <div class="text-center py-4 max-w-xl">
                <p class="text-primary-500 dark:text-primary-400 text-sm">No comments yet. Start the conversation!</p>
            </div>
        {:else}
            <div class="space-y-2 max-w-xl">
                {#each comments as comment}
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded py-1.5 px-2 shadow-sm">
                        <div class="flex items-center justify-between gap-2 mb-1">
                            <div class="flex items-center min-w-0 gap-1">
                                <div class="w-4 h-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-medium shrink-0">
                                    {comment.username[0].toUpperCase()}
                                </div>
                                <span class="font-medium text-gray-900 dark:text-gray-100 truncate text-xs">{comment.username}</span>
                            </div>
                            <span class="text-[11px] text-primary-500 dark:text-primary-400 flex items-center shrink-0">
                                <i class="far fa-clock mr-0.5"></i> {formatDate(comment.createdAt)}
                            </span>
                        </div>
                        <p class="text-xs text-gray-700 dark:text-gray-300 break-words">{comment.content}</p>
                        {#if $authStore.isAuthenticated && ($authStore.user?.id === comment.userId || $authStore.user?.id === authorId)}
                            <div class="flex justify-end mt-0.5">                                <button
                                    on:click={() => deleteComment(comment.id, comment.userId)}
                                    class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-0.5 rounded-sm transition-colors"
                                    title="Delete comment"
                                    aria-label="Delete comment"
                                >
                                    <i class="fas fa-trash-alt text-xs" aria-hidden="true"></i>
                                </button>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    /* All styling handled by Tailwind classes */
</style>
