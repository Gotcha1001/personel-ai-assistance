"use client";
import SmokeEffect from "@/app/_components/SmokeEffects/SmokeEffect";
import TriangleMandalas from "@/app/_components/SmokeEffects/TriangleMandalas";
import VortexMandalaSmokeEffect from "@/app/_components/SmokeEffects/VortexMandalaSmokeEffect";
import { AuthContext } from "@/app/context/AuthContext";
import { Particles } from "@/components/magicui/particles";

import Image from "next/image";
import React, { useContext } from "react";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    user && (
      <div className="relative p-10 flex items-center justify-between px-10">
        <SmokeEffect isVisible={true} />
        <TriangleMandalas />
        {/* <VortexMandalaSmokeEffect /> */}

        {/* Background inside the header only */}
        <div className="dynamic-bg absolute inset-0 opacity-100" />

        {/* Add Particles component with white color */}
        {/* <Particles
          className="absolute inset-0 z-5"
          quantity={50}
          ease={80}
          color="#218ebd"
          refresh
        /> */}

        <Image
          className="z-10 horizontal-rotate"
          src={"/logo.svg"}
          alt="logo"
          height={50}
          width={50}
        />
        {user?.picture && (
          <Image
            className="rounded-full z-10"
            src={user?.picture}
            alt="logo"
            height={50}
            width={50}
          />
        )}
      </div>
    )
  );
}

export default Header;
