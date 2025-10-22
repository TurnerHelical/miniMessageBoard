
const { Router } = require('express');
const home = require('./homeRoutes');
const message = require('./messageRoutes')

const router = Router();

router.use('/', home);
router.use('/message', message);

module.exports = router;