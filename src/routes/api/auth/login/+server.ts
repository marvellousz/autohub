// Auth API endpoint for logging in a user
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { loginUser } from '$lib/server/db/userRepository';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.json();
        
        // Validate required fields
        if (!data.email || !data.password) {
            throw error(400, { message: 'Email and password are required' });
        }
        
        // Login the user
        const result = await loginUser({
            email: data.email,
            password: data.password
        });
          return json({
            success: true,
            user: result.user,
            token: result.token
        });    } catch (err: any) {
        if (err.status === 400) {
            throw err;
        }
        if (err.message === 'Invalid credentials') {
            throw error(401, { message: 'Invalid email or password' });
        }
        console.error('Error logging in user:', err);
        // More detailed error logging
        console.error('Error details:', JSON.stringify({
            message: err.message,
            stack: err.stack,
            name: err.name,
            code: err.code
        }));
        throw error(500, { message: 'Failed to log in: ' + err.message });
    }
};
