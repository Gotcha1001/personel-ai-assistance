import FeatureMotionWrapper from "@/app/_components/FramerMotionStuff/FeatureMotionWrapper";

import { AssistantContext } from "@/app/context/AssistantContext";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { ChevronRight } from "lucide-react";
import React, { useContext } from "react";

function EmptyChatState() {
  const { assistant, setAssistant } = useContext(AssistantContext);

  return (
    <div className="flex flex-col items-center">
      <SparklesText
        className="text-4xl text-center"
        text="How Can I Assist You ?"
      />
      <div className="mt-7 space-y-3">
        {assistant?.sampleQuestions.map((suggestion: string, index: number) => (
          <FeatureMotionWrapper index={index} key={index}>
            <BlurFade delay={0.25 * index} key={suggestion}>
              <div>
                <h2 className="p-4 text-white text-lg gradient-background2 hover:scale-110 transition-all  border rounded-xl mt-1 cursor-pointer flex items-center justify-between gap-10">
                  {/* <TriangleMandalas3 /> */}
                  {suggestion}
                  <ChevronRight />
                </h2>
              </div>
            </BlurFade>
          </FeatureMotionWrapper>
        ))}
      </div>
    </div>
  );
}

export default EmptyChatState;
