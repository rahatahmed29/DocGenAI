import express from "express"
const dashboardRouter=express.Router();
dashboardRouter.get('/dashboard',auth)
export default dashboardRouter