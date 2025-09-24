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
    <div class="max-w-4xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-primary-200 dark:border-primary-800">
        <h1 class="text-4xl font-bold mb-8 text-center">
            <span class="gradient-text">Terms of Service</span>
        </h1>
        
        <div class="space-y-8 text-primary-700 dark:text-primary-300">
            <section class="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                <h2 class="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200 flex items-center">
                    <i class="fas fa-handshake mr-3 text-primary-500"></i> Acceptance of Terms
                </h2>
                <p class="text-primary-700 dark:text-primary-300">By accessing and using AutoHub, you accept and agree to be bound by these Terms of Service.</p>
            </section>

            <section class="bg-gradient-to-r from-secondary-100 to-accent-100 dark:from-secondary-900/50 dark:to-accent-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                <h2 class="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200 flex items-center">
                    <i class="fas fa-user-circle mr-3 text-secondary-500"></i> User Accounts
                </h2>
                <ul class="list-disc ml-6 space-y-2 text-primary-700 dark:text-primary-300">
                    <li>You must provide accurate information when creating an account</li>
                    <li>You are responsible for maintaining account security</li>
                    <li>You must not share account credentials</li>
                    <li>We reserve the right to terminate accounts that violate our terms</li>
                </ul>
            </section>

            <section class="bg-gradient-to-r from-accent-100 to-primary-100 dark:from-accent-900/50 dark:to-primary-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                <h2 class="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200 flex items-center">
                    <i class="fas fa-file-code mr-3 text-accent-500"></i> Content Guidelines
                </h2>
                <p class="mb-3 text-primary-700 dark:text-primary-300">When submitting scripts, you must:</p>
                <ul class="list-disc ml-6 space-y-2 text-primary-700 dark:text-primary-300">
                    <li>Only submit content you have the right to share</li>
                    <li>Not include malicious or harmful code</li>
                    <li>Properly document your code</li>
                    <li>Respect intellectual property rights</li>
                </ul>
            </section>

            <section class="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                <h2 class="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200 flex items-center">
                    <i class="fas fa-copyright mr-3 text-primary-500"></i> Intellectual Property
                </h2>
                <ul class="list-disc ml-6 space-y-2 text-primary-700 dark:text-primary-300">
                    <li>You retain rights to your submitted scripts</li>
                    <li>By submitting, you grant AutoHub a license to display and share your content</li>
                    <li>You must respect others' intellectual property rights</li>
                </ul>
            </section>

            <section class="bg-gradient-to-r from-secondary-100 to-accent-100 dark:from-secondary-900/50 dark:to-accent-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                <h2 class="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200 flex items-center">
                    <i class="fas fa-shield-alt mr-3 text-secondary-500"></i> Platform Usage
                </h2>
                <p class="mb-3 text-primary-700 dark:text-primary-300">You agree not to:</p>
                <ul class="list-disc ml-6 space-y-2 text-primary-700 dark:text-primary-300">
                    <li>Use the platform for illegal activities</li>
                    <li>Upload malware or malicious code</li>
                    <li>Attempt to breach security measures</li>
                    <li>Harass or harm other users</li>
                </ul>
            </section>

            <section class="bg-gradient-to-r from-accent-100 to-primary-100 dark:from-accent-900/50 dark:to-primary-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                <h2 class="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200 flex items-center">
                    <i class="fas fa-exclamation-triangle mr-3 text-accent-500"></i> Disclaimer
                </h2>
                <p class="text-primary-700 dark:text-primary-300">Scripts are provided "as is" without warranty. AutoHub is not responsible for any damages resulting from script usage.</p>
            </section>

            <section class="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                <h2 class="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200 flex items-center">
                    <i class="fas fa-edit mr-3 text-primary-500"></i> Modifications
                </h2>
                <p class="text-primary-700 dark:text-primary-300">We reserve the right to modify these terms. Users will be notified of significant changes.</p>
            </section>

            <section class="bg-gradient-to-r from-secondary-100 to-accent-100 dark:from-secondary-900/50 dark:to-accent-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                <h2 class="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200 flex items-center">
                    <i class="fas fa-ban mr-3 text-secondary-500"></i> Termination
                </h2>
                <p class="text-primary-700 dark:text-primary-300">We may terminate or suspend access to our service for violations of these terms.</p>
            </section>

            <div class="mt-8 text-center">
                <div class="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl p-4 inline-block">
                    <p class="text-sm font-medium">
                        <i class="fas fa-calendar-alt mr-2"></i> Last updated: May 28, 2025
                    </p>
                </div>
            </div>
        </div>
    </div>
</main>

<Footer />
