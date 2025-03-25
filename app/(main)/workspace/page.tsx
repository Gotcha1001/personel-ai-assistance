import React from "react";
import AssistantList from "./_components/AssistantList";
import AssistantSettings from "./_components/AssistantSettings";
import ChatUi from "./_components/ChatUi";

function WorkSpace() {
  return (
    <div className="h-screen fixed   w-full ">
      <div className="grid grid-cols-5">
        <div className="hidden md:block">
          {/*1 Assistant List */}
          <AssistantList />
        </div>
        <div className="md:col-span-4 lg:col-span-3">
          {/*2 Chat UI */}
          <ChatUi />
        </div>
        <div className="hidden lg:block ">
          <AssistantSettings />
          {/*3 Settings */}
        </div>
      </div>
    </div>
  );
}

export default WorkSpace;
