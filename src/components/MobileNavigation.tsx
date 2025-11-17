"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function MobileNavigation() {
  const { data: session } = useSession();
  const [isToggle, setIsToggle] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        e.target instanceof Node &&
        !menuRef.current.contains(e.target)
      ) {
        setIsToggle(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="py-4 px-4 z-50  md:hidden md:px-6 lg:py-5 lg:px-8 border-b border-b-primary-700">
      <div className="flex items-center justify-between relative">
        <Logo />

        {/* Hamburger */}
        <button onClick={() => setIsToggle(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>
        </button>

        {isToggle && (
          <div className="fixed inset-0  backdrop-blur-sm z-20 transition-opacity" />
        )}
        <nav
          ref={menuRef}
          className={`fixed top-0 z- left-0 bottom-0 w-[250px] bg-primary-950 h-screen py-5 px-4 z-30 transform transition-transform duration-300
            ${isToggle ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between mb-10">
            <Logo />

            <button onClick={() => setIsToggle(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <ul className="flex flex-col px-4 gap-6">
            <li>
              <Link
                className="hover:text-accent-400 transition-colors"
                href="/cabins"
                onClick={() => setIsToggle(false)}
              >
                Cabins
              </Link>
            </li>

            <li>
              <Link
                className="hover:text-accent-400 transition-colors"
                href="/about"
                onClick={() => setIsToggle(false)}
              >
                About
              </Link>
            </li>

            <li>
              {session?.user?.image ? (
                <Link
                  href="/account"
                  className="hover:text-accent-400 transition-colors flex items-center gap-4"
                  onClick={() => setIsToggle(false)}
                >
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? "User profile"}
                    width={32}
                    height={32}
                    className="rounded-full"
                    referrerPolicy="no-referrer"
                  />
                  <span>{session?.user?.name ?? "Anonymous"}</span>
                </Link>
              ) : (
                <Link
                  className="hover:text-accent-400 transition-colors"
                  href="/account"
                  onClick={() => setIsToggle(false)}
                >
                  Guest area
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
