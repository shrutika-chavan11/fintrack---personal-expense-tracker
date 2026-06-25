import { useEffect, useState } from "react";
import api from "../api/axios";
import { Pencil, Trash2, X, Check } from "lucide-react";

const Budget = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ category: "", budget_amount: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ category: "", budget_amount: "" });

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchBudget = async () => {
    const res = await api.get("/budgets/progress", { headers });
    setData(res.data);
  };

  useEffect(() => { fetchBudget(); }, []);

  const handleSave = async () => {
    if (!form.category || !form.budget_amount) return;
    await api.post("/budgets", form, { headers });
    setForm({ category: "", budget_amount: "" });
    fetchBudget();
  };

  const handleEditStart = (b) => {
    setEditingId(b.id);
    setEditForm({ category: b.category, budget_amount: b.budget_amount });
  };

  const handleEditSave = async (id) => {
    await api.put(`/budgets/${id}`, editForm, { headers });
    setEditingId(null);
    fetchBudget();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this budget?")) return;
    await api.delete(`/budgets/${id}`, { headers });
    fetchBudget();
  };

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-xl font-semibold">Budget Tracker</h1>

      {/* ADD FORM */}
      <div className="bg-white p-4 border rounded-lg flex gap-3">
        <input
          placeholder="Category"
          className="border p-2 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          placeholder="Budget Amount"
          className="border p-2 rounded"
          value={form.budget_amount}
          onChange={(e) => setForm({ ...form, budget_amount: e.target.value })}
        />
        <button
          onClick={handleSave}
          className="bg-[#1a56db] text-white px-4 rounded"
        >
          Save
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((b) => {
          const percent = (b.spent / b.budget_amount) * 100;
          let color = "bg-green-500";
          if (percent > 90) color = "bg-red-500";
          else if (percent > 70) color = "bg-yellow-500";

          const isEditing = editingId === b.id;

          return (
            <div key={b.id} className="bg-white p-4 border rounded-lg space-y-2">

              {isEditing ? (
                /* EDIT MODE */
                <div className="space-y-2">
                  <input
                    className="w-full border p-1 rounded text-sm"
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="w-full border p-1 rounded text-sm"
                    value={editForm.budget_amount}
                    onChange={(e) =>
                      setEditForm({ ...editForm, budget_amount: e.target.value })
                    }
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditSave(b.id)}
                      className="flex items-center gap-1 text-green-600 text-sm"
                    >
                      <Check size={14} /> Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex items-center gap-1 text-gray-500 text-sm"
                    >
                      <X size={14} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* VIEW MODE */
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-semibold">{b.category}</h2>
                      <p className="text-sm text-gray-500">
                        ₹{b.spent} / ₹{b.budget_amount}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditStart(b)}
                        className="text-gray-400 hover:text-[#1a56db]"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded mt-2">
                    <div
                      className={`h-2 rounded ${color}`}
                      style={{ width: `${Math.min(percent, 100)}%` }}
                    />
                  </div>

                  <p className="text-right text-xs">
                    {percent.toFixed(0)}%
                  </p>
                </>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Budget;