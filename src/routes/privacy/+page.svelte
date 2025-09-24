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
    <div class="max-w-4xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-primary-200 dark:border-primary-800">
        <h1 class="text-4xl font-bold mb-8 text-center">
            <span class="gradient-text">Privacy Policy</span>
        </h1>
        
        <div class="space-y-8 text-primary-700 dark:text-primary-300">
            <section class="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                <h2 class="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200 flex items-center">
                    <i class="fas fa-database mr-3 text-primary-500"></i> Information We Collect
                </h2>
                <p class="mb-3 text-primary-700 dark:text-primary-300">When you use AutoHub, we collect the following types of information:</p>
                <ul class="list-disc ml-6 space-y-2 text-primary-700 dark:text-primary-300">
                    <li>Account information (email, username)</li>
                    <li>Scripts you upload and their metadata</li>
                    <li>Comments and interactions</li>
                    <li>Usage data and analytics</li>
                </ul>
            </section>

            <section class="bg-gradient-to-r from-secondary-100 to-accent-100 dark:from-secondary-900/50 dark:to-accent-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                <h2 class="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200 flex items-center">
                    <i class="fas fa-cogs mr-3 text-secondary-500"></i> How We Use Your Information
                </h2>
                <p class="mb-3 text-primary-700 dark:text-primary-300">We use your information to:</p>
                <ul class="list-disc ml-6 space-y-2 text-primary-700 dark:text-primary-300">
                    <li>Provide and improve our services</li>
                    <li>Personalize your experience</li>
                    <li>Communicate with you about updates</li>
                    <li>Ensure platform security</li>
                </ul>
            </section>

            <section class="bg-gradient-to-r from-accent-100 to-primary-100 dark:from-accent-900/50 dark:to-primary-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                <h2 class="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200 flex items-center">
                    <i class="fas fa-shield-alt mr-3 text-accent-500"></i> Data Security
                </h2>
                <p class="text-primary-700 dark:text-primary-300">We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section class="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                <h2 class="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200 flex items-center">
                    <i class="fas fa-cookie-bite mr-3 text-primary-500"></i> Cookies
                </h2>
                <p class="text-primary-700 dark:text-primary-300">We use cookies to enhance your experience. You can control cookie settings through your browser preferences.</p>
            </section>

            <section class="bg-gradient-to-r from-secondary-100 to-accent-100 dark:from-secondary-900/50 dark:to-accent-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                <h2 class="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200 flex items-center">
                    <i class="fas fa-external-link-alt mr-3 text-secondary-500"></i> Third-Party Services
                </h2>
                <p class="text-primary-700 dark:text-primary-300">We may use third-party services that collect information. These services have their own privacy policies.</p>
            </section>

            <section class="bg-gradient-to-r from-accent-100 to-primary-100 dark:from-accent-900/50 dark:to-primary-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                <h2 class="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200 flex items-center">
                    <i class="fas fa-user-check mr-3 text-accent-500"></i> Your Rights
                </h2>
                <p class="mb-3 text-primary-700 dark:text-primary-300">You have the right to:</p>
                <ul class="list-disc ml-6 space-y-2 text-primary-700 dark:text-primary-300">
                    <li>Access your personal data</li>
                    <li>Request data correction</li>
                    <li>Request data deletion</li>
                    <li>Withdraw consent</li>
                </ul>
            </section>

            <section class="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                <h2 class="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200 flex items-center">
                    <i class="fas fa-sync-alt mr-3 text-primary-500"></i> Updates to This Policy
                </h2>
                <p class="text-primary-700 dark:text-primary-300">We may update this privacy policy. We will notify you of any changes by posting the new policy on this page.</p>
            </section>

            <section class="bg-gradient-to-r from-secondary-100 to-accent-100 dark:from-secondary-900/50 dark:to-accent-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                <h2 class="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200 flex items-center">
                    <i class="fas fa-envelope mr-3 text-secondary-500"></i> Contact Us
                </h2>
                <p class="text-primary-700 dark:text-primary-300">If you have questions about this privacy policy, please contact us through our <a href="/contact" class="text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 hover:underline font-medium">contact page</a>.</p>
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
