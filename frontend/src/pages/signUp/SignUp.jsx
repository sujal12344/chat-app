import React, { useState } from "react";
import { Link } from "react-router-dom";
import GenderCheckBox from "./GenderCheckBox";
import Input from "../../components/Input.jsx";
import useSignUp from "../../hooks/useSignUp.js";
import Button from "../../components/Button.jsx";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    DOB: "",
  });

  const { loading, signup } = useSignUp();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(`from frontend:`, inputs);
    const sigupOrNot = await signup(inputs);
    console.log(`sigupOrNOt: `, sigupOrNot);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300 selection:text-blue-700 selection:bg-none">
          Sign Up{" "}
          <span className="text-blue-500 selection:text-white selection:bg-blue-700 ">
            ChatApp
          </span>
        </h1>

        <form onSubmit={handleOnSubmit} method="POST">
          <Input
            labelName="Full Name"
            type="text"
            value={inputs.fullName}
            onChangeFunction={(e) =>
              setInputs({ ...inputs, fullName: e.target.value })
            }
          />
          <Input
            labelName="Username"
            type="text"
            value={inputs.username}
            onChangeFunction={(e) =>
              setInputs({ ...inputs, username: e.target.value })
            }
          />
          <Input
            labelName="Password"
            type="password"
            value={inputs.password}
            onChangeFunction={(e) =>
              setInputs({ ...inputs, password: e.target.value })
            }
          />
          <Input
            labelName="Confirm Password"
            type="password"
            value={inputs.confirmPassword}
            onChangeFunction={(e) =>
              setInputs({ ...inputs, confirmPassword: e.target.value })
            }
          />
          <Input
            labelName="Date of Birth"
            type="date"
            value={inputs.DOB}
            onChangeFunction={(e) =>
              setInputs({ ...inputs, DOB: e.target.value })
            }
          />
          
          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white visited:bg-black hover:font-semibold"
          >
            Already have an account?
          </Link>

          <GenderCheckBox
            selectedGender={inputs.gender}
            onCheckBoxChange={(gender) => setInputs({ ...inputs, gender })}
          />

          <div>
            <Button loading={loading} content={"Sign Up"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
