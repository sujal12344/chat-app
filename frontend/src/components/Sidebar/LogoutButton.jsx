import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
// import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

	const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(`from frontend logout:`);
		const logoutOrNOt = await logout()
		console.log(`logoutOrNOt: `, logoutOrNOt);
  };
  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={handleOnSubmit}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};
export default LogoutButton;
