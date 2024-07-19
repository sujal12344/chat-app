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
      const res = await fetch(`http://localhost:8000/api/auth/logout`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });

      let data = await res.json();
      console.log(`logout from the backend data: `, data);

      if (res.status === 500) {
        toast.error(data.message);
        return false;
      }

      if (res.status === 200) {
        localStorage.removeItem("chat-user");
        // document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        toast.success(data.message);
        // window.location.reload(); //isse page refresh ho jayega; jo ek achha UX nahi hai
        // window.location.replace('login');  //isse page '/login' pe redirect ho jayega
        setAuthUser(null);
        return true;
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
