import AuthService from "../services/AuthService.js";
export default class  AuthCtrl{
    static async  register(req,res){
        try{
          const {name,email,password}=req.body
          const user=await AuthService.register(name,email,password)
          res.status(201).json(user)
        }
        catch(err){
           res.json({error_from_AuthCtrl_register:err.message})
        }
    }

     static async  login(req,res){
    try{
        const {email,password}=req.body
        const token=await AuthService.login(email,password)
        res.status(201).json({
            message:"Login Sucessful",
            token
        })
    }
    catch(err){
        res.status(400).json({error_from_AuthService_login:err.message})
    }

}
}
