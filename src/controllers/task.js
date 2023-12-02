const db = require('../models/index');
const taskModel = db.task;

// add task details
exports.addTask = async(req, res) => {
    let checkValidations = await checkValidation(req,res)
        if(checkValidations){
            return;
        }

    try {
       const addTask = await taskModel.create(req.body)
        if(addTask){
            return res.send({
                status: true,
                statusCode: 201,
                message: 'Task has created successfully.'
            });
        }else{
            return res.send({
                status: false,
                statusCode: 422,
                message: 'Error, Task not created!'
            });
        }
    } catch (error) {
        console.log("error: ",error);
        return res.send({
            status: false,
            statusCode: 500,
            message: 'Something Went Wrong!'
        }) 
    }

   
}

// view task details by task id
exports.viewTask = async(req, res) => {
    try {
       const taskData = await taskModel.findOne({
            where: {id: req.params.id}
        })
       if(taskData) {
            return res.send({
                status: true,
                statusCode: 200,
                message: 'Task Details Found.',
                data: taskData
            });
        }else{
            return res.send({
                status: true,
                statusCode: 200,
                message: 'Task Details not Found!',
                data: taskData
            });
        }
    } catch (error) {
        console.log('error: ',error);
        return res.send({
            status: true,
            statusCode: 500,
            message: 'Something Went Wrong!',
        });
    }
    
}

// list of all task
exports.listTask = async(req, res) => {
    try {
        const taskList = await taskModel.findAll()
    if(taskList){
        return res.send({
            status: true,
            statusCode: 200,
            message: 'Task List.',
            data: taskList
        });
    }else{
        return res.send({
            status: true,
            statusCode: 204,
            message: 'No Task Found.',
            data: taskList
        });
    }
    } catch (error) {
        console.log('error: ',error);
        return res.send({
            status: true,
            statusCode: 500,
            message: 'Something Went Wrong!',
        });
    }
    
}

// update task details by task id
exports.editTask = async(req, res) => {
    try {
        const taskDetails = await taskModel.findOne({
            where: {id: req.params.id }
        })
        if(taskDetails){
            const updateTask = await taskModel.update(req.body,
                {where: {id: req.params.id}}
                )
                if(!updateTask){
                    return res.send({
                        status: false,
                        statusCode: 422,
                        message: 'Error, Task details not updated!'
                    });
                }else{
                    return res.send({
                        status: true,
                        statusCode: 201,
                        message: 'Task details updated successfully.'
                    });
                }
        }else{
            return res.send({
                status: false,
                statusCode: 404,
                message: 'Task Details not Found!'
            });
        }
    } catch (error) {
        console.log('error: ',error);
        return res.send({
            status: true,
            statusCode: 500,
            message: 'Something Went Wrong!',
        });   
    }
    
}

// delete task by task id
exports.deleteTask = async(req, res) => {
    try {
        const taskDetails = await taskModel.findOne({
            where: {id: req.params.id}
        })
        if(taskDetails){
           const deleteTask = await taskModel.destroy({
                where: {id: req.params.id}
            })
            if(deleteTask){
                return res.send({
                    status: true,
                    statusCode: 200,
                    message: 'Task deleted successfully.'
                });
            }else{
                return res.send({
                    status: false,
                    statusCode: 422,
                    message: 'Error,Task not deleted!'
                });
            }
            
        }else{
            return res.send({
                status: false,
                statusCode: 404,
                message: 'Task Details not Found!'
            });
        }
    } catch (error) {
        console.log('error: ',error);
        return res.send({
            status: true,
            statusCode: 500,
            message: 'Something Went Wrong!',
        });   
    }
}


checkValidation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        status: 400,
        message: "Validation failed",
        data: errors,
      });
    }
  };