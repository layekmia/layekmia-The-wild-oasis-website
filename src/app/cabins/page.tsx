import CabinList from "@/components/CabinList";
import Filter from "@/components/Filter";
import ReservationReminder from "@/components/ReservationReminder";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

export const metadata = {
  title: "Cabins",
  description: "Cabins page description",
};

// export const revalidate = 0;

interface cabinsProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Page({ searchParams }: cabinsProps) {
  const params = await searchParams;
  const filter = params?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl text-accent-400 mb-3 sm:mb-5 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-[17px] sm:text-lg mb-10 text-primary-200">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&appos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <Filter/>
      <Suspense key={filter} fallback={<Spinner />}>
        <CabinList filter={filter} />
         <ReservationReminder />
      </Suspense>
    </div>
  );
}
