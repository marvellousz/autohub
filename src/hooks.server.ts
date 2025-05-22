// Hook to run on server start
import { building } from '$app/environment';
import { seedDatabase } from '$lib/server/db/seedDatabase';

// Skip during build time
export const prerender = false;

// Run database seeding only on server start, not during SSR
if (!building) {
    console.log('Server starting, initializing database...');
    seedDatabase().catch(err => {
        console.error('Failed to seed database:', err);
    });
}
