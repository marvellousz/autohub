<!-- Script submission form component -->
<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import { validatePythonCode } from '$lib/utils/helpers';

    // Form data
    let title = '';
    let description = '';
    let code = '';
    let tags = '';
    let isSubmitting = false;
    let error: string | null = null;

    // Handle form submission
    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        if (isSubmitting) return;

        isSubmitting = true;
        error = null;

        // Basic validation
        if (!title.trim() || !description.trim() || !code.trim()) {
            error = 'Please fill in all required fields';
            isSubmitting = false;
            return;
        }

        // Code validation
        if (!validatePythonCode(code)) {
            error = 'The code appears to contain syntax errors';
            isSubmitting = false;
            return;
        }

        try {
            const response = await fetch('/api/scripts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title.trim(),
                    description: description.trim(),
                    code: code.trim(),
                    tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
                })
            });

            if (!response.ok) {
                throw new Error('Failed to submit script');
            }

            const data = await response.json();
            goto(`/scripts/${data.id}`);
        } catch (err) {
            error = err instanceof Error ? err.message : 'An error occurred';
        } finally {
            isSubmitting = false;
        }
    }
</script>

<form 
    on:submit={handleSubmit}
    class="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
>
    {#if error}
        <div class="mb-4 p-3 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md">
            <p class="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
    {/if}

    <div class="space-y-3">
        <!-- Title -->
        <div>
            <label for="title" class="block text-sm font-medium mb-1 dark:text-gray-300">
                Title
            </label>
            <input
                type="text"
                id="title"
                bind:value={title}
                required
                placeholder="Enter script title"
                class="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Give your script a clear, descriptive title
            </p>
        </div>

        <!-- Description -->
        <div>
            <label for="description" class="block text-sm font-medium mb-1 dark:text-gray-300">
                Description
            </label>
            <textarea
                id="description"
                bind:value={description}
                required
                placeholder="Describe your script"
                rows="3"
                class="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
            ></textarea>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Explain what your script does and how to use it
            </p>
        </div>

        <!-- Code -->
        <div>
            <label for="code" class="block text-sm font-medium mb-1 dark:text-gray-300">
                Code
            </label>
            <textarea
                id="code"
                bind:value={code}
                required
                placeholder="Paste your code here"
                rows="8"
                class="w-full px-3 py-2 border rounded-md text-sm font-mono focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Your Python code will be validated before submission
            </p>
        </div>

        <!-- Tags -->
        <div>
            <label for="tags" class="block text-sm font-medium mb-1 dark:text-gray-300">
                Tags
            </label>
            <input
                type="text"
                id="tags"
                bind:value={tags}
                placeholder="Enter tags (comma-separated)"
                class="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Add relevant tags to help others find your script (e.g., automation, browser, utility)
            </p>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end mt-4">
            <button
                type="submit"
                disabled={isSubmitting}
                class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium 
                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Submitting...' : 'Submit Script'}
            </button>
        </div>
    </div>
</form>

<style>
    /* All styling handled by Tailwind CSS classes */
</style>