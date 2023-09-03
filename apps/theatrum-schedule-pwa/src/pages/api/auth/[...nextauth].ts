import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { identifier, password } = credentials as {
          identifier: string;
          password: string;
        }

        const res = await fetch(`${process.env.DB_HOST}/auth/local`, {
          method: 'POST',
          body: JSON.stringify({ identifier, password }),
          headers: { "Content-Type": "application/json" }
        })

        const user = await res.json()
  
        if (res.ok && user) {
          return user
        }
        
        return null
      }
    })
  ]
}

export default NextAuth(authOptions)