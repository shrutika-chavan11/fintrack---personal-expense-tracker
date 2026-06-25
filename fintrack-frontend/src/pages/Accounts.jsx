import { useEffect, useState } from "react";
import api from "../api/axios";
import { Plus, Trash2 } from "lucide-react";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    account_name: "",
    bank_name: "",
    account_type: "Savings",
    balance: "",
    last_four_digits: "",
  });

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // ✅ FETCH ACCOUNTS
  const fetchAccounts = async () => {
    try {
      const res = await api.get("/accounts", { headers });
      setAccounts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // ✅ CREATE ACCOUNT
  const handleCreate = async () => {
    try {
      await api.post("/accounts", formData, { headers });

      setShowModal(false);
      setFormData({
        account_name: "",
        bank_name: "",
        account_type: "Savings",
        balance: "",
        last_four_digits: "",
      });

      fetchAccounts();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ DELETE ACCOUNT
  const handleDelete = async (id) => {
    try {
      await api.delete(`/accounts/${id}`, { headers });
      fetchAccounts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Accounts</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#1a56db] text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Add Account
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            <h2 className="font-semibold">{acc.account_name}</h2>
            <p className="text-sm text-gray-500">{acc.bank_name}</p>

            <div className="mt-2 text-sm">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                {acc.account_type}
              </span>
            </div>

            <p className="mt-3 text-lg font-bold">
              ₹{Number(acc.balance).toLocaleString("en-IN")}
            </p>

            <p className="text-xs text-gray-400">
              ****{acc.last_four_digits}
            </p>

            <button
              onClick={() => handleDelete(acc.id)}
              className="mt-3 text-red-500 flex items-center gap-1"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">

            <h2 className="text-lg font-semibold mb-4">
              Add Account
            </h2>

            <input
              placeholder="Account Name"
              className="w-full border p-2 mb-2"
              value={formData.account_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  account_name: e.target.value,
                })
              }
            />

            <input
              placeholder="Bank Name"
              className="w-full border p-2 mb-2"
              value={formData.bank_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bank_name: e.target.value,
                })
              }
            />

            <select
              className="w-full border p-2 mb-2"
              value={formData.account_type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  account_type: e.target.value,
                })
              }
            >
              <option>Savings</option>
              <option>Current</option>
              <option>Credit Card</option>
              <option>Wallet</option>
            </select>

            <input
              placeholder="Balance"
              className="w-full border p-2 mb-2"
              value={formData.balance}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  balance: e.target.value,
                })
              }
            />

            <input
              placeholder="Last 4 digits"
              className="w-full border p-2 mb-4"
              value={formData.last_four_digits}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  last_four_digits: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-2 border"
              >
                Cancel
              </button>

              <button
                onClick={handleCreate}
                className="px-3 py-2 bg-[#1a56db] text-white"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;