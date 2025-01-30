# Netflix Clone

This project is a Netflix clone frontend built with React, TypeScript, and Vite. It includes hot module replacement (HMR) and some ESLint rules for code quality. This project aims to replicate the core functionalities of Netflix, including user authentication, movie and TV show browsing, and search capabilities. It leverages The Movie Database (TMDB) API to fetch movie and TV show data.

## Table of Contents

- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Linting and Formatting](#linting-and-formatting)
- [Git Hooks](#git-hooks)
- [Key Technologies](#key-technologies)
- [Available Plugins](#available-plugins)
- [Optimizations](#optimizations)
- [Expanding the ESLint Configuration](#expanding-the-eslint-configuration)

## Installation

To get started with this project, clone the repository and install the dependencies:

```sh
git clone https://github.com/sonqh/netlfix-clone-frontend.git
cd netflix-clone-frontend
npm install
```

### Running the Project

To start the development server, run:

```sh
npm run dev
```

To build the project for production, run:

```sh
npm run build
```

To preview the production build, run:

```sh
npm run preview
```

### Linting and Formatting

To check for linting errors, run:

```sh
npm run lint
```

To fix linting errors, run:

```sh
npm run lint:fix
```

To check code formatting with Prettier, run:

```sh
npm run prettier
```

To fix code formatting with Prettier, run:

```sh
npm run prettier:fix
```

### Git Hooks

To prepare Husky for Git hooks, run:

```sh
npm run prepare
```

To lint commit messages, run:

```sh
npm run commitlint
```

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

## Optimizations

This project includes several optimizations to enhance performance and improve user experience:

### API Request Caching

To reduce unnecessary API requests and improve responsiveness, data fetching utilizes a caching mechanism. Responses are stored in memory and reused for up to **5 minutes** before fetching fresh data. This minimizes redundant network requests and enhances performance, especially for frequently accessed data.

### Request Deduplication

To avoid duplicate API calls, the Axios instance is configured to track pending requests. If the same request is triggered before the previous one completes, the earlier request is aborted. This prevents redundant API requests, ensuring only the latest relevant response is processed
