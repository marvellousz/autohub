<!-- Header component for site navigation -->
<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { authStore, initAuth, logout } from '$lib/auth/auth';
    import { theme, toggleTheme, initTheme } from '$lib/stores/themeStore';
    
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
</script>

<header class="header">
    <div class="container">
        <nav class="nav">
            <a href="/" class="nav-brand">
                <i class="fas fa-robot"></i> AutoHub
            </a>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="/" class="nav-link" class:active={$page.url.pathname === '/'}>
                        Home
                    </a>
                </li>
                <li class="nav-item">
                    <a href="/scripts" class="nav-link" class:active={$page.url.pathname === '/scripts'}>
                        Browse Scripts
                    </a>
                </li>
                <li class="nav-item">
                    <a href="/submit" class="nav-link" class:active={$page.url.pathname === '/submit'}>
                        Submit Script
                    </a>
                </li>                <li class="nav-item">
                    <a href="/about" class="nav-link" class:active={$page.url.pathname === '/about'}>
                        About
                    </a>
                </li>

                <!-- Theme Toggle -->
                <li class="nav-item">
                    <button class="theme-toggle nav-link" on:click={toggleTheme}>
                        {#if $theme === 'dark'}
                            <i class="fas fa-sun"></i>
                        {:else}
                            <i class="fas fa-moon"></i>
                        {/if}
                    </button>
                </li>
                
                <!-- Authentication Links -->{#if $authStore.isAuthenticated}
                    <li class="nav-item dropdown">
                        <a href="javascript:void(0)" class="nav-link user-menu">
                            {$authStore.user?.username || 'User'} ▼
                        </a>
                        <div class="dropdown-menu">
                            <a href="/profile" class="dropdown-item">Profile</a>
                            <button on:click={handleLogout} class="dropdown-item">Logout</button>
                        </div>
                    </li>
                {:else}
                    <li class="nav-item">
                        <a href="/login" class="nav-link" class:active={$page.url.pathname === '/login'}>
                            Login
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/register" class="nav-link" class:active={$page.url.pathname === '/register'}>
                            Register
                        </a>
                    </li>
                {/if}
            </ul>
        </nav>
    </div>
</header>

<style>
    .active {
        font-weight: bold;
        color: var(--primary);
    }
    
    .dropdown {
        position: relative;
    }
    
    .dropdown-menu {
        display: none;
        position: absolute;
        right: 0;
        top: 100%;
        background-color: white;
        min-width: 160px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        z-index: 10;
        border-radius: 4px;
    }
    
    .dropdown:hover .dropdown-menu {
        display: block;
    }
    
    .dropdown-item {
        display: block;
        width: 100%;
        padding: 8px 16px;
        text-align: left;
        color: #333;
        text-decoration: none;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 14px;
    }
    
    .dropdown-item:hover {
        background-color: #f5f5f5;
    }
    
    .user-menu {
        display: flex;
        align-items: center;
    }
</style>
