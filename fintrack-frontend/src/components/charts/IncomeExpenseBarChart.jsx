import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const IncomeExpenseBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />

        <Bar dataKey="income" fill="#057a55" />
        <Bar dataKey="expense" fill="#e02424" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeExpenseBarChart;