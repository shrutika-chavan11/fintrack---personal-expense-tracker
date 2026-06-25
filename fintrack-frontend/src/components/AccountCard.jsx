import {
  Wallet,
  CreditCard,
  Landmark,
} from "lucide-react";

const AccountCard = ({ account }) => {
  const getIcon = () => {
    switch (account.type) {
      case "Savings":
        return <Landmark size={22} />;
      case "Credit":
        return <CreditCard size={22} />;
      default:
        return <Wallet size={22} />;
    }
  };

  const getBadgeColor = () => {
    switch (account.type) {
      case "Savings":
        return "bg-blue-100 text-blue-700";
      case "Credit":
        return "bg-red-100 text-red-700";
      default:
        return "bg-purple-100 text-purple-700";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-semibold text-gray-900">
            {account.bankName}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {account.nickname}
          </p>
        </div>

        {getIcon()}
      </div>

      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor()}`}
      >
        {account.type}
      </span>

      <p className="text-gray-500 text-sm mt-5">
        ****{account.last4}
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-2">
        ₹{account.balance.toLocaleString("en-IN")}
      </h2>
    </div>
  );
};

export default AccountCard;