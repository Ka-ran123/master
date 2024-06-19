import { useEffect, useState } from "react";
import { getLeaveStatusApi } from "../../services/apiCall";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ViewLeave() {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeavdData = async () => {
      try {
        setTimeout(async () => {
          const response = await getLeaveStatusApi();
          const { data } = response.data;
          console.log(data);
          setLeaveData(data);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.log(error.response);
        setLoading(false);
      }
    };
    fetchLeavdData();
  }, []);

  return (
    <section className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg px-5 py-6 sm:px-7.5 xl:py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Your Leave
        </h1>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-indigo-500 text-left text-white">
                <th className="min-w-[220px] py-4 px-4 font-medium xl:pl-11">
                  Start Date
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium">
                  End Date
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium">
                  Leave Type
                </th>
                <th className="py-4 px-4 font-medium">Reason</th>
                <th className="py-4 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="border-b border-gray-200 py-5 px-4"
                  >
                    <Skeleton
                      count={5}
                      height={30}
                      style={{
                        backgroundColor: "#e5e7eb",
                        borderRadius: "4px",
                        marginBottom: "8px",
                        animation: "pulse 2s infinite ease-in-out",
                      }}
                    />
                  </td>
                </tr>
              ) : leaveData.length === 0 ? (
                <tr className="hover:bg-slate-200">
                  <td
                    colSpan={5}
                    className="border-b text-center border-gray-200 py-5 px-4 pl-9 xl:pl-11"
                  >
                    <h5 className="font-medium text-gray-800 bg-yellow-100 py-2 px-4 rounded-md">
                      No Data Found
                    </h5>
                  </td>
                </tr>
              ) : (
                leaveData.map((leave, key) => (
                  <tr key={key} className="hover:bg-slate-200">
                    <td className="border-b border-gray-200 py-5 px-4 pl-9 xl:pl-11">
                      <h5 className="font-medium text-gray-800">
                        {leave.startDate}
                      </h5>
                    </td>
                    <td className="border-b border-gray-200 py-5 px-4">
                      <p className="text-gray-800">{leave.endDate}</p>
                    </td>
                    <td className="border-b border-gray-200 py-5 px-4">
                      <p className="text-gray-800">{leave.leaveType}</p>
                    </td>
                    <td className="border-b border-gray-200 py-5 px-4">
                      <p className="text-gray-800">{leave.reason}</p>
                    </td>
                    <td className="border-b border-gray-200 py-5 px-4">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          leave.status === "Approved"
                            ? "bg-green-950 text-green-800"
                            : leave.status === "Rejected"
                            ? "bg-red-950 text-red-800"
                            : "bg-yellow-950 text-yellow-800"
                        }`}
                      >
                        {leave.status}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ViewLeave;