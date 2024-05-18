import {User} from "@/models/User";
import mongoose from "mongoose";


export async function GET() {
    mongoose.connect("mongodb+srv://riddharc2004:hLeIdyJt3nLnkPko@cluster0.bgxhztx.mongodb.net/food-ordering");
        const users = await User.find();
        return Response.json(users);
}
