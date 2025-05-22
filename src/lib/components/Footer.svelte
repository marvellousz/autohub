<!-- Footer component -->
<script lang="ts">
    const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="text-center">
                    <p>&copy; {currentYear} AutoHub. All rights reserved.</p>
                    <p class="mt-2">
                        <a href="/privacy" class="footer-link">Privacy Policy</a> |
                        <a href="/terms" class="footer-link">Terms of Service</a> |
                        <a href="/contact" class="footer-link">Contact Us</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</footer>

<style>
    .footer-link {
        color: var(--gray-400);
        margin: 0 0.5rem;
    }
    
    .footer-link:hover {
        color: var(--white);
        text-decoration: none;
    }
</style>
