import { format, differenceInDays } from "date-fns";

export const BASE_URL = "https://the-wild-oasis-backend-ten.vercel.app";

export function formatBookingDates(startDate: Date, endDate: Date) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const days = differenceInDays(end, start);
  const startFormatted = format(start, "EEE, MMM dd yyyy"); // Wed, Dec 03 2025
  const endFormatted = format(end, "EEE, MMM dd yyyy"); // Fri, Dec 05 2025

  return `${startFormatted} (in ${days} days) — ${endFormatted}`;
}

export function formatDate(dateString: Date ): string {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}


export function formatBookingTime(dateNumber: Date) {
  const date = new Date(dateNumber);
  return `Booked ${format(date, "EEE, MMM dd yyyy, hh:mm a")}`;
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch(err:any) {
    throw new Error("Could not fetch countries", err.message);
  }
}
