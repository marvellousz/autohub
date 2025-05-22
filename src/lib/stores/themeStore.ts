// Theme store for managing dark/light mode
import { writable } from 'svelte/store';

// Check if there's a saved theme preference
const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        // Check system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
    }
    return 'light';
};

// Create theme store
export const theme = writable(getInitialTheme());

// Function to toggle theme
export function toggleTheme() {
    theme.update(currentTheme => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme);
            // Update document class
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
        }
        return newTheme;
    });
}

// Initialize theme on client side
export function initTheme() {
    if (typeof window !== 'undefined') {
        theme.subscribe(currentTheme => {
            document.documentElement.classList.toggle('dark', currentTheme === 'dark');
        })();
    }
}
