import { SubmitButton } from "@/components/SubmitButton";
import { updateReservation } from "@/lib/actions";
import { getBooking, getCabin } from "@/lib/apiService";

export default async function Page({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  // CHANGE
  const { bookingId } = await params;
  const {
    data: { cabinId, numGuests, observations },
  } = await getBooking(bookingId);

  const {
    data: { maxCapacity },
  } = await getCabin(cabinId);

  const handleUpdateReservation = async (formData: FormData) => {
    "use server";
    await updateReservation(formData, bookingId);
  };

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={handleUpdateReservation}
        className="bg-gradient-to-br from-[#0f1115] via-[#13141c] to-[#1c1f2c] py-8 px-12 text-lg flex gap-6 flex-col rounded-2xl shadow-lg border border-primary-800"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests" className="text-gray-300 font-medium">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="px-5 py-3 bg-primary-950 text-primary-100 w-full rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-400 transition"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations" className="text-gray-300 font-medium">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-950 text-primary-100 w-full rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-400 transition"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="updating...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
