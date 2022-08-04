# Goel-Medz-shop
Working on an E-commerce web app for medical store products.

## Features
API-Server:
1. Users can register, login (authentication is done using JWT for admin or other users). 
2. CRUD APIs for users, products, orders, cart.
3. State management is done using Redux and Redux Persist to persist the app's state like user login and cart on reload.
3. Once we have added products to the cart, we can checkout using Stripe.

Client side:
1. App components uses react, styled-components, material-ui, react-redux.

## Credentials for testing
* Stripe checkout

![image](https://user-images.githubusercontent.com/62262069/182367774-81cb8f99-b698-4efa-bd2c-a26384779f2a.png)


* Admin account
  - username: user1
  - password: 12345

## Tech Stack
* MongoDB Atlas
* React.js
* Express.js
* Node.js
* Redux.js
* JSON Web Tokens or JWTs
* React- Stripe Checkout
