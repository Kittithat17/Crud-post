'use client'
import { SignedOut, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
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
import { useEffect, useState } from "react";

const Signinbut = () => {
  const { user, isLoaded } = useUser();
  const [userRegistered, setUserRegistered] = useState(false);
  const [userRole, setUserRole] = useState<string>('user');
  
  useEffect(() => {
    // Once the user is loaded, register them in your database
    const registerUserAndGetRole = async () => {
      if (isLoaded && user) {
        try {
          console.log("Registering user:", user.id);
          
          // First, try to create the user
          const response = await fetch('http://localhost:1337/createUsers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              clerk_id: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              role: 'user' // Default role
            }),
          });
          
          // Whether the user was just created or already existed,
          // fetch their current role from your database
          const roleResponse = await fetch(`http://localhost:1337/getUserRole?clerk_id=${user.id}`);
          
          if (roleResponse.ok) {
            const roleData = await roleResponse.json();
            if (roleData.role) {
              setUserRole(roleData.role);
              console.log("User role:", roleData.role);
            }
          }
          
          setUserRegistered(true);
        } catch (error) {
          console.error("Error registering user or fetching role:", error);
        }
      }
    };
    
    registerUserAndGetRole();
  }, [isLoaded, user]);
  
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
          <DropdownMenuTrigger className="outline-none">
            <UserButton />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href="/orderhistory">Order History</Link>
            </DropdownMenuItem>

            {/* Only show Admin link if user has admin role */}
            {userRole === 'admin' && (
              <DropdownMenuItem>
                <Link href="/admin/users">Admin</Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem>
              <Link href="/address">Address</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SignedIn>
    </div>
  );
};

export default Signinbut;