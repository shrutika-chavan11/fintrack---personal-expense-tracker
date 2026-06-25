import { useEffect, useState } from "react";
import api from "../api/axios";

const Reports = () => {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchReports = async () => {
    try {
      const res = await api.get("/dashboard/monthly", { headers });
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDownloadPDF = async () => {
    try {
      const res = await api.get("/dashboard/monthly/pdf", {
        headers,
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "fintrack-report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckAlerts = async () => {
    try {
      const res = await api.get("/alerts", { headers });
      alert(
        res.data.length
          ? "⚠ Overspending detected in some categories"
          : "No alerts 🎉"
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-xl font-semibold">Monthly Reports</h1>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3">
        <button
          onClick={handleCheckAlerts}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Check Alerts
        </button>

        <button
          onClick={handleDownloadPDF}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Month</th>
              <th className="p-3">Income</th>
              <th className="p-3">Expense</th>
              <th className="p-3">Savings</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-400">
                  No data found
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-3">{item.month}</td>
                  <td className="p-3 text-green-600">₹{item.income}</td>
                  <td className="p-3 text-red-500">₹{item.expense}</td>
                  <td className="p-3 font-semibold text-blue-600">
                    ₹{(item.income - item.expense).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Reports;