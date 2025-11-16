"use client";

import { useReservation } from "@/context/reservation";
import { ICabin } from "@/types/models";
import { differenceInDays, isPast, startOfDay } from "date-fns";
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

      <div className="max-md:hidden">
        <ReservationSummary cabin={cabin} />
      </div>
    </div>
  );
}

export default DateSelector;
