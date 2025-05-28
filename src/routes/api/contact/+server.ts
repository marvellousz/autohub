import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.json();
        
        // Validate required fields
        if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
            throw error(400, { message: 'All fields are required' });
        }
        
        // Here you would typically send the email using your preferred email service
        // For now, just log it
        console.log('Contact form submission:', data);
        
        return json({ success: true });
    } catch (err: any) {
        console.error('Error processing contact form:', err);
        throw error(500, { message: 'Failed to send message' });
    }
};
