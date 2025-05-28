<!-- Terms of Service page -->
<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
    <title>Terms of Service - AutoHub</title>
    <meta name="description" content="Terms of service and usage guidelines for AutoHub" />
</svelte:head>

<Header />

<main class="container mx-auto py-8 px-4 flex-grow">
    <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <h1 class="text-3xl font-bold mb-6 dark:text-white">Terms of Service</h1>
        
        <div class="space-y-6 text-gray-600 dark:text-gray-300">
            <section>
                <h2 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Acceptance of Terms</h2>
                <p>By accessing and using AutoHub, you accept and agree to be bound by these Terms of Service.</p>
            </section>

            <section>
                <h2 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">User Accounts</h2>
                <ul class="list-disc ml-6 space-y-2">
                    <li>You must provide accurate information when creating an account</li>
                    <li>You are responsible for maintaining account security</li>
                    <li>You must not share account credentials</li>
                    <li>We reserve the right to terminate accounts that violate our terms</li>
                </ul>
            </section>

            <section>
                <h2 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Content Guidelines</h2>
                <p class="mb-3">When submitting scripts, you must:</p>
                <ul class="list-disc ml-6 space-y-2">
                    <li>Only submit content you have the right to share</li>
                    <li>Not include malicious or harmful code</li>
                    <li>Properly document your code</li>
                    <li>Respect intellectual property rights</li>
                </ul>
            </section>

            <section>
                <h2 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Intellectual Property</h2>
                <ul class="list-disc ml-6 space-y-2">
                    <li>You retain rights to your submitted scripts</li>
                    <li>By submitting, you grant AutoHub a license to display and share your content</li>
                    <li>You must respect others' intellectual property rights</li>
                </ul>
            </section>

            <section>
                <h2 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Platform Usage</h2>
                <p class="mb-3">You agree not to:</p>
                <ul class="list-disc ml-6 space-y-2">
                    <li>Use the platform for illegal activities</li>
                    <li>Upload malware or malicious code</li>
                    <li>Attempt to breach security measures</li>
                    <li>Harass or harm other users</li>
                </ul>
            </section>

            <section>
                <h2 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Disclaimer</h2>
                <p>Scripts are provided "as is" without warranty. AutoHub is not responsible for any damages resulting from script usage.</p>
            </section>

            <section>
                <h2 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Modifications</h2>
                <p>We reserve the right to modify these terms. Users will be notified of significant changes.</p>
            </section>

            <section>
                <h2 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Termination</h2>
                <p>We may terminate or suspend access to our service for violations of these terms.</p>
            </section>

            <div class="mt-8 text-sm text-gray-500 dark:text-gray-400">
                Last updated: May 28, 2025
            </div>
        </div>
    </div>
</main>

<Footer />
