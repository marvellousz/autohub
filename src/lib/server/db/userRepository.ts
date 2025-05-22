// Repository for user operations
import { connectToDatabase } from '$lib/server/db/connection';
import { User, type UserDocument } from '$lib/server/db/models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '$lib/server/auth/jwtConfig';
import type { UserInterface, UserCredentials } from '$lib/interfaces/user';

function documentToUser(doc: UserDocument): UserInterface {
    return {
        id: doc._id ? doc._id.toString() : '',
        username: doc.username,
        email: doc.email,
        bio: doc.bio,
        joinDate: doc.joinDate.toISOString().split('T')[0]
    };
}

// Register a new user
export async function registerUser(userData: UserCredentials): Promise<{ user: UserInterface; token: string }> {
    await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error('User with this email already exists');
    }
    
    if (!userData.username) {
        userData.username = userData.email.split('@')[0];
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    // Create new user
    const newUser = await User.create({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        bio: userData.bio || ''
    });
      // Generate JWT token
    const token = jwt.sign(
        { userId: newUser._id },
        getJwtSecret(),
        { expiresIn: '7d' }
    );
    
    return { 
        user: documentToUser(newUser),
        token
    };
}

// Login user
export async function loginUser(credentials: Pick<UserCredentials, 'email' | 'password'>): Promise<{ user: UserInterface; token: string }> {
    await connectToDatabase();
    
    // Find user by email
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
        throw new Error('Invalid credentials');
    }
      // Check password
    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
    
    // Generate JWT token
    const token = jwt.sign(
        { userId: user._id },
        getJwtSecret(),
        { expiresIn: '7d' }
    );
    
    return { 
        user: documentToUser(user),
        token
    };
}

// Get user by ID
export async function getUserById(id: string): Promise<UserInterface | null> {
    await connectToDatabase();
    
    try {
        const user = await User.findById(id);
        if (!user) return null;
        
        return documentToUser(user);
    } catch (error: any) {
        console.error('Error getting user:', error);
        return null;
    }
}

// Update user
export async function updateUser(id: string, updates: Partial<UserInterface>): Promise<UserInterface | null> {
    await connectToDatabase();
    
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true }
        );
        
        if (!user) return null;
        
        return documentToUser(user);
    } catch (error: any) {
        console.error('Error updating user:', error);
        return null;
    }
}
