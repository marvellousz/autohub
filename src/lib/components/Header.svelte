<!-- Header component for site navigation -->
<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { authStore, initAuth, logout } from '$lib/auth/auth';
    import { initTheme } from '$lib/stores/themeStore';
    
    // Initialize auth and theme on mount
    onMount(() => {
        initAuth();
        initTheme();
    });
    
    // Handle logout
    function handleLogout() {
        logout();
        // Redirect to home page
        window.location.href = '/';
    }

    // Mobile menu state
    let isMobileMenuOpen = false;
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
    }
</script>

<header class="bg-white/80 backdrop-blur-md shadow-lg dark:bg-gray-900/80 border-b border-primary-200 dark:border-primary-800">
    <div class="container mx-auto px-4">
        <nav class="flex items-center justify-between py-4">
            <a href="/" class="text-2xl font-bold gradient-text flex items-center hover:scale-105 transition-transform duration-300">
                <i class="fas fa-robot mr-3 text-2xl"></i> AutoHub
            </a>
            
            <!-- Mobile menu button -->
            <button 
                class="md:hidden p-3 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-300 hover:scale-110"
                on:click={toggleMobileMenu}
                aria-label="Toggle mobile menu"
            >
                <i class="fas {isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-primary-600 dark:text-primary-400 text-lg"></i>
            </button>            <!-- Navigation menu -->
            <ul class={`hidden md:flex space-x-2 items-center lg:space-x-4 ${isMobileMenuOpen ? '!flex flex-col fixed inset-x-0 top-[88px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-6 space-y-4 shadow-2xl border-t border-primary-200 dark:border-primary-800 z-50 rounded-b-2xl' : ''}`}>
                <li class="md:w-auto w-full">
                    <a href="/" class={`px-4 py-3 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-300 block w-full md:w-auto group ${$page.url.pathname === '/' ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                        <i class="fas fa-home mr-2 group-hover:scale-110 transition-transform"></i> Home
                    </a>
                </li>
                <li class="md:w-auto w-full">
                    <a href="/scripts" class={`px-4 py-3 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-300 block w-full md:w-auto group ${$page.url.pathname === '/scripts' ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                        <i class="fas fa-code mr-2 group-hover:scale-110 transition-transform"></i> Browse Scripts
                    </a>
                </li>
                <li class="md:w-auto w-full">
                    <a href="/submit" class={`px-4 py-3 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-300 block w-full md:w-auto group ${$page.url.pathname === '/submit' ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                        <i class="fas fa-upload mr-2 group-hover:scale-110 transition-transform"></i> Submit Script
                    </a>
                </li>
                <li class="md:w-auto w-full">
                    <a href="/about" class={`px-4 py-3 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-300 block w-full md:w-auto group ${$page.url.pathname === '/about' ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                        <i class="fas fa-info-circle mr-2 group-hover:scale-110 transition-transform"></i> About
                    </a>
                </li>
                <!-- Authentication Links -->
                {#if $authStore.isAuthenticated}
                    <li class="relative group md:w-auto w-full">
                        <button class="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none px-4 py-3 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-300 w-full md:w-auto group">
                            <i class="fas fa-user-circle mr-2 group-hover:scale-110 transition-transform"></i>
                            <span class="font-medium">{$authStore.user?.username || 'User'}</span>
                            <i class="fas fa-chevron-down ml-2 text-xs group-hover:rotate-180 transition-transform"></i>
                        </button>
                        <div class="{isMobileMenuOpen ? 'relative md:absolute w-full mt-2' : 'absolute'} right-0 w-56 py-3 mt-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl {isMobileMenuOpen ? 'block' : 'invisible group-hover:visible'} z-10 border border-primary-200 dark:border-primary-800 transition-all duration-300">
                            <a href="/profile" class="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500 hover:text-white transition-all duration-300 rounded-xl mx-2">
                                <i class="fas fa-id-card mr-3"></i> Profile
                            </a>
                            <button on:click={handleLogout} class="flex items-center w-full text-left px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500 hover:text-white transition-all duration-300 rounded-xl mx-2">
                                <i class="fas fa-sign-out-alt mr-3"></i> Logout
                            </button>
                        </div>
                    </li>
                {:else}
                    <li class="md:w-auto w-full">
                        <a href="/login" class={`px-4 py-3 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-300 block w-full md:w-auto text-center group ${$page.url.pathname === '/login' ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                            <i class="fas fa-sign-in-alt mr-2 group-hover:scale-110 transition-transform"></i> Login
                        </a>
                    </li>
                    <li class="md:w-auto w-full">
                        <a href="/register" class={`px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 shadow-lg hover:shadow-xl block w-full md:w-auto text-center group hover:scale-105 ${$page.url.pathname === '/register' ? 'font-bold' : ''}`}>
                            <i class="fas fa-user-plus mr-2 group-hover:scale-110 transition-transform"></i> Register
                        </a>
                    </li>
                {/if}
            </ul>
        </nav>
    </div>
</header>

<style>
    /* All styling handled by Tailwind CSS classes */
</style>
