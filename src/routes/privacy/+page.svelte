<!-- Privacy Policy page -->
<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
    <title>Privacy Policy - AutoHub</title>
    <meta name="description" content="Privacy policy and data handling practices for AutoHub" />
</svelte:head>

<Header />

<main class="container mx-auto py-8 px-4 flex-grow">
    <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <h1 class="text-3xl font-bold mb-6 dark:text-white">Privacy Policy</h1>
        
        <div class="space-y-6 text-gray-600 dark:text-gray-300">
            <section>
                <h2 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Information We Collect</h2>
                <p class="mb-3">When you use AutoHub, we collect the following types of information:</p>
                <ul class="list-disc ml-6 space-y-2">
                    <li>Account information (email, username)</li>
                    <li>Scripts you upload and their metadata</li>
                    <li>Comments and interactions</li>
                    <li>Usage data and analytics</li>
                </ul>
            </section>

            <section>
                <h2 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">How We Use Your Information</h2>
                <p class="mb-3">We use your information to:</p>
                <ul class="list-disc ml-6 space-y-2">
                    <li>Provide and improve our services</li>
                    <li>Personalize your experience</li>
                    <li>Communicate with you about updates</li>
                    <li>Ensure platform security</li>
                </ul>
            </section>

            <section>
                <h2 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Data Security</h2>
                <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section>
                <h2 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Cookies</h2>
                <p>We use cookies to enhance your experience. You can control cookie settings through your browser preferences.</p>
            </section>

            <section>
                <h2 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Third-Party Services</h2>
                <p>We may use third-party services that collect information. These services have their own privacy policies.</p>
            </section>

            <section>
                <h2 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Your Rights</h2>
                <p class="mb-3">You have the right to:</p>
                <ul class="list-disc ml-6 space-y-2">
                    <li>Access your personal data</li>
                    <li>Request data correction</li>
                    <li>Request data deletion</li>
                    <li>Withdraw consent</li>
                </ul>
            </section>

            <section>
                <h2 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Updates to This Policy</h2>
                <p>We may update this privacy policy. We will notify you of any changes by posting the new policy on this page.</p>
            </section>

            <section>
                <h2 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Contact Us</h2>
                <p>If you have questions about this privacy policy, please contact us through our <a href="/contact" class="text-blue-600 dark:text-blue-400 hover:underline">contact page</a>.</p>
            </section>

            <div class="mt-8 text-sm text-gray-500 dark:text-gray-400">
                Last updated: May 28, 2025
            </div>
        </div>
    </div>
</main>

<Footer />
