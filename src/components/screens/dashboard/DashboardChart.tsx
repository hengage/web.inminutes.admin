import { useGetGraphDataQuery } from "@/api/dashboard";
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
export type Timeframe =
  | "today"
  | "yesterday"
  | "lastWeek"
  | "lastMonth"
  | "thisYear"
  | "lastYear"
  | "custom";

interface GraphProps {
  timeFrame: Timeframe;
  startDate?: Date | null | undefined;
  endDate?: Date | null | undefined;
}

export const Vendors = ({ timeFrame, startDate, endDate }: GraphProps) => {
  const filter = {
    service: "vendors",
    timeframe: timeFrame,
    ...(timeFrame === "custom" && { startDate, endDate }),
  };

  const { data, isLoading, error } = useGetGraphDataQuery(filter);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data?.data?.series} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={[0, 1000, 2000, 3000, 4000, 5000]}
            tickFormatter={(value) => (value === 0 ? "0" : `${value / 1000}k`)}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "transparent", border: "none", boxShadow: "none" }}
            cursor={{ fill: "transparent" }}
          />
          <Legend wrapperStyle={{ bottom: -10 }} />
          <Bar dataKey="Vendors" fill="#3F2BC3" barSize={18} radius={[4, 4, 0, 0]} />
          <Bar dataKey="ActiveVendors" fill="#FF7D0C" barSize={18} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const Riders = ({ timeFrame, startDate, endDate }: GraphProps) => {
  const filter = {
    service: "riders",
    timeframe: timeFrame,
    ...(timeFrame === "custom" && { startDate, endDate }),
  };

  const { data, isLoading, error } = useGetGraphDataQuery(filter);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data?.data?.series} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={[0, 1000, 2000, 3000, 4000, 5000]}
            tickFormatter={(value) => (value === 0 ? "0" : `${value / 1000}k`)}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "transparent", border: "none", boxShadow: "none" }}
            cursor={{ fill: "transparent" }}
          />
          <Legend wrapperStyle={{ bottom: -10 }} />
          <Bar dataKey="Riders" fill="#3F2BC3" barSize={18} radius={[4, 4, 0, 0]} />
          <Bar dataKey="ActiveRiders" fill="#FF7D0C" barSize={18} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const Customers = ({ timeFrame, startDate, endDate }: GraphProps) => {
  const filter = {
    service: "customers",
    timeframe: timeFrame,
    ...(timeFrame === "custom" && { startDate, endDate }),
  };

  const { data, isLoading, error } = useGetGraphDataQuery(filter);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data?.data?.series} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={[0, 1000, 2000, 3000, 4000, 5000]}
            tickFormatter={(value) => (value === 0 ? "0" : `${value / 1000}k`)}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "transparent", border: "none", boxShadow: "none" }}
            cursor={{ fill: "transparent" }}
          />
          <Legend wrapperStyle={{ bottom: -10 }} />
          <Bar dataKey="Customers" fill="#3F2BC3" barSize={18} radius={[4, 4, 0, 0]} />
          <Bar dataKey="ActiveCustomers" fill="#FF7D0C" barSize={18} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
