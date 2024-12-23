const express = require('express')
const authController = require('./controllers/auth-controller')
const welcomeController = require('./controllers/welcome-controller')
const { optionalAuth, ensureAuth, ensureAdmin } = require('./middlewares/auth-middleware')
const usersControllers = require('./controllers/users-controllers')

const router = express.Router()


router.post('/auth/register',authController.register)
router.post('/auth/login',authController.login)

router.get('/welcome',optionalAuth,welcomeController.welcome)

router.get('/users',ensureAuth,ensureAdmin, usersControllers.index)
router.get('/users/:id',ensureAuth,ensureAdmin,usersControllers.show)
router.post('/users',ensureAuth,ensureAdmin,usersControllers.save)
router.delete('/users/:id',ensureAuth,ensureAdmin, usersControllers.delete)
module.exports = router