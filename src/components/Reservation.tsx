import {
  getBookedDatesByCabinId,
  getCabin,
  getSettings,
} from "@/lib/apiService";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

export default async function Reservation({ cabinId }: { cabinId: string }) {
  const [{ data: cabin }, { data: setting }, { data: bookedDates }] =
    await Promise.all([
      getCabin(cabinId),
      getSettings(),
      getBookedDatesByCabinId(cabinId),
    ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border border-primary-800 min-h-[350px]">
      <DateSelector cabin={cabin} setting={setting} bookedDates={bookedDates} />
      <ReservationForm cabin={cabin} />
    </div>
  );
}
