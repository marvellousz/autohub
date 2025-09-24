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
    <section class="py-24 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 text-white text-center relative overflow-hidden">
        <!-- Animated background elements -->
        <div class="absolute inset-0 bg-black/20"></div>
        <div class="absolute top-0 left-0 w-full h-full">
            <div class="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
            <div class="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style="animation-delay: 2s;"></div>
            <div class="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float" style="animation-delay: 4s;"></div>
            <div class="absolute bottom-32 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-float" style="animation-delay: 1s;"></div>
        </div>
        
        <div class="container mx-auto px-4 relative z-10">
            <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-glow">About AutoHub</h1>
            <p class="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">Learn more about our platform and mission to revolutionize Python automation</p>
        </div>
    </section>
    
    <section class="py-20 bg-gradient-to-b from-primary-50 via-white to-primary-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-primary-200 dark:border-primary-800">
                    <h2 class="text-3xl font-bold mb-8 text-center">
                        <span class="gradient-text">Our Mission</span>
                    </h2>
                    
                    <div class="space-y-6 text-primary-700 dark:text-primary-300 text-lg leading-relaxed">
                        <p>
                            AutoHub was created with a simple mission: to provide a platform where developers can 
                            share and discover Python automation scripts that solve real-world problems.
                        </p>
                        
                        <p>
                            We believe in the power of automation to simplify repetitive tasks, save time, and 
                            unlock human creativity. By bringing together a community of Python enthusiasts, 
                            we aim to build a comprehensive library of high-quality scripts that anyone can use.
                        </p>
                        
                        <p>
                            Whether you're looking to automate web scraping, file operations, data processing, 
                            or API interactions, AutoHub is designed to help you find the right script for your needs.
                        </p>
                    </div>
                </div>
                <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-primary-200 dark:border-primary-800">
                    <h2 class="text-3xl font-bold mb-8 text-center">
                        <span class="gradient-text">What We Offer</span>
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                            <div class="flex items-start gap-4">
                                <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shrink-0">
                                    <i class="fas fa-search text-white text-2xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold mb-3 text-primary-800 dark:text-primary-200">Script Discovery</h3>
                                    <p class="text-primary-700 dark:text-primary-300">Easily browse and search through our curated collection of Python automation scripts, filtered by category, tags, or keywords.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gradient-to-r from-secondary-100 to-accent-100 dark:from-secondary-900/50 dark:to-accent-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                            <div class="flex items-start gap-4">
                                <div class="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center shrink-0">
                                    <i class="fas fa-code text-white text-2xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold mb-3 text-primary-800 dark:text-primary-200">Code Preview</h3>
                                    <p class="text-primary-700 dark:text-primary-300">Review the source code directly in your browser before downloading, ensuring it meets your specific requirements.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gradient-to-r from-accent-100 to-primary-100 dark:from-accent-900/50 dark:to-primary-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                            <div class="flex items-start gap-4">
                                <div class="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-2xl flex items-center justify-center shrink-0">
                                    <i class="fas fa-upload text-white text-2xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold mb-3 text-primary-800 dark:text-primary-200">Script Sharing</h3>
                                    <p class="text-primary-700 dark:text-primary-300">Share your own automation scripts with our community, providing solutions to common problems and helping others.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                            <div class="flex items-start gap-4">
                                <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shrink-0">
                                    <i class="fas fa-users text-white text-2xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold mb-3 text-primary-800 dark:text-primary-200">Community</h3>
                                    <p class="text-primary-700 dark:text-primary-300">Join a community of Python developers and automation enthusiasts sharing knowledge and best practices.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-primary-200 dark:border-primary-800">
                    <h2 class="text-3xl font-bold mb-8 text-center">
                        <span class="gradient-text">Contact Us</span>
                    </h2>
                    
                    <p class="mb-8 text-center text-primary-700 dark:text-primary-300 text-lg">
                        Have questions, suggestions, or feedback? We'd love to hear from you!
                    </p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800 text-center">
                            <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-envelope text-white text-2xl"></i>
                            </div>
                            <h3 class="text-lg font-bold mb-2 text-primary-800 dark:text-primary-200">Email</h3>
                            <a href="mailto:pranavmurali024@gmail.com" class="text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">pranavmurali024@gmail.com</a>
                        </div>
                        
                        <div class="bg-gradient-to-r from-secondary-100 to-accent-100 dark:from-secondary-900/50 dark:to-accent-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800 text-center">
                            <div class="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <i class="fab fa-github text-white text-2xl"></i>
                            </div>
                            <h3 class="text-lg font-bold mb-2 text-primary-800 dark:text-primary-200">GitHub</h3>
                            <a href="https://github.com/Marvellousz/autohub" class="text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium" target="_blank" rel="noopener noreferrer">github.com/Marvellousz/autohub</a>
                        </div>
                        
                        <div class="bg-gradient-to-r from-accent-100 to-primary-100 dark:from-accent-900/50 dark:to-primary-900/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-800 text-center">
                            <div class="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-heart text-white text-2xl"></i>
                            </div>
                            <h3 class="text-lg font-bold mb-2 text-primary-800 dark:text-primary-200">Community</h3>
                            <p class="text-primary-700 dark:text-primary-300">Join our growing community of Python automation enthusiasts!</p>
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
