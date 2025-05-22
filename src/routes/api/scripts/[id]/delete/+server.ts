// Server endpoint for deleting a script
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getScriptById, deleteScript } from '$lib/server/db/scriptRepository';
import { verifyToken } from '$lib/server/auth/serverAuthUtils';

export const DELETE: RequestHandler = async ({ request, params }) => {
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
        
        // Get the script by ID
        const script = await getScriptById(params.id);
        
        if (!script) {
            throw error(404, { message: 'Script not found' });
        }
        
        // Check if the user is the owner of the script
        if (script.userId !== decoded.userId) {
            throw error(403, { message: 'You do not have permission to delete this script' });
        }
        
        // Delete the script
        const deleted = await deleteScript(params.id);
        
        if (!deleted) {
            throw error(500, { message: 'Failed to delete script' });
        }
        
        return json({ success: true, message: 'Script deleted successfully' });
    } catch (err: any) {
        if (err.status) {
            throw err;
        }
        console.error(`Error deleting script with ID ${params.id}:`, err);
        throw error(500, { message: 'Failed to delete script' });
    }
};
