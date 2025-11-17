"use client";

import { useReservation } from "@/context/reservation";
import { ICabin } from "@/types/models";
import { isPast, startOfDay } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import ReservationSummary from "./ReservationSummary";

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
  const { range, setRange } = useReservation();
  const bookedDatesAsDates = bookedDates?.map((date) => new Date(date)) ?? [];

  const { minBookingLength, maxBookingLength } = setting;

  return (
    <div className="flex flex-col justify-between bg-gradient-to-br from-primary-900 via-primary-950 to-black border border-primary-700 shadow-xl  pt-5">
      <DayPicker
        className="pt-12 place-self-center bg-primary-950 rounded-lg shadow-inner text-primary-100 border border-primary-700"
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
        modifiersClassNames={{
          selected: "bg-accent-500 text-primary-950 font-semibold",
          today: "border-accent-400 text-accent-400",
          disabled: "text-primary-600 opacity-50 cursor-not-allowed",
          range_start: "bg-accent-400 text-primary-950 rounded-l-md",
          range_end: "bg-accent-400 text-primary-950 rounded-r-md",
          range_middle: "bg-accent-300 text-primary-950",
          hidden: "invisible",
        }}
      />

      <div className="max-md:hidden mt-6">
        <ReservationSummary cabin={cabin} />
      </div>
    </div>
  );
}

export default DateSelector;
