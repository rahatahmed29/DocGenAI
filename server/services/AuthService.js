import UserRepo  from "../repositories/UserRepo.js";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt"   
export default class AuthService{
   static async register(name,email,password){
    const isExist=await UserRepo.findEmail(email)
    if(isExist)throw new Error("User already exists")
        const saltRound=10;
    const hashedPassword=await bycrypt.hash(password,saltRound);
    const role='user';
    const newUser=await UserRepo.createUser(name,email,hashedPassword,role)
  return newUser
   } 

   static async login (email,password){
    const user=await UserRepo.findEmail(email)
    if(!user) throw new Error("Invalid credentials")
        const match=await bycrypt.compare(password,user.password)
        if(!match) throw new Error("Invalid email or password")
            const payload={
        id:user.id,
        email:user.email,
        role:user.role
            };
            const token= jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"1h"
            });
            return token;
            
   }
}