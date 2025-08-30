import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { Loader } from "./components";

interface SessionRoter {
  children: ReactNode;
}

export const SessionRouter: React.FC<SessionRoter> = ({ children }) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status !== "authenticated" && session.status !== "loading") {
      router.replace("/auth");
    }
  }, [router, session.status]);

  if (router.pathname !== "/auth" && session.status !== "authenticated") {
    return <Loader />;
  }

  return <>{children}</>;
};
