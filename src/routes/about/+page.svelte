<!-- About page -->
<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
    <title>About - AutoHub</title>
    <meta name="description" content="Learn more about AutoHub, a platform for discovering and sharing Python automation scripts." />
</svelte:head>

<Header />

<main class="min-h-screen">
    <section class="bg-gray-800 text-white py-12">
        <div class="container mx-auto px-4">
            <h1 class="text-3xl md:text-4xl font-bold mb-2">About AutoHub</h1>
            <p class="text-xl text-gray-300">Learn more about our platform and mission</p>
        </div>
    </section>
    
    <section class="py-12">
        <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto">
                <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-8">
                    <h2 class="text-2xl font-bold mb-6">Our Mission</h2>
                    
                    <p class="mb-4">
                        AutoHub was created with a simple mission: to provide a platform where developers can 
                        share and discover Python automation scripts that solve real-world problems.
                    </p>
                    
                    <p class="mb-4">
                        We believe in the power of automation to simplify repetitive tasks, save time, and 
                        unlock human creativity. By bringing together a community of Python enthusiasts, 
                        we aim to build a comprehensive library of high-quality scripts that anyone can use.
                    </p>
                    
                    <p>
                        Whether you're looking to automate web scraping, file operations, data processing, 
                        or API interactions, AutoHub is designed to help you find the right script for your needs.
                    </p>
                </div>
                  <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-8">
                    <h2 class="text-2xl font-bold mb-6">What We Offer</h2>
                    
                    <div class="flex flex-col md:flex-row items-start gap-6 mb-6">
                        <div class="flex-shrink-0">
                            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                <i class="fas fa-search text-white text-xl"></i>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold mb-2">Script Discovery</h3>
                            <p class="text-gray-600 dark:text-gray-300">Easily browse and search through our curated collection of Python automation scripts, filtered by category, tags, or keywords.</p>
                        </div>
                    </div>
                    
                    <div class="flex flex-col md:flex-row items-start gap-6 mb-6">
                        <div class="flex-shrink-0">
                            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                <i class="fas fa-code text-white text-xl"></i>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold mb-2">Code Preview</h3>
                            <p class="text-gray-600 dark:text-gray-300">Review the source code directly in your browser before downloading, ensuring it meets your specific requirements.</p>
                        </div>
                    </div>
                    
                    <div class="flex flex-col md:flex-row items-start gap-6 mb-6">
                        <div class="flex-shrink-0">
                            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                <i class="fas fa-upload text-white text-xl"></i>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold mb-2">Script Sharing</h3>
                            <p class="text-gray-600 dark:text-gray-300">Share your own automation scripts with our community, providing solutions to common problems and helping others.</p>
                        </div>
                    </div>
                    
                    <div class="flex flex-col md:flex-row items-start gap-6">
                        <div class="flex-shrink-0">
                            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                <i class="fas fa-users text-white text-xl"></i>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold mb-2">Community</h3>
                            <p class="text-gray-600 dark:text-gray-300">Join a community of Python developers and automation enthusiasts sharing knowledge and best practices.</p>
                        </div>
                    </div>
                </div>
                  <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-bold mb-6">Contact Us</h2>
                    
                    <p class="mb-8">
                        Have questions, suggestions, or feedback? We'd love to hear from you!
                    </p>
                    
                    <div class="space-y-4">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                <i class="fas fa-envelope text-white"></i>
                            </div>
                            <span>contact@autohub.example.com</span>
                        </div>
                        
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                <i class="fab fa-github text-white"></i>
                            </div>
                            <span>github.com/autohub</span>
                        </div>
                        
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                <i class="fab fa-twitter text-white"></i>
                            </div>
                            <span>@AutoHubPython</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<Footer />

<style>
    /* All styling handled by Tailwind CSS classes */
</style>
