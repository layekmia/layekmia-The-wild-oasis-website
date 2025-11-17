"use client";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";

export default function SignOutButton({ isOpen }: { isOpen: boolean }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
      className="w-full cursor-pointer flex  items-center gap-4 p-3 rounded-md 
      hover:bg-primary-900 transition-colors text-[#e6e6ef]"
    >
      <ArrowRightOnRectangleIcon className="h-5 w-5 max-md:h-7 max-md:w-7 shrink-0" />
      <span
        className={`transition-all max-md:hidden duration-300 overflow-hidden 
          ${isOpen ? "opacity-0 w-0" : "opacity-100 w-auto"}`}
      >
        Sign out
      </span>
    </button>
  );
}
