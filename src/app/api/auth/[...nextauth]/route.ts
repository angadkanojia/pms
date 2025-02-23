// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import { authOptions } from "../../../lib/auth"; // Adjust the path to where your authOptions are defined

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // Export the NextAuth handler for GET and POST requests
