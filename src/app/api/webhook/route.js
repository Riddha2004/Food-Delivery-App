import {Order} from "@/models/Order";

const stripe = require('stripe')('sk_test_51PHKK8IDNa2qGKdDNr3gEZ78hsf2TeP1nlzrp5kiNIJEm9PIqVUWs4kclstnj3LyBvijFfrPZn2YuUeCZs4YjuEx00juM8g1do');

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = 'whsec_64a17ea5e4873366dd1d2911f18f4f93996648dc3f9c991ed418c857acd78732';
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error('stripe error');
    console.log(e);
    return Response.json(e, {status: 400});
  }

  if (event.type === 'checkout.session.completed') {
    console.log(event);
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === 'paid';
    if (isPaid) {
      await Order.updateOne({_id:orderId}, {paid:true});
    }
  }

  return Response.json('ok', {status: 200});
}