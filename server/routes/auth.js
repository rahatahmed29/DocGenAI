import AuthCtrl from "../controllers/AuthCtrl";
import express from"express"
const router=express.Router()
router.post('/register',AuthCtrl.register)
router.post('/login',AuthCtrl.login)
export default router