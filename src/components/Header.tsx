import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="py-4 px-4 md:px-6 lg:py-5 lg:px-8 border-b border-b-primary-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}
