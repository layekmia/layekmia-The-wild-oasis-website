"use server";

import { getSession } from "@/helpers/getSession";
import {
  createBooking,
  deleteBookingById,
  getBookings,
  getGuestByEmail,
  updateBooking,
  updateBookingStatus,
  updateGuestProfile,
} from "./apiService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface BookingPayload {
  startDate: Date | undefined;
  endDate: Date | undefined;
  numNights: number;
  cabinPrice: number;
  cabinId: string | undefined;
}

export async function createReservation(
  bookingData: BookingPayload,
  formData: FormData
) {
  const session = await getSession();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.id,
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations")?.slice(0, 1000),
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await createBooking(newBooking);
  if (error) throw new Error("Booking could not be created");
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function updateReservation(formData: FormData, bookingId: string) {
  // verify authentication
  const session = await getSession();
  if (!session) throw new Error("You must need to be logged in");

  const userId = session?.user?.id;

  // Fetch ONLY bookings owned by this user
  const { data: bookings } = await getBookings(userId);
  if (!bookings || bookings.length === 0) {
    throw new Error("No reservations found for this user.");
  }
  // Ensure the booking belongs to the user
  const isOwner = bookings.some((booking) => booking._id === bookingId);

  if (!isOwner) {
    throw new Error(
      "You are not allowed to update someone else's reservation."
    );
  }

  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");

  const updateData = { numGuests, observations };

  const { error } = await updateBooking(bookingId, updateData);
  if (error) throw new Error("Booking could not be updated");

  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function cancelBooking(bookingId: string) {
  // 1. Ensure the user is authenticated
  const session = await getSession();
  if (!session) {
    throw new Error("You must be logged in.");
  }

  const userId = session.user.id;

  // Fetch ONLY bookings owned by this user
  const { data: bookings } = await getBookings(userId);

  if (!bookings || bookings.length === 0) {
    throw new Error("No reservations found for this user.");
  }

  //Ensure the booking belongs to the user
  const isOwner = bookings.some((booking) => booking._id === bookingId);

  if (!isOwner) {
    throw new Error(
      "You are not allowed to delete someone else's reservation."
    );
  }

  const status = "cancelled";

  // Perform delete operation
  await updateBookingStatus(bookingId, status);

  //Revalidate UI
  revalidatePath("/account/reservations");
}

export async function deleteBooking(bookingId: string) {
  // 1. Ensure the user is authenticated
  const session = await getSession();
  if (!session) {
    throw new Error("You must be logged in.");
  }

  const userId = session.user.id;

  // Fetch ONLY bookings owned by this user
  const { data: bookings } = await getBookings(userId);

  if (!bookings || bookings.length === 0) {
    throw new Error("No reservations found for this user.");
  }

  //Ensure the booking belongs to the user
  const isOwner = bookings.some((booking) => booking._id === bookingId);

  if (!isOwner) {
    throw new Error(
      "You are not allowed to delete someone else's reservation."
    );
  }

  // Perform delete operation
  await deleteBookingById(bookingId);

  //Revalidate UI
  revalidatePath("/account/reservations");
}

export async function updateProfile(formData: FormData) {
  // verify authentication
  const session = await getSession();
  if (!session) throw new Error("You must be logged in");

  // check the guest in the database;
  const { data: guest } = await getGuestByEmail(session.user.email as string);
  if (!guest) throw new Error("Guest not found");

  const nationalID = formData.get("nationalID") as string | null;

  // Read nationality field safely
  const nationalityRaw = formData.get("nationality") as string | null;

  let nationality: string | null = null;
  let countryFlag: string | null = null;

  if (nationalityRaw && typeof nationalityRaw === "string") {
    const parts = nationalityRaw.split("%");
    nationality = parts[0] ?? null;
    countryFlag = parts[1] ?? null;
  }

  await updateGuestProfile(guest._id, nationalID, nationality, countryFlag);
  revalidatePath("/account/profile");
}
