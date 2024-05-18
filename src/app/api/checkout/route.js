import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
const stripe = require('stripe')('sk_test_51PHKK8IDNa2qGKdDNr3gEZ78hsf2TeP1nlzrp5kiNIJEm9PIqVUWs4kclstnj3LyBvijFfrPZn2YuUeCZs4YjuEx00juM8g1do');

export async function POST(req) {
  mongoose.connect("mongodb+srv://riddharc2004:hLeIdyJt3nLnkPko@cluster0.bgxhztx.mongodb.net/food-ordering");
  
  const {cartProducts, address} = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {
      
      const productInfo = await MenuItem.findById(cartProduct._id);
      
      let productPrice = productInfo.basePrice;
      if(cartProduct.size) {
          const size = productInfo.sizes.find(size => size._id.toString() === cartProduct.size._id.toString());
          productPrice += size.price;
        }
        if (cartProduct.extras?.length > 0) {
            for(const cartProductExtraThing of cartProduct.extras) {
              const productExtras = productInfo.extraIngredientPrices;
                const extraThingInfo = productExtras.find(extra => extra._id.toString() === cartProductExtraThing._id.toString());
                productPrice += extraThingInfo.price;
            }
        }
    
    const productName = cartProduct.name;
        
    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: 'INR',
        product_data:{
          name: productName,
        },
        unit_amount: productPrice*100,
      },
    });
  }

  const  stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    customer_email: userEmail,
    success_url: 'http://localhost:3000/'+'orders/' + orderDoc._id.toString() + '?clear-cart=1',
    cancel_url: 'http://localhost:3000/'+'cart?canceled=1',
    metadata: {orderId:orderDoc._id.toString()},
    payment_intent_data : {
       metadata: {orderId: orderDoc._id.toString()},
    },
    shipping_options: [
        {
            shipping_rate_data: {
               display_name: 'Delivery fee',
               type: 'fixed_amount',
               fixed_amount: {amount: 4000, currency:'INR'},
            },
        }
    ],
  }); 

  return Response.json(stripeSession.url);

 }