import express from 'express'
import userController from '../controllers/user.controller.js';
import auth from '../middleware/auth.middleware.js'

const userRouter = express.Router()


userRouter.get("/me",auth, userController.getUserData)


export default userRouter;