import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import CreateGroup from "./CreateGroup";
import DeleteButton from "./DeleteButton";
import ChatBot from "./ChatBot";
import JoinGroup from "./JoinGroup";
import Profile from "./Profile";

const RadialMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const option = [
    <DeleteButton />,
    <Profile />,
    <JoinGroup />,
    <CreateGroup />,
    <ChatBot />,
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      {isOpen ? (
        <IoCloseSharp
          className="cursor-pointer text-3xl w-6 h-6 text-white"
          onClick={toggleMenu}
        />
      ) : (
        <TiThMenu
          className="cursor-pointer text-3xl w-5 h-5 text-white"
          onClick={toggleMenu}
        />
      )}

      {isOpen && (
        <div className="absolute w-64 h-64 transform">
          {[...Array(5).keys()].map((i) => {
            const angle = -180 + i * (90 / (5 - 1));
            return (
              <button
                key={i}
                className="absolute origin-top-left text-white"
                style={{
                  transform: `rotate(${angle}deg) translate(85px)`,
                }}
                onClick={() => setIsOpen(false)}
              >
                {option[i]}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RadialMenu;
