import "@/app/_styles/globals.css";
import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
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
        className={`bg-primary-950 text-primary-100 min-h-screen flex flex-col ${josefin.className} relative`}
      >
        <AuthProviders>
          <Header />
          <MobileNavigation />
          <div className="py-8 px-4 sm:py-12 sm:px-8 flex-1 grid">
            <ReservationProvider>
              <main className="max-w-7xl mx-auto w-full">{children}</main>
            </ReservationProvider>
          </div>
        </AuthProviders>
      </body>
    </html>
  );
}
