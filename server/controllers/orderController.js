import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from "stripe"
import User from "../models/User.js";

export const placeOrderCOD = async (req, res) => {
  try{
    const { items, address } = req.body;
    const { userId } = req;

    if(!address || items.length === 0){
      return res.status(400).json({ success: false, message: "No items in the cart" });
    }


    //Calculate Amount Using Items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity
    }, 0);

    //Add Tax Charges (2%)
    amount += Math.floor(amount * 0.02);
    //Create Order
    await Order.create({ userId, items, address, amount, paymentType: "COD",
  });
  return res.json({success: true, message:"order placed successfully"});
}catch(error){
  return res.json({success: false, message: error.message});
}
}

// Place Order COD : /api/order/cod
export const placeOrderStripe = async (req, res) => {
  try{
    const { items, address } = req.body;
    const { userId } = req;
    const {origin} = req.headers;

    if(!address || items.length === 0){
      return res.status(400).json({ success: false, message: "No items in the cart" });
    }

    let productData = [];

    //Calculate Amount Using Items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
      return (await acc) + product.offerPrice * item.quantity
    }, 0);

    //Add Tax Charges (2%)
    amount += Math.floor(amount * 0.02);

    //Create Order
    const order = await Order.create({ userId, items, address, amount, paymentType: "Online",

    });
    //Stripe gate away installed
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    //Create line items for stripe
    const line_items = productData.map((item)=>{
      return{
        price_data: {
          currency: "usd",
          product_data:{
            name:item.name,
          },
          unit_amount: Math.floor(item.price + item.price * 0.02) *100
        },
        quantity: item.quantity,
      }
    })
    //create session
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata:{
        orderId: order._id.toString(),
        userId,
      }
    })
    return res.json({ success: true, url: session.url });

  }catch(error){
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Stripe webhook to verify payment actions : /stripe
export const stripeWebhooks = async (request, response)=>{
  //STRIPE GATE WAY INITIALIZE
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];
  let event;
  try{
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

  }catch(error){
    response.status(400).send(`webhook Error: ${error.message}`)

  }

  //Handle Event
  switch(event.type){
    case "payment_intent.succeeded":{
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;
      //Get Session Metadata
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });
      const {orderId, userId} = session.data[0].metadata;
      //MARK PAYMENT AS PAID
      await Order.findByIdAndUpdate(orderId, {isPaid: true})
      //clear user cart
      await User.findByIdAndUpdate(userId, {cartItems: {}});
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;
      //Get Session Metadata
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });
      const {orderId} = session.data[0].metadata;
      await Order.findByIdAndDelete(orderId);
      break;

    }
    default:
      console.error(`Unhandled event type ${event.type}`)
      break;
  }
  response.json({received: true})


}


//Get User Orders by user Id : /api/order/user
export const getUserOrders = async (req, res) => {
  try{
    const { userId } = req;
    const orders = await Order.find({ userId,
      $or: [{paymentType: "COD"}, {isPaid: true}]
    }).populate("items.product address").sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  }catch(error){
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Get All Orders (for seller / admin ) : /api/order/seller
export const getAllOrders = async (req, res) => {
  try{
    const orders = await Order.find({ 
      $or: [{paymentType: "COD"}, {isPaid: true}]
    }).populate("items.product address").sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  }catch(error){
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};