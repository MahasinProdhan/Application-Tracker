import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MonthlyChart = ({ data }) => (
  <div className="panel p-6">
    <h2 className="mb-6 text-lg font-semibold text-app-text">Monthly momentum</h2>
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e2e4" />
          <XAxis dataKey="label" tick={{ fill: "#45464d", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fill: "#45464d", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #c6c6cd",
              background: "#ffffff",
              color: "#1b1b1d",
            }}
          />
          <Bar dataKey="value" fill="#505f76" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default MonthlyChart;
