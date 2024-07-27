import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginViaProviders = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="w-full mt-4 bg-white text-black hover:bg-blue-700/20 font-bold py-1 px-4 rounded"
    >
      Log In via providers
    </button>
  );
};

export default LoginViaProviders;
