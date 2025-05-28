<!-- Footer component -->
<script lang="ts">
    const currentYear = new Date().getFullYear();
</script>

<footer class="bg-gray-800 text-gray-300 py-6 md:py-8 mt-auto w-full">
    <div class="container mx-auto px-4">
        <div class="text-center">
            <p>&copy; {currentYear} AutoHub. All rights reserved.</p>
            <div class="mt-4 flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0">
                <a href="/privacy" class="text-gray-400 hover:text-white md:mx-2 transition-colors">Privacy Policy</a>
                <span class="hidden md:inline text-gray-600">|</span>
                <a href="/terms" class="text-gray-400 hover:text-white md:mx-2 transition-colors">Terms of Service</a>
                <span class="hidden md:inline text-gray-600">|</span>
                <a href="/contact" class="text-gray-400 hover:text-white md:mx-2 transition-colors">Contact Us</a>
            </div>
        </div>
    </div>
</footer>

<style>
    /* All styling handled by Tailwind CSS classes */
</style>
