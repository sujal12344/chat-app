import { BiLogOut } from "react-icons/bi";
// import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	// const { loading, logout } = useLogout();

  let loading = false;
  const logout = () => {
    console.log("Logout");
  };
	return (
		<div className='mt-auto'>
			{!loading ? 
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />: 
				<span className='loading loading-spinner'></span>
			}
		</div>
	);
};
export default LogoutButton;