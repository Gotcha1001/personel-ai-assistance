import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AiAssistantsList from "@/services/AiAssistantsList";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ASSISTANT } from "../../ai-assistants/page";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AiModelOptions from "@/services/AiModelOptions";
import { Textarea } from "@/components/ui/textarea";

import AssistantAvatar from "./AssistantAvatar";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/app/context/AuthContext";
import { AssistantContext } from "@/app/context/AssistantContext";
import { Loader2Icon } from "lucide-react";

const DEFAULT_ASSISTANT = {
  image: "/doctorsex.jpg",
  name: "",
  title: "",
  instruction: "",
  id: 0,
  sampleQuestions: [],
  userInstruction: "",
  aiModelId: "",
};

function AddNewAssistant({ children }: any) {
  const [selectedAssistant, setSelectedAssistant] =
    useState<ASSISTANT>(DEFAULT_ASSISTANT);

  const { assistant, setAssistant } = useContext(AssistantContext);

  const [loading, setLoading] = useState(false);

  const AddAssistant = useMutation(
    api.userAiAssistants.InsertSelectedAssistants
  );

  const { user } = useContext(AuthContext);

  const onHandleInputChange = (field: string, value: string) => {
    setSelectedAssistant((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSave = async () => {
    setLoading(true);
    if (
      !selectedAssistant?.name ||
      !selectedAssistant.title ||
      !selectedAssistant.userInstruction
    ) {
      toast("Please Enter All Details...");
      return;
    }
    const result = await AddAssistant({
      records: [selectedAssistant],
      uid: user?._id,
    });
    toast.success("New Assistant Added");
    setAssistant(null);
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto  scrollbar-hide">
        <DialogHeader>
          <DialogTitle>Add New Assistant</DialogTitle>
          <DialogDescription asChild>
            <div className="grid grid-cols-3 mt-5 gap-5">
              <div className="mt-5 border-r p-3">
                <Button
                  onClick={() => setSelectedAssistant(DEFAULT_ASSISTANT)}
                  variant="sex2"
                  className="w-full "
                  size={"sm"}
                >
                  + Create New Assistant
                </Button>
                <div className="mt-2">
                  {AiAssistantsList.map((assistant, index) => (
                    <BlurFade delay={0.25 * index} key={index}>
                      <div
                        className=" p-2 hover:bg-purple-900 rounded-lg flex gap-3 items-center"
                        onClick={() => setSelectedAssistant(assistant)}
                      >
                        <Image
                          src={assistant.image}
                          alt="Image"
                          width={60}
                          height={60}
                          className="w-[40px] h-[40px] object-cover rounded-lg"
                        />
                        <h2 className="text-sm">{assistant.title}</h2>
                      </div>
                    </BlurFade>
                  ))}
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex gap-5 ">
                  {selectedAssistant && (
                    <BlurFade delay={0.25 * 2} inView>
                      <AssistantAvatar
                        selectedImage={(v: string) =>
                          onHandleInputChange("image", v)
                        }
                      >
                        <Image
                          src={selectedAssistant?.image}
                          alt="DOC"
                          width={150}
                          height={150}
                          className="w-[200px] h-[200px] rounded-lg cursor-pointer object-cover"
                        />
                      </AssistantAvatar>
                    </BlurFade>
                  )}
                  <div className="flex flex-col gap-3 w-full">
                    <Input
                      value={selectedAssistant?.name}
                      placeholder="Name Of Assistant"
                      className="w-full"
                      onChange={(event) =>
                        onHandleInputChange("name", event.target.value)
                      }
                    />
                    <Input
                      value={selectedAssistant?.title}
                      placeholder="Title Of Assistant"
                      className="w-full"
                      onChange={(event) =>
                        onHandleInputChange("title", event.target.value)
                      } // ✅ Added onChange
                    />
                  </div>
                </div>
                <BlurFade delay={0.25 * 3} inView>
                  <div className="mt-3">
                    <h2 className="text-white text-center mb-1">Model:</h2>
                    <Select
                      defaultValue={selectedAssistant.aiModelId}
                      onValueChange={(value) =>
                        onHandleInputChange("aiModelId", value)
                      }
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
                <div className="mt-5">
                  <h2 className="text-gray-500 ">Instruction:</h2>
                  <Textarea
                    className="h-[200px] "
                    placeholder="Add Instructions"
                    value={selectedAssistant.userInstruction}
                    onChange={(event) =>
                      onHandleInputChange("userInstruction", event.target.value)
                    }
                  />
                </div>
                <div className="flex gap-5 mt-10 justify-center">
                  <DialogClose asChild>
                    <Button variant="sex1">Cancel</Button>
                  </DialogClose>

                  <Button onClick={onSave} variant="sex2" disabled={loading}>
                    {loading && <Loader2Icon className="animate-spin" />}
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewAssistant;
