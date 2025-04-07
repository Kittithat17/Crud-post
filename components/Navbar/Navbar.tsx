
import CartSign from "./CartSign";
import { DarkModee } from "./DarkModee";
import Logo from "./Logo";

import Searchbar from "./Searchbar";
import { Sideleft } from "./Sideleft";
import Signinbut from "./Signinbut";



const Navbar = () => {
  return (
       <nav className="sticky top-0 z-50 w-full bg-background">
      <div className="flex  py-4 px-26 justify-between">
        <div className="flex gap-6">
          {/* Sideleft */}
          <Sideleft />
          {/* Logo */}
          <Logo />
        </div>


        <div className="flex gap-7">
        <Searchbar />
          <DarkModee />
          <CartSign />
          <Signinbut />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

