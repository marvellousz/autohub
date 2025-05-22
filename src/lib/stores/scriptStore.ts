// Store for scripts data
import { writable } from 'svelte/store';
import type { Script, ScriptCategory } from '$lib/data/scripts';

// Create the stores with empty initial data
export const scripts = writable<Script[]>([]);
export const filteredScripts = writable<Script[]>([]);
export const isLoading = writable<boolean>(false);
export const error = writable<string | null>(null);

// Function to fetch all scripts from the API
export async function fetchScripts() {
    isLoading.set(true);
    error.set(null);
      try {
        const response = await fetch('/api/scripts');
        
        if (!response.ok) {
            throw new Error(`Error fetching scripts: ${response.statusText}`);
        }
        
        const data = await response.json();
        scripts.set(data);
        filteredScripts.set(data);
    } catch (err: any) {
        console.error('Error fetching scripts:', err);
        error.set(err.message);
    } finally {
        isLoading.set(false);
    }
}

// Function to add a new script to the store via API
export async function addScript(script: Omit<Script, 'id' | 'dateAdded' | 'downloadCount'>) {
    isLoading.set(true);
    error.set(null);
      try {
        // Get auth token from local storage
        const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
        
        if (!token) {
            throw new Error('Authentication required');
        }
        
        const response = await fetch('/api/scripts/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(script)
        });
        
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || `Error adding script: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Update the store with the new script
        scripts.update(currentScripts => {
            return [data.script, ...currentScripts];
        });
        
        // Also update filtered scripts if needed
        filteredScripts.update(currentScripts => {
            return [data.script, ...currentScripts];
        });
        
        return data.script;
    } catch (err: any) {
        console.error('Error adding script:', err);
        error.set(err.message);
        throw err;
    } finally {
        isLoading.set(false);
    }
}

// Function to filter scripts
export function filterScripts(searchTerm: string = '', categories: ScriptCategory[] = []) {
    isLoading.set(true);
    
    scripts.update(currentScripts => {
        let filtered = [...currentScripts];
        
        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(script => 
                script.title.toLowerCase().includes(term) || 
                script.description.toLowerCase().includes(term) || 
                script.tags.some(tag => tag.toLowerCase().includes(term))
            );
        }
        
        // Filter by categories
        if (categories.length > 0) {
            filtered = filtered.filter(script => 
                categories.includes(script.category)
            );
        }
        
        // Update the filtered scripts store
        filteredScripts.set(filtered);
        isLoading.set(false);
        
        return currentScripts;
    });
}

// Function to increment download count via API (both client-side update and server-side)
export async function incrementDownloadCount(id: string) {
    // Update local store immediately for faster UI update
    scripts.update(currentScripts => {
        return currentScripts.map(script => {
            if (script.id === id) {
                return {
                    ...script,
                    downloadCount: script.downloadCount + 1
                };
            }
            return script;
        });
    });
    
    // Also update filtered scripts
    filteredScripts.update(currentScripts => {
        return currentScripts.map(script => {
            if (script.id === id) {
                return {
                    ...script,
                    downloadCount: script.downloadCount + 1
                };
            }
            return script;
        });
    });
      // Make API call to update the download count in the database
    try {
        const response = await fetch(`/api/scripts/${id}/increment-downloads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            console.error(`Error updating download count: ${response.statusText}`);
        } else {
            console.log('Download count updated successfully in database');
        }
    } catch (err: any) {
        console.error('Error calling download increment API:', err);
    }
}

// Function to delete a script via API
export async function deleteScript(id: string) {
    isLoading.set(true);
    error.set(null);
    
    try {
        // Get auth token from local storage
        const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
        
        if (!token) {
            throw new Error('Authentication required');
        }
        
        const response = await fetch(`/api/scripts/${id}/delete`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to delete script');
        }
        
        // Remove the script from both stores
        scripts.update(currentScripts => currentScripts.filter(script => script.id !== id));
        filteredScripts.update(currentScripts => currentScripts.filter(script => script.id !== id));
        
        return true;
    } catch (err: any) {
        console.error('Error deleting script:', err);
        error.set(err.message);
        throw err;
    } finally {
        isLoading.set(false);
    }
}

// Get unique categories from scripts
export function getCategories(): ScriptCategory[] {
    const allCategories = new Set<ScriptCategory>();
    
    scripts.subscribe(currentScripts => {
        currentScripts.forEach(script => {
            allCategories.add(script.category);
        });
    })();
    
    return Array.from(allCategories);
}
