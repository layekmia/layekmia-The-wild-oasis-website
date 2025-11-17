import { IBookingPopulated } from "@/types/type";
import Image from "next/image";
import { formatBookingDates, formatBookingTime } from "@/helpers/helper";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import DeleteReservation from "./DeleteReservation";

interface ReservationCardProps {
  booking: IBookingPopulated;
  onDelete: (bookingId: string) => Promise<void>;
}
export default function ReservationCard({
  booking,
  onDelete,
}: ReservationCardProps) {
  const {
    _id: id,
    numGuests,
    numNights,
    totalPrice,
    startDate,
    endDate,
    status,
    cabinId: { name, image },
  } = booking;

  const now = new Date();
  const bookingStart = new Date(startDate);
  const bookingEnd = new Date(endDate);

  let currentStatus;

  if (status === "cancelled") {
    currentStatus = "CANCELLED";
  } else if (now > bookingEnd) {
    currentStatus = "COMPLETED";
  } else if (now < bookingStart) {
    currentStatus = "UPCOMING";
  } else {
    currentStatus = "ACTIVE";
  }

  return (
    <div className="flex flex-col sm:flex-row rounded-xl overflow-hidden bg-gradient-to-br from-primary-900 via-primary-950 to-black border border-primary-700 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="relative w-full sm:w-40 h-48 sm:h-auto">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover border-b sm:border-b-0 sm:border-r border-primary-700"
        />
      </div>

      <div className="px-5 py-4 grow flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-lg sm:text-xl font-semibold text-primary-100 tracking-wide">
            {numNights} nights in
            <span className="text-accent-400"> {name}</span>
          </h3>

          <span
            className={`font-bold text-xs uppercase px-3 py-1.5 rounded-full tracking-wide ${
              currentStatus === "COMPLETED"
                ? "bg-yellow-500/20 text-yellow-300 border border-yellow-700/40"
                : currentStatus === "UPCOMING"
                ? "bg-blue-500/20 text-blue-300 border border-blue-700/40"
                : "bg-green-500/20 text-green-300 border border-green-700/40"
            }`}
          >
            {currentStatus}
          </span>
        </div>

        <p className="text-base sm:text-lg text-primary-300">
          {formatBookingDates(startDate, endDate)}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-auto">
          <p className="text-lg sm:text-xl font-bold text-accent-400">
            ${totalPrice}
          </p>

          <p className="text-base sm:text-lg text-primary-300">
            {numGuests} guests
          </p>

          <p className="text-sm text-primary-400 sm:ml-auto">
            {formatBookingTime(endDate)}
          </p>
        </div>
      </div>

      {currentStatus !== "COMPLETED" && currentStatus !== "ACTIVE" && (
        <div className="flex sm:flex-col items-center sm:items-stretch border-t sm:border-t-0 sm:border-l border-primary-700 bg-black/10 backdrop-blur-lg w-full sm:w-[110px]">
          <Link
            href={`/account/reservations/edit/${id}`}
            className="group flex items-center justify-center gap-2 text-xs font-bold text-primary-300 border-b sm:border-b border-primary-700 px-4 py-3 w-1/2 sm:w-full hover:bg-accent-500 hover:text-primary-900 transition-all"
          >
            <PencilSquareIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-400 group-hover:text-primary-900" />
            <span>Edit</span>
          </Link>

          <DeleteReservation
            onDelete={onDelete}
            bookingId={id?.toString() ?? ""}
          />
        </div>
      )}
    </div>
  );
}
