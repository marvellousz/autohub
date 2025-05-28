<!-- Contact Us page -->
<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';

    let name = '';
    let email = '';
    let subject = '';
    let message = '';
    let isSubmitting = false;
    let submitted = false;
    let error: string | null = null;

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        if (isSubmitting) return;

        isSubmitting = true;
        error = null;

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    subject: subject.trim(),
                    message: message.trim()
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            submitted = true;
            name = '';
            email = '';
            subject = '';
            message = '';
        } catch (err) {
            error = err instanceof Error ? err.message : 'An error occurred';
        } finally {
            isSubmitting = false;
        }
    }
</script>

<svelte:head>
    <title>Contact Us - AutoHub</title>
    <meta name="description" content="Get in touch with the AutoHub team" />
</svelte:head>

<Header />

<main class="container mx-auto py-8 px-4 flex-grow">
    <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold mb-6 text-center dark:text-white">Contact Us</h1>
        
        {#if submitted}
            <div class="bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                <i class="fas fa-check-circle text-3xl text-green-600 dark:text-green-400 mb-3"></i>
                <h2 class="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">Message Sent!</h2>
                <p class="text-green-700 dark:text-green-300">Thank you for reaching out. We'll get back to you soon.</p>
                <button 
                    class="mt-4 text-sm text-green-600 dark:text-green-400 hover:underline"
                    on:click={() => submitted = false}
                >
                    Send another message
                </button>
            </div>
        {:else}
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                {#if error}
                    <div class="mb-4 p-3 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md">
                        <p class="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                {/if}

                <form on:submit={handleSubmit} class="space-y-4">
                    <div>
                        <label for="name" class="block text-sm font-medium mb-1 dark:text-gray-300">Name</label>
                        <input
                            type="text"
                            id="name"
                            bind:value={name}
                            required
                            class="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            id="email"
                            bind:value={email}
                            required
                            class="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    <div>
                        <label for="subject" class="block text-sm font-medium mb-1 dark:text-gray-300">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            bind:value={subject}
                            required
                            class="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    <div>
                        <label for="message" class="block text-sm font-medium mb-1 dark:text-gray-300">Message</label>
                        <textarea
                            id="message"
                            bind:value={message}
                            required
                            rows="5"
                            class="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                        ></textarea>
                    </div>

                    <div class="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium 
                                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                                   transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>

                <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <h2 class="text-lg font-semibold mb-4 dark:text-white">Other Ways to Reach Us</h2>
                    
                    <div class="space-y-4">
                        <div class="flex items-start space-x-3">
                            <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center shrink-0">
                                <i class="fas fa-envelope text-blue-600 dark:text-blue-400"></i>
                            </div>
                            <div>
                                <h3 class="text-sm font-medium dark:text-white">Email</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400">support@autohub.com</p>
                            </div>
                        </div>

                        <div class="flex items-start space-x-3">
                            <div class="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center shrink-0">
                                <i class="fab fa-github text-green-600 dark:text-green-400"></i>
                            </div>
                            <div>
                                <h3 class="text-sm font-medium dark:text-white">GitHub</h3>
                                <a href="https://github.com/autohub" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">github.com/autohub</a>
                            </div>
                        </div>

                        <div class="flex items-start space-x-3">
                            <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center shrink-0">
                                <i class="fab fa-discord text-purple-600 dark:text-purple-400"></i>
                            </div>
                            <div>
                                <h3 class="text-sm font-medium dark:text-white">Discord</h3>
                                <a href="https://discord.gg/autohub" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">Join our community</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</main>

<Footer />
