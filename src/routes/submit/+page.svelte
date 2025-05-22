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

<main class="container mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold mb-8 text-center">Submit a Script</h1>
    
    <SubmitForm />
    
    <div class="tips mt-12 p-6 bg-blue-50 rounded-lg">
        <h2 class="text-xl font-bold mb-4">Tips for Submitting a Great Script</h2>
        
        <ul class="list-disc ml-6 space-y-2">
            <li>
                <strong>Be descriptive</strong> - Provide a clear, concise title and detailed description
                that explains what your script does and how to use it.
            </li>
            <li>
                <strong>Add comments</strong> - Well-commented code helps others understand how your script works.
            </li>
            <li>
                <strong>Include requirements</strong> - If your script requires special libraries, mention them 
                in the description or as comments in your code.
            </li>
            <li>
                <strong>Use tags</strong> - Add relevant tags to make your script easier to find.
            </li>
            <li>
                <strong>Test your code</strong> - Make sure your script works as expected before submitting.
            </li>
        </ul>
    </div>
</main>

<Footer />
