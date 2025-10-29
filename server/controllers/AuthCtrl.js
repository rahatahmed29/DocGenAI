import AuthService from "../services/AuthService";
export default class AuthCtrl{
    static async register(req,req){
        try{
          const {name,email,password}=req.body
          const user=await AuthService.register(name.email,password)
          res.status(201).json(user)
        }
        catch(err){
           res.status(400).json({error:err.message})
        }
    }

    static async login(req,res){
    try{
        const {email,password}=req.body
        const user=await AuthService.login(email.password)
        res.status(201).json(user)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }

}
}
