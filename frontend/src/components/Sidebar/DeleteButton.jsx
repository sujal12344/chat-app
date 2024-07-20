import { MdDelete } from "react-icons/md";
import useDelete from "../../hooks/useDelete";

const DeleteButton = () => {
  const { loading, deleteAccount } = useDelete();

  const handleOnClick = async () => {
    console.log(`from frontend delete:`);
    const deleteOrNot = await deleteAccount();
    console.log(`deleteOrNot: `, deleteOrNot);
  };

  return (
    <div className="">
      {!loading ? (
        <MdDelete
          className="w-6 h-6 text-white cursor-pointer"
          onClick={handleOnClick}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default DeleteButton;
