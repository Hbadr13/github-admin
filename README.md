# Admin Dashboard

## Project Overview

This project is an Admin Dashboard created using Next.js, Tailwind CSS, Zustand for state management, and Ant Design (antd) for UI components. The application integrates with the GitHub REST API to provide users with a seamless experience in managing their repositories and user settings.

## Features

### Sidebar Navigation

The application features a sidebar that provides easy access to various sections, including:
- **Home**: Displays the home page with all repositories, including starred and unstarred ones. Users can also add topics to repositories and update existing ones.
- **Organization Rep**: Access to organization representatives.
- **Repositories**: A list of repositories linked to the user account.
- **Starred Repos**: A collection of repositories that the user has starred.
- **User Settings**: Allows users to adjust their settings.

### Navbar

The application also includes a navbar that displays the logged-in user's information, enhancing the overall user experience.

## Technologies Used

- **Next.js**: For server-side rendering and building the React application.
- **Tailwind CSS**: For styling the components and ensuring a responsive design.
- **Zustand**: For state management, allowing for a simpler and more efficient way to manage application state.
- **Ant Design (antd)**: For a robust set of UI components that provide a modern and sleek look.
- **GitHub REST API**: For integrating and managing GitHub repositories and user data.

## Environment Variables

To run the application, you need to set up the following environment variables in a `.env` file at the root of your project:

- **GITHUB_CLIENT_ID**: Your GitHub OAuth application client ID.
- **GITHUB_CLIENT_SECRET**: Your GitHub OAuth application client secret.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Hbadr13/github-admin.git
   cd github-admin
   npm install
   npm run dev

**Access the Application:**
Open your browser and go to http://localhost:3000.