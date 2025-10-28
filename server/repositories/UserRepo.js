import db from "../config/db.js"
import User from "../models/User.js"
export default class UserRepo{
static async findEmail(email){
    const [rows]=await db.query("select * from users where email=?",[email])
    console.log("[rows] from findEmail(): ",rows)
    if(rows.length){
        const u=rows[0]
        return new User(u.id,u.name,u.email,u.password)
    }
    return null

}
static async createUser(name,email,password){
const[result]=await db.query("insert into users(name,email,password) values(?,?,?)",[name,email,password])
return new User(result.insertId,name,email.password)
}


}