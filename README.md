## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

# get start with project 
- install all required packages (npm install)
- application run on port 3000 (localhost:3000)
- database run on default port 5432
- build app (npm run build)
- watch or start this app ( npm run watch)
- run test ( npm run test)
- run migration up & down (db-migrate up - db-migrate down)

# db instruction (to work with this project you need)
- create dev database called store
- create test database called store_test

# database credentials
- POSTGRES_HOST = localhost
- POSTGRES_DB = store
- POSTGRES_DB_TEST = store_test
- POSTGRES_USER = postgres
- POSTGRES_PASSWORD = root
- ENV=dev
- BCRYPT_PASSWORD=your-secret-password
- SALT_ROUNDS=10
- TOKEN_SECRET=your-secret-password

# all product endpoints
- /users/authenticate (GET get user token body[firstname, lastname, password])
- /users               (GET get all users)
- /users/:id            (GET get user by id)
- /users                (POST create new user body[firstname,lastname,password])
- /users/:id            (DELETE delete user by id)

- /products               (GET get all products)
- /products/:id            (GET get products by id)
- /products                (POST create new products body[name,price,quantity])
- /products/:id            (DELETE delete products by id)

- /orders               (GET get all orders)
- /orders/:id            (GET get orders by id)
- /orders                (POST create new orders body[name,price,quantity])
- /orders/:id            (DELETE delete orders by id)
- /userOrders/:id         (GET get orders by userid :id is a user_id)
- addtocart               (POST add product to specific order body[order_id, product_id, quantity] create order first)

# database schema
- user              (id INTEGER, firstname VARCHAR(50), lastname VARCHAR(50), password VARCHAR(25))
- product           (id INTEGER, name VARCHAR(100), price DECIMAL(10, 2), category VARCHAR(100))
- order             (id INTEGER, user_id INTEGER, order_status VARCHAR(10))
- order_products    (id, order_id INTEGER reference to order.id, product_id INTEGER reference to product.id, quantity INTEGER)

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.



