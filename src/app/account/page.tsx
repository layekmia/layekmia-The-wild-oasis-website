import DashboardOverview from "@/components/DashboardOverview";
import { getSession } from "@/helpers/getSession";
import { getBookings } from "@/lib/apiService";
import { IBookingPopulated } from "@/types/type";

export default async function page() {
  const session = await getSession();

  const { data: bookings } = await getBookings(session?.user?.id ?? "");

  const now = new Date();

  const totalBookings: number = bookings?.length ?? 0;
  const upComingBooking: number =
    bookings?.filter((booking) => new Date(booking.startDate) > now).length ??
    0;

  const cancelledBookings: number =
    bookings?.filter((booking) => booking.status === "cancelled").length ?? 0;

  const firstUpcoming: IBookingPopulated | undefined = bookings
    ?.filter((booking) => new Date(booking.startDate) > now)
    .filter((booking) => booking.status !== "cancelled")
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )[0];

  const totalNights: number =
    bookings
      ?.map((booking) => booking.numNights)
      .reduce((acc, curr) => acc + curr, 0) ?? 0;

  return (
    <>
      <DashboardOverview
        totalBookings={totalBookings}
        upcomingBookings={upComingBooking}
        cancelledBookings={cancelledBookings}
        firstUpcomingBooking={firstUpcoming}
        totalNights={totalNights}
      />
    </>
  );
}
