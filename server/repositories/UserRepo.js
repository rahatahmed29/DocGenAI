import db from "../config/db.js"
import User from "../models/User.js"
export default class UserRepo{
static async findEmail(email){
    const [rows]=await db.query("select * from Users where email=?",[email])
    console.log("[rows] from findEmail(): ",rows)
    if(rows.length){
        const u=rows[0]
        return new User(u.id,u.name,u.email,u.password)
    }
    
    return null

}
static async createUser(name,email,password,role){
const[result]=await db.query("insert into Users(name,email,password,role) values(?,?,?,?)",[name,email,password,role])
return new User(result.insertId,name,email,password,role)
}


}