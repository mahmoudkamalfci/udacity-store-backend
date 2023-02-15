import client  from "../db"
import bcrypt from 'bcrypt'

export type user = {
    id?: number
    firstname: string
    lastname: string
    password: string
}

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS
} = process.env 

export class userStore {
    async index(): Promise<user[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw Error(`error in getting users from database - ${error}`)
        }
    }

    async show(id: string): Promise<user> {
        try {
        const sql = 'SELECT * FROM users WHERE id=($1)'
        const conn = await client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find class ${id}. Error: ${err}`)
        }
      }

      async create(s: user): Promise<user> {
          try {
              const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *'
              const conn = await client.connect()
            
              const hash = bcrypt.hashSync(s.password + BCRYPT_PASSWORD?.trim(), Number(SALT_ROUNDS));
            
            const result = await conn.query(sql, [s.firstname, s.lastname, hash])
            
            const user = result.rows[0]
        
            conn.release()
        
            return user
        } catch (err) {
            throw new Error(`Could not add new user. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<user> {
        try {
        const sql = 'DELETE FROM users WHERE id=($1) RETURNING *'
        const conn = await client.connect()
    
        const result = await conn.query(sql, [id])
        conn.release()
    
        const user = result.rows[0]
            
        return user
        } catch (err) {
                throw new Error(`Could not delete user ${id}. Error: ${err}`)
            }
    }

    async authenticate(firstname: string, lastname: string, password: string): Promise<user|undefined>  {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users where firstname=($1) AND lastname=($2)'
            const result = await conn.query(sql, [firstname, lastname])
            conn.release()
            if(result.rows.length) {
                const user = result.rows[0]
                const validPassword = bcrypt.compareSync(
                    password + BCRYPT_PASSWORD,
                    user.password
                    );
                    
                  if(validPassword) {
                    return user
                  }
                  return undefined
            }
        } catch (error) {
            throw Error(`error in getting user from database - ${error}`)
        }
    }
}