users = [
    {id:'1',name:'Ronildo Fernandes',email:'ronildo@email.com',senha:'123456',role:'admin'}
]

module.exports = {
    findAll: () => users,

    findById : (id) => users.find(user => user.id === id),
    
    findByEmail : (email) => users.find(user => user.email === email),

    registerUser: (name,email,senha) =>{
        const userAlreadRegistered =  users.find(user => user.email === email)
        
        if(userAlreadRegistered){
            return null
        }

        const newUser = {
            id: Math.floor(Math.random() * 99999).toString(),
            name,
            email,
            senha,
            role:'standard'
        }
        users.push(newUser)
        return newUser
    },

    createUser: (name,email,senha,role) =>{
        const userAlreadRegistered =  users.find(user => user.email === email)
        
        if(userAlreadRegistered){
            return null
        }

        const newUser = {
            id: Math.floor(Math.random() * 99999).toString(),
            name,
            email,
            senha,
            role
        }
        users.push(newUser)
        return newUser
    },
    
    deleteUser: (id) => {
        const index = users.findIndex(user => user.id === id)

        if(index === -1) return null

        const [deletedUser] = users.splice(index,1)

        return deletedUser
    }
}