import Cabin from "@/components/Cabin";
import Reservation from "@/components/Reservation";
import Spinner from "@/components/Spinner";
import { getCabin, getCabins } from "@/lib/apiService";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}) {
  const { cabinId } = await params;
  const {
    data: { name },
  } = await getCabin(cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const { data: cabins } = await getCabins();
  const ids = cabins?.map((cabin) => ({ cabinId: cabin._id })) || [];
  return ids;
}

export default async function Page({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}) {
  const { cabinId } = await params;
  const { data: cabin, error } = await getCabin(cabinId);

  if (error) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <h2 className="text-4xl md:text-5xl font-semibold text-center mb-10 text-accent-400">
        Reserve {cabin.name} today. Pay on arrival.
      </h2>

      <Suspense fallback={<Spinner/>}>
        <Reservation cabinId={cabinId} />
      </Suspense>
    </div>
  );
}
