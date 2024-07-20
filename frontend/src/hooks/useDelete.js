import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useContext(AuthContext);
  const userId = authUser?._id;

  const deleteAccount = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/delete/account/${userId}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
          credentials: "include",
        }
      );

      const data = await res.json();
      const { message } = data;

      if (res.status === 200) {
        toast.success(message, {
          style: { width: "100%" },
        });
        localStorage.removeItem("chat-user");
        setAuthUser(null);
      } else {
        toast.error(message, { style: { width: "100%" } });
        return false;
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, { style: { width: "100%" } });
    } finally {
      setLoading(false);
    }
    return true;
  };

  return { loading, deleteAccount };
};

export default useDelete;
