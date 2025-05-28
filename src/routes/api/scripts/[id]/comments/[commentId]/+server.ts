import { error, json } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/auth/serverAuthUtils';
import { deleteComment } from '$lib/server/db/commentRepository';

export const DELETE = async ({ request, params }) => {
    try {
        const { id: scriptId, commentId } = params;
        const authHeader = request.headers.get('Authorization');

        if (!authHeader) {
            throw error(401, { message: 'Authentication required' });
        }

        // Verify token and get user ID
        const token = authHeader.split(' ')[1];
        const decoded = await verifyToken(token);

        if (!decoded || !decoded.userId) {
            throw error(401, { message: 'Invalid authentication token' });
        }

        // Try to delete the comment
        const deleted = await deleteComment(commentId, decoded.userId);

        if (!deleted) {
            throw error(404, { message: 'Comment not found or you do not have permission to delete it' });
        }

        return json({ success: true });
    } catch (err: any) {
        if (err.status) {
            throw err;
        }
        console.error('Error deleting comment:', err);
        throw error(500, { message: 'Failed to delete comment' });
    }
};
