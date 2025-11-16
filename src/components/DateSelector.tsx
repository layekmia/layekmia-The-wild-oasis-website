"use client";

import { useReservation } from "@/context/reservation";
import { ICabin } from "@/types/models";
import { differenceInDays, isPast, startOfDay } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

function isAlreadyBooked(range: DateRange, datesArr: Date[]): boolean {
  if (!range.from || !range.to) return false;

  const start = startOfDay(range.from);
  const end = startOfDay(range.to);

  return datesArr.some((date) => {
    const d = startOfDay(date);
    return d >= start && d <= end;
  });
}

interface DateSelectorProps {
  cabin: ICabin;
  setting: {
    _id: string;
    maxBookingLength: number;
    minBookingLength: number;
    maxGuestsPerBooking: number;
    createdAt: Date;
    updatedAt: Date;
  };
  bookedDates: string[] | null;
}

function DateSelector({ cabin, setting, bookedDates }: DateSelectorProps) {
  const { range, setRange, resetRange } = useReservation();
  const bookedDatesAsDates = bookedDates?.map((date) => new Date(date)) ?? [];

  const { regularPrice, discount } = cabin;
  const numNights =
    range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = setting;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        required={false}
        disabled={(curDate) =>
          isPast(curDate) ||
          isAlreadyBooked({ from: curDate, to: curDate }, bookedDatesAsDates)
        }
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={1}
        selected={range}
        onSelect={setRange}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
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
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {(range?.from || range?.to) && (
          <button
            className="border cursor-pointer border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default DateSelector;
