import { ICabin } from "@/types/models";
import Image from "next/image";
import TextExpender from "./TextExpender";

interface cabinProps {
  cabin: ICabin;
}

export default function Cabin({ cabin }: cabinProps) {
  return (
    <div className="mb-24 grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-15 md:gap-20 border border-primary-700 py-3 px-5 lg:px-10 bg-gradient-to-r from-primary-950 via-primary-900 to-primary-950 rounded-xl shadow-lg">
      <div className="relative scale-[1.15] md:scale-[1.05] lg:scale-[1.15] max-md:h-[300px] md:-translate-x-3 border border-primary-800 rounded-md overflow-hidden shadow-inner">
        <Image
          src={cabin.image}
          alt={cabin.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div>
        <h3 className="text-accent-400 font-black text-4xl md:text-7xl mb-5 md:translate-x-[-254px] bg-gradient-to-r from-accent-600 via-accent-500 to-accent-600 lg:p-6 p-1 lg:w-[150%] rounded-tr-lg rounded-br-lg">
          Cabin {cabin.name}
        </h3>
        <p className="text-lg text-primary-200 mb-10">
          <TextExpender>{cabin.description}</TextExpender>
        </p>
        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex items-center gap-3">
            <span className="h-5 w-5 text-accent-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            </span>
            <span className="text-lg text-primary-100">
              For up to {cabin.maxCapacity} guests
            </span>
          </li>
          <li className="flex items-center gap-3">
            <span className="h-5 w-5 text-accent-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </span>
            <span className="text-lg text-primary-100">
              Located in the heart of the Dolomites (Italy)
            </span>
          </li>
          <li className="flex items-center gap-3">
            <span className="h-5 w-5 text-accent-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            </span>
            <span className="text-lg text-primary-100">
              Privacy 100% guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
