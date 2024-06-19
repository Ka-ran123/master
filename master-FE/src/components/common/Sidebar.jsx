import { useState } from "react";
import {
  FaBars,
  FaTachometerAlt,
  FaBriefcase,
  FaChevronDown,
  FaChevronUp,
  FaFileAlt,
  FaEye,
  FaBalanceScale,
  FaCheck,
  FaUserCog,
  FaUserPlus,
  FaList,
  FaUserTie,
  FaUsersCog,
  FaChartLine,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../context/AuthProvider";

const Sidebar = () => {
  const { user } = useAuth();
  const { roleId } = user;

  const [isOpen, setIsOpen] = useState(true);
  const [isLeaveMenuOpen, setIsLeaveMenuOpen] = useState(false);
  const [isStudentMenuOpen, setIsStudentMenuOpen] = useState(false);
  const [isStaffMenuOpen, setIsStaffMenuOpen] = useState(false);
  const [isHodMenuOpen, setIsHodMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setIsLeaveMenuOpen(false);
    setIsStudentMenuOpen(false);
    setIsStaffMenuOpen(false);
    setIsHodMenuOpen(false);
  };

  const toggleLeaveMenu = () => {
    setIsLeaveMenuOpen(!isLeaveMenuOpen);
  };

  const toggleStudentMenu = () => {
    setIsStudentMenuOpen(!isStudentMenuOpen);
  };

  const toggleStaffMenu = () => {
    setIsStaffMenuOpen(!isStaffMenuOpen);
  };

  const toggleHodMenu = () => {
    setIsHodMenuOpen(!isHodMenuOpen);
  };

  function renderMenu() {
    switch (roleId) {
      case 4:
        return (
          <li className="hover:bg-gray-700 rounded-md p-2 transition-colors duration-300">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleLeaveMenu}
            >
              <FaBriefcase />
              <span className={`${isOpen ? "block" : "hidden"}`}>Leave</span>
              {isLeaveMenuOpen ? (
                <FaChevronUp className={`${isOpen ? "block" : "hidden"}`} />
              ) : (
                <FaChevronDown className={`${isOpen ? "block" : "hidden"}`} />
              )}
            </div>
            <ul
              className={`${
                isOpen && isLeaveMenuOpen ? "block" : "hidden"
              } ml-4 mt-2`}
            >
              <li className="hover:bg-gray-600 rounded-md p-2 transition-colors duration-300">
                <Link to="/applyleave" className="flex items-center space-x-2">
                  <FaFileAlt />
                  <span>Apply Leave</span>
                </Link>
              </li>
              <li className="hover:bg-gray-600 rounded-md p-2 transition-colors duration-300">
                <Link to="/viewleave" className="flex items-center space-x-2">
                  <FaEye />
                  <span>View Leave</span>
                </Link>
              </li>
              <li className="hover:bg-gray-600 rounded-md p-2 transition-colors duration-300">
                <Link
                  to="/viewleavebalance"
                  className="flex items-center space-x-2"
                >
                  <FaBalanceScale />
                  <span>View Leave Balance</span> {/* New menu item */}
                </Link>
              </li>
            </ul>
          </li>
        );
      case 2:
      case 3:
        return (
          <>
            <li className="hover:bg-gray-700 rounded-md p-2 transition-colors duration-300">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={toggleLeaveMenu}
              >
                <FaBriefcase />
                <span className={`${isOpen ? "block" : "hidden"}`}>Leave</span>
                {isLeaveMenuOpen ? (
                  <FaChevronUp className={`${isOpen ? "block" : "hidden"}`} />
                ) : (
                  <FaChevronDown className={`${isOpen ? "block" : "hidden"}`} />
                )}
              </div>
              <ul
                className={`${
                  isOpen && isLeaveMenuOpen ? "block" : "hidden"
                } ml-4 mt-2`}
              >
                <li className="hover:bg-gray-600 rounded-md p-2 transition-colors duration-300">
                  <a href="#" className="flex items-center space-x-2">
                    <FaEye />
                    <span>View Leave Status</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="hover:bg-gray-700 rounded-md p-2 transition-colors duration-300">
              <a href="#" className="flex items-center space-x-2">
                <FaCheck />
                <span className={`${isOpen ? "block" : "hidden"}`}>
                  Leave Approval
                </span>
              </a>
            </li>
          </>
        );
      default:
        return (
          <>
            <li className="hover:bg-gray-700 rounded-md p-2 transition-colors duration-300">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={toggleStudentMenu}
              >
                <FaUserCog />
                <span className={`${isOpen ? "block" : "hidden"}`}>
                  Manage Student
                </span>
                {isStudentMenuOpen ? (
                  <FaChevronUp className={`${isOpen ? "block" : "hidden"}`} />
                ) : (
                  <FaChevronDown className={`${isOpen ? "block" : "hidden"}`} />
                )}
              </div>
              <ul
                className={`${
                  isOpen && isStudentMenuOpen ? "block" : "hidden"
                } ml-4 mt-2`}
              >
                <li className="hover:bg-gray-600 rounded-md p-2 transition-colors duration-300">
                  <a href="#" className="flex items-center space-x-2">
                    <FaUserPlus />
                    <span>Add Student</span>
                  </a>
                </li>
                <li className="hover:bg-gray-600 rounded-md p-2 transition-colors duration-300">
                  <a href="#" className="flex items-center space-x-2">
                    <FaList />
                    <span>View Student Lists</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="hover:bg-gray-700 rounded-md p-2 transition-colors duration-300">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={toggleHodMenu}
              >
                <FaUserTie />
                <span className={`${isOpen ? "block" : "hidden"}`}>
                  Manage Hod
                </span>
                {isHodMenuOpen ? (
                  <FaChevronUp className={`${isOpen ? "block" : "hidden"}`} />
                ) : (
                  <FaChevronDown className={`${isOpen ? "block" : "hidden"}`} />
                )}
              </div>
              <ul
                className={`${
                  isOpen && isHodMenuOpen ? "block" : "hidden"
                } ml-4 mt-2`}
              >
                <li className="hover:bg-gray-600 rounded-md p-2 transition-colors duration-300">
                  <a href="#" className="flex items-center space-x-2">
                    <FaUserPlus />
                    <span>Add Hod</span>
                  </a>
                </li>
                <li className="hover:bg-gray-600 rounded-md p-2 transition-colors duration-300">
                  <a href="#" className="flex items-center space-x-2">
                    <FaList />
                    <span>View Hod Lists</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="hover:bg-gray-700 rounded-md p-2 transition-colors duration-300">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={toggleStaffMenu}
              >
                <FaUsersCog />
                <span className={`${isOpen ? "block" : "hidden"}`}>
                  Manage Staff
                </span>
                {isStaffMenuOpen ? (
                  <FaChevronUp className={`${isOpen ? "block" : "hidden"}`} />
                ) : (
                  <FaChevronDown className={`${isOpen ? "block" : "hidden"}`} />
                )}
              </div>
              <ul
                className={`${
                  isOpen && isStaffMenuOpen ? "block" : "hidden"
                } ml-4 mt-2`}
              >
                <li className="hover:bg-gray-600 rounded-md p-2 transition-colors duration-300">
                  <a href="#" className="flex items-center space-x-2">
                    <FaUserPlus />
                    <span>Add Staff</span>
                  </a>
                </li>
                <li className="hover:bg-gray-600 rounded-md p-2 transition-colors duration-300">
                  <a href="#" className="flex items-center space-x-2">
                    <FaList />
                    <span>View Staff Lists</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="hover:bg-gray-700 rounded-md p-2 transition-colors duration-300">
              <a href="#" className="flex items-center space-x-2">
                <FaChartLine />
                <span className={`${isOpen ? "block" : "hidden"}`}>
                  Leave Report
                </span>
              </a>
            </li>
          </>
        );
    }
  }
  return (
    <div
      className={`bg-gray-800 min-h-[94vh]  relative text-white   ${
        isOpen ? "w-60" : "w-16"
      } transition-width duration-300`}
    >
      <div className="p-4">
        <button onClick={toggleSidebar} className="focus:outline-none">
          <FaBars
            className={`text-white ${
              isOpen ? "absolute right-8" : "absolute right-[24px]"
            }`}
          />
        </button>
      </div>
      <nav>
        <ul
          className={`${
            isOpen ? "" : "flex flex-col justify-center items-center"
          }`}
        >
          <li className="hover:bg-gray-700 rounded-md p-2 transition-colors duration-300">
            <Link to="/student" className="flex items-center space-x-2">
              <FaTachometerAlt />
              <span className={`${isOpen ? "block" : "hidden"}`}>
                Dashboard
              </span>
            </Link>
          </li>
          {renderMenu()}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
