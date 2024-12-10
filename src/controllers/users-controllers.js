const users = require("../models/users")

module.exports = {
    //get /users
    index:(req,res) => {
        const allUsers = users.findAll()

        res.json(allUsers)
    }

    //get /users/:id
    
    //post /users

    //delete /users/:id


}