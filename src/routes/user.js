const userController = require('../controllers/user')
const { validateUser, validateUserLogin } =require('../middleware/validators/user.validators')

module.exports = (app, router) => {
    router.post('/register-user',validateUser,userController.registerUser);
    router.post('/login',validateUserLogin ,userController.userLogin)

  app.use('/api', router)
}