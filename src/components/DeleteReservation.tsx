"use client";

import { TrashIcon } from "@heroicons/react/16/solid";
import { useTransition } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import SpinnerMini from "./SpinnerMini";

export default function DeleteReservation({
  bookingId,
  onDelete,
}: {
  bookingId: string;
  onDelete: (bookingId: string) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => onDelete(bookingId));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="group flex cursor-pointer items-center gap-2 uppercase text-xs font-bold text-primary-300 grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900">
          {!isPending ? (
            <>
              <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Delete</span>
            </>
          ) : (
            <span className="mx-auto">
              <SpinnerMini />
            </span>
          )}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-primary-950 border-primary-700">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-primary-300">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-accent-500 text-primary-100 border-accent-600 hover:bg-accent-500 cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-primary-800 text-primary-200 cursor-pointer"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
