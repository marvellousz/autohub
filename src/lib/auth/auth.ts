// Client-side auth utilities
import { writable, derived } from 'svelte/store';
import type { UserInterface, UserCredentials } from '$lib/interfaces/user';

// Initial auth state
const initialState = {
    user: null as UserInterface | null,
    token: null as string | null,
    isAuthenticated: false,
    isLoading: false,
    error: null as string | null
};

// Create the store
export const authStore = writable(initialState);

// Create derived store for checking authentication
export const isAuthenticated = derived(
    authStore,
    ($authStore) => $authStore.isAuthenticated
);

// Initialize auth from localStorage on client side
export function initAuth() {
    if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('authUser');
        
        if (storedToken && storedUser) {
            try {
                const user = JSON.parse(storedUser);
                authStore.update(state => ({
                    ...state,
                    token: storedToken,
                    user,
                    isAuthenticated: true
                }));
            } catch (error: any) {
                console.error('Error parsing stored user:', error);
                clearAuth();
            }
        }
    }
}

// Clear authentication
export function clearAuth() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
    }
    
    authStore.set(initialState);
}

// Login user
export async function login(email: string, password: string) {
    authStore.update(state => ({ ...state, isLoading: true, error: null }));
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }
        
        // Store in localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('authUser', JSON.stringify(data.user));
        }
        
        // Update store
        authStore.update(state => ({
            ...state,
            token: data.token,
            user: data.user,
            isAuthenticated: true,
            isLoading: false
        }));
        
        return data;
    } catch (error: any) {
        authStore.update(state => ({
            ...state,
            error: error.message,
            isLoading: false
        }));
        throw error;
    }
}

// Register user
export async function register(userData: {
    username?: string;
    email: string;
    password: string;
    bio?: string;
}) {
    authStore.update(state => ({ ...state, isLoading: true, error: null }));
    
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }
        
        // Store in localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('authUser', JSON.stringify(data.user));
        }
        
        // Update store
        authStore.update(state => ({
            ...state,
            token: data.token,
            user: data.user,
            isAuthenticated: true,
            isLoading: false
        }));
        
        return data;
    } catch (error: any) {
        authStore.update(state => ({
            ...state,
            error: error.message,
            isLoading: false
        }));
        throw error;
    }
}

// Logout user
export function logout() {
    clearAuth();
}
