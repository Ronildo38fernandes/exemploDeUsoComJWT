const { JWT_SECRET } = require("../config/environment")
const users = require("../models/users")

const jwt = require('jsonwebtoken')



module.exports = {
    //post /auth/register
    register: (req,res)=>{
        const {name,email,senha} = req.body

        if(typeof name !== 'string'||typeof email !== 'string'||typeof senha !== 'string'){
            return res.status(400).json({message:'campos invalidos'})
        }

        const registeredUser = users.registerUser(name,email,senha)

        if(!registeredUser){
            return res.status(400).json({message :'Email ja esta em uso'})

        }
        

        res.status(201).json(registeredUser)
    },
    login: (req,res)=>{
        const {email,senha} = req.body

        if(typeof email !== 'string'||typeof senha !== 'string'){
            return res.status(400).json({message:'campos invalidos'})
        }

        const user = users.findByEmail(email)

        if(!user) return res.status(404).json({message : 'Usuario não encontrado'})
        
        if(user.senha !== senha) return res.status(400).json({message: 'credencial invalida'})
        
        payload = {id: user.id, email : user.email}

        const token = jwt.sign(payload,JWT_SECRET,{expiresIn: '1d'})

        res.json({token})
    },
}