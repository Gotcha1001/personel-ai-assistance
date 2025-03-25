"use client";
import SmokeEffect from "@/app/_components/SmokeEffects/SmokeEffect";
import { AuthContext } from "@/app/context/AuthContext";
import { Particles } from "@/components/magicui/particles";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

function SignIn() {
  const CreateUser = useMutation(api.users.CreateUser);
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);

      if (typeof window !== undefined) {
        localStorage.setItem("user_token", tokenResponse.access_token);
      }
      const user = await GetAuthUserData(tokenResponse.access_token);

      // Save User Info
      const result = await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
      });

      setUser(result);
      router.replace("/ai-assistants");
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className="flex items-center flex-col justify-center h-screen gradient-background2 ">
      <div className="flex flex-col items-center gap-5 border rounded-2xl p-10  shadow-neon">
        <SmokeEffect isVisible={true} />
        <Image
          className=" zoom"
          src="/logo.svg"
          alt="logo"
          height={100}
          width={100}
        />
        <h2 className="text-2xl text-white">
          Sign In To AI Personal Assitant & Agent
        </h2>
        <Button onClick={() => googleLogin()}>Sign In With Gmail</Button>
      </div>
      <Particles
        className="absolute inset-0 z-5"
        quantity={200}
        ease={80}
        color="#218ebd"
        refresh
      />
    </div>
  );
}

export default SignIn;
