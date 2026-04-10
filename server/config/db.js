import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
class Database {
    static instance=null;
  constructor() {
    if (!Database.instance) {
      this.pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database:process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
          Database.instance=this

    }
      return Database.instance

  }
  getPool(){
    return this.pool;
  }
  
  

}
  const dbInstance=new Database()
  export default dbInstance.getPool();

