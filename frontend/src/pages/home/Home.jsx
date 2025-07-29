import React, { useState } from "react";
import MessageContainer from "../../components/messages/MessageContainer.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import useConversation from "../../zustand/useConversation.js";
import useGroupGloablState from "../../zustand/useGroupGlobalState.js";

const Home = () => {
  const { selectedCon } = useConversation();
  const { selectedGroupCon } = useGroupGloablState();
  const [showMobileMessages, setShowMobileMessages] = useState(false);

  // Only on very small screens, show single panel
  const shouldShowMessages = selectedCon || selectedGroupCon;

  return (
    <div className="flex h-full rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border-gray-100 border-[0.005px]">
      {/* Very small screens only (< 480px): Toggle between sidebar and messages */}
      <div className="flex w-full min-[480px]:hidden">
        {!shouldShowMessages ? (
          <Sidebar onChatSelect={() => setShowMobileMessages(true)} />
        ) : (
          <MessageContainer onBackClick={() => setShowMobileMessages(false)} />
        )}
      </div>

      {/* All other screens (≥ 480px): Always show both panels - WhatsApp/Telegram style */}
      <div className="hidden min-[480px]:flex w-full h-full">
        {/* Chat Section - Fixed width like WhatsApp desktop */}
        <div className="w-60 min-[480px] sm:w-64 md:w-72 lg:w-80 flex-shrink-0 border-r border-slate-500">
          <Sidebar />
        </div>

        {/* Message Section - Takes remaining space */}
        <div className="flex-1 min-w-0">
          <MessageContainer />
        </div>
      </div>
    </div>
  );
};

export default Home;
