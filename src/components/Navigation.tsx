import { getSession } from "@/helpers/getSession";
import NavigationLinks from "./NavigationLinks";

export default async function Navigation() {
  const session = await getSession();

  return (
    <nav className="z-10 text-lg">
     <NavigationLinks session={session}/>
    </nav>
  );
}
