import React, { useState } from "react";
import { FaUser } from "react-icons/fa"; // Import user icon from react-icons for the profile
import Dropdown from "./Open";
// import JoinGroup from './JoinGroup'; // Assuming JoinGroup is your component for joining groups

const ProfileIcon = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <FaUser
        className="text-white rotate-[157.5deg]"
        onClick={toggleModal}
        style={{ fontSize: "24px", cursor: "pointer" }}
      />
      {true && (
        <div className="modal bg-black">
          {/* <Dropdown /> */}.
          <div className="">
            <span className="text-white">Profile</span>
            <h1 className="text-white">Name</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileIcon;
