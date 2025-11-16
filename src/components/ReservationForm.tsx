"use client";

import { useReservation } from "@/context/reservation";
import { ICabin } from "@/types/models";
import { addDays, differenceInDays } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { createReservation } from "@/lib/actions";
import { SubmitButton } from "./SubmitButton";

interface Cabin {
  cabin: ICabin;
}

export default function ReservationForm({ cabin }: Cabin) {
  const { data: session } = useSession();
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice = 0, discount = 0, _id } = cabin;

  const startDate = range?.from ? addDays(range.from, 1) : undefined;
  const endDate = range?.to ? addDays(range.to, 1) : undefined;

  // Safe calculation
  const numNights =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;

  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: _id,
  };

  const createBookingWithData = createReservation.bind(null, bookingData);

  return (
    <div className="h-full bg-primary-900">
      <div className="flex items-center gap-5 px-16 py-2 bg-primary-800">
        <p>Logged in as</p>
        {session?.user && (
          <>
            <div className="flex gap-4 items-center">
              <Image
                src={session?.user?.image ?? ""}
                alt={session?.user?.name || "user profile"}
                width={32}
                height={32}
                className="rounded-full"
                referrerPolicy="no-referrer"
              />
              <p>{session?.user?.name}</p>
            </div>
          </>
        )}
      </div>

      <form
        action={async (formData: FormData) => {
          resetRange();
          await createBookingWithData(formData);
        }}
        className="flex flex-col gap-5 bg-primary-900 px-16 py-10 text-lg"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many Guests</label>
          <select
            name="numGuests"
            required
            id="numGuests"
            className="w-full py-3 px-5 bg-primary-200 text-primary-800 rounded-md shadow-xl"
          >
            <option value="" disabled selected>
              Select number of guests..
            </option>
            {Array.from({ length: maxCapacity }, (_, num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="py-3 px-5 bg-primary-200 rounded-md w-full text-primary-800"
            placeholder=" Any pets, allergies, special requirements, etc,"
          ></textarea>
        </div>
        <div className="flex items-center gap-5 justify-end">
          <p className="text-primary-300 text-base">Start by selecting dates</p>
          {range?.from && range?.to && (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}
