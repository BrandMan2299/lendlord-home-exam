const Router = require('koa-router')
const router = new Router()

const User = require('../models/users');

router.post('/create', async (ctx) => {
    const user = new User(ctx.request.body);
    if (user.role != 'Manager') {
        try {
            await User.findById(user.manager);
            await user.save();
            ctx.body = `hello ${user.firstName} ${user.lastName}, welcome aboard!`;
        } catch (error) {
            ctx.error = "wrong manager Id..."
        }
    } else {
        await user.save();
        ctx.body = `Hello ${user.firstName} ${user.lastName}, welcome aboard!`;
    }
});

router.get('/getAllUsers', async (ctx) => {
    const sortKey = ctx.query.key;
    const sortObj = {};
    const searchKey = ctx.query.searchKey;
    const searchObj = {};
    sortObj[sortKey] = ctx.query.direction;
    searchObj[searchKey] = new RegExp(ctx.query.searchValue, "gi");
    const users = await User.find(searchObj).sort(sortObj);
    const managers = await User.find({ role: 'Manager' })
    const namedManagers = users.map(user => {
        managers.forEach(manager => {
            if (user.manager == manager._id) {
                user.manager = manager.firstName + ' ' + manager.lastName;
            }
        })
        return user;
    });
    ctx.body = namedManagers;
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
    console.log(query);
    const user = await User.findOneAndDelete(query);
    ctx.body = user;
})

router.get('/getManagerAndEmployees/:id', async (ctx) => {
    const manager = await User.findById(ctx.params.id);
    const employees = await User.find({ manager: ctx.params.id });
    ctx.body = { manager, employees };
})

router.allowedMethods()

module.exports = router
