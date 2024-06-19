import { useEffect, useState, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import useAuth from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const {user,logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [user, setUser] = useState({});
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { name, image } = user;

  const handleMenuClick = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-300 to-purple-400 min-h-[50px] px-3 flex justify-between items-center border-b-2 border-indigo-200">
      <div className="text-white font-bold">
        <a href="/" className="text-2xl text-[#999999] ml-5 hover:text-white">
          LMS
        </a>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center space-x-2 min-h-[50px] px-[9px] focus:outline-none hover:bg-gray-700"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img src={image} alt="Profile" className="w-8 h-8 rounded-full" />
          <span className="text-white">{name}</span>
          <FaChevronDown className="text-white ml-2" />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
            <button
              onClick={() => handleMenuClick("/profile")}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              My Profile
            </button>
            <button
              onClick={() => {
                logout();
                handleMenuClick("/signin");
              }}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// import { useEffect, useState } from "react";
// import { FaChevronDown } from "react-icons/fa";
// import useAuth from "../context/AuthProvider";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const {logout}=useAuth()
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const [user,setUser] = useState({});

//   useEffect(()=>{
//     const UserData=JSON.parse(localStorage.getItem('user'))
//     setUser(UserData)
//   },[setUser])

//   const {name,image}=user;

//   return (
//     <nav className="bg-slate-400  min-h-[50px] px-3 flex justify-between items-center">
//       <div className="text-white font-bold">
//         <a href="/" className="text-2xl text-[#999999] ml-5 hover:text-white">
//           LMS
//         </a>
//       </div>
//       <div className="relative hover:bg-gray-700">
//         <button
//           className="flex items-center space-x-2 min-h-[50px] px-[9px] focus:outline-none"
//           onClick={() => setDropdownOpen(!dropdownOpen)}
//         >
//           <img
//             src={image}
//             alt="Profile"
//             className="w-8 h-8 rounded-full"
//           />
//           <span className="text-white">{name}</span>
//           <FaChevronDown className="text-white ml-2" />
//         </button>
//         {dropdownOpen && (
//           <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
//             <Link
//               to="/profile"
//               className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
//             >
//               My Profile
//             </Link>
//             <Link
//               to="/signin"
//               onClick={logout}
//               className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
//             >
//               Logout
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
