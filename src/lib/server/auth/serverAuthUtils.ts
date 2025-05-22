// Server-side authentication utilities
import jwt from 'jsonwebtoken';
import { getJwtSecret } from './jwtConfig';

// Token payload interface
export interface TokenPayload {
    userId: string;
    iat?: number;
    exp?: number;
}

// Verify JWT token
export async function verifyToken(token: string): Promise<TokenPayload | null> {
    try {
        const decoded = jwt.verify(token, getJwtSecret()) as TokenPayload;
        return decoded;
    } catch (error: any) {
        console.error('Token verification failed:', error);
        return null;
    }
}
