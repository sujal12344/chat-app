import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import useGroupGloablState from "../zustand/useGroupGlobalState";

const useGetGroupsCon = () => {
  const [loading, setLoading] = useState(false);
  const { groupsCon, setGroupsCon } = useGroupGloablState();

  useEffect(() => {
    const getGroupsCon = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/group`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const result = await JSON.parse(await res.text());
        console.log("result", result);
        if (res.status === 200) {
          const { message, groups } = result;
          toast.success(message);
          setGroupsCon(groups);
          return true;
        } else {
          toast.error(result.message);
          return false;
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message, { style: { width: "100%" } });
      } finally {
        setLoading(false);
      }
    };
    getGroupsCon();
  }, []);
  return { loading, groupsCon };
};

export default useGetGroupsCon;
