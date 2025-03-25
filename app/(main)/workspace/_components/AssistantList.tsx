"use client";
import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import { ASSISTANT } from "../../ai-assistants/page";

import Image from "next/image";
import SmokeEffect from "@/app/_components/SmokeEffects/SmokeEffect";
import SmokeEffectIndividual from "@/app/_components/SmokeEffects/SmokeEffectIndividual";
import { AssistantContext } from "@/app/context/AssistantContext";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import MotionWrapperDelay from "@/app/_components/FramerMotionStuff/MotionWrapperDelay";
import AddNewAssistant from "./AddNewAssistant";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserCircle2 } from "lucide-react";
import Profile from "./Profile";

function AssistantList() {
  const { user } = useContext(AuthContext);
  const convex = useConvex();

  const [assistantList, setAssistantList] = useState<ASSISTANT[]>([]);
  const [openProfile, setOpenProfile] = useState(false);

  const { assistant, setAssistant } = useContext(AssistantContext);

  useEffect(() => {
    user && GetUserAssistants();
  }, [user && assistant == null]);

  const GetUserAssistants = async () => {
    const result = await convex.query(
      api.userAiAssistants.GetAllUserAssistants,
      {
        uid: user._id,
      }
    );
    console.log(result);
    setAssistantList(result);
  };

  return (
    <div className="p-5 gradient-background2  h-screen relative ">
      <SmokeEffectIndividual isVisible={true} />
      <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, delay: 0.8 }}
        variants={{
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <h2 className="font-bold text-lg text-center text-white">
          Your Personal Assistants
        </h2>
      </MotionWrapperDelay>
      <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, delay: 0.8 }}
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <AddNewAssistant>
          <Button variant="sex2" className="w-full mt-3">
            +Add New Assistants
          </Button>
        </AddNewAssistant>
      </MotionWrapperDelay>

      <Input className="bg-white mt-4" placeholder="Search" />
      <div className="mt-8">
        {assistantList.map((assistant_, index) => (
          <BlurFade key={assistant_.image} delay={0.25 + index * 0.05} inView>
            <div
              className={`p-2 flex gap-3 items-center hover:bg-purple-950 to-purple-950 mt-2 rounded-lg cursor-pointer 
                ${assistant_.id == assistant?.id && "bg-purple-950"}
                `}
              key={index}
              onClick={() => setAssistant(assistant_)}
            >
              <Image
                src={assistant_.image}
                alt={assistant_.name}
                width={60}
                height={60}
                className="rounded-xl w-[60px] h-[60px] object-cover"
              />
              <div>
                <h2 className="text-white font-bold">{assistant_.name}</h2>
                <h2 className=" dark:text-indigo-600 text-sm text-yellow-300">
                  {assistant_.title}
                </h2>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="fixed bottom-10 text-white flex gap-3 items-center hover:bg-purple-950 p-2 rounded-lg cursor-pointer">
            {user?.picture ? (
              <Image
                className="rounded-full"
                src={user.picture}
                alt="User"
                height={40}
                width={40}
              />
            ) : (
              <div className="rounded-full bg-purple-900 h-10 w-10 flex items-center justify-center">
                {user?.name?.charAt(0) || "U"}
              </div>
            )}
            <div>
              <h2 className="text-white font-bold">{user?.name}</h2>
              <h2 className="text-sm">
                {user?.orderId ? "Pro Plan" : "Free Plan"}
              </h2>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenProfile(true)}>
            <UserCircle2 />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Profile openDialog={openProfile} setOpenDialog={setOpenProfile} />
    </div>
  );
}

export default AssistantList;
