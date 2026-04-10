import tokenVerification from "../middleware/authMiddleware.js"
import express from'express'
import profileController from '../controllers/profileController.js'
import dashboardController from '../controllers/dashboardController.js'
import verifyRole from '../middleware/authorization.js'
const userRouter=express.Router()
userRouter.get("/profile",tokenVerification,profileController)
userRouter.get('/dashboard',tokenVerification,verifyRole,dashboardController);
export default userRouter;