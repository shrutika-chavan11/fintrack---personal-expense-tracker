import { useState } from "react";
import { X } from "lucide-react";

const AddAccountModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    accountName: "",
    bankName: "",
    accountType: "Savings",
    balance: "",
    last4: "",
  });

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

      <div className="bg-white rounded-xl w-full max-w-md">

        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold">
            Add Account
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
            placeholder="Account Name"
            className="w-full border rounded-lg px-3 py-2"
            value={formData.accountName}
            onChange={(e) =>
              setFormData({
                ...formData,
                accountName: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Bank Name"
            className="w-full border rounded-lg px-3 py-2"
            value={formData.bankName}
            onChange={(e) =>
              setFormData({
                ...formData,
                bankName: e.target.value,
              })
            }
          />

          <select
            className="w-full border rounded-lg px-3 py-2"
            value={formData.accountType}
            onChange={(e) =>
              setFormData({
                ...formData,
                accountType: e.target.value,
              })
            }
          >
            <option>Savings</option>
            <option>Credit</option>
            <option>Wallet</option>
          </select>

          <input
            type="number"
            placeholder="Starting Balance"
            className="w-full border rounded-lg px-3 py-2"
            value={formData.balance}
            onChange={(e) =>
              setFormData({
                ...formData,
                balance: e.target.value,
              })
            }
          />

          <input
            type="text"
            maxLength={4}
            placeholder="Last 4 Digits"
            className="w-full border rounded-lg px-3 py-2"
            value={formData.last4}
            onChange={(e) =>
              setFormData({
                ...formData,
                last4: e.target.value,
              })
            }
          />

          <button
            type="submit"
            className="w-full bg-[#1a56db] text-white py-2 rounded-lg"
          >
            Add Account
          </button>

        </form>

      </div>
    </div>
  );
};

export default AddAccountModal;