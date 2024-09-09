import { useState } from "react";
import toast from "react-hot-toast";

const useCreateGroup = () => {
  const [loading, setLoading] = useState(false);

  const createGroup = async (name, members, description) => {
    console.log(`from the createGroup hook: `, name, members);
    console.log(members.length);

    if (!name || !members || members.length === 0) {
      return false;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/group/create`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name, description, members }),
        }
      );

      let data = await res.json();
      // console.log(`from the backend data: `, data);
      const { message, newGroup } = data;
      if (res.status === 200) {
        toast.success(message);
        return true;
      } else {
        toast.error(message);
        return false;
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, { style: { width: "100%" } });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, createGroup };
};

export default useCreateGroup;