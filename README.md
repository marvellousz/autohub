# AutoHub

AutoHub is a modern web platform built with SvelteKit that enables developers to discover, share, and collaborate on automation scripts. With a sleek, responsive design and powerful features, AutoHub makes it easy to find and contribute to the automation community.

## Features

- **Script Discovery**: Browse and search through a curated collection of automation scripts
- **Interactive Code Preview**: View script contents with syntax highlighting
- **User Authentication**: Secure login and registration system
- **Profile Management**: Personalized user profiles to track contributions
- **Script Submission**: Easy-to-use interface for sharing your automation scripts
- **Comments & Discussion**: Engage with the community through script discussions
- **Dark Mode Support**: Comfortable viewing experience in any lighting condition
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **API Integration**: RESTful endpoints for script management and user interactions

## Technologies

- **Frontend**:
  - [SvelteKit](https://kit.svelte.dev/) - Full-stack application framework
  - [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [Font Awesome](https://fontawesome.com/) - Icons and social logos
- **Backend**:
  - Node.js server with SvelteKit endpoints
  - TypeScript for type safety
- **Authentication**:
  - JWT-based authentication system
  - Secure password hashing
- **Development**:
  - Vite for fast builds and HMR
  - TypeScript for enhanced development experience
  - ESLint and Prettier for code quality

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/autohub.git
   cd autohub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   JWT_SECRET=your_secret_key
   DATABASE_URL=your_database_url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## Building for Production

1. Create a production build:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

## Project Structure

```
autohub/
├── src/
│   ├── lib/
│   │   ├── components/   # Reusable Svelte components
│   │   ├── auth/         # Authentication logic
│   │   ├── data/         # Type definitions and models
│   │   ├── server/       # Server-side utilities
│   │   ├── stores/       # Svelte stores
│   │   └── utils/        # Helper functions
│   ├── routes/           # SvelteKit pages and API routes
│   └── app.html         # HTML template
├── static/              # Static assets
├── tests/              # Test files
├── tailwind.config.js  # TailwindCSS configuration
└── vite.config.ts     # Vite configuration
```

## Running Tests

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Icons by [Font Awesome](https://fontawesome.com/)
- Community contributions welcome!

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
