// Server endpoint for searching scripts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { searchScripts } from '$lib/server/db/scriptRepository';

export const GET: RequestHandler = async ({ url }) => {
    try {
        // Get query parameters
        const query = url.searchParams.get('q') || '';
        const category = url.searchParams.get('category') || '';
        const tag = url.searchParams.get('tag') || '';
        
        // Search scripts in the database
        const filteredScripts = await searchScripts({
            query: query || undefined,
            category: category || undefined,
            tag: tag || undefined
        });
          return json(filteredScripts);
    } catch (error: any) {
        console.error('Error searching scripts:', error);
        return json({ error: 'Failed to search scripts' }, { status: 500 });
    }
};
