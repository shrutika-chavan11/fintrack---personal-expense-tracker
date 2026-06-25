const ComparisonTable = ({ data }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

      <div className="p-5 border-b">
        <h3 className="font-semibold">
          Month Comparison
        </h3>
      </div>

      <table className="w-full">

        <thead className="bg-gray-50">
          <tr>
            <th className="text-left px-6 py-4">
              Category
            </th>

            <th className="text-right px-6 py-4">
              June
            </th>

            <th className="text-right px-6 py-4">
              May
            </th>
          </tr>
        </thead>

        <tbody>

          {data.map((item) => (
            <tr
              key={item.category}
              className="border-t"
            >
              <td className="px-6 py-4">
                {item.category}
              </td>

              <td className="px-6 py-4 text-right">
                ₹{item.june.toLocaleString("en-IN")}
              </td>

              <td className="px-6 py-4 text-right">
                ₹{item.may.toLocaleString("en-IN")}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ComparisonTable;