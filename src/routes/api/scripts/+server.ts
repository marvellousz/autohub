// Server endpoint for getting all scripts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAllScripts } from '$lib/server/db/scriptRepository';

export const GET: RequestHandler = async () => {
    try {
        // Get all scripts from the database
        const scripts = await getAllScripts();
        return json(scripts);
    } catch (error: any) {
        console.error('Error fetching scripts:', error);
        return json({ error: 'Failed to fetch scripts' }, { status: 500 });
    }
};
