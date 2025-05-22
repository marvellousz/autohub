// API endpoint for user profile operations
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getUserById, updateUser } from '$lib/server/db/userRepository';
import { verifyToken } from '$lib/server/auth/serverAuthUtils';

// Get user profile
export const GET: RequestHandler = async ({ request }) => {
    try {
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
        
        // Get user profile
        const user = await getUserById(decoded.userId);
          if (!user) {
            throw error(404, { message: 'User not found' });
        }
        
        return json(user);
    } catch (err: any) {
        if (err.status) {
            throw err;
        }
        console.error('Error getting user profile:', err);
        throw error(500, { message: 'Failed to get user profile' });
    }
};

// Update user profile
export const PUT: RequestHandler = async ({ request }) => {
    try {
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
        
        // Get update data
        const data = await request.json();
        
        // Validate required fields
        if (!data.username || !data.username.trim()) {
            throw error(400, { message: 'Username is required' });
        }
        
        // Update user profile
        const updatedUser = await updateUser(decoded.userId, {
            username: data.username.trim(),
            bio: data.bio ? data.bio.trim() : ''
        });
        
        if (!updatedUser) {
            throw error(404, { message: 'User not found' });
        }
          return json({
            success: true,
            user: updatedUser
        });
    } catch (err: any) {
        if (err.status) {
            throw err;
        }
        console.error('Error updating user profile:', err);
        throw error(500, { message: 'Failed to update user profile' });
    }
};
