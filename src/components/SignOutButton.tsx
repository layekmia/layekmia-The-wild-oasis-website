"use client";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";

export default function SignOutButton({ isOpen }: { isOpen: boolean }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
      className="
    w-full cursor-pointer 
    flex flex-col md:flex-row items-center justify-center md:justify-start
    gap-1 md:gap-4 p-3 rounded-md 
    hover:bg-primary-900 transition-colors text-[#e6e6ef]
  "
    >
      <ArrowRightOnRectangleIcon className="h-7 w-7 md:h-5 md:w-5 shrink-0" />
      <span className="md:hidden block text-[10px] text-center leading-tight">
        Sign out
      </span>
      <span
        className={`
      max-md:hidden transition-all duration-300 overflow-hidden
      ${isOpen ? "opacity-0 w-0" : "opacity-100 w-auto"}
    `}
      >
        Sign out
      </span>
    </button>
  );
}
