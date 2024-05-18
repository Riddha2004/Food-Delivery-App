import {Order} from "@/models/Order";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function GET(req) {
    mongoose.connect('mongodb+srv://riddharc2004:hLeIdyJt3nLnkPko@cluster0.bgxhztx.mongodb.net/food-ordering');

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    let isAdmin = false;

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (_id) {
        return Response.json( await Order.findById(_id));
    }

    if(userEmail) {
        const useInfo = await UserInfo.findOne({email:userEmail});
        if(userInfo) {
            isAdmin = userInfo.admin;
        }
    }
            
    if(isAdmin) {
        return Response.json(await Order.find());
    }
    
    if(userEmail) {
        return Response.json(await Order.find({userEmail}));
    }

}
