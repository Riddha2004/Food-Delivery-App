import clientPromise from "@/libs/mongoConnect";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import {User} from "@/models/User";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { UserInfo } from "@/models/UserInfo";

export const authOptions = {
  secret: "gchgjbdcjhbvfbkjnhvdkjskjd",
  adapter: MongoDBAdapter(clientPromise),
  providers:[
   GoogleProvider({
     clientId: "1097358701106-9g8fqblr3l8pfshh85eeqajsesrstgei.apps.googleusercontent.com",
     clientSecret: "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",
   }),
   CredentialsProvider({
       name: 'Credentials',
       id: 'credentials',
       credentials: {
         username: { label: "Email", type: "email", placeholder: "test@example.com" },
         password: { label: "Password", type: "password" }
       },
       async authorize(credentials, req) {
         const email=credentials?.email;
         const password=credentials?.password;
         
         mongoose.connect("mongodb+srv://riddharc2004:hLeIdyJt3nLnkPko@cluster0.bgxhztx.mongodb.net/food-ordering");
         const user = await User.findOne({email});
         const passwordOk=user && bcrypt.compareSync(password , user.password);

         if(passwordOk) {
           return user;
         }

         return null
       }
     })
  ],  
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if(!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({email:userEmail});
  if(!userInfo) {
    return false;
  }
  return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }