import React, { useEffect, useState } from "react";
import { MdGroupAdd } from "react-icons/md";
import useGroupGloablState from "../../zustand/useGroupGlobalState";

const CreateGroup = () => {
  const { selectGroup, setSelectGroup } = useGroupGloablState();

  const toggleModal = async () => {
    await setSelectGroup(!selectGroup);
  };

  return (
    <div className="rotate-[112.5deg]">
      <MdGroupAdd
        className="w-6 h-6 text-white cursor-pointer ml-2 "
        onClick={toggleModal}
      />
    </div>
  );
};

export default CreateGroup;
