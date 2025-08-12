


# Happy Feet

## Overview

This is the Happy Feet application, built using Node.js and Express.js. The application provides a web interface for managing various settings, events, staff, and students.

## Requirements

* Node.js (version 14 or higher)
* npm (version 6 or higher)
* Express.js (version 5 or higher)
* Other dependencies listed in `package.json`

## Installation

1. Clone the repository: `git clone https://github.com/NBA-Tech/KG_ADMIN.git`
2. Install dependencies: `npm install`
3. Update the `.env` file with the environment variables provided by the dev team.

## Running the Application

1. Start the application in development mode: `npm run dev`
2. Open a web browser and navigate to `http://localhost:3000` to access the application.

## General Information

The application is configured to run on port 3000, as specified in the `config.js` file. The `index.js` file serves as the entry point for the application, and it sets up the Express.js server and routes.

## Environment Variables

The application uses the following environment variables:

* `PORT`: The port number to use for the application (default: 3000)
* `BACKEND_URL`: The URL of the backend API (provided by the dev team)

Make sure to update the `.env` file with the correct values for your environment.

## Dependencies

The application uses the following dependencies:

* `express`: The Express.js framework for building web applications
* `jsonwebtoken`: For handling JSON Web Tokens (JWT)
* `cookie-parser`: For parsing cookies
* `ejs`: For templating
* `nodemon`: For development mode

## Services

The application uses the following services:

* `studentService`: For managing student data
* `staffService`: For managing staff data
* `eventService`: For managing event data
* `galleryService`: For managing gallery data
* `settingService`: For managing setting data

These services are implemented in separate files and are imported into the main `index.js` file.

I hope this helps! Let me know if you need any further assistance.