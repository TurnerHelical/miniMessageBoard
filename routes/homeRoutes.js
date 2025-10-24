// this line is again making the Router object available to this file, so it can handle routing
const {Router} = require('express');

// this line create a new Router instance that will handle the routing for specifically the routes listed in this file, which allows you to seperate out the routes into 
// modules that are grouped by the request URL starting point
const router = Router();

// this function creates a date object at the time it is run, then the object is formatted into a local date and time with the .toLocaleString, this example using 'en-us'
// that formated date is then return out of the function, in this case it runs when a new message is input and creates a timestamp
const timestamp = () => {
    let dateObj = new Date();
    let formatedDate = dateObj.toLocaleString('en-US');
    return formatedDate;
}

// this array is fake data just to have some sample messages to pass to display on my index view
// this array is passed into the render call when someone uses the '/' endpoint so that the messages can be accessed and displayed
const messages = [
    {
        user: 'Alice',
        text: 'Testing Express',
        added: timestamp()
    },
    {
        user: 'Bob',
        text: 'HIIIIIIIIIIIIIII',
        added: timestamp()
    },
    {
        user: 'Steve',
        text: 'I did it!!!!!',
        added: timestamp()
    }
]

// !!IMPORTANT!! this line defines a route, the .get handles any get requests that are sent to this route, you use router.get as .get is a method on the router object
// other methods are .post, .put, .delete.
// the '/' is the path that this route handles, for instance localhost:3000/ would follow this route, for this router you won't see many other routes as it is linked to
// the homepage
// the (req, res) => {} is the route handler function and defines what happens when this route is hit by a request.
// the req is the Request object and holds the information about the incoming request, including the URL, query params, headers, form data, and others
// the res is the response object that controls how you send data back to the client, you can use several methods with res in the function including , 
// res.send() which will send plain text or can send HTML snippet,
// res.json() will send back pure JSON, res.json is used to send an object back to the client, usually an API, or a Front-end handler
router.get('/', (req, res) => {
    
    // res.render is for use with view engines, it informs express to look for the view engine config in your app.js so it knows which view engine to use and where to find 
    // templates. This specific call looks for a views/index.ejs file, passes the { title: 'Home Page' } to that view which allows the view engine, EJS, to use those 
    // variables to dynamically generate html, in this case the passed information would be used in the HTML head to change the title of the webpage to 'Home Page'.
    // the messages variable will take the created fake data array , messages, and pass it to the index.ejs and enable that to use the data
    // after the HTML is rendered with the passed variables, express sends the complete HTML file to the browser
    // added the stylesheet property to this route, in the head partial the stylesheet will change according to the property set here
    res.render('index', { title: 'Message Control', messages, stylesheet: '/styles/home.css'});
});

// this line exports this router so it can be used by the main index router to handle requests
// this line also exports the messages array so it can be accessed and altered from other files
module.exports = {router, messages, timestamp};

// this router will only handle request that match '/' with the current setup, if I wanted to I could define more routes in this file to handle say '/team' requests and 
// if I also have a seperate router for the /team url it won't be reached as express will pass the request to the first middleware that matches the url and then stop 
// any attempt to match any of the other routers. But if the home router has a '/team' route defined and the team router has a '/team/about' and the request is '/team/about'
// express will look in the home foldere first see that /about matches but not /about/team so the request will move to the next middleware in line and continue to match paths
