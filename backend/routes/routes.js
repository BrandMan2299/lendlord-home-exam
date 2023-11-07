const Router = require('koa-router')
const router = new Router()

const user = require('../models');

router.get('/hello', (ctx, next) => {
    ctx.status = 300;
    ctx.body = 'world';
    console.log('world');
});

// Define a route for POST request at '/data'
router.post('/data', async (ctx) => {
    // Handle POST request data and respond
    ctx.body = 'Received POST data!';
});
router.allowedMethods()

module.exports = router
