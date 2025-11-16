import { IBookingPopulated } from "@/types/type";
import Image from "next/image";
import { formatBookingDates, formatBookingTime } from "@/helpers/helper";
import { isAfter } from "date-fns";
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
    cabinId: { name, image },
  } = booking;

  const now = new Date();
  const bookingEnd = new Date(endDate);

  const status = isAfter(now, bookingEnd) ? "PAST" : "UPCOMING";

  return (
    <div className="flex border border-primary-800">
      <div className="relative h-32 aspect-square">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover border-r border-r-primary-800"
        />
      </div>
      <div className="px-6 py-3 grow">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          <span
            className={`font-bold text-xs uppercase px-3 py-1.5 rounded-sm ${
              status === "PAST"
                ? "bg-yellow-800 text-yellow-200"
                : "bg-green-800"
            }`}
          >
            {status}
          </span>
        </div>
        <p className="text-lg text-primary-300">
          {formatBookingDates(startDate, endDate)}
        </p>
        <div className="flex items-baseline mt-auto gap-5">
          <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
          <p className="text-lg text-primary-300">{numGuests} guests</p>
          <p className="text-sm text-primary-400 ml-auto">
            {formatBookingTime(endDate)}
          </p>
        </div>
      </div>
      <div className="flex flex-col border-l border-l-primary-800 w-[100px]">
        {status !== "PAST" ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation
              onDelete={onDelete}
              bookingId={id?.toString() ?? ""}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
