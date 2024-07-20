import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext, useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  // const { setAuthUser } = useAuthContext();
  const { authUser, setAuthUser } = useContext(AuthContext);

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          credentials: "include",
        }
      );

      let data = await res.json();
      const { message } = data;
      console.log(`logout from the backend data: `, data);

      if (res.status === 200) {
        localStorage.removeItem("chat-user");
        toast.success(message);
        setAuthUser(null);
        return true;
      } else {
        toast.error(message);
        return false;
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, { style: { width: "100%" } });
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
