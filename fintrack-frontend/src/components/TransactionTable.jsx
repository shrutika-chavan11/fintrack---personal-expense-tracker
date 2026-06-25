import { Pencil, Trash2 } from "lucide-react";

const TransactionTable = ({ transactions }) => {
  const getBadge = (type) => {
    switch (type) {
      case "Income":
        return "bg-green-100 text-green-700";

      case "Expense":
        return "bg-red-100 text-red-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">
            <tr>

              <th className="text-left px-6 py-4">
                Date
              </th>

              <th className="text-left px-6 py-4">
                Account
              </th>

              <th className="text-left px-6 py-4">
                Category
              </th>

              <th className="text-left px-6 py-4">
                Note
              </th>

              <th className="text-left px-6 py-4">
                Type
              </th>

              <th className="text-right px-6 py-4">
                Amount
              </th>

              <th className="text-center px-6 py-4">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {transactions.map((item, index) => (
              <tr
                key={item.id}
                className={
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50"
                }
              >

                <td className="px-6 py-4">
                  {item.date}
                </td>

                <td className="px-6 py-4">
                  {item.account}
                </td>

                <td className="px-6 py-4">
                  {item.category}
                </td>

                <td className="px-6 py-4">
                  {item.note}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getBadge(
                      item.type
                    )}`}
                  >
                    {item.type}
                  </span>

                </td>

                <td
                  className={`px-6 py-4 text-right font-semibold ${
                    item.type === "Income"
                      ? "text-green-600"
                      : item.type === "Expense"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  ₹{item.amount.toLocaleString("en-IN")}
                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <button className="text-gray-600 hover:text-[#1a56db]">
                      <Pencil size={18} />
                    </button>

                    <button className="text-gray-600 hover:text-red-600">
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TransactionTable;