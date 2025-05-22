// MongoDB models for the application
import mongoose, { Schema, model } from 'mongoose';
import type { ScriptCategory } from '$lib/data/scripts';

// Script Schema
const scriptSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    author: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Web Scraping',
            'File Automation',
            'Data Processing',
            'API Integration',
            'Database',
            'Network',
            'System Utilities',
            'Other'
        ],
        default: 'Other'
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    downloadCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// User Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    bio: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Comment Schema
const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    scriptId: {
        type: Schema.Types.ObjectId,
        ref: 'Script',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Create models only if they don't exist already (for hot reloading)
export const Script = mongoose.models.Script || model('Script', scriptSchema);
export const User = mongoose.models.User || model('User', userSchema);
export const Comment = mongoose.models.Comment || model('Comment', commentSchema);

// Type for a script document
export type ScriptDocument = mongoose.Document & {
    title: string;
    description: string;
    code: string;
    tags: string[];
    author: string;
    userId?: mongoose.Types.ObjectId;
    category: ScriptCategory;
    dateAdded: Date;
    downloadCount: number;
    createdAt: Date;
    updatedAt: Date;
};

// Type for a user document
export type UserDocument = mongoose.Document & {
    username: string;
    email: string;
    password: string;
    joinDate: Date;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
};

// Type for a comment document
export type CommentDocument = mongoose.Document & {
    content: string;
    scriptId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    username: string;
    createdAt: Date;
    updatedAt: Date;
};
