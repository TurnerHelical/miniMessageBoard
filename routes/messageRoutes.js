// this line allows this file to access the Router object located in express
const {Router} = require('express');

//this line imports the messages array from its home file and destructures it from the object it was exported in
const { messages, timestamp } = require('./homeRoutes.js')

// this line is creates a new router object that only runs for this file
const router = Router();

// this is the what happens when a route is matched, router.get means the request is a get request, the '/' is the matching url, the function has the request object and the
// response object which contain info on the request or what should happen with the response, in this case the response will inform express to find the new view template 
// and pass a title to the file within an object. The view template will then take the passed info and insert it into the HTML template where the EJS functions, <%= title %>,
// will dynamically change the title of the page to 'Message Form'
// EJS function use <%= when using values that are user generated, data from forms etc, this prevents ejs from reading the data as javascript and running it.
// you would use <%- %> when you want EJS to run the code exactly as you typed it, which will cause it to run if it's javascript which makes it vulnerable if using user content
router.get('/', (req, res) => {
    res.render('new', { title: 'Message Form', stylesheet: '/styles/message.css' });
});

// this line handles the post requests that hit this endpoint, /message, 
router.post('/', (req, res) => {

    //this line destructures the req.body object and pulls out the values I intend to use
    const {messageText, fullName} = req.body;

    // this snippet checks that the length of the message and name do not exceed 50 characters, if it does then an alert is sent back to the client explaining the error and redirecting when ok is selected
    if (messageText.length + fullName.length > 50) {
        res.send(`
        <script>
        alert('Too many characters!');
        window.location.href = '/message'; 
        </script>
        `);

    // this snippet checks that the message and name fields are not empty, if they are an alert is sent to the client with details of the error and then redirecting
    } else if (!messageText|| !fullName) {
        res.send(`
            <script>
            alert('Please make sure all fields are filled in.');
            window.location.href= '/message';
            </script>
            `);

    } else{
    // this snippet is doing several things, it's taking the messages array that was exported from the homeRoutes file and adding the user generated content to it
    // the text and user properties in this object use req.body to access the input values that were submitted
    // you access the values with req.body.*id* of the input you want
    // the added: property is a function defined in the homeRoutes file and imported, it is destructured from the unneeded properties in the object
    messages.push({ text: messageText, user: fullName, added: timestamp() });

    // this line redirects the browser back to the homepage after the new message form is submitted
    // you can use res.redirect to send the browser to a different route, this is useful if you have changed an endpoint and want the old route to also lead to the new route
    res.redirect('/');
    }
});

//this line exports the router so the main index router can access these routes and pass requests to it
module.exports = router;