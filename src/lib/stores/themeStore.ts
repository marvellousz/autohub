// Theme store for managing dark/light mode
import { writable } from 'svelte/store';

// Get initial theme from localStorage or default to 'light'
const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('theme');
        return stored || 'light';
    }
    return 'light';
};

// Create theme store
export const theme = writable(getInitialTheme());

// Initialize theme on client side
export function initTheme() {
    if (typeof window !== 'undefined') {
        const currentTheme = getInitialTheme();
        document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    }
}

// Toggle between light and dark themes
export function toggleTheme() {
    if (typeof window !== 'undefined') {
        theme.update(currentTheme => {
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
            return newTheme;
        });
    }
}
