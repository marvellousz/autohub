// Server-side script storage utilities
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Script } from '$lib/data/scripts';

// In a production environment, you would use a database
// This is a simple file-based implementation for demo purposes

// Get the directory where scripts are stored
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCRIPTS_DIR = path.join(__dirname, '..', '..', '..', 'scripts');
const SCRIPTS_FILE = path.join(SCRIPTS_DIR, 'scripts.json');

// Ensure the scripts directory exists
export function ensureScriptsDir() {
    if (!fs.existsSync(SCRIPTS_DIR)) {
        fs.mkdirSync(SCRIPTS_DIR, { recursive: true });
    }
}

// Save scripts to a JSON file
export function saveScripts(scripts: Script[]) {
    ensureScriptsDir();
    fs.writeFileSync(SCRIPTS_FILE, JSON.stringify(scripts, null, 2));
}

// Load scripts from a JSON file
export function loadScripts(): Script[] {
    ensureScriptsDir();
    
    if (!fs.existsSync(SCRIPTS_FILE)) {
        // If the file doesn't exist, return an empty array
        return [];
    }
    
    try {
        const data = fs.readFileSync(SCRIPTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error loading scripts:', err);
        return [];
    }
}

// Save a script code to a file
export function saveScriptCode(scriptId: string, code: string) {
    ensureScriptsDir();
    fs.writeFileSync(path.join(SCRIPTS_DIR, `${scriptId}.py`), code);
}

// Load a script code from a file
export function loadScriptCode(scriptId: string): string {
    ensureScriptsDir();
    const filePath = path.join(SCRIPTS_DIR, `${scriptId}.py`);
    
    if (!fs.existsSync(filePath)) {
        return '';
    }
    
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error(`Error loading script code for ${scriptId}:`, err);
        return '';
    }
}
