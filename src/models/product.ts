import client  from "../db"
import bcrypt from 'bcrypt'

export type product = {
    id?: number
    name: string
    price: number
    category: string
}

// const {
//     BCRYPT_PASSWORD,
//     SALT_ROUNDS
// } = process.env 

export class productStore {
    async index(): Promise<product[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw Error(`error in getting products from database - ${error}`)
        }
    }

    async show(id: string): Promise<product> {
        try {
        const sql = 'SELECT * FROM products WHERE id=($1)'
        const conn = await client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find class ${id}. Error: ${err}`)
        }
      }

      async create(s: product): Promise<product> {
        try {
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
            const conn = await client.connect()
            
            const result = await conn
                .query(sql, [s.name, s.price, s.category])
        
            const product = result.rows[0]
        
            conn.release()
        
            return product
        } catch (err) {
            throw new Error(`Could not add new product. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<product> {
        try {
        const sql = 'DELETE FROM products WHERE id=($1) RETURNING *'
        const conn = await client.connect()
    
        const result = await conn.query(sql, [id])
        conn.release()
    
        const product = result.rows[0]
    
    
        return product.id
        } catch (err) {
                throw new Error(`Could not delete student ${id}. Error: ${err}`)
            }
    }
}