// Server endpoint for incrementing a script's download count
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { incrementScriptDownloadCount } from '$lib/server/db/scriptRepository';

export const POST: RequestHandler = async ({ params }) => {
    try {
        const result = await incrementScriptDownloadCount(params.id);
        
        if (!result) {
            throw error(404, { message: 'Script not found' });
        }
        
        return json({ 
            success: true, 
            downloadCount: result.downloadCount 
        });
    } catch (err: any) {
        if (err.status === 404) {
            throw err;
        }
        console.error(`Error incrementing download count for script with ID ${params.id}:`, err);
        throw error(500, { message: 'Failed to increment download count' });
    }
};
