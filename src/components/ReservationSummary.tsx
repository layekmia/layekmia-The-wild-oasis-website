"use client";

import { useReservation } from "@/context/reservation";
import { ICabin } from "@/types/models";
import { differenceInDays } from "date-fns";

export default function ReservationSummary({ cabin }: { cabin: ICabin }) {
  const { range, resetRange } = useReservation();
  const { regularPrice, discount } = cabin;
  const numNights =
    range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  return (
    <div className="flex items-center justify-between px-4 md:px-8 bg-accent-500 text-primary-800 h-[60px] md:h-[72px]">
      <div className="flex items-baseline gap-3 md:gap-6">
        <p className="flex gap-2 items-baseline">
          {discount > 0 ? (
            <>
              <span className="text-2xl">${regularPrice - discount}</span>
              <span className="line-through font-semibold text-primary-700">
                ${regularPrice}
              </span>
            </>
          ) : (
            <span className="text-2xl">${regularPrice}</span>
          )}
          <span className="">/night</span>
        </p>
        {numNights ? (
          <>
            <p className="bg-accent-600 px-2 py-1 text-sm md:px-3 md:py-2 md:text-2xl">
              <span>&times;</span> <span>{numNights}</span>
            </p>
            <p>
              <span className=" text-xs sm:text-lg font-bold uppercase">
                Total
              </span>{" "}
              <span className=" text-xs sm:text-2xl font-semibold">
                ${cabinPrice}
              </span>
            </p>
          </>
        ) : null}
      </div>

      {(range?.from || range?.to) && (
        <button
          className="border cursor-pointer border-primary-800 py-1 px-2 sm:py-2 sm:px-4 text-sm font-semibold"
          onClick={resetRange}
        >
          Clear
        </button>
      )}
    </div>
  );
}
