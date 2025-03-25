"use client";
import SmokeEffectIndividual from "@/app/_components/SmokeEffects/SmokeEffectIndividual";
import { AssistantContext } from "@/app/context/AssistantContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AiModelOptions from "@/services/AiModelOptions";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Save, Trash } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import ConfirmationAlert from "./ConfirmationAlert";
import { BlurFade } from "@/components/magicui/blur-fade";
import MotionWrapperDelay from "@/app/_components/FramerMotionStuff/MotionWrapperDelay";

function AssistantSettings() {
  const { assistant, setAssistant } = useContext(AssistantContext);

  const [loading, setLoading] = useState(false);

  const UpdateAssistant = useMutation(
    api.userAiAssistants.UpdateUserAiAssistant
  );

  const DeleteAssistant = useMutation(api.userAiAssistants.DeleteAssistant);

  const onHandleInputChange = (field: string, value: string) => {
    setAssistant((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSave = async () => {
    setLoading(true);
    const result = await UpdateAssistant({
      id: assistant?._id,
      aiModelId: assistant?.aiModelId,
      userInstruction: assistant?.userInstruction,
    });
    toast("Saved");
    setLoading(false);
  };

  const onDelete = async () => {
    setLoading(true);
    await DeleteAssistant({
      id: assistant?._id,
    });
    setAssistant(null);
    setLoading(false);
    toast("Deleted");
  };

  return (
    assistant && (
      <div className="p-5 gradient-background2 h-screen relative flex flex-col">
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
          <h2 className="font-bold text-xl text-white text-center">Settings</h2>
        </MotionWrapperDelay>

        <BlurFade delay={0.25} inView>
          <div className="mt-4 flex gap-3 items-center justify-center">
            <Image
              src={assistant?.image}
              alt={assistant.name}
              height={100}
              width={100}
              className="border rounded-xl p-1 h-[80px] w-[80px] "
            />
            <div>
              <h2 className="text-white font-bold">{assistant?.name}</h2>
              <p className="text-white text-sm">{assistant?.title}</p>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.25 * 2} inView>
          <div className="mt-4">
            <h2 className="text-white text-center mb-1">Model:</h2>
            <Select
              defaultValue={assistant.aiModelId}
              onValueChange={(value) => onHandleInputChange("aiModelId", value)}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                {AiModelOptions.map((model, index) => (
                  <SelectItem value={model.name} key={index}>
                    <div className="flex gap-2 items-center m-1">
                      <Image
                        src={model.logo}
                        alt={model.name}
                        height={20}
                        width={20}
                        className="rounded-lg"
                      />
                      <h2>{model.name}</h2>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </BlurFade>
        <BlurFade delay={0.5 * 2} inView>
          <div className="mt-4">
            <h2 className="text-white text-center mb-1">Instructions:</h2>
            <Textarea
              className="text-white h-[180px]"
              placeholder="Add Instructions"
              value={assistant?.userInstruction}
              onChange={(e) =>
                onHandleInputChange("userInstruction", e.target.value)
              }
            />
          </div>
        </BlurFade>

        {/* Flex spacer to push buttons to bottom */}

        <BlurFade delay={0.5 * 3} inView>
          {/* Button container centered in parent div */}
          <div className="flex flex-col items-center gap-3 py-10">
            <ConfirmationAlert onDelete={onDelete}>
              <Button
                variant="sex2"
                className="w-48 flex items-center justify-center gap-2"
                disabled={loading}
              >
                <Trash size={18} /> Delete
              </Button>
            </ConfirmationAlert>

            <Button
              onClick={onSave}
              variant="sex1"
              className="w-48 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              Save
            </Button>
          </div>
        </BlurFade>
      </div>
    )
  );
}

export default AssistantSettings;
