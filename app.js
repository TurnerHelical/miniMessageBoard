// this line loads the enviroment variables so that secrets stay safe
require('dotenv').config();

// have to require express and set to a variable
const express = require('express');

// this is important, app is an object that represents the entire server, needs to be in any express project. Doesn't have to be named app but that's most common
const app = express();

// the path module includes utilities for working with file and directory paths
const path = require('path');

// this line links app.js to your middleware that controls routing
const routes = require('./routes');


// this sets the view engine for the app, ejs in this case, view engine's allow server side rendering and dynamic information to be inserted on the server before serving
// html files back to the browser
// app.set is used to set global variables with this formula app.set(name, value);
app.set('view engine', 'ejs');

// this line tells express where to look for your view engine files, the first views is the directory it will look in, the path.join ensures the file path works seamlessly
// on the different OS's, __dirname is a global variable that holds the absolute path of the directory the file is in, this snippet 'path.join(__dirname, 'views')' creates
// a safe absolute path to the views directory where the view templates are stored
app.set('views', path.join(__dirname, 'views'));

// this line tells express where to find the static files like stylesheets, photos, and any other files that are hardcoded
// app.use is used to mount middleware which are functions that run on the server before the data gets sent back to the browser
// express.static is a built in middleware that serves up the static files, formula is 'express.static(root, options)
// the path.join portion describes the absolute path to the directory that holds the static files
// if the incoming URL includes any of the paths to static files in the public folder it serves that content, you can have additional directories under public, the url
// will need to include the directory but public is not necessary to put in the URL
app.use(express.static(path.join(__dirname, 'public')));


// this line adds a middleware to the express app that parses incoming form data and turns it into a javascript object accessable through req.body
// the extended true property tell express to use the qs librart which allows the use of more complex objects and arrays to be parsed correctly
app.use(express.urlencoded({ extended: true }));


// this line calls the routes middleware for all url's that don't match any static files, the general formula is 'app.use(path, function or Router)' if the path 
// variable is left out it defaults to / which applies to all routes that get passed to this middleware from the preceding one
// that module will then go through the request and check if it matches any of the routes listed in the routes/index.js file, if it does the request is then passed to the 
// router that handles that path, if nothing is matched the request proceeds to the next middleware (likely being a 404 error page)
app.use(routes);

// this snippet handles any url requests that don't match any of the routes in your router, res.setStatus sets the HTTP status code of the response to 404, which means not
// found, the '.render('404'), { title: 'Not Found' }' will send an error page to the browser and change the title of the webpage if you have that set to be dynamic
// will throw an error if you don't have a 404 view template set up, can also use .send instead of .render if you want to send a string or a HTML snippet
app.use((req, res) => {
    res.status(404).send('404');
});

// express treats functions that include (err, req, res, next) special as they only run if next(err) is called or an unhandled error occurs
// this error handler will log the error to console, set HTTP status code to 500, and serve up the 500 view template to the browser while changing the title of the page
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('500');
})

// this line defines the port that the server will be listening on, the process.env.PORT is an enviroment variable that is set in .env, the host of your website
// will inject these values
// if no PORT variable is defined in the .env then it will default to 3000
const PORT = process.env.PORT || 3000

// this line tells your server to start listening for requests on the specified port, the function after the PORT variable is code that is run once the server is started
// nothing important is normally run with the function, most of the time it's just a way to know that the server is up and running, you can use it to set up a connection
// to your database but it's not recommended, the safer way would be to use an async function like this
// async function startServer() {
//      await connectToDatabase();
//      app.listen(PORT,() => {
// console.log('Server Running');
// });
// };
// startServer();
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});












