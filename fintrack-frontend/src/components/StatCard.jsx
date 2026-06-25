const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2
            className="text-2xl font-semibold mt-2"
            style={{ color }}
          >
            {value}
          </h2>
        </div>

        <Icon size={26} style={{ color }} />
      </div>
    </div>
  );
};

export default StatCard;