const Cart = require("../models/cart");
const config = require("../config/config");

const checkouts = async(user) =>{
    const cart = await Cart.findOne({ email: user.email });
    if(!cart || cart===null){
        throw new Error("User doesn't have a cart");
    }
    else if(cart.cartItems.length === 0){
        throw new Error("User cart doesn't have any product");
    }
    else if(user.address === config.default_address){
        
    }
};

module.exports = checkouts;