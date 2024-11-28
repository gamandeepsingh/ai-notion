"use client";
import * as React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Image from "next/image";

const Header = () => {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between p-5 ">
      <div className="flex items-center  gap-1">
        <Image
          src="/logo.avif"
          width={50}
          height={50}
          objectFit="contain"
          alt="logo"
        />
        {user && (
          <h1 className="text-lg md:text-2xl font-medium">Welcome {user.fullName}</h1>
        )}
      </div>
      {/* BreadCrumb */}
      <div className="flex items-center gap-3">
        <SignedOut>
          <Button>
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <div className="hidden md:inline">
            <Button variant={"outline"}>
              <SignOutButton />
            </Button>
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
