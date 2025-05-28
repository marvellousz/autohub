import { error, json } from '@sveltejs/kit';
import { getCommentsByUserId } from '$lib/server/db/commentRepository';

export async function GET({ params: { username } }) {
    try {
        const comments = await getCommentsByUserId(username);
        return json(comments);
    } catch (err: any) {
        console.error('Error getting user comments:', err);
        throw error(500, { message: 'Failed to get user comments' });
    }
}
