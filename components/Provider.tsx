"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
  // session: Session;
};

function Provider({ children, session }: any) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Provider;
