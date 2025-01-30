# React + TypeScript + Vite

This project is a Netflix clone frontend built with React, TypeScript, and Vite. It includes hot module replacement (HMR) and some ESLint rules for code quality.
This project aims to replicate the core functionalities of Netflix, including user authentication, movie and TV show browsing, and search capabilities. It leverages The Movie Database (TMDB) API to fetch movie and TV show data.

## Key Technologies

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A fast build tool and development server.
- **Tailwind CSS**: A utility-first CSS framework.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **React Router**: A collection of navigational components for React applications.
- **Zustand**: A small, fast, and scalable state-management solution.

## Available Plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh.

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property like this:

```json
{
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

## Scripts

- `dev`: Start the development server.
- `build`: Build the project for production.
- `lint`: Run ESLint to check for linting errors.
- `lint:fix`: Run ESLint and fix linting errors.
- `prettier`: Check code formatting with Prettier.
- `prettier:fix`: Fix code formatting with Prettier.
- `preview`: Preview the production build.
- `prepare`: Prepare Husky for Git hooks.
- `commitlint`: Lint commit messages.

## Additional Tools

- **Husky**: Git hooks made easy.
- **Commitlint**: Lint commit messages.
- **Prettier**: Code formatter.

## Environment Configuration

The environment variables are managed using Vite's `loadEnv` function. Make sure to set up your `.env` files accordingly.

## Proxy Configuration

The development server is configured to proxy API requests to the backend server:

```typescript
server: {
  proxy: {
    '/api': {
      target: process.env.VITE_API_BASE_URL,
      changeOrigin: true,
      secure: false
    }
  }
}
```

## Caching and Request Optimization

This project implements a caching mechanism and Axios abort controllers to cancel and avoid redundant requests to the server. This ensures efficient data fetching and improves performance.

## Responsive Design

The application is designed to be responsive, supporting both mobile and laptop screens for an optimal user experience across devices.

## Renovate Configuration

This project uses Renovate for dependency management. The configuration is defined in `renovate.json`:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:recommended"]
}
```
