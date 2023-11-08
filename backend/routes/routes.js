const Router = require('koa-router')
const router = new Router()

const User = require('../models/users');

router.post('/newUser', async (ctx) => {
    const user = new User(ctx.request.body);
    await user.save();
    const firstName = (await User.findOne({ createdAt: user.createdAt })).firstName;
    ctx.response.body = `Hello ${firstName} ${user.lastName}, welcome aboard!`;
});

router.get('/getAllUsers', async (ctx) => {
    const users = await User.find({});
    ctx.body = users;
})

router.get('/getUserById/:id', async (ctx) => {
    console.log(typeof (ctx.params.id));
    const user = await User.findById(ctx.params.id);
    ctx.body = user;
})

router.post('/update/:searchParam', async (ctx) => {
    const data = ctx.request.body;

})

router.allowedMethods()

module.exports = router
