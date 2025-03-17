import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Add your custom property here
  }

  interface User {
    // Extend the User interface if needed
    id?: string; // Example: adding an id property
  }
}