import { useState, useEffect } from "react";
import { X } from "lucide-react";

const BudgetModal = ({
  open,
  onClose,
  selectedBudget,
}) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (selectedBudget) {
      setCategory(selectedBudget.category);
      setAmount(selectedBudget.budget);
    }
  }, [selectedBudget]);

  if (!open) return null;

  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token"); // adjust to wherever you store it

  await fetch("/api/budgets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ category, budget_amount: amount }),
  });

  onClose();
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl w-full max-w-md">

        <div className="flex justify-between items-center p-5 border-b">

          <h2 className="text-lg font-semibold">
            Set Budget
          </h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4"
        >

          <input
  type="text"
  placeholder="Category name (e.g. Food, Rent...)"
  className="w-full border rounded-lg px-3 py-2"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
/>

          <input
            type="number"
            placeholder="Budget Amount"
            className="w-full border rounded-lg px-3 py-2"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

          <button
            type="submit"
            className="w-full bg-[#1a56db] text-white py-2 rounded-lg"
          >
            Save Budget
          </button>

        </form>

      </div>
    </div>
  );
};

export default BudgetModal;