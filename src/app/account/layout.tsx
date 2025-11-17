
import "@/app/_styles/globals.css";
import MobileNavigation from "@/components/MobileNavigation";
import Navigation from "@/components/Navigation";
import SideNavigation from "@/components/SideNavigation";
import { AuthProviders } from "@/context/authProvider";
import { ReservationProvider } from "@/context/reservation";
import { Josefin_Sans } from "next/font/google";

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Itialian Dolomites, surrounded by beautiful mountains and dark forests.",
};

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-linear-to-br from-[#09090f] via-[#141427] to-[#1a1a3a]
 text-primary-100 ${josefin.className} min-h-screen grid grid-cols-1 md:grid-cols-[auto_1fr]`}
      >
        <AuthProviders>
          <ReservationProvider>
            <SideNavigation />
            <main className="">
              <div className="w-full ">
                <div className="md:hidden">
                  <MobileNavigation />
                </div>
                <div className="max-md:hidden flex justify-end border-b border-primary-800 py-3 px-10">
                  <Navigation />
                </div>
              </div>
              <div className="p-[2em_1em_60px_1em] md:p-[min(30px,7%)] mb-20">
                {children}
              </div>
            </main>
          </ReservationProvider>
        </AuthProviders>
      </body>
    </html>
  );
}
