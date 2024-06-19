// src/pages/Dashboard.js

// src/pages/Dashboard.js

import { useEffect, useState } from "react";
import { FaFileAlt, FaUser, FaClipboardList } from "react-icons/fa";
import Card from "../Card";

const Dashboard = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className={`p-8 bg-gradient-to-r from-indigo-500 to-purple-500 min-h-[94vh]  transition-opacity duration-1000 flex flex-col items-center ${
        isMounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Student Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
        <Card
          title="Apply Leave"
          description="Request a leave of absence"
          icon={<FaFileAlt />}
        />
        <Card
          title="Leave Profile"
          description="View your leave profile"
          icon={<FaUser />}
        />
        <Card
          title="Apply Leave Again"
          description="Request another leave"
          icon={<FaClipboardList />}
        />
        <Card
          title="Another Card"
          description="Some other action"
          icon={<FaClipboardList />}
        />
      </div>
    </div>
  );
};

export default Dashboard;
