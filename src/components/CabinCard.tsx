import { ICabin } from "@/types/models";
import Image from "next/image";
import Link from "next/link";

interface CabinCardProps {
  cabin: ICabin;
}

export default function CabinCard({ cabin }: CabinCardProps) {
  return (
    <div className="w-full flex-col md:flex-row border border-primary-700">
      <div className="flex-1 relative min-h-[200px]">
        <Image
          className="object-cover"
          fill
          src={cabin.image}
          alt={cabin.name}
        />
      </div>
      <div className="grow">
        <div className="px-7 pt-5 pb-4 bg-primary-950">
          <h2 className="mb-3 text-accent-400 text-2xl font-semibold">
            Cabin {cabin.name}
          </h2>
          <div className="flex items-center gap-3 mb-2">
            <span className="h-5 w-5 text-primary-600 inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            </span>
            <span className="text-lg text-primary-200 inline-block">
              For up to {cabin.maxCapacity} guests
            </span>
          </div>
          <div className="flex justify-end gap-3">
            <span className="text-3xl font-normal self-start">
              $ {cabin.regularPrice}
            </span>
            {cabin.discount > 0 && (
              <span className="line-through text-base text-primary-600 self-end font-semibold">
                $ {(cabin.regularPrice * (100 + cabin.discount)) / 100}
              </span>
            )}
            <span className="self-end text-primary-200">/ night</span>
          </div>
        </div>
        <div className="bg-primary-950 text-right border-t border-t-primary-700 ">
          <Link
            href={`/cabins/${cabin._id}`}
            className="py-4 px-6 inline-block border-l border-l-primary-700 hover:bg-accent-600 hover:text-primary-900 transition-colors text-base"
          >
            Details & reservation →
          </Link>
        </div>
      </div>
    </div>
  );
}
