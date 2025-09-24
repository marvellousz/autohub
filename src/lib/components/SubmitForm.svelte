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
    class="max-w-2xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-primary-200 dark:border-primary-800"
>
    {#if error}
        <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-xl">
            <p class="text-sm text-red-600 dark:text-red-400 flex items-center">
                <i class="fas fa-exclamation-triangle mr-2"></i> {error}
            </p>
        </div>
    {/if}

    <div class="space-y-6">
        <!-- Title -->
        <div>
            <label for="title" class="block text-lg font-semibold mb-3 dark:text-gray-300 text-gray-800">
                <i class="fas fa-tag mr-2 text-primary-500"></i> Title
            </label>
            <input
                type="text"
                id="title"
                bind:value={title}
                required
                placeholder="Enter script title"
                class="w-full px-4 py-3 border border-primary-300 dark:border-primary-700 rounded-xl text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white transition-all duration-300"
            />
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                <i class="fas fa-info-circle mr-2"></i> Give your script a clear, descriptive title
            </p>
        </div>

        <!-- Description -->
        <div>
            <label for="description" class="block text-lg font-semibold mb-3 dark:text-gray-300 text-gray-800">
                <i class="fas fa-align-left mr-2 text-secondary-500"></i> Description
            </label>
            <textarea
                id="description"
                bind:value={description}
                required
                placeholder="Describe your script"
                rows="4"
                class="w-full px-4 py-3 border border-primary-300 dark:border-primary-700 rounded-xl text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white resize-none transition-all duration-300"
            ></textarea>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                <i class="fas fa-info-circle mr-2"></i> Explain what your script does and how to use it
            </p>
        </div>

        <!-- Code -->
        <div>
            <label for="code" class="block text-lg font-semibold mb-3 dark:text-gray-300 text-gray-800">
                <i class="fas fa-code mr-2 text-accent-500"></i> Code
            </label>
            <textarea
                id="code"
                bind:value={code}
                required
                placeholder="Paste your Python code here"
                rows="12"
                class="w-full px-4 py-3 border border-primary-300 dark:border-primary-700 rounded-xl text-sm font-mono focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white transition-all duration-300"
            ></textarea>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                <i class="fas fa-info-circle mr-2"></i> Your Python code will be validated before submission
            </p>
        </div>

        <!-- Tags -->
        <div>
            <label for="tags" class="block text-lg font-semibold mb-3 dark:text-gray-300 text-gray-800">
                <i class="fas fa-tags mr-2 text-primary-500"></i> Tags
            </label>
            <input
                type="text"
                id="tags"
                bind:value={tags}
                placeholder="Enter tags (comma-separated)"
                class="w-full px-4 py-3 border border-primary-300 dark:border-primary-700 rounded-xl text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white transition-all duration-300"
            />
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                <i class="fas fa-info-circle mr-2"></i> Add relevant tags to help others find your script (e.g., automation, browser, utility)
            </p>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center mt-8">
            <button
                type="submit"
                disabled={isSubmitting}
                class="btn btn-primary px-8 py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {#if isSubmitting}
                    <i class="fas fa-spinner fa-spin mr-2"></i> Submitting...
                {:else}
                    <i class="fas fa-upload mr-2"></i> Submit Script
                {/if}
            </button>
        </div>
    </div>
</form>

<style>
    /* All styling handled by Tailwind CSS classes */
</style>