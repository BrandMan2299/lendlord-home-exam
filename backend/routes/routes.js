const Router = require('koa-router')
const router = new Router()

const User = require('../models/users');

router.post('/create', async (ctx) => {
    const user = new User(ctx.request.body);
    if (user.role != 'Manager') {
        try {
            const manager = await User.findById(user.manager);
            await user.save();
        } catch (error) {
            ctx.status(422);
            ctx.body = "wrong manager Id..."
        }
    } else {
        await user.save();
        ctx.body = `Hello ${user.firstName} ${user.lastName}, welcome aboard!`;
    }
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

router.get('/getManagerAndEmployees/:id', async (ctx) => {
    const manager = await User.findById(ctx.params.id);
    const employees = await User.find({ manager: ctx.params.id });
    ctx.body = { manager, length: employees.length, employees };
})

router.allowedMethods()

module.exports = router
