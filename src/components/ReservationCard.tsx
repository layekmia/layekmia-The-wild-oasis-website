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
    // <div className="flex border border-primary-800">
    //   <div className="relative h-32 aspect-square">
    //     <Image
    //       src={image}
    //       alt={name}
    //       fill
    //       className="object-cover border-r border-r-primary-800"
    //     />
    //   </div>
    //   <div className="px-6 py-3 grow">
    //     <div className="flex items-center justify-between">
    //       <h3 className="text-xl font-semibold">
    //         {numNights} nights in Cabin {name}
    //       </h3>
    //       <span
    //         className={`font-bold text-xs uppercase px-3 py-1.5 rounded-sm ${
    //           status === "PAST"
    //             ? "bg-yellow-800 text-yellow-200"
    //             : "bg-green-800"
    //         }`}
    //       >
    //         {status}
    //       </span>
    //     </div>
    //     <p className="text-lg text-primary-300">
    //       {formatBookingDates(startDate, endDate)}
    //     </p>
    //     <div className="flex items-baseline mt-auto gap-5">
    //       <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
    //       <p className="text-lg text-primary-300">{numGuests} guests</p>
    //       <p className="text-sm text-primary-400 ml-auto">
    //         {formatBookingTime(endDate)}
    //       </p>
    //     </div>
    //   </div>
    //   <div className="flex flex-col border-l border-l-primary-800 w-[100px]">
    //     {status !== "PAST" ? (
    //       <>
    //         <Link
    //           href={`/account/reservations/edit/${id}`}
    //           className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    //         >
    //           <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
    //           <span className="mt-1">Edit</span>
    //         </Link>
    //         <DeleteReservation
    //           onDelete={onDelete}
    //           bookingId={id?.toString() ?? ""}
    //         />
    //       </>
    //     ) : null}
    //   </div>
    // </div>
    <div className="flex flex-col sm:flex-row border border-primary-800">
      {/* Image */}
      <div className="relative w-full sm:w-32 h-48 sm:h-auto">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover border-b sm:border-b-0 sm:border-r border-primary-800"
        />
      </div>

      {/* Content */}
      <div className="px-4 py-3 grow flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h3 className="text-lg sm:text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>

          <span
            className={`font-bold text-xs uppercase px-2 py-1 rounded-sm w-fit ${
              status === "PAST"
                ? "bg-yellow-800 text-yellow-200"
                : "bg-green-800 text-green-200"
            }`}
          >
            {status}
          </span>
        </div>

        <p className="text-base sm:text-lg text-primary-300">
          {formatBookingDates(startDate, endDate)}
        </p>

        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 mt-auto">
          <p className="text-lg sm:text-xl font-semibold text-accent-400">
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

      {/* Edit / Delete Column */}
      {status !== "PAST" && (
        <div className="flex sm:flex-col items-center sm:items-stretch border-t sm:border-t-0 sm:border-l border-primary-800 w-full sm:w-[100px]">
          <Link
            href={`/account/reservations/edit/${id}`}
            className="group flex items-center justify-center gap-1 sm:gap-2 text-xs font-bold text-primary-300 border-b sm:border-b border-primary-800 px-4 py-2 w-1/2 sm:w-full hover:bg-accent-600 transition-colors"
          >
            <PencilSquareIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 group-hover:text-primary-800" />
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
