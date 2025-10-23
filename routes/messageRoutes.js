// this line allows this file to access the Router object located in express
const {Router} = require('express');

// this line is creates a new router object that only runs for this file
const router = Router();

// this is the what happens when a route is matched, router.get means the request is a get request, the '/' is the matching url, the function has the request object and the
// response object which contain info on the request or what should happen with the response, in this case the response will inform express to find the new view template 
// and pass a title to the file within an object. The view template will then take the passed info and insert it into the HTML template where the EJS functions, <%= title %>,
// will dynamically change the title of the page to 'Message Form'
// EJS function use <%= when using values that are user generated, data from forms etc, this prevents ejs from reading the data as javascript and running it.
// you would use <%- %> when you want EJS to run the code exactly as you typed it, which will cause it to run if it's javascript which makes it vulnerable if using user content
router.get('/', (req, res) => {
    res.render('new', { title: 'Message Form' });
});

//this line exports the router so the main index router can access these routes and pass requests to it
module.exports = router;