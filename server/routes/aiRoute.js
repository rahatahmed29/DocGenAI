import AIDocCtrl from "../controllers/AIDocCtrl.js";   
import express from "express"
const aiRouter=express.Router()
aiRouter.post('/doc',AIDocCtrl.annotate)
export default aiRouter;