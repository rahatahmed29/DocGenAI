  const verifyRole=(req,res,next)=>{
    const role=req.user.role;
    if(role!=="admin"){
        res.status(403).json({message:'Access denied'});
    }

next();

}
export default verifyRole;