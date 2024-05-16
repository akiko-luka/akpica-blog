import { NavLink } from "react-router-dom";

// icons
import { FaMagnifyingGlass } from "react-icons/fa6";

const Navbar = () => {
  const linkStyles =
    "pl-4 text-akpica-white hover:underline-offset-8 hover:underline transition transform font-semibold";

  return (
    <div className="flex items-center justify-between px-5 w-[30rem]">
      <nav className="flex items-center justify-center gap-5 text-lg">
        <NavLink className={linkStyles} to={"/"}>Home</NavLink>
        <NavLink className={linkStyles}>Features</NavLink>
        <NavLink className={linkStyles}>Blogs</NavLink>
        <NavLink className={linkStyles}>Services</NavLink>
        <NavLink className={linkStyles} to={"/dh-admin/login"}>Login</NavLink>
      </nav>

      <div className="text-lg pl-5 text-akpica-white">
        <FaMagnifyingGlass />
      </div>
    </div>
  );
};
export default Navbar;