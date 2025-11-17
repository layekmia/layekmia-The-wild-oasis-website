import ReservationsList from "@/components/ReservationsList";
import Spinner from "@/components/Spinner";
import { getSession } from "@/helpers/getSession";
import { getBookings } from "@/lib/apiService";
import { Suspense } from "react";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session = await getSession();
  const { data } = await getBookings(session?.user?.id as string);
  const validBookings = data?.filter(
    (booking) => booking.status !== "cancelled"
  );

  return (
    <div className="p-1">
      <h2 className="text-accent-400 font-semibold text-2xl mb-7">
        Your reservations
      </h2>
      <Suspense fallback={<Spinner />}>
        <ReservationsList bookings={validBookings ?? []} />
      </Suspense>
    </div>
  );
}
