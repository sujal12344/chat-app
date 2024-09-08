import React, { useState } from "react";
import Conversation from "./Conversation.jsx";
import useGroupGloablState from "../../zustand/useGroupGlobalState.js";
import Button from "../ui/Button.jsx";
import useCreateGroup from "../../hooks/useCreateGroup.js";
import toast from "react-hot-toast";

const Conversations = ({ conversations, loading }) => {
  const { selectGroup, groupMembers } = useGroupGloablState();

  const [crtgrpLoad, setCrtgrpLoad] = useState(false);
  const [groupName, setGroupName] = useState();

  const { createGroup } = useCreateGroup();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!groupName || groupMembers.length < 2) {
      return toast.error("Please give group name or add atleast 2 member");
    }

    setCrtgrpLoad(true);

    const createGroupOrNot = await createGroup(groupName, groupMembers);
    setCrtgrpLoad(false);
    setGroupName("");
    console.log(`createGroupOrNot: `, createGroupOrNot);
  };

  return (
    <div className={`py-2 flex flex-col overflow-auto`}>
      {conversations.map((conversation) => (
        <Conversation key={conversation._id} conversation={conversation} />
      ))}

      {selectGroup && (
        <form
          className="flex flex-row items-center gap-2 py-2 px-px sm:px-1"
          onSubmit={handleOnSubmit}
        >
          <input
            type="text"
            className="border text-sm rounded-lg w-32 sm:w-48 max-h-8 p-2 mt-2 bg-[#0e0e34] border-gray-600 text-[#f1f1f1] grow"
            placeholder="Group Name"
            id={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <div className="justify-self-end">
            <Button loading={crtgrpLoad} content={"Create"} />
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-dvh text-white">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : null}
    </div>
  );
};

export default Conversations;
