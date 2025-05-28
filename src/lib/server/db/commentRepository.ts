// Repository for comment operations
import { connectToDatabase } from '$lib/server/db/connection';
import { Comment, type CommentDocument } from '$lib/server/db/models';
import type { Types } from 'mongoose';

// Comment interface
export interface CommentInterface {
    id: string;
    content: string;
    scriptId: string;
    userId: string;
    username: string;
    createdAt: string;
}

// Convert MongoDB document to Comment interface
function documentToComment(doc: CommentDocument): CommentInterface {
    return {
        id: doc._id ? doc._id.toString() : '',
        content: doc.content,
        scriptId: doc.scriptId.toString(),
        userId: doc.userId.toString(),
        username: doc.username,
        createdAt: doc.createdAt.toISOString()
    };
}

// Create a new comment
export async function createComment(commentData: {
    content: string;
    scriptId: string;
    userId: string;
    username: string;
}): Promise<CommentInterface> {
    await connectToDatabase();
    
    const newComment = await Comment.create({
        content: commentData.content,
        scriptId: commentData.scriptId,
        userId: commentData.userId,
        username: commentData.username
    });
    
    return documentToComment(newComment);
}

// Get comments for a script
export async function getCommentsByScriptId(scriptId: string): Promise<CommentInterface[]> {
    await connectToDatabase();
    
    const comments = await Comment.find({ scriptId })
        .sort({ createdAt: -1 });
    
    return comments.map(documentToComment);
}

// Get comments by user ID
export async function getCommentsByUserId(username: string): Promise<CommentInterface[]> {
    await connectToDatabase();
    
    const comments = await Comment.find({ username })
        .sort({ createdAt: -1 });
    
    return comments.map(documentToComment);
}

// Delete a comment
export async function deleteComment(commentId: string, userId: string): Promise<boolean> {
    await connectToDatabase();
    
    const result = await Comment.deleteOne({
        _id: commentId,
        userId
    });
    
    return result.deletedCount > 0;
}

// Update a comment
export async function updateComment(
    commentId: string,
    userId: string,
    content: string
): Promise<CommentInterface | null> {
    await connectToDatabase();
    
    const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId, userId },
        { $set: { content } },
        { new: true }
    );
    
    if (!updatedComment) return null;
    
    return documentToComment(updatedComment);
}
