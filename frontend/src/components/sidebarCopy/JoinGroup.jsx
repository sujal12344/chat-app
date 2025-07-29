import React, { useState } from "react";
import { FaUsers } from "react-icons/fa"; // Import users icon from react-icons for the group
// import JoinGroup from "./JoinGroup"; // Import your existing JoinGroup component

const JoinGroupIcon = () => {
  const [isJoinGroupVisible, setIsJoinGroupVisible] = useState(false);

  // Toggle join group modal visibility
  const toggleJoinGroup = () => {
    setIsJoinGroupVisible(!isJoinGroupVisible);
  };

  return (
    <>
      <FaUsers
        className="join-group-icon text-white rotate-[135deg]"
        onClick={toggleJoinGroup}
        style={{ fontSize: "24px", cursor: "pointer" }}
      />
      {isJoinGroupVisible && (
        <div className="join-group-modal">
          {/* <JoinGroup /> */}
          <button onClick={toggleJoinGroup}>Close</button>
        </div>
      )}
    </>
  );
};

export default JoinGroupIcon;
