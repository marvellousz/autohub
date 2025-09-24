<!-- Submit script page -->
<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { SubmitForm } from '$lib/components';
</script>

<svelte:head>
    <title>Submit Script - AutoHub</title>
    <meta name="description" content="Submit your Python automation script to share with the community." />
</svelte:head>

<Header />

<main class="container mx-auto py-4 px-4 flex-grow">
    <h1 class="text-2xl font-bold mb-4 text-center">Submit a Script</h1>
    
    <SubmitForm />
    <div class="mt-8 p-6 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 dark:from-primary-900/50 dark:via-secondary-900/50 dark:to-accent-900/50 rounded-2xl shadow-xl border border-primary-200 dark:border-primary-800">
        <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
            <i class="fas fa-lightbulb mr-3 text-primary-500"></i> Tips for Submitting a Great Script
        </h2>
        
        <ul class="space-y-3 text-sm">
            <li class="flex items-start">
                <i class="fas fa-check-circle text-primary-500 mr-3 mt-0.5"></i>
                <div>
                    <strong class="text-gray-800 dark:text-white">Be descriptive</strong> - Clear title and detailed description
                </div>
            </li>
            <li class="flex items-start">
                <i class="fas fa-check-circle text-secondary-500 mr-3 mt-0.5"></i>
                <div>
                    <strong class="text-gray-800 dark:text-white">Add comments</strong> - Well-commented code helps others understand
                </div>
            </li>
            <li class="flex items-start">
                <i class="fas fa-check-circle text-accent-500 mr-3 mt-0.5"></i>
                <div>
                    <strong class="text-gray-800 dark:text-white">Include requirements</strong> - List required libraries
                </div>
            </li>
            <li class="flex items-start">
                <i class="fas fa-check-circle text-primary-500 mr-3 mt-0.5"></i>
                <div>
                    <strong class="text-gray-800 dark:text-white">Use tags</strong> - Add relevant tags for discoverability
                </div>
            </li>
            <li class="flex items-start">
                <i class="fas fa-check-circle text-secondary-500 mr-3 mt-0.5"></i>
                <div>
                    <strong class="text-gray-800 dark:text-white">Test your code</strong> - Verify functionality before submitting
                </div>
            </li>
        </ul>
    </div>
</main>

<Footer />
