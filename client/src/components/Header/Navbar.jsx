import { NavLink } from "react-router-dom";
import { useContext } from "react";

// icons
import { FaMagnifyingGlass, FaBars } from "react-icons/fa6";
import { ToggleContext } from "@contexts/ToggleContext.jsx";

const Navbar = ({ scrolling }) => {
  const { isToggle, handleToggle } = useContext(ToggleContext);

  const linkStyles = `pl-4 hover:underline-offset-8 hover:underline transition transform active:text-akpica-pastel font-semibold ${
    scrolling ? "text-akpica-white" : "text-akpica-black"
  }`;
  const mobileLinkStyles = `flex flex-col items-center p-4 hover:underline-offset-8 hover:underline transition transform active:text-akpica-pastel font-semibold ${
    scrolling ? "text-akpica-white" : "text-akpica-black"
  }`;

  return (
    <div className="flex items-center justify-between px-5">
      <nav className="md:flex items-center justify-center gap-5 text-lg hidden">
        <NavLink className={linkStyles} to={"/"}>
          Home
        </NavLink>
        <NavLink className={linkStyles} to={"/features"}>
          Features
        </NavLink>
        <NavLink className={linkStyles} to={"/blogs"}>
          Blogs
        </NavLink>
        <NavLink className={linkStyles} to={"/services"}>
          Services
        </NavLink>
        <NavLink className={linkStyles} to={"/dh-admin/login"}>
          Login
        </NavLink>
      </nav>

      <div
        className={`md:hidden flex gap-6 text-lg pl-5 ${
          scrolling ? "text-akpica-white" : "text-akpica-black"
        }`}
      >
        <FaBars onClick={handleToggle} />
      </div>

      {isToggle && (
        <nav
          className={`absolute md:hidden flex flex-col items-center gap-4 text-lg z-10 top-[62px] px-8 ${
            scrolling ? "bg-akpica-black" : "bg-akpica-white"
          }`}
        >
          <div onClick={isToggle}>
            <NavLink className={mobileLinkStyles} to={"/"}>
              Home
            </NavLink>
            <NavLink className={mobileLinkStyles} to={"/features"}>
              Features
            </NavLink>
            <NavLink className={mobileLinkStyles} to={"/blogs"}>
              Blogs
            </NavLink>
            <NavLink className={mobileLinkStyles} to={"/services"}>
              Services
            </NavLink>
            <NavLink className={mobileLinkStyles} to={"/dh-admin/login"}>
              Login
            </NavLink>
          </div>
        </nav>
      )}

      <div
        className={`flex gap-6 text-lg pl-5 cursor-pointer active:text-akpica-pastel ${
          scrolling ? "text-akpica-white" : "text-akpica-black"
        }`}
      >
        <FaMagnifyingGlass />
      </div>
    </div>
  );
};

export default Navbar;
