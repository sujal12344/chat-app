import { useState } from "react";
import toast from "react-hot-toast";

// const useGetMessageById = (_id) => {
//   const [loading, setLoading] = useState(false);

  const getMessagesById = async (_id) => {
    if (!_id) {
      toast.error("Please provide a id");
      return false;
    }
    // setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/messages/${_id}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          // credentials: "include",
        }
      );

      let data = await res.json();
      console.log(`Messages from the backend data: `, data);
      if (res.status !== 200) {
        toast.error(data.message);
        return false;
      }
      if (res.status === 200) {
        toast.success(data.message);
        return true;
      }
    } catch (error) {
      toast.error(error, { style: { width: "100%" } });
      return false;
    } 
    // finally {
    //   setLoading(false);
    // }
  };
//   getMessagesById(_id);
//   // return { loading, getMessagesById };
// };

export default getMessagesById;
