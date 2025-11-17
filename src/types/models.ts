import { Types } from "mongoose";

export interface ICabin {
  _id?: string;
  name: string;
  image: string;
  description: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBooking {
  _id?: Types.ObjectId;
  numGuests: number;
  numNights: number;
  startDate: Date;
  endDate: Date;
  cabinPrice: number;
  extraPrice?: number;
  totalPrice: number;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations?: string;
  cabinId: Types.ObjectId;
  guestId: Types.ObjectId;
  status: "confirmed" | "unconfirmed" | "completed" | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGuest {
  _id?: Types.ObjectId;
  fullName: string;
  email: string;
  nationality?: string;
  countryFlag?: string;
  nationalID?: string;
  createdAt?: Date;
}

export interface settings {
  _id?: Types.ObjectId;
  maxBookingLength: number;
  minBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}
