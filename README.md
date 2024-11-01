# Admin Dashboard

## Project Overview

This project is an Admin Dashboard created using Next.js, Tailwind CSS, Zustand for state management, and Ant Design (antd) for UI components. The application integrates with the GitHub REST API to provide users with a seamless experience in managing their repositories and user settings.

## Features

- **Sidebar Navigation:** The application features a sidebar that provides easy access to various sections, including:
  - **Home:** Displays the home page.
  - **Organization Rep:** Access to organization representatives.
  - **Repositories:** A list of repositories linked to the user account.
  - **Starred Repos:** A collection of repositories that the user has starred.
  - **User Settings:** Allows users to adjust their settings.

### Sidebar Structure

The sidebar contains the following links:

- **Home** (Key: 1)
- **Organization Rep** (Key: 10)
- **Divider**
- **Repositories** (Key: 2)
- **Starred Repos** (Key: 3)
- **User Settings** (Key: 4)

## Navbar

The application also includes a navbar that displays the logged-in user's information, enhancing the overall user experience.

## Technologies Used

- **Next.js:** For server-side rendering and building the React application.
- **Tailwind CSS:** For styling the components and ensuring a responsive design.
- **Zustand:** For state management, allowing for a simpler and more efficient way to manage application state.
- **Ant Design (antd):** For a robust set of UI components that provide a modern and sleek look.
- **GitHub REST API:** For integrating and managing GitHub repositories and user data.

## Environment Variables

To run the application, you need to set up the following environment variables in a `.env` file at the root of your project:



1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   npm install

**Access the Application:**
Open your browser and go to http://localhost:3000.