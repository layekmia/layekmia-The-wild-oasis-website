"use client";

import { updateProfile } from "@/lib/actions";
import { IGuest } from "@/types/models";
import { SubmitButton } from "./SubmitButton";

export default function UpdateProfileForm({
  guest,
  children,
}: {
  guest: IGuest;
  children: React.ReactNode;
}) {
  const { fullName, email, nationalID, countryFlag } = guest;

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    await updateProfile(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-[#0f1115] via-[#13141c] to-[#1c1f2c] py-4 px-8 md:py-8 md:px-12 text-lg flex gap-6 flex-col rounded-2xl shadow-lg border border-primary-800"
    >
      <div className="space-y-2">
        <label className="text-gray-300 font-medium">Full name</label>
        <input
          disabled
          name="fullName"
          className="px-5 py-3 bg-primary-950 text-primary-100 w-full rounded-sm disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-400 transition"
          defaultValue={fullName}
        />
      </div>

      <div className="space-y-2">
        <label className="text-gray-300 font-medium">Email address</label>
        <input
          disabled
          name="email"
          className="px-5 py-3 bg-primary-950 text-primary-100 w-full rounded-sm disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-400 transition"
          defaultValue={email}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality" className="text-gray-300 font-medium">
            Where are you from?
          </label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm border border-gray-600"
          />
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID" className="text-gray-300 font-medium">
          National ID number
        </label>
        <input
          defaultValue={nationalID}
          required
          name="nationalID"
          className="px-5 py-3 bg-primary-950 text-primary-100 w-full rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-400 transition"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating....">Update profile</SubmitButton>
      </div>
    </form>
  );
}
