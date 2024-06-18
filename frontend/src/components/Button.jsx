import React from "react";
// import useStore from "../zustand/useConversation.js";

const Button = ({ loading, content }) => {
  // const [text, fun] = useStore((state) => [state.counter, state.increaseCounter]);
  // console.log(`text: `, text);
  return (
    //<button onClick={fun}>Hello</button>
    <button
      className={`btn btn-block btn-sm mt-2 bg-blue-600 hover:bg-blue-600 h-8 ${
        loading && `bg-[#206ce6da]`
      }`}
      disabled={loading}
      style={loading ? { backgroundColor: "#206be6da" } : {}}
    >
      {loading ? (
        <span className="loading loading-spinner text-primary"></span>
      ) : (
        content
      )}
    </button>
  );
};

export default Button;
