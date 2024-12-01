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
import Breadcrumbs from "./Breadcrumbs";

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
          <h1 className="text-lg md:text-2xl font-medium hidden md:flex">Welcome {user.fullName}</h1>
        )}
      </div>
      {/* BreadCrumb */}
      <Breadcrumbs/>
      <div className="flex items-center gap-3">
        <SignedOut>
          {/* <Button> */}
            <SignInButton />
          {/* </Button> */}
        </SignedOut>
        <SignedIn>
          <UserButton />
          <div className="hidden md:inline">
            <div className="border-2 px-2 py-1 rounded-md">
              <SignOutButton/>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
