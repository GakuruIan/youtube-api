const router = require('express').Router()
const Upload = require('../services/SingleUpload')
const UserController = require('../controllers/UserControllers')
const passport = require('passport')
const VerifyToken = require('../middlewares/VerifyToken')

// user routes
router.post('/register',Upload,UserController.Register);

router.post('/login',UserController.Login)

//user protected route
router.get('/profile',VerifyToken,UserController.Profile)
router.post('/edit/profile/:id',VerifyToken,Upload,UserController.UpdateProfile)
router.delete('/delete/:id/photo',VerifyToken,UserController.RemoveImage)

// end of user routes

module.exports =router