import React, { useState } from "react";
import { MdGroupAdd } from "react-icons/md";
import useCreateGroup from "../../hooks/useCreateGroup";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import Conversation from "./Conversation";

const CreateGroup = () => {
  // const [groupName, setGroupName] = useState("");
  const [openAllConversations, setOpenAllConversations] = useState(false);

  const { createGroup, loading } = useCreateGroup();

  const { selectedCon, setSelectedCon } = useConversation();
  const { conversations, loading: conLoading } = useGetConversation();

  const handleCreateGroup = async (names) => {
    const result = await createGroup(names);
    console.log("Group created successfully, result", result);
  };

  const toggleModal = () => {
    setOpenAllConversations(!openAllConversations);
    // handleCreateGroup();
  };

  return (
    <div className="rotate-[112.5deg]">
      {openAllConversations &&
        conversations.map((conversation) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            forGroup
          />
        ))}
      <MdGroupAdd
        className="w-6 h-6 text-white cursor-pointer ml-2 "
        onClick={toggleModal}
      />
    </div>
  );
};

export default CreateGroup;
