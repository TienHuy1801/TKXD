import React from 'react';
import './chart.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function Chart({ title, data, dataKey, grid }) {
  return (
    <div className="chart">
      <h3 className="chart-title">{title}</h3>
      <ResponsiveContainer width="95%" aspect={3 / 1}>
        <LineChart data={data}>
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
          <YAxis />
          <XAxis dataKey="month" stroke="#5550bd" />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
