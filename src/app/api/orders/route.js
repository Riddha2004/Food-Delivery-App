import {Order} from "@/models/Order";
import {authOptions, isAdmin} from "@/app/api/auth/[...nextauth]";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function GET(req) {
    mongoose.connect('mongodb+srv://riddharc2004:hLeIdyJt3nLnkPko@cluster0.bgxhztx.mongodb.net/food-ordering');

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const admin = await isAdmin();

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (_id) {
        return Response.json( await Order.findById(_id));
    }

    if(admin) {
        return Response.json(await Order.find());
    }
    
    if(userEmail) {
        return Response.json(await Order.find({userEmail}));
    }

}