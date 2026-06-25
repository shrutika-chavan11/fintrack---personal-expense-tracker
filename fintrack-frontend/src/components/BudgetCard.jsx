import { Pencil } from "lucide-react";

const BudgetCard = ({ item, onEdit }) => {
  const percentage = Math.min(
    Math.round((item.spent / item.budget) * 100),
    100
  );

  const getColor = () => {
    if (percentage < 70) return "bg-green-500";
    if (percentage < 90) return "bg-amber-500";
    return "bg-red-500";
  };

  const getTextColor = () => {
    if (percentage < 70) return "text-green-600";
    if (percentage < 90) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">

      <div className="flex justify-between items-start mb-4">

        <div className="flex items-center gap-3">
          <span className="text-2xl">
            {item.icon}
          </span>

          <div>
            <h3 className="font-semibold text-gray-900">
              {item.category}
            </h3>

            <p className="text-sm text-gray-500">
              ₹{item.spent.toLocaleString("en-IN")} /
              ₹{item.budget.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <button
          onClick={() => onEdit(item)}
          className="text-gray-500 hover:text-[#1a56db]"
        >
          <Pencil size={18} />
        </button>

      </div>

      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500">
          Usage
        </span>

        <span
          className={`text-sm font-semibold ${getTextColor()}`}
        >
          {percentage}%
        </span>
      </div>

      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">

        <div
          className={`h-full ${getColor()} transition-all`}
          style={{ width: `${percentage}%` }}
        />

      </div>

    </div>
  );
};

export default BudgetCard;