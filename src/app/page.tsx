import Image from "next/image";
import Link from "next/link";
import bgImage from "../../public/bg.png";

export default async function Page() {
  return (
    <div className="mt-24">
      <Image
        className="object-cover object-top"
        placeholder="blur"
        src={bgImage}
        fill
        alt="Hero Image"
        quality={80}
      />
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          className="py-4 px-6 lg:py-6 lg:px-8 bg-accent-500 text-base md:text-lg font-semibold text-primary-800 hover:bg-accent-600 transition-all"
          href="/cabins"
        >
          Explore Cabins
        </Link>
      </div>
    </div>
  );
}
