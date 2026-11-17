import { withAuth } from "next-auth/middleware";

// Enforce the session on the server for every page (including the
// `_next/data` requests behind getServerSideProps) and the push API.
export default withAuth({
  pages: { signIn: "/auth" },
});

// Excluded: the sign-in page, next-auth's own routes and static files
// (anything with a dot: sw.js, workbox-*.js, manifest.json, icons, ...).
export const config = {
  matcher: ["/((?!auth$|auth/|api/auth|_next/static|_next/image|.*\\.).*)"],
};
