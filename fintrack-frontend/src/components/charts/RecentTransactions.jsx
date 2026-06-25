const RecentTransactions = ({ transactions }) => {
  return (
    <div className="space-y-4">
      {transactions.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b pb-3"
        >
          <div>
            <p className="font-medium">
              {item.title}
            </p>

            <p className="text-sm text-gray-500">
              {item.category}
            </p>
          </div>

          <span
            className={`font-semibold ${
              item.amount > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            ₹{item.amount.toLocaleString("en-IN")}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RecentTransactions;