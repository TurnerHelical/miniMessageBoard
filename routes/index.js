// this line allows the app to use the special Router object which allows you to break routes into smaller cleaner modules
const { Router } = require('express');

// these lines import the other route modules so that this page can send the request to the right file
// the require should be the path to the route module
// the individual route modules need to be exported to be accessed here
const home = require('./homeRoutes');
const message = require('./messageRoutes')

// this creates the main router, it ties together all the other route modules 
const router = Router();

// these lines define the routes to the individual route modules
// any request that starts with / will be passed along to the homeRouter which will then perform the routes associated with it
router.use('/', home);

// this line means that any request that starts with /message will be sent to the message router which was required at the top of this page
// when the index router passes this along to the message router, the request will remove the /message part, so on the message router '/' would be equal to /message
// and any other sub-routes would be '/someOtherThing' example would be '/new' if I wanted to create a new message route, the base request would be '/message/new'
router.use('/message', message);

// this line exports the router so app.js can access it and can pass the requests here for further routing
module.exports = router;