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
    <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900 dark:text-white rounded-lg shadow-sm">
        <h2 class="text-lg font-bold mb-2">Tips for Submitting a Great Script</h2>
        
        <ul class="list-disc ml-4 space-y-1 text-sm">
            <li>
                <strong>Be descriptive</strong> - Clear title and detailed description
            </li>
            <li>
                <strong>Add comments</strong> - Well-commented code helps others understand
            </li>
            <li>
                <strong>Include requirements</strong> - List required libraries
            </li>
            <li>
                <strong>Use tags</strong> - Add relevant tags for discoverability
            </li>
            <li>
                <strong>Test your code</strong> - Verify functionality before submitting
            </li>
        </ul>
    </div>
</main>

<Footer />
