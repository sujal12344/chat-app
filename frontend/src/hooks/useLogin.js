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
        `https://chat-app-fyek.onrender.com/api/auth/login`,
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
      const { message, loggedInUser } = data;
      console.log(`from the backend data: `, data);
      if (res.status === 200) {
        toast.success(message);
        localStorage.setItem("chat-user", JSON.stringify(loggedInUser));
        setAuthUser(loggedInUser);
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
  return { loading, login };
};

export default useLogin;
