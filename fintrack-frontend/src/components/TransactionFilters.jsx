const TransactionFilters = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">

        <select className="border rounded-lg px-3 py-2">
          <option>All Types</option>
          <option>Income</option>
          <option>Expense</option>
          <option>Transfer</option>
        </select>

        <select className="border rounded-lg px-3 py-2">
          <option value="">All Categories</option>
          {budgetCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        
        <select className="border rounded-lg px-3 py-2">
          <option>All Accounts</option>
          <option>HDFC Savings</option>
          <option>ICICI Credit</option>
        </select>

        <input
          type="date"
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="date"
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-3 py-2"
        />

      </div>

    </div>
  );
};

export default TransactionFilters;