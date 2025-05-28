<!-- Footer component -->
<script lang="ts">
    const currentYear = new Date().getFullYear();
</script>

<footer class="bg-gray-800 text-gray-300 py-8 mt-auto">
    <div class="container mx-auto px-4">
        <div class="text-center">
            <p>&copy; {currentYear} AutoHub. All rights reserved.</p>
            <p class="mt-2">
                <a href="/privacy" class="text-gray-400 hover:text-white mx-2 transition-colors">Privacy Policy</a> |
                <a href="/terms" class="text-gray-400 hover:text-white mx-2 transition-colors">Terms of Service</a> |
                <a href="/contact" class="text-gray-400 hover:text-white mx-2 transition-colors">Contact Us</a>
            </p>
        </div>
    </div>
</footer>

<style>
    /* All styling handled by Tailwind CSS classes */
</style>
