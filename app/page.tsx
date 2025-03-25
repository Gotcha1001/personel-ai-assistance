"use client";
import SignIn from "./(auth)/sign-in/page";
import SmokeEffect from "./_components/SmokeEffects/SmokeEffect";
import TriangleMandalas from "./_components/SmokeEffects/TriangleMandalas";
import VortexMandalaSmokeEffect from "./_components/SmokeEffects/VortexMandalaSmokeEffect";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background effects */}
      <SmokeEffect isVisible={true} />
      {/* <TriangleMandalas />
      <VortexMandalaSmokeEffect /> */}

      {/* SignIn component */}
      <SignIn />
    </div>
  );
}
