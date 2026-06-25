import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
 
const [stats, setStats] = useState({});
const [monthly, setMonthly] = useState([]);
const [recent, setRecent] = useState([]);
const [balance, setBalance] = useState(0);
const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  

  // FETCH ALL DATA
  const fetchDashboard = async () => {
    console.log("FETCH DASHBOARD RUNNING");

  
    try {
      const [
  statsRes,
  monthlyRes,
  recentRes,
  balanceRes,
  categoryRes
] = await Promise.all([
  api.get("/dashboard/stats", { headers }),
  api.get("/dashboard/monthly", { headers }),
  api.get("/dashboard/recent", { headers }),
  api.get("/dashboard/balance", { headers }),
  api.get("/dashboard/category", { headers }),
]);
      setStats(statsRes.data);
      setMonthly(monthlyRes.data);
      setRecent(recentRes.data);
      setBalance(balanceRes.data.totalBalance);
      setCategories(categoryRes.data.map(c => ({
  ...c,
  value: parseFloat(c.value)  // convert string → number
})));
    } catch (err) {
      console.log(err);
    }

    
  };

  
  

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
  console.log("MONTHLY DATA:", monthly);
}, [monthly]);

useEffect(() => {
  console.log("CATEGORIES:", categories);
}, [categories]);

const COLORS = [
  "#1a56db",
  "#16a34a",
  "#ef4444",
  "#f59e0b",
  "#8b5cf6",
];

  return (
    <div className="p-6 space-y-6">

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-lg border">
         <p className="text-gray-500">
         Total Balance
        </p>
 
         <h2 className="text-2xl font-bold text-[#1a56db]">
           ₹{balance}
        </h2>
     </div>

        <div className="bg-white p-4 rounded-lg border">
          <p className="text-gray-500">Total Income</p>
          <h2 className="text-2xl font-bold text-green-600">
            ₹{stats.totalIncome || 0}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <p className="text-gray-500">Total Expense</p>
          <h2 className="text-2xl font-bold text-red-500">
            ₹{stats.totalExpense || 0}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <p className="text-gray-500">Savings</p>
          <h2 className="text-2xl font-bold text-blue-600">
            ₹{stats.savings || 0}
          </h2>
        </div>

      </div>

      {/* MONTHLY TABLE (simple version first) */}
      {/* MONTHLY CHART */}
<div className="bg-white border rounded-lg p-4">
  <h2 className="font-semibold mb-4">Monthly Overview</h2>

  <div className="w-full h-80">
    <ResponsiveContainer width="100%" height="100%">

      <BarChart data={monthly}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />
        <YAxis />

        <Tooltip />

        <Bar dataKey="income" fill="#16a34a" />
        <Bar dataKey="expense" fill="#ef4444" />
      </BarChart>

    </ResponsiveContainer>
  </div>
</div>

<div className="bg-white border rounded-lg p-4">
  <h2 className="font-semibold mb-4">
    Expense Breakdown
  </h2>

  <div className="w-full h-80">

    <ResponsiveContainer width="100%" height="100%">
      <PieChart>

        <Pie
          data={categories}
          dataKey="value"
          nameKey="category"
          outerRadius={120}
          label
        >

          {categories.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}

        </Pie>

        <Tooltip />

      </PieChart>
    </ResponsiveContainer>

  </div>
</div>

<div className="bg-white border rounded-lg p-4 mt-4">
  <h2 className="font-semibold mb-4">Trend Analysis</h2>

  <div className="w-full h-80">
    <ResponsiveContainer width="100%" height="100%">

      <LineChart data={monthly}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />
        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="income"
          stroke="#16a34a"
          strokeWidth={2}
        />

        <Line
          type="monotone"
          dataKey="expense"
          stroke="#ef4444"
          strokeWidth={2}
        />

      </LineChart>

    </ResponsiveContainer>
  </div>
</div>

      {/* RECENT TRANSACTIONS */}
      <div className="bg-white border rounded-lg p-4">
        <h2 className="font-semibold mb-3">Recent Transactions</h2>

        <ul className="space-y-2">
          {recent.map((t) => (
            <li
              key={t.id}
              className="flex justify-between border-b pb-2"
            >
              <span>
                {t.type} - {t.category}
              </span>

              <span
                className={
                  t.type === "Income"
                    ? "text-green-600"
                    : "text-red-500"
                }
              >
                ₹{t.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>

    
  );
};

export default Dashboard;