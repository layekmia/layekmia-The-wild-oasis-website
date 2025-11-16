"use client";

import ReservationCard from "@/components/ReservationCard";
import { deleteBooking } from "@/lib/actions";
import { IBookingPopulated } from "@/types/type";
import Link from "next/link";
import { useOptimistic } from "react";

interface ReservationPageProps {
  bookings: IBookingPopulated[];
}

export default function ReservationsList({ bookings }: ReservationPageProps) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings: IBookingPopulated[], bookingId: string) => {
      return curBookings.filter(
        (booking) => booking._id?.toString() !== bookingId
      );
    }
  );

  async function handleDelete(bookingId: string) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <>
      {!optimisticBookings?.length ? (
        <p className="text-lg">
          You have on reservations yet. Check out our{" "}
          <Link href="/cabins" className="text-accent-500 underline">
            luxury cabins →
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {optimisticBookings?.map((booking) => (
            <ReservationCard key={booking._id?.toString()} booking={booking} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </>
  );
}
