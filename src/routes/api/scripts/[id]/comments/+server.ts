// Comments API endpoint for a specific script
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getCommentsByScriptId, createComment } from '$lib/server/db/commentRepository';
import { verifyToken } from '$lib/server/auth/serverAuthUtils';

// Get comments for a script
export const GET: RequestHandler = async ({ params }) => {
    const scriptId = params.id;
      try {
        const comments = await getCommentsByScriptId(scriptId);
        return json(comments);
    } catch (err: any) {
        console.error('Error fetching comments:', err);
        throw error(500, { message: 'Failed to fetch comments' });
    }
};

// Add a new comment to a script
export const POST: RequestHandler = async ({ request, params }) => {
    const scriptId = params.id;
    
    try {
        const data = await request.json();
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
        
        // Validate comment content
        if (!data.content || !data.content.trim()) {
            throw error(400, { message: 'Comment content is required' });
        }
        
        // Create the comment
        const newComment = await createComment({
            content: data.content.trim(),
            scriptId,
            userId: decoded.userId,
            username: data.username
        });
          return json({
            success: true,
            comment: newComment
        });
    } catch (err: any) {
        if (err.status) {
            throw err;
        }
        console.error('Error creating comment:', err);
        throw error(500, { message: 'Failed to create comment' });
    }
};
