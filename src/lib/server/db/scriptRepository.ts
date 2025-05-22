// Repository for script operations
import { connectToDatabase } from '$lib/server/db/connection';
import { Script, type ScriptDocument } from '$lib/server/db/models';
import type { Script as ScriptInterface } from '$lib/data/scripts';

// Convert MongoDB document to Script interface
function documentToScript(doc: ScriptDocument): ScriptInterface {
    return {
        id: doc._id ? doc._id.toString() : '',
        title: doc.title,
        description: doc.description,
        code: doc.code,
        tags: doc.tags,
        author: doc.author,
        userId: doc.userId ? doc.userId.toString() : undefined,
        category: doc.category,
        dateAdded: doc.dateAdded.toISOString().split('T')[0],
        downloadCount: doc.downloadCount
    };
}

// Get all scripts
export async function getAllScripts(): Promise<ScriptInterface[]> {
    await connectToDatabase();
    const scripts = await Script.find().sort({ dateAdded: -1 });
    return scripts.map(documentToScript);
}

// Get script by ID
export async function getScriptById(id: string): Promise<ScriptInterface | null> {
    await connectToDatabase();    try {
        const script = await Script.findById(id);
        return script ? documentToScript(script) : null;
    } catch (error: any) {
        console.error(`Error getting script with ID ${id}:`, error);
        return null;
    }
}

// Create a new script
export async function createScript(script: Omit<ScriptInterface, 'id' | 'dateAdded' | 'downloadCount'> & { userId?: string }): Promise<ScriptInterface> {
    await connectToDatabase();
    const newScript = new Script({
        title: script.title,
        description: script.description,
        code: script.code,
        tags: script.tags,
        author: script.author,
        userId: script.userId,
        category: script.category,
        dateAdded: new Date(),
        downloadCount: 0
    });
    
    const savedScript = await newScript.save();
    return documentToScript(savedScript);
}

// Update a script
export async function updateScript(id: string, script: Partial<ScriptInterface>): Promise<ScriptInterface | null> {
    await connectToDatabase();
    try {
        const updatedScript = await Script.findByIdAndUpdate(
            id,
            { $set: script },
            { new: true }        );
        return updatedScript ? documentToScript(updatedScript) : null;
    } catch (error: any) {
        console.error(`Error updating script with ID ${id}:`, error);
        return null;
    }
}

// Delete a script
export async function deleteScript(id: string): Promise<boolean> {
    await connectToDatabase();    try {
        const result = await Script.findByIdAndDelete(id);
        return !!result;
    } catch (error: any) {
        console.error(`Error deleting script with ID ${id}:`, error);
        return false;
    }
}

// Increment download count
export async function incrementScriptDownloadCount(id: string): Promise<ScriptInterface | null> {
    await connectToDatabase();
    try {
        console.log(`Incrementing download count for script with ID ${id}`);
        const updatedScript = await Script.findByIdAndUpdate(
            id,
            { $inc: { downloadCount: 1 } },
            { new: true }
        );
        
        if (updatedScript) {
            console.log(`Successfully updated download count to ${updatedScript.downloadCount}`);
            return documentToScript(updatedScript);
        } else {
            console.log(`Script with ID ${id} not found for download count increment`);
            return null;
        }
    } catch (error: any) {
        console.error(`Error incrementing download count for script with ID ${id}:`, error);
        return null;
    }
}

// Search scripts
export async function searchScripts(params: {
    query?: string;
    category?: string;
    tag?: string;
}): Promise<ScriptInterface[]> {
    await connectToDatabase();
    
    const { query, category, tag } = params;
    let queryObj: any = {};
    
    // Add search criteria
    if (query) {
        queryObj.$or = [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { tags: { $in: [new RegExp(query, 'i')] } }
        ];
    }
    
    // Add category filter
    if (category) {
        queryObj.category = category;
    }
    
    // Add tag filter
    if (tag) {
        queryObj.tags = { $in: [new RegExp(`^${tag}$`, 'i')] };
    }
    
    const scripts = await Script.find(queryObj).sort({ dateAdded: -1 });
    return scripts.map(documentToScript);
}
