// User interfaces that can be used by both client and server code
export interface UserInterface {
    id: string;
    username: string;
    email: string;
    bio: string;
    joinDate: string;
}

// User credentials for registration and login
export interface UserCredentials {
    username?: string;
    email: string;
    password: string;
    bio?: string;
}
