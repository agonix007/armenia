
# Armenia Backend

Armenia Backend is a powerful and intuitive platform designed to streamline the web development process. With its comprehensive set of tools and user-friendly interface, Armenia Backend empowers developers to create dynamic and engaging websites with ease. Experience the efficiency and flexibility of Armenia Backend for seamless web development.


## Tech Stack

**Server:** Node

**Packages:** Express, mongoose, validator, dotenv, bcryptjs, jsonwebtoken, cookie-parser


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`SECRET_KEY`

`MONGODB_URL`


## API Reference

#### Get all Products

```http
  GET /api/products
```

#### Get Products by id

```http
  GET /api/products/${id}
```

#### Get User by id

```http
  GET /api/account/${id}
```

#### Set Address of any user

```http
  PATCH /api/products/${id}
```

#### Get Cart of a user

```http
  GET /api/cart
```

#### Add Product to Cart

```http
  POST /api/cart
```

#### Update & Delete Cart Items

```http
  PATCH /api/cart
```

#### Checkout

```http
  PATCH /api/cart
```

#### Register User

```http
  POST /api/auth/register
```

#### Login User

```http
  POST /api/auth/Login
```

#### Logout User from a particular device

```http
  GET /api/auth/logout
```

#### Logout User from all devices

```http
  GET /api/auth/logoutall
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/agonix007/armenia-backend.git
```

Go to the project directory

```bash
  cd armenia-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Start the server using nodemon. (Important to install nodemon)

```bash
  npm run dev
```

## Optimizations

Optimization by Armenia ensures that our website performs at its best, delivering optimal speed, efficiency, and user experience. With our expertise in optimization techniques, we fine-tune our website to achieve superior performance and maximize its potential.


## Lessons Learned

I learn the concept of Node.js, the coremodules of it. I learn to create a server on my own. Learn the usage of various kinds of packages and how to install them.

During this project I learn to connect it with MongoDB server.I faced an issue in connecting it when I try to connect it with Atlas. 

Eventually I learn many things from the mistakes I have made.


## Support

For support, email technology2203@gmail.com.

Or join my **Nas.io** community by visiting this link below: https://nas.io/crazzy-coders.

