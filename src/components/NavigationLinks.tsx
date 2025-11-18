"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface UserSession {
  user?: {
    name?: string | null;
    image?: string | null;
  } | null;
}

interface NavigationLinksProps {
  session: UserSession | null;
}

export default function NavigationLinks({ session }: NavigationLinksProps) {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `
      transition-colors 
      hover:text-accent-400
      ${pathname === href ? "text-accent-400" : ""}
    `;

  return (
    <ul className="flex items-center gap-16">
      <li>
        <Link className={linkClass("/cabins")} href="/cabins">
          Cabins
        </Link>
      </li>

      <li>
        <Link className={linkClass("/about")} href="/about">
          About
        </Link>
      </li>

      <li>
        {session?.user?.image ? (
          <Link
            href="/account"
            className={`
              flex items-center gap-4 transition-colors
              ${
                pathname === "/account"
                  ? "text-accent-400"
                  : "hover:text-accent-400"
              }
            `}
          >
            <Image
              src={session.user.image ?? "/default-profile.png"}
              alt={session.user.name ?? "User profile"}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span>{session.user.name ?? "Anonymous"}</span>
          </Link>
        ) : (
          <Link className={linkClass("/account")} href="/account">
            Login
          </Link>
        )}
      </li>
    </ul>
  );
}
