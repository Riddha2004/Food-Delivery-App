import {isAdmin} from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import {User} from "@/models/User";


export async function GET() {
    mongoose.connect("mongodb+srv://riddharc2004:hLeIdyJt3nLnkPko@cluster0.bgxhztx.mongodb.net/food-ordering");
    if(await isAdmin()) {
        const users = await User.find();
        return Response.json(users);
    } else {
        return Response.json([]);
    }
}