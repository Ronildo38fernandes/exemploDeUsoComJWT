const users = require("../models/users")

module.exports = {
    //get /users
    index:(req,res) => {
        const allUsers = users.findAll()

        res.json(allUsers)
    },

    //get /users/:id
    show:(req,res)=>{
        const {id} = req.params
        const user = users.findById(id)

        if(!user){
            return res.status(404).json({message: "não encontrado"})
        }
        res.json(user)
    },
    //post /users

    save:(req,res) =>{
        const {name,email,senha,role} = req.body

        if(
            typeof name !== 'string'||typeof email !== 'string'||typeof senha !== 'string' || 
            typeof role !== 'string' || !role.match(/^(admin|standard)$/)
        ){
            return res.status(400).json({message:'campos invalidos'})
        }

        const newUser = users.createUser(name,email,senha,role)
        if(!newUser) return res.status(400).json({message :"email já esta em uso"})
        res.status(201).json(newUser)
    },

    //delete /users/:id
    delete:(req,res) => {
        const {id} = req.params
        const user = users.findById(id)

        if(!user) return res.status(404).json({message:"usuário não encontrado"})
        
        const deletedUser = users.deleteUser(id)
        if(!deletedUser) return res.status(400).json({message: 'Erro de exclusão'})
        
        res.status(200).json(deletedUser)

    }


}