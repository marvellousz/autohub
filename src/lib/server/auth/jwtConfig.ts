// JWT Secret Configuration
// This file provides a centralized way to access the JWT secret
import { JWT_SECRET } from '$env/static/private';

// Get the JWT secret from environment variables or use a default for development
export function getJwtSecret(): string {
    // For production, we use environment variable
    // For development, use a default value if not set
    return JWT_SECRET || 'development_jwt_secret_key';
}
