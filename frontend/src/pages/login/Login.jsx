import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import useLogin from "../../hooks/useLogin";
import LoginViaProviders from "./LoginViaProviders";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(`from frontend:`, { username, password });
    const loginOrNot = await login({ username, password });
    console.log(`loginOrNOt: `, loginOrNot);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300 selection:text-blue-700 selection:bg-none">
          {"Login "}
          <span className="text-blue-500 selection:text-white selection:bg-blue-700 ">
            ChatApp
          </span>
        </h1>

        <form onSubmit={handleOnSubmit} method="POST">
          <Input
            labelName="Username"
            type="text"
            value={username}
            onChangeFunction={(e) => setUsername(e.target.value)}
          />

          <Input
            labelName="Password"
            type="password"
            value={password}
            onChangeFunction={(e) => setPassword(e.target.value)}
          />

          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white visited:bg-black hover:font-semibold"
          >
            {"Don't have an account?"}
          </Link>

          <div>
            <Button loading={loading} content={"Login"} />
          </div>
        </form>
        <LoginViaProviders />
      </div>
    </div>
  );
};

export default Login;
