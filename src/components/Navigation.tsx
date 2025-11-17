import { getSession } from "@/helpers/getSession";
import Image from "next/image";
import Link from "next/link";

export default async function Navigation() {
  const session = await getSession();

  return (
    <nav className="z-10 text-lg">
      <ul className="flex items-center gap-16">
        <li>
          <Link
            className="hover:text-accent-400 transition-colors"
            href="/cabins"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-accent-400 transition-colors"
            href="/about"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <Image
                src={session.user.image || "/default-profile.png"}
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
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
