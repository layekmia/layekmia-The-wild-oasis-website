import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";

export default function LogoDashboard() {
  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-3 md:gap-4 z-10">
      <Image
        src={logo}
        alt="The wild oasis logo"
        width={40}
        quality={100}
        height={40}
        className=" object-cover"
      />
      <span className="text-sm text-nowrap font-bold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}
