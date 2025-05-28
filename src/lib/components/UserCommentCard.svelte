<!-- User Comment Card component -->
<script lang="ts">
    interface Comment {
        id: string;
        content: string;
        scriptId: string;
        scriptTitle?: string;
        createdAt: string;
    }

    export let comment: Comment;

    // Format the date
    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleString();
    }
</script>

<div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2 shadow-sm">
    <p class="text-sm text-gray-700 dark:text-gray-300 mb-2 whitespace-pre-line leading-snug">{comment.content}</p>
    <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <a 
            href="/scripts/{comment.scriptId}" 
            class="text-blue-600 dark:text-blue-400 hover:underline text-xs"
        >
            {comment.scriptTitle || 'View Script'}
        </a>
        <span class="flex items-center text-xs">
            <i class="far fa-clock mr-1"></i> {formatDate(comment.createdAt)}
        </span>
    </div>
</div>
