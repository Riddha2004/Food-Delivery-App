import clientPromise from "@/libs/mongoConnect";
import {UserInfo} from "@/models/UserInfo";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import {User} from '@/models/User';
import NextAuth, {getServerSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"

export const authOptions = {
  secret: 'gchgjbdcjhbvfbkjnhvdkjskjd',
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: '1097358701106-9g8fqblr3l8pfshh85eeqajsesrstgei.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect('mongodb+srv://riddharc2004:hLeIdyJt3nLnkPko@cluster0.bgxhztx.mongodb.net/food-ordering');
        const user = await User.findOne({email});
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) {
          return user;
        }

        return null
      }
    })
  ],
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
