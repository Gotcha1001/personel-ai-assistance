"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import EmptyChatState from "./EmptyChatState";
import TriangleMandalas3 from "@/app/_components/SmokeEffects/TriangleMandlas3";
import { AssistantContext } from "@/app/context/AssistantContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Send } from "lucide-react";
import AiModelOptions from "@/services/AiModelOptions";
import axios from "axios";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/app/context/AuthContext";
import { ASSISTANT } from "../../ai-assistants/page";

type MESSAGE = {
  role: string;
  content: string;
};

function ChatUi() {
  const [input, setInput] = useState<string>("");

  const { assistant, setAssistant } = useContext(AssistantContext);
  const [messages, setMessages] = useState<MESSAGE[]>([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<any>(null);

  const { user, setUser } = useContext(AuthContext);

  const UpdateTokens = useMutation(api.users.UpdateTokens);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([]);
  }, [assistant?.id]);

  const onSendMessage = async () => {
    setLoading(true);
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
      {
        role: "assistant",
        content: "Loading...",
      },
    ]);

    const userInput = input;
    setInput("");

    const AIModel = AiModelOptions.find(
      (item) => item.name == assistant.aiModelId
    );

    const result = await axios.post("/api/eden-ai-model", {
      provider: AIModel?.edenAi,
      userInput:
        userInput +
        ":" +
        assistant?.instruction +
        ":" +
        assistant?.userInstruction,
      aiResp: messages[messages?.length - 1]?.content,
    });

    setLoading(false);
    setMessages((prev) => prev.slice(0, -1));
    setMessages((prev) => [...prev, result.data]);
    updateUserToken(result.data?.content);
  };

  const updateUserToken = async (resp: string) => {
    const tokenCount = resp.trim() ? resp.trim().split(/\s+/).length : 0;
    console.log("TOKENCOUNT:", tokenCount);
    //Update User Token
    const result = await UpdateTokens({
      credits: user?.credits - tokenCount,
      uid: user?._id,
    });

    setUser((prev: ASSISTANT) => ({
      ...prev,
      credits: user?.credits - tokenCount,
    }));

    console.log("UPDATE..:", result);
  };

  return (
    <div className=" p-6 mt-10 relative h-[84vh] ">
      {/* <TriangleMandalas3 /> */}
      {messages?.length == 0 && <EmptyChatState />}

      <div
        ref={chatRef}
        className="h-[70vh] overflow-y-scroll pr-4 scrollbar-hide"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-3 ${msg.role == "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex gap-3 ">
              {msg.role == "assistant" && (
                <Image
                  src={assistant?.image}
                  alt="Name"
                  height={100}
                  width={100}
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
              )}

              <div
                className={`p-3 rounded-lg flex gap-3 ${msg.role == "user" ? "bg-gradient-to-r from-black via-white to-gray-400 text-black rounded-lg" : "bg-gray-50 text-black"}`}
              >
                {loading && messages?.length - 1 == index && (
                  <Loader2Icon className="animate-spin" />
                )}
                <h2>{msg.content}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between p-5 gap-5 absolute  bottom-5 w-[92%]">
        <Input
          className="bg-white"
          value={input}
          disabled={loading || user?.credits <= 0}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(e) => e.key == "Enter" && onSendMessage()}
          placeholder="Start Typing Here..."
        />
        <Button
          variant="sex2"
          onClick={onSendMessage}
          disabled={loading || user?.credits <= 0}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
}

export default ChatUi;
