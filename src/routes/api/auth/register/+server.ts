// Auth API endpoint for registering a new user
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { registerUser } from '$lib/server/db/userRepository';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.json();
        
        // Validate required fields
        if (!data.email || !data.password) {
            throw error(400, { message: 'Email and password are required' });
        }
        
        // Register the user
        const result = await registerUser({
            username: data.username,
            email: data.email,
            password: data.password,
            bio: data.bio
        });
          return json({
            success: true,
            user: result.user,
            token: result.token
        });    } catch (err: any) {
        if (err.status === 400) {
            throw err;
        }
        if (err.message === 'User with this email already exists') {
            throw error(409, { message: err.message });
        }
        console.error('Error registering user:', err);
        // More detailed error logging
        console.error('Error details:', JSON.stringify({
            message: err.message,
            stack: err.stack,
            name: err.name,
            code: err.code
        }));
        throw error(500, { message: 'Failed to register user: ' + err.message });
    }
};
