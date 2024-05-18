import { Category } from "@/models/Category";
import mongoose from "mongoose";

export async function POST(req) {
  mongoose.connect("mongodb+srv://riddharc2004:hLeIdyJt3nLnkPko@cluster0.bgxhztx.mongodb.net/food-ordering");
    const {name} = await req.json();
      const categoryDoc = await Category.create({name});
      return Response.json(categoryDoc);
}

export async function PUT(req) {
  mongoose.connect("mongodb+srv://riddharc2004:hLeIdyJt3nLnkPko@cluster0.bgxhztx.mongodb.net/food-ordering");
  const {_id,name} = await req.json();
  await Category.updateOne({_id}, {name});
  return Response.json(true);
}

export async function GET() {
  mongoose.connect("mongodb+srv://riddharc2004:hLeIdyJt3nLnkPko@cluster0.bgxhztx.mongodb.net/food-ordering");
  return Response.json(
    await Category.find()
  );
}

export async function DELETE(req) {
  mongoose.connect("mongodb+srv://riddharc2004:hLeIdyJt3nLnkPko@cluster0.bgxhztx.mongodb.net/food-ordering");
  const url = new URL(req.url);
  const  _id = url.searchParams.get('_id');
  await Category.deleteOne({_id});
  return Response.json(true);
}
