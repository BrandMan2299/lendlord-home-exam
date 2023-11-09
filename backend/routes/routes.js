const Router = require('koa-router')
const router = new Router()

const User = require('../models/users');

router.post('/create', async (ctx) => {
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
    const user = await User.findById(ctx.params.id);
    ctx.body = user;
})

router.post('/update', async (ctx) => {
    const data = ctx.request.body;
    const query = ctx.query;
    await User.findOneAndUpdate(query, data);
    const user = await User.findOne(data);
    ctx.body = user;
})

router.delete('/delete', async (ctx) => {
    const query = ctx.query;
    const user = await User.findOneAndDelete(query);
    ctx.body = user;
})

router.allowedMethods()

module.exports = router
