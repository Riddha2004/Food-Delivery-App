import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";
import { isAdmin } from "@/libs/auth";

export async function POST(req) {
  mongoose.connect("mongodb+srv://riddharc2004:hLeIdyJt3nLnkPko@cluster0.bgxhztx.mongodb.net/food-ordering");
  const data = await req.json();
  if(await isAdmin()) {
    const menuItemDoc = await MenuItem.create(data);
    return Response.json(menuItemDoc);
  } else {
    return Response.json({});
  }
}

export async function PUT(req) {
  mongoose.connect("mongodb+srv://riddharc2004:hLeIdyJt3nLnkPko@cluster0.bgxhztx.mongodb.net/food-ordering");
  if(await isAdmin()) {
    const {_id,...data} = await req.json();
    await MenuItem.findByIdAndUpdate(_id,data);
  }
  return Response.json(true);
  
}

export async function GET() {
    mongoose.connect("mongodb+srv://riddharc2004:hLeIdyJt3nLnkPko@cluster0.bgxhztx.mongodb.net/food-ordering");
      return Response.json(
        await MenuItem.find()
      );
}

export async function DELETE(req) {
  mongoose.connect();
  const url = new URL(req.url);
  const  _id = url.searchParams.get('_id');
  if(await isAdmin()) {
    await MenuItem.deleteOne({_id});
  }
  return Response.json(true);
}