// Script to seed the database with initial data
import { connectToDatabase, disconnectFromDatabase } from '$lib/server/db/connection';
import { Script } from '$lib/server/db/models';
import { scripts as initialScripts } from '$lib/data/scripts';

export async function seedDatabase() {
    console.log('Seeding database...');
    
    try {
        await connectToDatabase();
        
        // Check if any scripts already exist
        const existingCount = await Script.countDocuments();
        
        if (existingCount > 0) {
            console.log(`Database already has ${existingCount} scripts. Skipping seed.`);
            return;
        }
        
        // Convert initial scripts to the correct format
        const scriptsToInsert = initialScripts.map(script => ({
            title: script.title,
            description: script.description,
            code: script.code,
            tags: script.tags,
            author: script.author,
            category: script.category,
            dateAdded: new Date(script.dateAdded),
            downloadCount: script.downloadCount
        }));
        
        // Insert initial scripts
        await Script.insertMany(scriptsToInsert);
        
        console.log(`Seeded database with ${scriptsToInsert.length} scripts.`);
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await disconnectFromDatabase();
    }
}
