"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import SignOutButton from "./SignOutButton";
import LogoDashboard from "./LogoDashboard";

interface NavLink {
  name: string;
  href: string;
  icon: ReactNode;
}

const navLinks: NavLink[] = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-7 w-7 md:h-5 md:w-5" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-7 w-7 md:h-5 md:w-5" />,
  },
  {
    name: "Guest Profile",
    href: "/account/profile",
    icon: <UserIcon className="h-7 w-7 md:h-5 md:w-5" />,
  },
];

export default function SideNavigation() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`border-t-2 max-md:bg-primary-950 z-10 border-primary-800 md:border-r  md:border-primary-900 py-2 max-md:w-full md:h-screen fixed  bottom-0 h-[60px] md:sticky md:top-0 
    transition-all duration-300 ease-in-out
    ${isOpen ? "w-[60px] px-2" : "w-[250px] px-4"}`}
    >
      <div className="flex flex-col h-full justify-between overflow-hidden">
        <ul className="overflow-hidden max-md:flex items-center justify-between ">
          <li className="mb-10 max-md:hidden flex items-center justify-end">
            <div className={`${isOpen && "hidden"} `}>
              <LogoDashboard />
            </div>

            <button
              onClick={() => setIsOpen((cur) => !cur)}
              className="p-2 cursor-pointer ml-auto hover:bg-primary-900 rounded transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`size-6 transition-transform duration-200 
              ${isOpen ? "rotate-180" : "rotate-0"}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                />
              </svg>
            </button>
          </li>
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-4 p-3 rounded-md transition-colors
                hover:bg-primary-900
                ${active ? "text-[#5e63ff]" : "text-[#e6e6ef]"}`}
                >
                  <span
                    className={`${
                      active ? "text-[#5e63ff]" : "text-[#e6e6ef]"
                    }`}
                  >
                    {link.icon}
                  </span>

                  <span
                    className={`max-md:hidden transition-all text-nowrap duration-300  
                  ${isOpen ? "opacity-0 w-0" : "opacity-100"}`}
                  >
                    {link.name}
                  </span>
                </Link>
              </li>
            );
          })}
          <li className="list-none md:mb-4 md:hidden">
            <SignOutButton isOpen={isOpen} />
          </li>
        </ul>

        <li className="list-none mb-4 max-md:hidden">
          <SignOutButton isOpen={isOpen} />
        </li>
      </div>
    </nav>
  );
}
