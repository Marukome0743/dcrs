import { db } from "@/app/lib/schema"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  // callbacks: {
  //   signIn({ profile }) {
  //     if (!profile?.email) {
  //       return false
  //     }
  //     return profile.email.endsWith("@bnt.benextgroup.jp")
  //   },
  // },
  providers: [
    Resend({
      from: "lab.takizawa@openuplab-takizawa.com",
    }),
  ],
})
