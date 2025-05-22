# AutoHub - Python Automation Scripts Platform

AutoHub is a web platform built with SvelteKit where users can browse, search, and download curated Python automation scripts. The application features a clean, responsive UI and provides functionality for users to submit their own scripts.

## Features

- **Browse and Search**: Find Python automation scripts by category, tags, or keywords
- **Script Details**: View detailed information about each script, including code preview
- **Download Scripts**: Easily download Python scripts to use in your projects
- **Submit Scripts**: Share your own automation scripts with the community
- **Responsive Design**: Clean, modern UI that works on all devices

## Technologies Used

- **Frontend**: SvelteKit, Vanilla CSS, Font Awesome
- **Backend**: SvelteKit server endpoints for API
- **Data Storage**: JSON data and file system storage (for demo purposes)

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

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

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

- `/src/routes` - SvelteKit pages and API routes
- `/src/lib/components` - Reusable Svelte components
- `/src/lib/data` - Data models and sample data
- `/src/lib/stores` - Svelte stores for state management
- `/src/lib/utils` - Utility functions
- `/src/lib/server` - Server-side utilities
- `/static` - Static assets and CSS

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with SvelteKit
- Icons by Font Awesome
- Sample scripts created for demonstration purposes

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
