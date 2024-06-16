import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Placing User Order for Frontend
const placeOrder = async (req, res) => {

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name
              },
              unit_amount: item.price*100*80
            },
            quantity: item.quantity
          }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charge"
                },
                unit_amount: 5*80*100
            },
            quantity:1
        })
        const session_url = `http://localhost:5173/verify?success=true&orderId=${newOrder._id}`
        //   const session = await stripe.checkout.sessions.create({
        //     success_url: `http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
        //     cancel_url: `http://localhost:5173/verify?success=false&orderId=${newOrder._id}`,
        //     line_items: line_items,
        //     mode: 'payment',
        //   });
      
          res.json({success:true,session_url:session_url});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Listing Order for Admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// User Orders for Frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        console.log(orders);
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const updateStatus = async (req, res) => {
    console.log(req.body);
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }

}

const verifyOrder = async (req, res) => {
    res.json({ success: true, message: "Paid" })
}

export { placeOrder, listOrders, userOrders, updateStatus ,verifyOrder }