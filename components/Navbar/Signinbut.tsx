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

const URL = "https://webdatabase-ib7z.onrender.com";

const Signinbut = () => {
  const { user, isLoaded } = useUser();
  const [userRegistered, setUserRegistered] = useState(false);
  const [, setUserRole] = useState<string>('user');
  
  useEffect(() => {
    // Once the user is loaded, register them in your database
    const registerUserAndGetRole = async () => {
      if (isLoaded && user && !userRegistered) { // Change to !userRegistered to run once
        try {
          console.log("Registering user:", user.id);
          
          // First, try to create the user
          const response = await fetch(`${URL}/createUsers`, {
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
          
          // Check the response status
          if (response.ok) {
            // User was created or already exists
            console.log("User registration successful");
            
            // Now fetch the user's role
            const roleResponse = await fetch(`${URL}/getUserRole?clerk_id=${user.id}`);
            
            if (roleResponse.ok) {
              const roleData = await roleResponse.json();
              if (roleData.role) {
                setUserRole(roleData.role);
                console.log("User role:", roleData.role);
              }
            } else {
              console.error("Failed to fetch user role:", await roleResponse.text());
            }
            
            setUserRegistered(true);
          } else {
            console.error("Failed to register user:", await response.text());
          }
        } catch (error) {
          console.error("Error registering user or fetching role:", error);
        }
      }
    };
    
    registerUserAndGetRole();
  }, [isLoaded, user, userRegistered]); // Add userRegistered to dependencies
  
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
           
              <DropdownMenuItem>
                <Link href="/admin/products">Admin</Link>
              </DropdownMenuItem>
            
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