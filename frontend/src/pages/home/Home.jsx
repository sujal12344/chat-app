import React from "react";
import MessageContainer from "../../components/messages/MessageContainer.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border-gray-100 border-[0.005px]">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
