<!-- Footer component -->
<script lang="ts">
    const currentYear = new Date().getFullYear();
</script>

<footer class="bg-gradient-to-r from-primary-100 via-white to-primary-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-300 py-8 md:py-12 mt-auto w-full border-t border-primary-200 dark:border-primary-800">
    <div class="container mx-auto px-4">
        <div class="text-center">
            <div class="mb-6">
                <h3 class="text-2xl font-bold gradient-text mb-2">AutoHub</h3>
                <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Discover, share, and collaborate on Python automation scripts. Join our community of developers building the future of automation.</p>
            </div>
            
            <div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-6">
                <a href="/privacy" class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 hover:scale-105 flex items-center">
                    <i class="fas fa-shield-alt mr-2"></i> Privacy Policy
                </a>
                <span class="hidden md:inline text-gray-400 dark:text-gray-600">|</span>
                <a href="/terms" class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 hover:scale-105 flex items-center">
                    <i class="fas fa-file-contract mr-2"></i> Terms of Service
                </a>
                <span class="hidden md:inline text-gray-400 dark:text-gray-600">|</span>
                <a href="/contact" class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 hover:scale-105 flex items-center">
                    <i class="fas fa-envelope mr-2"></i> Contact Us
                </a>
            </div>
            
            <div class="border-t border-primary-200 dark:border-gray-700 pt-6">
                <p class="text-gray-500 dark:text-gray-400">&copy; {currentYear} AutoHub. All rights reserved.</p>
                <p class="text-sm text-gray-600 dark:text-gray-500 mt-2">Built with ❤️ using SvelteKit and TailwindCSS</p>
            </div>
        </div>
    </div>
</footer>

<style>
    /* All styling handled by Tailwind CSS classes */
</style>
