import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext, useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  // const { setAuthUser } = useAuthContext();
  const { authUser, setAuthUser } = useContext(AuthContext);

  const login = async ({ username, password }) => {
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return false;
    }
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${authUser?.jwt}`,
          },
          credentials: "include",
          body: JSON.stringify({ username, password }),
        }
      );

      let data = await res.json();
      console.log(`from the backend data: `, data);
      if (res.status === 404 || res.status === 401) {
        toast.error(data.message);
        return false;
      }
      if (res.status === 200) {
        toast.success(data.message);
        localStorage.setItem("chat-user", JSON.stringify(data));
        // document.cookie = `jwt=${data.jwt} sameSite=none httpOnly=true secure=true;`; //ye kisi kaam ka nahi rah gaya
        toast.success(data.jwt);
        setAuthUser(data);
        console.log(`authUser: `, authUser);
        return true;
      }
    } catch (error) {
      toast.error(error, { style: { width: "100%" } });
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;
