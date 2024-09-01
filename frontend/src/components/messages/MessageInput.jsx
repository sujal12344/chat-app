import { RiSendPlaneFill } from "react-icons/ri";
import useSendMessage from "../../hooks/useSendMessage";
import { useState } from "react";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const { loading, sendMessage } = useSendMessage();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const messageSendOrNot = await sendMessage(message);
    setMessage("");
    console.log("Message sent", messageSendOrNot);
  };

  return (
    <form className="px-4 my-3" onSubmit={handleOnSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-[#0e0e34] border-gray-600 text-[#f1f1f1]"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 text-white loading"></span>
          ) : (
            <RiSendPlaneFill className="h-5 w-5 md:h-6 md:w-6 text-white" />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
