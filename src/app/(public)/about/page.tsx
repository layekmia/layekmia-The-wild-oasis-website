import Image from "next/image";
import about1 from "../../../../public/about-1.jpg";
import about2 from "../../../../public/about-2.jpg";
import Link from "next/link";
import { getCabins } from "@/lib/apiService";

export const revalidate = 86400;

export const metadata = {
  title: "About",
  description: "About page description",
};

export default async function Page() {
  const { data: cabins } = await getCabins();

  return (
    <div className="grid grid-cols-1 gap-y-10 md:grid-cols-5 md:gap-x-24 md:gap-y-32 text-md items-center">
      {/* First content block */}
      <div className="col-span-3 order-1 md:order-1">
        <h2 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to The Wild Oasis
        </h2>
        <p className="mt-8">
          Where nature's beauty and comfortable living blend seamlessly. Hidden
          away in the heart of the Italian Dolomites, this is your paradise away
          from home. But it's not just about the luxury cabins. It's about the
          experience of reconnecting with nature and enjoying simple pleasures
          with family.
        </p>
        <p className="mt-8">
          Our {cabins?.length} luxury cabins provide a cozy base, but the real
          freedom and peace you'll find in the surrounding mountains. Wander
          through lush forests, breathe in the fresh air, and watch the stars
          twinkle above from the warmth of a campfire or your hot tub.
        </p>
        <p className="mt-8">
          This is where memorable moments are made, surrounded by nature's
          splendor. It's a place to slow down, relax, and feel the joy of being
          together in a beautiful setting.
        </p>
      </div>

      {/* First image */}
      <div className="relative aspect-square col-span-2 order-2 md:order-2">
        <Image
          src={about1}
          alt="About The Wild Oasis"
          className="object-cover"
          placeholder="blur"
          quality={80}
          fill
        />
      </div>

      {/* Second image */}
      <div className="relative aspect-square col-span-2 order-4 md:order-3">
        <Image
          src={about2}
          alt="About The Wild Oasis"
          className="object-cover"
          placeholder="blur"
          quality={80}
          fill
        />
      </div>

      {/* Second content block */}
      <div className="col-span-3 order-3 md:order-4">
        <h2 className="text-4xl mt-10 text-accent-400 font-medium">
          Managed by our family since 1962
        </h2>
        <p className="mt-8">
          Since 1962, The Wild Oasis has been a cherished family-run retreat.
          Started by our grandparents, this haven has been nurtured with love
          and care, passing down through our family as a testament to our
          dedication to creating a warm, welcoming environment.
        </p>
        <p className="mt-8">
          Over the years, we've maintained the essence of The Wild Oasis,
          blending the timeless beauty of the mountains with the personal touch
          only a family business can offer. Here, you're not just a guest;
          you're part of our extended family. So join us at The Wild Oasis soon,
          where tradition meets tranquility, and every visit is like coming
          home.
        </p>

        <div className="mt-8">
          <Link
            href="/cabins"
            className="inline-block bg-accent-500 py-5 px-8 text-primary-800 text-lg font-medium"
          >
            Explore our luxury cabins
          </Link>
        </div>
      </div>
    </div>
  );
}
