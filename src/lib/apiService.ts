import { BASE_URL } from "@/helpers/helper";
import { ICabin } from "@/types/models";
import axios from "axios";

// Utility type for all responses
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// Common error handler (used in every API call)
function handleAxiosError(err: any): ApiResponse<any> {
  if (err.response?.data?.message) {
    return { data: null, error: err.response.data.message };
  }
  if (err.response?.data?.error) {
    return { data: null, error: err.response.data.error };
  }
  return { data: null, error: err.message || "Something went wrong" };
}

/* ------------------------- CABINS ------------------------- */

// Get all cabins
export async function getCabins(): Promise<ApiResponse<ICabin[]>> {
  try {
    const res = await axios.get(`${BASE_URL}/api/cabins`);
    return { data: (res.data as ICabin[]) || [], error: null };
  } catch (err) {
    return handleAxiosError(err);
  }
}

// Get single cabin
export async function getCabin(id: string): Promise<ApiResponse<any>> {
  if (!id) return { data: null, error: "Cabin ID is required" };
  try {
    const res = await axios.get(`${BASE_URL}/api/cabins/${id}`);
    return { data: res.data || null, error: null };
  } catch (err) {
    return handleAxiosError(err);
  }
}

// Get cabin price
export async function getCabinPrice(
  id: string
): Promise<ApiResponse<{ regularPrice: number; discount: number }>> {
  if (!id) return { data: null, error: "Cabin ID is required" };
  try {
    const res = await axios.get(`${BASE_URL}/api/cabins/${id}/cabin/price`);
    return { data: res.data || { regularPrice: 0, discount: 0 }, error: null };
  } catch (err) {
    return handleAxiosError(err);
  }
}

/* ------------------------- GUESTS ------------------------- */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function createGuest({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<ApiResponse<any>> {
  if (!email) return { data: null, error: "Email is required" };
  if (!emailRegex.test(email))
    return { data: null, error: "Enter a valid email" };
  try {
    const res = await axios.post(`${BASE_URL}/api/guests`, {
      fullName: name,
      email,
    });
    return { data: res.data || null, error: null };
  } catch (err) {
    return handleAxiosError(err);
  }
}

export async function getGuestByEmail(
  email: string
): Promise<ApiResponse<any>> {
  if (!email) return { data: null, error: "Email is required" };
  if (!emailRegex.test(email))
    return { data: null, error: "Enter a valid email" };
  try {
    const res = await axios.get(`${BASE_URL}/api/guests/email/${email}`);
    return { data: res.data || null, error: null };
  } catch (err) {
    return handleAxiosError(err);
  }
}

export async function updateGuestProfile(
  id: string,
  nationalID: string | null,
  nationality: string | null,
  countryFlag: string | null
): Promise<ApiResponse<any>> {
  try {
    const res = await axios.patch(`${BASE_URL}/api/guests/${id}`, {
      nationalID,
      nationality,
      countryFlag,
    });

    return { data: res.data || null, error: null };
  } catch (err) {
    return handleAxiosError(err);
  }
}

/* ------------------------- BOOKINGS ------------------------- */

// Create booking
export async function createBooking(
  newBooking: Partial<any>
): Promise<ApiResponse<any>> {
  try {
    const res = await axios.post(`${BASE_URL}/api/bookings`, newBooking);
    return { data: res.data || null, error: null };
  } catch (err) {
    return handleAxiosError(err);
  }
}

// Get single booking
export async function getBooking(id: string): Promise<ApiResponse<any>> {
  if (!id) return { data: null, error: "Booking ID is required" };
  try {
    const res = await axios.get(`${BASE_URL}/api/bookings/${id}`);
    return { data: res.data || null, error: null };
  } catch (err) {
    return handleAxiosError(err);
  }
}

// Get bookings for a guest
export async function getBookings(
  guestId: string
): Promise<ApiResponse<any[]>> {
  if (!guestId) return { data: [], error: "Guest ID is required" };
  try {
    const res = await axios.get(`${BASE_URL}/api/bookings/${guestId}/guest`);
    return { data: res.data || [], error: null };
  } catch (err) {
    return handleAxiosError(err);
  }
}

// Get booked dates by cabin ID
export async function getBookedDatesByCabinId(
  cabinId: string
): Promise<ApiResponse<string[]>> {
  if (!cabinId) return { data: [], error: "Cabin ID is required" };
  try {
    const res = await axios.get(
      `${BASE_URL}/api/bookings/${cabinId}/booked/dates`
    );
    return { data: res.data || [], error: null };
  } catch (err) {
    return handleAxiosError(err);
  }
}

// Update booking
export async function updateBooking(
  bookingId: string,
  updateData: Partial<any>
): Promise<ApiResponse<any>> {
  if (!bookingId) return { data: null, error: "Booking ID is required" };
  try {
    const res = await axios.patch(
      `${BASE_URL}/api/bookings/${bookingId}/update`,
      updateData
    );
    return { data: res.data || null, error: null };
  } catch (err) {
    return handleAxiosError(err);
  }
}

export async function updateBookingStatus(
  id: string,
  status: string
): Promise<ApiResponse<any>> {
  if (!id) return { data: null, error: "Booking Id is required" };

  try {
    const res = await axios.patch(
      `${BASE_URL}/api/bookings/${id}/update/status`,
      { status }
    );
    return { data: res.data || null, error: null };
  } catch (error) {
    return handleAxiosError(error);
  }
}

// Delete booking
export async function deleteBookingById(id: string): Promise<ApiResponse<any>> {
  if (!id) return { data: null, error: "Booking ID is required" };
  try {
    const res = await axios.delete(`${BASE_URL}/api/bookings/${id}/delete`);
    return { data: res.data || null, error: null };
  } catch (err) {
    return handleAxiosError(err);
  }
}

/* ------------------------- SETTINGS ------------------------- */

export async function getSettings(): Promise<ApiResponse<any>> {
  try {
    const res = await axios.get(`${BASE_URL}/api/setting`);
    //  await new Promise((res)=> setTimeout(res, 5000))
    return { data: res.data || null, error: null };
  } catch (err) {
    return handleAxiosError(err);
  }
}
