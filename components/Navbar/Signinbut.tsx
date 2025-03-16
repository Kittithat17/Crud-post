import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "./Logout";
import Link from "next/link";

const Signinbut = () => {
  return (
    <div className="flex items-center">
      {/* ถ้ายังไม่ได้ sign in ให้แสดงปุ่ม sign-in */}
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign-in</Button>
        </SignInButton>
      </SignedOut>

      {/* ถ้า sign-in แล้วให้แสดง user profile พร้อม dropdown menu */}
      <SignedIn>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none ">
            <UserButton />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href="/orderhistory">Order History</Link>
            </DropdownMenuItem>

            <DropdownMenuItem><Link href="/admin/overview">Admin</Link>
             
              </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SignedIn>
    </div>
  );
};

export default Signinbut;
