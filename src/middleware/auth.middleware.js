const jwt = require('jsonwebtoken')

const db = require('../models/index')
const userModel = db.user

require('dotenv').config()

const auth = () => {
    return async function(req,res,next){
        try {
            const authHeader = req.headers.authorization;
            const Bearer = 'Bearer '
            if(!authHeader || !authHeader.startsWith(Bearer)){
                return res.send({
                    status: false,
                    statusCode: 401,
                    message: 'Access Denied!'
                })
            }

            const token = authHeader.replace(Bearer, '');
            const secretKey = process.env.SECRET_JWT || 'thisisasecretkey'

            // verify token
            const decode = await jwt.verify(token, secretKey)
            const findUser = await userModel.findOne({
                where: {email: decode.email }
            })

            if(!findUser){
                return res.send({
                    status: false,
                    statusCode: 401,
                    message: 'Unauthorized User!'
                })
            }

            req.currentUser = findUser;
            req.userId = findUser.id;
            next();

        } catch (error) {
            return res.send({
                status: false,
                statusCode: 401,
                message: "Invalid Token!",
              });
        }
    }
}

module.exports = auth;