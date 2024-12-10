module.exports = {
    //get / welcome
    welcome:(req,res) =>{
        const displayName = req.autenticatedUser?.name ?? 'visitante'

        res.json({message: `Seja be-vindo,${displayName}`})
    }
}