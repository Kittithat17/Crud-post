
import CartSign from "./CartSign";
import { DarkModee } from "./DarkModee";
import Logo from "./Logo";

import Searchbar from "./Searchbar";
import { Sideleft } from "./Sideleft";
import Signinbut from "./Signinbut";



const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
      <div className="flex border-b py-3 px-26 justify-between">
        <div className="flex gap-6">
          {/* Sideleft */}
          <Sideleft />
          {/* Logo */}
          <Logo />
        </div>

        <Searchbar />

        <div className="flex gap-7">
          <DarkModee />
          <CartSign />
          <Signinbut />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

