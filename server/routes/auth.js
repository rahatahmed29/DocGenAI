import AuthCtrl from "../controllers/AuthCtrl.js";
import express from"express"
const authRouter=express.Router()
authRouter.post('/register',AuthCtrl.register)
authRouter.post('/login',AuthCtrl.login)
export default authRouter