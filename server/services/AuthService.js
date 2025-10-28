import UserRepo  from "../repositories/UserRepo";   
export default class AuthService{
   static async register(name,email,password){
    const isExist=await UserRepo.findEmail(email)
    if(isExist)throw new Error("User already exists")
    const newUser=await UserRepo.createUser(name,email,password)
  return newUser
   } 

   static async login (email,password){
    const user=await UserRepo.findEmail(email)
    if(!user) throw new Error("Invalid credentials")
        if(!user.password!=password) throw new Error("Invalid Password")
            return user;
   }
}