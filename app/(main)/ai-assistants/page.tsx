"use client";
import FeatureMotionWrapper from "@/app/_components/FramerMotionStuff/FeatureMotionWrapper";
import SmokeEffect from "@/app/_components/SmokeEffects/SmokeEffect";
import { Button } from "@/components/ui/button";
import AiAssistantsList from "@/services/AiAssistantsList";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { BlurFade } from "@/components/magicui/blur-fade";
import MotionWrapperDelay from "@/app/_components/FramerMotionStuff/MotionWrapperDelay";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/app/context/AuthContext";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export type ASSISTANT = {
  id: number;
  name: string;
  title: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
  aiModelId?: string;
};

function AIAssistants() {
  const [selectedAssistant, setSelectedAssistant] = useState<ASSISTANT[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { user } = useContext(AuthContext);

  const insertAssistant = useMutation(
    api.userAiAssistants.InsertSelectedAssistants
  );

  useEffect(() => {
    user && GetUserAssistants();
  }, [user]);

  const convex = useConvex();
  const GetUserAssistants = async () => {
    const result = await convex.query(
      api.userAiAssistants.GetAllUserAssistants,
      {
        uid: user._id,
      }
    );
    console.log(result);
    if (result.length > 0) {
      // Navigate to the New Screen
      router.replace("/workspace");
      return;
    }
  };

  const onSelect = (assistant: ASSISTANT) => {
    const item = selectedAssistant.find(
      (item: ASSISTANT) => item.id == assistant.id
    );
    if (item) {
      setSelectedAssistant(
        selectedAssistant.filter((item: ASSISTANT) => item.id !== assistant.id)
      );
      return;
    }
    setSelectedAssistant((prev) => [...prev, assistant]);
  };

  const IsAssistantSelected = (assistant: ASSISTANT) => {
    const item = selectedAssistant.find(
      (item: ASSISTANT) => item.id == assistant.id
    );
    return item ? true : false;
  };

  const OnClickContinue = async () => {
    setLoading(true);
    const result = await insertAssistant({
      records: selectedAssistant,
      uid: user?._id,
    });
    setLoading(false);
    console.log(result);
    if (result) {
      router.replace("/workspace");
    }
  };

  return (
    <div className="px-10 mt-20 md:px-28 lg:px-36 xl:px-48">
      <SmokeEffect isVisible={true} />
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
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
            <h2 className="text-3xl font-bold gradient-title text-center md:text-left">
              Welcome To The World Of AI Assistants...
            </h2>
          </MotionWrapperDelay>
          <BlurFade delay={0.25 * 2} inView>
            <p className="text-xl mt-2 text-center md:text-left">
              Choose Your AI Companion To Simplify Your Tasks 🤖
            </p>
          </BlurFade>
        </div>
        {/* <Button variant="sex" className="w-full md:w-auto">
          Continue
        </Button> */}
        <RainbowButton
          onClick={OnClickContinue}
          disabled={selectedAssistant?.length == 0 || loading}
        >
          {loading && <Loader2Icon className="animate-spin" />}
          Continue
        </RainbowButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {AiAssistantsList.map((assistant, index) => (
          <FeatureMotionWrapper key={index} index={index}>
            <BlurFade key={assistant.image} delay={0.25 + index * 0.05} inView>
              <div
                className="border border-transparent hover:border-gray-300 dark:hover:border-gray-700 p-2 rounded-xl flex flex-col items-center transform transition-transform duration-300 hover:scale-105 cursor-pointer relative"
                onClick={() => onSelect(assistant)}
              >
                <div className="flex justify-center relative">
                  <div className="absolute top-3 left-3 z-10">
                    <Checkbox
                      checked={IsAssistantSelected(assistant)}
                      className="h-5 w-5 rounded-sm border-2 border-white bg-transparent data-[state=checked]:bg-white data-[state=checked]:text-primary"
                    />
                  </div>
                  <Image
                    className="rounded-xl object-cover h-[300px] w-[300px]"
                    src={assistant.image}
                    alt={assistant.name}
                    height={600}
                    width={600}
                  />
                </div>
                <h2 className="text-center font-bold text-lg">
                  {assistant.name}
                </h2>
                <h2 className="text-center text-gray-800 dark:text-gray-300">
                  {assistant.title}
                </h2>
              </div>
            </BlurFade>
          </FeatureMotionWrapper>
        ))}
      </div>
    </div>
  );
}

export default AIAssistants;
