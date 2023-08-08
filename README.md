
# Armenia Sneakers and Leather Products

Welcome to the Armenia Sneakers and Leather Products project! This is a web development project aimed at providing a platform for users to explore and purchase high-quality sneakers and leather products. Armenia is a powerful and intuitive platform designed to streamline the web development process.

## Features

- Browse a wide range of sneakers and leather products.
- User authentication and registration.
- Shopping cart functionality.
- Secure checkout process.
- Order tracking and history.
- Admin panel for managing products and users.
## Tech Stack

**Frontend:** HTML, CSS, JavaScript, Handlebars

**Server:** Node

**Packages:** Express, mongoose, validator, dotenv, bcryptjs, jsonwebtoken, cookie-parser, uuid, hbs

**Database:** Mongo Db


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

#### Add Products

```http
  POST /api/products
```

#### Get User Profile

```http
  GET /api/account
```

#### Set Address of any user

```http
  PATCH /api/products
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

#### Payment Options

```http
  PATCH /api/cart/payment
```

#### Checkout

```http
  PATCH /api/cart/checkout
```

#### Get Orders

```http
  GET /api/orders
```

#### Get Orders by ID

```http
  GET /api/orders/${id}
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
  git clone https://github.com/agonix007/armenia.git
```

Go to the project directory

```bash
  cd armenia
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

## Future Implementations

While the current version of the project is functional and offers a range of features, there are several exciting ideas for future enhancements:

- Integration with a payment gateway for seamless transactions.
- Enhanced product search and filtering options.
- User reviews and ratings for products.
- International shipping options and currency conversion.
- Mobile Responsiveness.

## Optimizations

Optimization by Armenia ensures that our website performs at its best, delivering optimal speed, efficiency, and user experience. With our expertise in optimization techniques, we fine-tune our website to achieve superior performance and maximize its potential.


## Lessons Learned

I learn the concept of Node.js, the coremodules of it. I learn to create a server on my own. Learn the usage of various kinds of packages and how to install them.

During this project I learn to connect it with MongoDB server.I faced an issue in connecting it when I try to connect it with Atlas. 

Eventually I learn many things from the mistakes I have made.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to submit a pull request.

## Collaborators

This project was made possible through the collaborative efforts of:

- [Bikram Pal](https://github.com/agonix007)
- [Apurba Dutta](https://github.com/apurba2099)

Mainly the Frontend part was done by **Aburba Dutta**. And the Backend & Integration part was done by **Me**.

## Support

For support, email technology2203@gmail.com.

Or join my **Nas.io** community by visiting this link below: https://nas.io/crazzy-coders.

