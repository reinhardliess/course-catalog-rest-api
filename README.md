# Course Catalog for a school database

## Description

For this project, I used the popular library React to create a client app for a REST API I created using Express which can be found [here](https://github.com/rliess/rest-api-school). It's included in this project as a git submodule.

*Course Catalog* a full-stack app that provides a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, viewing details for a specific course, as well as creating, updating and deleting courses in the database.
In addition, the project will require users to create an account and sign in to make changes to the database.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

A live version of this project can be found [here](https://rliess-course-catalog.netlify.app/). (Please note that the REST API might be in hibernation mode and it may take the app a couple of seconds to load the list of courses.)

## Technologies Used

- JavaScript
- React
- React Router
- React Context API
- Create React App
- Axios
- Node.js
- Express
- Sequelize ORM

## Installation

- Download or clone from Github with the `--recurse-submodules` flag
- Run `npm install` in `./api` folder
- Run `npm run seed` to seed the database
- Run `npm start` to start the REST API server
- Run `npm install` in `./client` folder
- Run `npm start` to start the development server
- The app can be then accessed by pointing the web browser to `localhost:3000`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

### `npm test`

Launches the test runner: unit tests for testing the REST API (CRUD operations) are available
(Uses a bash shell script. If you run Windows, use git bash or Windows 10 WSL)

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Additional Remarks

- Changed CSS incl. hover state for user sign-in/sign-up form submit button if the button is disabled
- Any unexpected error redirects to /error (not only `http 500` status code, including network errors after timeout, e.g. API not available)
- UnhandledError component: also handles notfound and forbidden routes, added 'Home' button
