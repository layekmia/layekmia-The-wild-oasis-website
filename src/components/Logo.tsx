import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-3 md:gap-4 z-10">
      <Image
        src={logo}
        alt="The wild oasis logo"
        width={40}
        quality={100}
        height={40}
        className="sm:w-12 sm:h-12 md:w-16 md:h-16 object-cover"
      />
      <span className="text-base md:text-xl font-bold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}
