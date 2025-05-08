"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const Vendors = () => {
  const data = [
    { date: "Dec 23", Vendors: 2000, ActiveVendors: 1500 },
    { date: "Dec 24", Vendors: 3500, ActiveVendors: 2000 },
    { date: "Dec 25", Vendors: 2800, ActiveVendors: 2200 },
    { date: "Dec 26", Vendors: 4500, ActiveVendors: 3000 },
    { date: "Dec 27", Vendors: 4000, ActiveVendors: 2500 },
    { date: "Dec 28", Vendors: 3800, ActiveVendors: 2700 },
    { date: "Dec 29", Vendors: 3200, ActiveVendors: 2300 },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={[0, 1000, 2000, 3000, 4000, 5000]}
            tickFormatter={(value) => (value === 0 ? "0" : `${value / 1000}k`)}
          />
          <Tooltip />
          <Legend wrapperStyle={{ bottom: -10 }} />
          <Bar dataKey="Vendors" fill="#3F2BC3" barSize={18} radius={[4, 4, 0, 0]} />
          <Bar dataKey="ActiveVendors" fill="#FF7D0C" barSize={18} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export const Riders = () => {
  const data = [
    { date: "Dec 23", Riders: 2000, ActiveRiders: 1500 },
    { date: "Dec 24", Riders: 3500, ActiveRiders: 2000 },
    { date: "Dec 25", Riders: 2800, ActiveRiders: 2200 },
    { date: "Dec 26", Riders: 4500, ActiveRiders: 3000 },
    { date: "Dec 27", Riders: 4000, ActiveRiders: 2500 },
    { date: "Dec 28", Riders: 3800, ActiveRiders: 2700 },
    { date: "Dec 29", Riders: 3200, ActiveRiders: 2300 },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={[0, 1000, 2000, 3000, 4000, 5000]}
            tickFormatter={(value) => (value === 0 ? "0" : `${value / 1000}k`)}
          />
          <Tooltip />
          <Legend wrapperStyle={{ bottom: -10 }} />
          <Bar dataKey="Riders" fill="#3F2BC3" barSize={18} radius={[4, 4, 0, 0]} />
          <Bar dataKey="ActiveRiders" fill="#FF7D0C" barSize={18} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export const Customers = () => {
  const data = [
    { date: "Dec 23", Customers: 2000, ActiveCustomers: 1500 },
    { date: "Dec 24", Customers: 3500, ActiveCustomers: 2000 },
    { date: "Dec 25", Customers: 2800, ActiveCustomers: 2200 },
    { date: "Dec 26", Customers: 4500, ActiveCustomers: 3000 },
    { date: "Dec 27", Customers: 4000, ActiveCustomers: 2500 },
    { date: "Dec 28", Customers: 3800, ActiveCustomers: 2700 },
    { date: "Dec 29", Customers: 3200, ActiveCustomers: 2300 },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={[0, 1000, 2000, 3000, 4000, 5000]}
            tickFormatter={(value) => (value === 0 ? "0" : `${value / 1000}k`)}
          />
          <Tooltip />
          <Legend wrapperStyle={{ bottom: -10 }} />
          <Bar dataKey="Customers" fill="#3F2BC3" barSize={18} radius={[4, 4, 0, 0]} />
          <Bar dataKey="ActiveCustomers" fill="#FF7D0C" barSize={18} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
