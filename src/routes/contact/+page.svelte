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
        <h1 class="text-4xl font-bold mb-8 text-center">
            <span class="gradient-text">Contact Us</span>
        </h1>
        <p class="text-center text-primary-700 dark:text-primary-300 mb-8 text-lg">Have questions, suggestions, or feedback? We'd love to hear from you!</p>
        
        {#if submitted}
            <div class="bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-xl border border-primary-200 dark:border-primary-800">
                <i class="fas fa-check-circle text-4xl text-green-600 dark:text-green-400 mb-4"></i>
                <h2 class="text-2xl font-bold mb-3 text-green-800 dark:text-green-200">Message Sent!</h2>
                <p class="text-green-700 dark:text-green-300 mb-6">Thank you for reaching out. We'll get back to you soon.</p>
                <button 
                    class="btn btn-primary px-6 py-3 text-lg font-semibold"
                    on:click={() => submitted = false}
                >
                    <i class="fas fa-paper-plane mr-2"></i> Send another message
                </button>
            </div>
        {:else}
            <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-primary-200 dark:border-primary-800">
                {#if error}
                    <div class="mb-4 p-3 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md">
                        <p class="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                {/if}

                <form on:submit={handleSubmit} class="space-y-6">
                    <div>
                        <label for="name" class="block text-lg font-semibold mb-3 dark:text-primary-300 text-primary-800">
                            <i class="fas fa-user mr-2 text-primary-500"></i> Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            bind:value={name}
                            required
                            class="w-full px-4 py-3 border border-primary-300 dark:border-primary-700 rounded-xl text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white transition-all duration-300"
                        />
                    </div>

                    <div>
                        <label for="email" class="block text-lg font-semibold mb-3 dark:text-primary-300 text-primary-800">
                            <i class="fas fa-envelope mr-2 text-secondary-500"></i> Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            bind:value={email}
                            required
                            class="w-full px-4 py-3 border border-primary-300 dark:border-primary-700 rounded-xl text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white transition-all duration-300"
                        />
                    </div>

                    <div>
                        <label for="subject" class="block text-lg font-semibold mb-3 dark:text-primary-300 text-primary-800">
                            <i class="fas fa-tag mr-2 text-accent-500"></i> Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            bind:value={subject}
                            required
                            class="w-full px-4 py-3 border border-primary-300 dark:border-primary-700 rounded-xl text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white transition-all duration-300"
                        />
                    </div>

                    <div>
                        <label for="message" class="block text-lg font-semibold mb-3 dark:text-primary-300 text-primary-800">
                            <i class="fas fa-comment mr-2 text-primary-500"></i> Message
                        </label>
                        <textarea
                            id="message"
                            bind:value={message}
                            required
                            rows="5"
                            class="w-full px-4 py-3 border border-primary-300 dark:border-primary-700 rounded-xl text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white resize-none transition-all duration-300"
                        ></textarea>
                    </div>

                    <div class="flex justify-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            class="btn btn-primary px-8 py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {#if isSubmitting}
                                <i class="fas fa-spinner fa-spin mr-2"></i> Sending...
                            {:else}
                                <i class="fas fa-paper-plane mr-2"></i> Send Message
                            {/if}
                        </button>
                    </div>
                </form>

                <div class="mt-8 pt-8 border-t border-primary-200 dark:border-primary-800">
                    <h2 class="text-2xl font-bold mb-6 dark:text-white">
                        <span class="gradient-text">Other Ways to Reach Us</span>
                    </h2>
                    
                    <div class="space-y-6">
                        <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-2xl border border-primary-200 dark:border-primary-800">
                            <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shrink-0">
                                <i class="fas fa-envelope text-white text-xl"></i>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold dark:text-white mb-1">Email</h3>
                                <a href="mailto:pranavmurali024@gmail.com" class="text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">pranavmurali024@gmail.com</a>
                            </div>
                        </div>

                        <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-secondary-100 to-accent-100 dark:from-secondary-900/50 dark:to-accent-900/50 rounded-2xl border border-primary-200 dark:border-primary-800">
                            <div class="w-12 h-12 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center shrink-0">
                                <i class="fab fa-github text-white text-xl"></i>
                            </div>
                            <div class="min-w-0 flex-1">
                                <h3 class="text-lg font-semibold dark:text-white mb-1">GitHub Repository</h3>
                                <a href="https://github.com/Marvellousz/autohub" class="text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium break-all text-sm" target="_blank" rel="noopener noreferrer">github.com/Marvellousz/autohub</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</main>

<Footer />
