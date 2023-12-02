const taskController = require('../controllers/task')
const auth = require('../middleware/auth.middleware')
const { validateTask } = require('../middleware/validators/task.validators')

module.exports = (app, router) => {
    router.post('/add-task',validateTask,taskController.addTask)
    router.get('/view-task/:id',auth(),taskController.viewTask)
    router.get('/list-task',auth(),taskController.listTask)
    router.put('/edit-task/:id',auth(),taskController.editTask)

   app.use('/api',router)
}