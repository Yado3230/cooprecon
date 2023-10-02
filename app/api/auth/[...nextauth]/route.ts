import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials ?? {};
//         if (!email || !password) {
//           throw new Error("Missing username or password");
//         }
//         const user = await prismadb.user.findUnique({
//           where: {
//             email,
//           },
//         });
//         // if user doesn't exist or password doesn't match
//         if (!user || !(await compare(password, user.password || ""))) {
//           throw new Error("Invalid username or password");
//         }
//         // return user;
//         return {
//           id: user?.id + "",
//           email: user?.email,
//           name: user?.name,
//           randomKey: "Hey Cool",
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     session: ({ session, token }) => {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id,
//         },
//       };
//     },
//     jwt: ({ token, user }) => {
//       if (user) {
//         const u = user as unknown as any;
//         return {
//           ...token,
//           id: u.id,
//           name: u.name,
//           email: u.email,
//         };
//       }
//       return token;
//     },
//   },
// };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
