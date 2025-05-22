// Script to seed the database with initial data
import { MongoClient } from 'mongodb';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get script directory
const __dirname = dirname(fileURLToPath(import.meta.url));

// Get MongoDB connection string from .env file or use default
let mongoUri = 'mongodb://localhost:27017/autohub';
try {
    const envFile = readFileSync(join(__dirname, '..', '.env'), 'utf8');
    const envVars = envFile.split('\n').reduce((acc, line) => {
        const [key, value] = line.split('=');
        if (key && value) {
            acc[key.trim()] = value.trim();
        }
        return acc;
    }, {});
    
    if (envVars.MONGODB_URI) {
        mongoUri = envVars.MONGODB_URI;
    }
} catch (error) {
    console.warn('No .env file found or error reading it. Using default MongoDB URI.');
}

// Get sample data
const sampleDataPath = join(__dirname, '..', 'src', 'lib', 'data', 'scripts.ts');
let sampleData;

try {
    const fileContent = readFileSync(sampleDataPath, 'utf8');
    
    // Extract the scripts array from the file content using regex
    const scriptsMatch = fileContent.match(/export const scripts: Script\[\] = (\[[\s\S]*?\]);/);
    
    if (scriptsMatch && scriptsMatch[1]) {
        // Replace TypeScript types with valid JSON syntax
        let jsonString = scriptsMatch[1]
            .replace(/(\w+):/g, '"$1":') // Convert property names to strings
            .replace(/'([^']*)'/g, '"$1"'); // Convert single quotes to double quotes
        
        // Parse the JSON
        sampleData = JSON.parse(jsonString);
        
        // Transform the data for MongoDB
        sampleData = sampleData.map(script => ({
            title: script.title,
            description: script.description,
            code: script.code,
            tags: script.tags,
            author: script.author,
            category: script.category,
            dateAdded: new Date(script.dateAdded),
            downloadCount: script.downloadCount
        }));
    } else {
        throw new Error('Could not extract scripts array from file');
    }
} catch (error) {
    console.error('Error reading or parsing sample data:', error);
    process.exit(1);
}

// Connect to MongoDB and seed the database
async function seedDatabase() {
    let client;
    
    try {
        // Connect to MongoDB
        client = new MongoClient(mongoUri);
        await client.connect();
        console.log('Connected to MongoDB');
        
        // Get database and collection
        const db = client.db();
        const scriptsCollection = db.collection('scripts');
        
        // Check if collection already has data
        const count = await scriptsCollection.countDocuments();
        
        if (count > 0) {
            console.log(`Database already has ${count} scripts. Do you want to reset? (y/n)`);
            
            // Wait for user input
            const answer = await new Promise(resolve => {
                process.stdin.once('data', data => {
                    resolve(data.toString().trim().toLowerCase());
                });
            });
            
            if (answer !== 'y') {
                console.log('Skipping database seed.');
                return;
            }
            
            // Clear existing data
            await scriptsCollection.deleteMany({});
            console.log('Existing scripts deleted.');
        }
        
        // Insert sample data
        const result = await scriptsCollection.insertMany(sampleData);
        console.log(`${result.insertedCount} scripts inserted into the database.`);
        
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        if (client) {
            await client.close();
            console.log('MongoDB connection closed.');
        }
        process.exit(0);
    }
}

// Run the seeding function
seedDatabase();
