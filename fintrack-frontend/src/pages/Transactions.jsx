import { useEffect, useState } from "react";
import api from "../api/axios";
import { Plus, Trash2 } from "lucide-react";
import useBudgetCategories from "../hooks/useBudgetCategories";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    account_id: "",
    type: "Income",
    category: "",
    amount: "",
    note: "",
  });

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // FETCH
  const fetchTransactions = async () => {
    const res = await api.get("/transactions", { headers });
    setTransactions(res.data);
  };

  const fetchAccounts = async () => {
  const res = await api.get("/accounts", {
    headers,
  });

  setAccounts(res.data);
};

  useEffect(() => {
    fetchTransactions();
    fetchAccounts();
  }, []);

  // CREATE
 const handleAdd = async () => {
  try {
    await api.post(
      "/transactions",
      form,
      { headers }
    );

    alert("Transaction Added");

    setShowModal(false);

    fetchTransactions();
  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message ||
      "Transaction Failed"
    );
  }
};

  // DELETE
  const handleDelete = async (id) => {
    await api.delete(`/transactions/${id}`, { headers });
    fetchTransactions();
  };

  const budgetCategories = useBudgetCategories(); 
  console.log("Budget categories:", budgetCategories);

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Transactions</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#1a56db] text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-lg overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Note</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-t">

                <td className="p-3">{t.type}</td>
                <td className="p-3">{t.category}</td>

                <td
                  className={`p-3 font-semibold ${
                    t.type === "Income"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  ₹{t.amount}
                </td>

                <td className="p-3">{t.note}</td>

                <td className="p-3">
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-[400px]">

            <h2 className="text-lg font-semibold mb-4">
              Add Transaction
            </h2>
            <select
  className="w-full border p-2 mb-2"
  value={form.account_id}
  onChange={(e) =>
    setForm({
      ...form,
      account_id: e.target.value,
    })
  }
>
  <option value="">
    Select Account
  </option>

  {accounts.map((acc) => (
    <option
      key={acc.id}
      value={acc.id}
    >
      {acc.account_name}
    </option>
  ))}
</select>

            <select
              className="w-full border p-2 mb-2"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <option>Income</option>
              <option>Expense</option>
              <option>Transfer</option>
            </select>

            <select
  className="w-full border p-2 mb-2"
  value={form.category}
  onChange={(e) =>
    setForm({
      ...form,
      category: e.target.value,
    })
  }
>
  <option value="">Select Category</option>

  {budgetCategories.map((cat) => (
    <option key={cat} value={cat}>
      {cat}
    </option>
  ))}
</select>

            <input
              placeholder="Amount"
              className="w-full border p-2 mb-2"
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
            />

            <input
              placeholder="Note"
              className="w-full border p-2 mb-2"
              onChange={(e) =>
                setForm({ ...form, note: e.target.value })
              }
            />

            <div className="flex gap-2">

  <button
    onClick={handleAdd}
    className="flex-1 bg-[#1a56db] text-white py-2 rounded"
  >
    Save
  </button>

  <button
    onClick={() => setShowModal(false)}
    className="flex-1 bg-gray-300 py-2 rounded"
  >
    Cancel
  </button>

 </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Transactions;