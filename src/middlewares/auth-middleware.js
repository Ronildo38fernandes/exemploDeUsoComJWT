const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/environment')
const users = require('../models/users')

module.exports = {

    optionalAuth : (req,res,next) =>{
        const authHeader  = req.headers.authorization
        
        if(!authHeader) {
            next()
        }else {
            const token = authHeader.split(' ')[1]

            try {

                const {id} = jwt.verify(token,JWT_SECRET)
                const user = users.findById(id)

                if(!user) return res.status(404).json({message : "usuário não encontrado"})


                req.autenticatedUser = user
                next()
                
            } catch (error) {
                return res.status(401).json({message:"token invalido"})
            }
        }
    }
}