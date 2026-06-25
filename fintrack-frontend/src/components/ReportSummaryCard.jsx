const ReportSummaryCard = ({
  title,
  amount,
  color,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2
        className="text-3xl font-bold mt-2"
        style={{ color }}
      >
        ₹{amount.toLocaleString("en-IN")}
      </h2>
    </div>
  );
};

export default ReportSummaryCard;