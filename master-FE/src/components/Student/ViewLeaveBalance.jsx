import { useEffect, useState } from "react";
import { getLeaveBalanceApi } from "../../services/apiCall";

export default function ViewLeaveBalance() {
  const [leaveBalanceData, setLeaveBalanceData] = useState([]);

  useEffect(() => {
    const fetchLeaveBalanceData = async () => {
      try {
        const response = await getLeaveBalanceApi();
        const { data } = response.data;
        setLeaveBalanceData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLeaveBalanceData();
  }, []);

  return (
    <section className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg px-5 py-6 sm:px-7.5 xl:py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Your Leave Balance
        </h1>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-indigo-500 text-left text-white">
                <th className="min-w-[120px] py-4 px-4 font-medium xl:pl-11 border border-gray-200">Total Leave</th>
                <th className="min-w-[120px] py-4 px-4 font-medium border border-gray-200">Available Leave</th>
                <th className="min-w-[120px] py-4 px-4 font-medium border border-gray-200">Used Leave</th>
                <th className="min-w-[150px] py-4 px-4 font-medium border border-gray-200">Total Working Days</th>
                <th className="min-w-[150px] py-4 px-4 font-medium border border-gray-200">Academic Year</th>
                <th className="min-w-[180px] py-4 px-4 font-medium border border-gray-200">Attendance Percentage</th>
              </tr>
            </thead>
            <tbody>
              {leaveBalanceData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-5 px-4 border border-gray-200">
                    <h5 className="font-medium text-gray-800">No Data Found</h5>
                  </td>
                </tr>
              ) : (
                leaveBalanceData.map(data => (
                  <tr key={data.id} className="hover:bg-slate-100">
                    <td className="border border-gray-200 py-4 px-4">{data.totalLeave}</td>
                    <td className="border border-gray-200 py-4 px-4">{data.availableLeave}</td>
                    <td className="border border-gray-200 py-4 px-4">{data.usedLeave}</td>
                    <td className="border border-gray-200 py-4 px-4">{data.totalWorkingDays}</td>
                    <td className="border border-gray-200 py-4 px-4">{data.academicYear}</td>
                    <td className="border border-gray-200 py-4 px-4">{data.attendancePercentage}</td>
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
