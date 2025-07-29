import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import useDelete from "../../hooks/useDelete";

const DeleteButton = () => {
  const { loading, deleteAccount } = useDelete();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsModalOpen(false);
    console.log("from frontend delete:");
    const deleteOrNot = await deleteAccount();
    console.log("deleteOrNot: ", deleteOrNot);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      {!loading ? (
        <>
          <MdDelete
            className="w-6 h-6 text-white cursor-pointer rotate-180"
            onClick={handleOnClick}
          />
          <CustomModal
            isOpen={isModalOpen}
            onClose={handleCancel}
            onConfirm={handleConfirmDelete}
          />
        </>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default DeleteButton;

const CustomModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2>Are you sure you want to delete your account?</h2>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
