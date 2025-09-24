// Cleanup endpoint for removing orphaned comments
import { json, error } from '@sveltejs/kit';
import { connectToDatabase } from '$lib/server/db/connection';
import { Comment, Script } from '$lib/server/db/models';

export async function POST() {
    try {
        await connectToDatabase();
        
        // Find all comments
        const allComments = await Comment.find({});
        
        // Find all script IDs that exist
        const existingScriptIds = await Script.find({}, '_id');
        const existingScriptIdSet = new Set(existingScriptIds.map(script => script._id.toString()));
        
        // Find orphaned comments (comments where scriptId doesn't exist)
        const orphanedComments = allComments.filter(comment => 
            !existingScriptIdSet.has(comment.scriptId.toString())
        );
        
        if (orphanedComments.length > 0) {
            // Delete orphaned comments
            const orphanedIds = orphanedComments.map(comment => comment._id);
            await Comment.deleteMany({ _id: { $in: orphanedIds } });
            
            console.log(`Cleaned up ${orphanedComments.length} orphaned comments`);
            return json({ 
                success: true, 
                message: `Cleaned up ${orphanedComments.length} orphaned comments`,
                cleanedCount: orphanedComments.length
            });
        } else {
            return json({ 
                success: true, 
                message: 'No orphaned comments found',
                cleanedCount: 0
            });
        }
    } catch (err: any) {
        console.error('Error cleaning up orphaned comments:', err);
        throw error(500, { message: 'Failed to cleanup orphaned comments' });
    }
}
