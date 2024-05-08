# Netflix Clone

## Table of contents

- [Overview](#overview)
  - [Responsive](#responsive)
  - [Screenshot](#screenshot)
  - [Install and Run the Project](#install-and-run-the-project)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
- [Author](#author)

## Overview

### Responsive

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page

### Screenshot

![Desktop Preview](https://i.imgur.com/bA1ENlK.jpeg)

### Install and Run the Project

- Step 1

  Install required dependencies.

  ```
  npm install
  ```

- Step 2

  We require these API(s) for this app to run.

  1. [TMDB API](https://www.themoviedb.org/)
  1. [Youtube Data API](https://developers.google.com/youtube/v3)

  **<small>Register Here and get your API Key</small>**

- Step 3

  Set the environment variable in <em>.env file</em> at root of the folder.

  In **Create React App** prefix variable with `REACT_APP`.\
  For example

  ```
  REACT_APP_KEY="1234"
  ```

  Access your variable with `process.env.REACT_APP_KEY`

  In **Vite** prefix variable with `VITE`.\
  For example

  ```
  VITE_KEY="1234"
  ```

  Access your variable with `import.meta.env.VITE_KEY`

  Change the values with your registered API key.

  ```
  VITE_TMDB_API_KEY=<Your Key Here>

  VITE_YT_API_KEY=<Your Key Here>

  VITE_FIREBASE_API_KEY=""
  VITE_FIREBASE_AUTH_DOMAIN=""
  VITE_FIREBASE_PROJECT_ID=""
  VITE_FIREBASE_STORAGE_BUCKET=""
  VITE_FIREBASE_MESSAGING_SENDER_ID=""
  VITE_FIREBASE_APP_ID=""
  VITE_FIREBASE_MEASUREMENT_ID=""
  ```

- Step 4

  You're all set up. Start your app in development mode

  ```
  npm run dev
  ```

### Links

- Live Site URL: [https://chic-nasturtium-3b31e3.netlify.app/](https://chic-nasturtium-3b31e3.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [tailwindcss](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - For Animations
- [Firebase](https://firebase.google.com/) - Backend-as-a-Service (BaaS) app development platform

## Author

- Website - [Karan Sethi](https://imkaranks.github.io/)
