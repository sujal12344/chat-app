import React, { useState } from "react";
import GenderCheckBox from "./GenderCheckBox";
import Input from '../components/Input.jsx'

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300 selection:text-blue-700 selection:bg-none">
          Sign Up{" "}
          <span className="text-blue-500 selection:text-white selection:bg-blue-700 ">
            ChatApp
          </span>
        </h1>
        <form action="">
          <Input
            labelName="Full Name"
            type="text"
            value={fullName}
            onChangeFunction={(e) => setFullName(e.target.value)}
          />
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
          <Input
            labelName="Confirm Password"
            type="password"
            value={confirmPassword}
            onChangeFunction={(e) => setConfirmPassword(e.target.value)}
          />

          <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white visited:bg-black hover:font-semibold">Already have an account?</a>
          
          <GenderCheckBox />

          <div>
            <button className="btn btn-block btn-sm mt-2 bg-blue-600 hover:bg-blue-600 h-8">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
