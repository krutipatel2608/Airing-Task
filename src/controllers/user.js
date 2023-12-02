const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const db = require('../models/index')
const userModel = db.user

exports.registerUser = async(req, res) => {
    try {

        let checkValidations = await checkValidation(req,res)
        if(checkValidations){
            return;
        }

         req.body.password?
        (req.body.password = bcrypt.hashSync(req.body.password,10)):
        "";
        const checkEmail = await userModel.findOne({
            where: {email: req.body.email}
        })

        if(checkEmail){
            return res.send({
                status: false,
                statusCode: 402,
                message: 'User already exists!'
            })
        }
        
         await userModel.create(req.body)
         .then(() => {
            return res.send({
                status: true,
                statusCode: 201,
                message: 'User created successfully.'
            })
         })
         .catch((error) => {
            return res.send({
                status: false,
                statusCode: 422,
                message: 'error, User not created!'
            })
         })

    } catch (error) {
        console.log('error => ',error);
        return res.send({
            status: false,
            statusCode: 500,
            message: "Something Went Wrong!",
          });
    }
}

exports.userLogin = async(req,res) => {
    let checkValidations = await checkValidation(req,res)
    if(checkValidations){
        return;
    }
    
    try {
        const checkUser = await userModel.findOne({
            where: {email: req.body.email}
        })
        
        if(!checkUser){
            return res.send({
                status: false,
                statusCode: 401,
                message: 'Invalid Credentials!'
            });
        }else{
            const pass = req.body.password
            const comparePassword = bcrypt.compareSync(pass, checkUser.password)
            if(comparePassword){
                const secretKey = process.env.SECRET_JWT || 'thisisasecretkey'
                const token = await jwt.sign(
                    {
                        email: req.body.email,
                    },
                    secretKey,
                    {
                        expiresIn: '24h',
                    }
                );
                
                const userData = {};
                userData.id = checkUser.id;
                userData.name = checkUser.name;
                userData.email = checkUser.email;
                userData.token = token;
    
                return res.send({
                    status: true,
                    statusCode: 201,
                    message: 'Login Successfully!',
                    data: userData
                })
    
            }else{
                return res.send({
                    status: false,
                    statusCode: 401,
                    message: "Invalid Credentials!",
                  });  
            }
        }
    } catch (error) {
        console.log('error => ',error);
        res.send({
            status: false,
            statusCode: 500,
            message: "Something Went Wrong!",
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