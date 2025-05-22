// Server endpoint for submitting a new script
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createScript } from '$lib/server/db/scriptRepository';
import type { ScriptCategory } from '$lib/data/scripts';
import { verifyToken } from '$lib/server/auth/serverAuthUtils';
import { getUserById } from '$lib/server/db/userRepository';

export const POST: RequestHandler = async ({ request }) => {
    try {
        // Verify authentication
        const authHeader = request.headers.get('Authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw error(401, { message: 'Authentication required' });
        }
        
        // Verify token and get user ID
        const token = authHeader.split(' ')[1];
        const decoded = await verifyToken(token);
        
        if (!decoded || !decoded.userId) {
            throw error(401, { message: 'Invalid authentication token' });
        }
        
        // Get user details
        const user = await getUserById(decoded.userId);
        if (!user) {
            throw error(404, { message: 'User not found' });
        }
        
        const data = await request.json();
        
        // Validate required fields
        if (!data.title || !data.description || !data.code) {
            throw error(400, { message: 'Missing required fields' });
        }
        
        // Validate category
        const validCategories: ScriptCategory[] = [
            'Web Scraping',
            'File Automation',
            'Data Processing',
            'API Integration',
            'Database',
            'Network',
            'System Utilities',
            'Other'
        ];
        
        if (!validCategories.includes(data.category)) {
            data.category = 'Other';
        }
        
        // Process tags if they are a string
        const tags = Array.isArray(data.tags) 
            ? data.tags 
            : (typeof data.tags === 'string' 
                ? data.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0) 
                : []);
        
        // Create new script in the database using the authenticated user
        const newScript = await createScript({
            title: data.title,
            description: data.description,
            code: data.code,
            tags: tags,
            author: user.username, // Use username from authenticated user
            userId: decoded.userId, // Store the user ID reference
            category: data.category
        });
        
        return json({ success: true, script: newScript });    } catch (err: any) {
        if (err.status) {
            throw err;
        }
        console.error('Error creating script:', err);
        throw error(500, { message: 'Failed to create script' });
    }
};
