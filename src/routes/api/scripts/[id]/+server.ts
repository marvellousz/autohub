// Server endpoint for getting a script by ID
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getScriptById } from '$lib/server/db/scriptRepository';

export const GET: RequestHandler = async ({ params }) => {
    try {
        // Find the script by ID
        const script = await getScriptById(params.id);
        
        if (!script) {
            throw error(404, { message: 'Script not found' });
        }
          return json(script);
    } catch (err: any) {
        if (err.status === 404) {
            throw err;
        }
        console.error(`Error fetching script with ID ${params.id}:`, err);
        throw error(500, { message: 'Failed to fetch script' });
    }
};
