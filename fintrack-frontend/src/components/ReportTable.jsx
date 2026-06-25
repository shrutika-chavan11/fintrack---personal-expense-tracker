const ReportTable = ({ data }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-50">
          <tr>
            <th className="text-left px-6 py-4">
              Category
            </th>

            <th className="text-right px-6 py-4">
              Income
            </th>

            <th className="text-right px-6 py-4">
              Expense
            </th>

            <th className="text-right px-6 py-4">
              Net
            </th>
          </tr>
        </thead>

        <tbody>

          {data.map((row) => (
            <tr
              key={row.category}
              className="border-t"
            >
              <td className="px-6 py-4">
                {row.category}
              </td>

              <td className="px-6 py-4 text-right text-green-600">
                ₹{row.income.toLocaleString("en-IN")}
              </td>

              <td className="px-6 py-4 text-right text-red-600">
                ₹{row.expense.toLocaleString("en-IN")}
              </td>

              <td className="px-6 py-4 text-right font-semibold">
                ₹{(row.income - row.expense).toLocaleString(
                  "en-IN"
                )}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ReportTable;