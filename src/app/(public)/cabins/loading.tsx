import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="grid items-center mt-10 justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
}
