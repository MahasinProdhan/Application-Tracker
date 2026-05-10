import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#505f76", "#d3e4fe", "#b7c8e1", "#dae2fd", "#dec29a", "#e4e2e4"];

const StatusChart = ({ data }) => (
  <div className="panel p-6">
    <h2 className="mb-6 text-lg font-semibold text-app-text">Status breakdown</h2>
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="status" innerRadius={60} outerRadius={100}>
            {data.map((entry, index) => (
              <Cell key={entry.status} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #c6c6cd",
              background: "#ffffff",
              color: "#1b1b1d",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default StatusChart;
