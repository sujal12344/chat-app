import React from "react";

const Input = ({ labelName, type, value, onChangeFunction }) => {
  const id = labelName.replace(/\s+/g, '-').toLowerCase();
  return (
    <div>
      <label htmlFor={id} className="label p-2">
        <span className="text-base label-text text-white">{labelName}</span>
      </label>
      <input
        id={id}
        type={type}
        placeholder={`Enter ${labelName}`}
        className="w-full input input-bordered h-10 bg-[#cce1f9] text-violet-950"
        value={value}
        onChange={onChangeFunction}
      />
    </div>
  );
};

export default Input;
