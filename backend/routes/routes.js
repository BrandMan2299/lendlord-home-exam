const Router = require('koa-router')
const router = new Router()

const User = require('../models/users');

router.post('/create', async (ctx) => {
    const user = new User(ctx.request.body);
    if (user.role !== 'Manager') {
        try {
            const [firstName, lastName] = user.manager.split(' ');
            const manager = await User.findOne({ firstName: firstName, lastName: lastName });
            if (manager) {
                await user.save();
                ctx.body = `hello ${user.firstName} ${user.lastName}, welcome aboard!`;
            }
            else {
                ctx.error = "wrong manager name..."
            }
        } catch (error) {
            ctx.error = "wrong manager namne..."
        }
    } else {
        if (user.manager === "Abner Dast") {
            await user.save();
            ctx.body = `Hello ${user.firstName} ${user.lastName}, welcome aboard!`;
        }
        else {
            ctx.error = "wrong manager name..."
        }
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
    if (data.role !== 'Manager') {
        try {
            const [firstName, lastName] = data.manager.split(' ');
            const manager = await User.findOne({ firstName: firstName, lastName: lastName });
            if (manager) {
                await User.findOneAndUpdate(query, data);
                const user = await User.findOne(data);
                ctx.body = user;
            } else {
                ctx.error = "wrong manager name..."
            }
        } catch (error) {
            ctx.error = "Somthing went wrong";
        }
    } else {
        if (data.manager === "Abner Dast" || data.firstName + data.lastName === "AbnerDast") {
            await User.findOneAndUpdate(query, data);
            const user = await User.findOne(data);
            ctx.body = user;
        } else {
            ctx.error = "wrong manager name..."
        }
    }

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
