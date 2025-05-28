// Theme store for managing dark/light mode
import { writable } from 'svelte/store';

// Always return dark theme
const getInitialTheme = () => 'dark';

// Create theme store
export const theme = writable(getInitialTheme());

// Initialize theme on client side
export function initTheme() {
    if (typeof window !== 'undefined') {
        document.documentElement.classList.add('dark');
    }
}

// Keep toggleTheme as a no-op function to avoid breaking imports
export function toggleTheme() {
    // Do nothing as we're always in dark mode
}
