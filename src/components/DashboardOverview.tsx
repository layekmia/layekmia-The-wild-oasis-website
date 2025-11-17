"use client";

import { formatDate } from "@/helpers/helper";
import { IBookingPopulated } from "@/types/type";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface DashboardOverviewProps {
  totalBookings: number;
  upcomingBookings: number;
  cancelledBookings: number;
  firstUpcomingBooking: IBookingPopulated | undefined;
  totalNights: number;
}

export default function DashboardOverview({
  totalBookings,
  upcomingBookings,
  cancelledBookings,
  firstUpcomingBooking,
  totalNights,
}: DashboardOverviewProps) {
  const { data: session } = useSession();

  const stats = [
    {
      title: "Total Reservations",
      value: totalBookings,
      icon: CalendarDaysIcon,
    },
    {
      title: "Upcoming Trips",
      value: upcomingBookings,
      icon: ClockIcon,
    },
    {
      title: "Total Nights Booked",
      value: totalNights,
      icon: CheckCircleIcon,
    },
    {
      title: "Cancelled",
      value: cancelledBookings,
      icon: XCircleIcon,
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-accent-400">
          Welcome back, {session?.user?.name ?? "Anonymous"}
        </h1>
        <p className="text-primary-200 mt-1">
          Here’s a quick summary of your activity.
        </p>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-linear-to-br from-primary-800 via-primary-900 to-black border border-primary-700 shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary-700/40">
                <s.icon className="w-7 h-7 text-accent-400" />
              </div>
              <div>
                <p className="text-primary-300 text-sm">{s.title}</p>
                <p className="text-3xl font-extrabold text-accent-400">
                  {s.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {firstUpcomingBooking && (
        <section className="rounded-2xl p-6 bg-gradient-to-br from-primary-800 via-primary-900 to-black border border-primary-700 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-primary-100 tracking-wide">
              Your Next Reservation
            </h2>

            <span className="px-3 py-1 text-xs rounded-full bg-accent-400 text-primary-900 font-semibold uppercase shadow border border-primary-800">
              Upcoming
            </span>
          </div>

          <p className="text-xl font-semibold text-primary-200 mb-4">
            Cabin:{" "}
            <span className="text-accent-400">
              {firstUpcomingBooking?.cabinId?.name}
            </span>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-primary-900/40 border border-primary-700 shadow-inner">
              <p className="text-xs text-primary-400 uppercase tracking-wide">
                Check-In
              </p>
              <p className="text-primary-100 font-semibold text-lg mt-1">
                {formatDate(firstUpcomingBooking?.startDate as Date)}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-primary-900/40 border border-primary-700 shadow-inner">
              <p className="text-xs text-primary-400 uppercase tracking-wide">
                Check-Out
              </p>
              <p className="text-primary-100 font-semibold text-lg mt-1">
                {formatDate(firstUpcomingBooking?.endDate as Date)}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-primary-900/40 border border-primary-700 shadow-inner">
              <p className="text-xs text-primary-400 uppercase tracking-wide">
                Guests
              </p>
              <p className="text-primary-100 font-semibold text-lg mt-1">
                {firstUpcomingBooking?.numGuests}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-primary-900/40 border border-primary-700 shadow-inner">
              <p className="text-xs text-primary-400 uppercase tracking-wide">
                Status
              </p>
              <p className="text-accent-400 font-bold text-lg mt-1 capitalize">
                {firstUpcomingBooking?.status}
              </p>
            </div>
          </div>
          <Link
            href="/account/reservations"
            className="inline-flex items-center gap-1 text-accent-400 hover:text-accent-300 font-medium transition mt-6 inline-block"
          >
            View Reservation <span>→</span>
          </Link>
        </section>
      )}
    </div>
  );
}
