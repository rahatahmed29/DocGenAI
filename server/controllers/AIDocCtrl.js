import AIDocService from "../services/AIDocService.js";    
export default class AIDocCtrl{
    static async annotate(req,res){
        try{
            const{code,style}=req.body
            const openAIResp= await AIDocService.annotateCode(code,style)
        return res.status(201).json({
            ok:true,
            code:openAIResp
        })

        }catch(err){
            console.log("[AIDocController] annotate() error:", err)
        return res.status(500).json({
            ok:false,
            message:err.message      

        })
        }
        
    }
}