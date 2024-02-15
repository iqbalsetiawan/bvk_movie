![App Screenshot](https://github.com/iqbalsetiawan/bvk_movie/assets/52906490/7ee9c7c7-8148-458c-9197-8b42903ef65e)

# Vidio

Vidio is a responsive web application designed for movie enthusiasts to browse, search, and manage a list of watched movies. Leveraging The Movie Database (TMDB) API, Vidio offers up-to-date information on movies, including details like genres, ratings, and summaries. Users can mark movies as watched, explore movie details, and maintain a personalized list of watched movies with seamless offline support for adding and removing movies from their watched list.

## Demo

https://bvk-movie.vercel.app/

## Features

- **Browse Movies**: Explore popular movies fetched directly from TMDB.
- **Search Functionality**: Search for movies using TMDB's vast database.
- **Movie Details**: View detailed information about each movie, including posters, genres, ratings, and summaries.
- **Watched List**: Keep track of movies you've watched and manage your list.
- **Offline Support**: Add or remove movies from your watched list even when offline. Changes will sync automatically once you're back online.

## Technology Stack

- **React**: For building the user interface.
- **React Router**: For managing navigation within the application.
- **Axios**: For making HTTP requests to the TMDB API.
- **SweetAlert2**: For displaying informative alerts and notifications.
- **Service Workers**: To enhance offline capabilities (if implemented).

## Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites

- Node.js installed on your system.
- An API key from TMDB for fetching movie data.

To get a TMDb API key, visit https://www.themoviedb.org/documentation/api

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/vidio.git
   ```
2. Navigate to the project directory:
   ```sh
   cd vidio
   ```
3. Install NPM packages:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add your TMDB API key:
   ```plaintext
   REACT_APP_TMDB_API_KEY=your_api_key_here
   ```
5. Start the development server:
   ```sh
   npm start
   ```
   The application will be available at `http://localhost:3000`.
