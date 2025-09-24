# autohub

A modern web platform that enables developers to discover, share, and collaborate on Python automation scripts with a beautiful red/pink gradient theme.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

AutoHub solves the problem of scattered automation scripts across different repositories and platforms. Instead of searching through multiple GitHub repos or documentation sites, developers can discover, download, and share Python automation scripts in one centralized, beautifully designed platform.

**Who it's for:** Python developers, automation engineers, DevOps teams, and anyone looking to streamline their workflow with ready-to-use automation scripts.

## Tech Stack

- **Frontend**: SvelteKit 2.16, Svelte 5, TypeScript
- **Styling**: TailwindCSS v4 with custom red/pink gradient theme
- **Backend**: Node.js with SvelteKit API routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based auth with bcryptjs
- **Icons**: Font Awesome
- **Build Tool**: Vite 6.2
- **Development**: ESLint, Prettier, TypeScript

## Features

- **Script Discovery**: Browse and search through curated Python automation scripts
- **Interactive Code Preview**: View script contents with syntax highlighting
- **User Authentication**: Secure JWT-based login and registration
- **Profile Management**: Personalized user profiles to track contributions
- **Script Submission**: Easy-to-use interface for sharing automation scripts
- **Comments & Discussion**: Engage with the community through script discussions
- **Download Tracking**: Monitor script popularity and usage statistics
- **Category Filtering**: Organize scripts by categories (Web Scraping, File Automation, etc.)
- **Dark Mode Support**: Beautiful dark/light theme switching
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Glass Morphism UI**: Modern design with backdrop blur effects
- **Gradient Animations**: Smooth transitions and hover effects

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/autohub.git
   cd autohub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Create `.env` with:
   ```env
   JWT_SECRET=your_super_secret_jwt_key_here
   MONGODB_URI=mongodb://localhost:27017/autohub
   ```

4. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Ensure MongoDB is running on the configured URI

5. **Seed the database (optional)**
   ```bash
   npm run seed-db
   ```

6. **Run the application**
   ```bash
   npm run dev
   ```

Visit `http://localhost:5173` to use the application.

## Usage

1. **Browse Scripts**: Explore the homepage to discover featured automation scripts
2. **Search & Filter**: Use the search functionality to find specific scripts by category or keywords
3. **View Script Details**: Click on any script to see full code, description, and comments
4. **Download Scripts**: One-click download of Python scripts with proper file naming
5. **Create Account**: Register to submit your own scripts and comment on others
6. **Submit Scripts**: Share your automation solutions with the community
7. **Engage**: Comment on scripts and interact with other developers
8. **Manage Profile**: Update your profile information and view your contributions

## Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository** to Vercel
2. **Add environment variables** in Vercel dashboard:
   - `JWT_SECRET`
   - `MONGODB_URI`
3. **Deploy** - Vercel handles the build automatically

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables for Production

Ensure all environment variables are set in your deployment platform:
- `JWT_SECRET` (strong, random string)
- `MONGODB_URI` (MongoDB connection string)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Add proper TypeScript types
- Include tests for new features
- Update documentation as needed
- Ensure responsive design for all screen sizes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Email**: pranavmurali024@gmail.com
- **GitHub**: [https://github.com/yourusername/autohub](https://github.com/yourusername/autohub)

---

Built with ❤️ for the Python automation community