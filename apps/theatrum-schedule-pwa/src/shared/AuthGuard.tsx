import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { Loader } from "./components";

interface SessionRoter {
  children: ReactNode;
}

export const AuthGuard: React.FC<SessionRoter> = ({ children }) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "loading") return; // Still loading, do nothing
    if (!session.data) {
      router.push("/auth");
    }
  }, [session, router]);

  if (session.status === "loading") {
    return <Loader />;
  }

  return <>{children}</>;
};
