import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AiAssistantsList from "@/services/AiAssistantsList";
import Image from "next/image";
import { BlurFade } from "@/components/magicui/blur-fade";

function AssistantAvatar({ children, selectedImage }: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-5 gap-2">
          {AiAssistantsList.map((assistant, index) => (
            <BlurFade delay={0.25 * index} key={index}>
              <Image
                key={index}
                src={assistant.image}
                alt="Image"
                height={80}
                width={80}
                className="w-[30px] h-[30px] rounded-xl object-cover cursor-pointer"
                onClick={() => selectedImage(assistant.image)}
              />
            </BlurFade>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default AssistantAvatar;
