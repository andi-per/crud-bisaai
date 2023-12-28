"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
  LiteralUnion,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

function Nav() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<null | Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user && !isLoading ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button className="outline_btn" onClick={() => signOut()}>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image!}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              !isLoading &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      {session?.user && !isLoading ? (
        <div className="sm:hidden flex relative">
          <Image
            src={session?.user.image!}
            alt="profile"
            width={37}
            height={37}
            className="rounded-full"
            onClick={() => setToggleDropdown((prev) => !prev)}
          />

          {toggleDropdown && (
            <div className="dropdown">
              <Link
                className="dropdown_link"
                href="/profile"
                onClick={() => setToggleDropdown(false)}
              >
                My Profile
              </Link>
              <Link
                className="dropdown_link"
                href="/create-prompt"
                onClick={() => setToggleDropdown(false)}
              >
                Create Prompt
              </Link>

              <button
                className="black_btn mt-5 w-full"
                onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {providers &&
            !isLoading &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn sm:hidden"
              >
                Sign In
              </button>
            ))}
        </>
      )}
    </nav>
  );
}

export default Nav;
