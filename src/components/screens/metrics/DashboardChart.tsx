import {
  useGetCustomersChartQuery,
  useGetProductsChartQuery,
  useGetRidersChartQuery,
  useGetVendorsChartQuery,
} from "@/api/metrics";
import {
  GraphProps,
  transformChartData,
  transformCompareChartData,
  transformVendorsChartData,
} from "@/lib/comon/order-utils";
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

export const Vendors = ({ startDate, endDate }: GraphProps) => {
  const { data, isLoading, error } = useGetVendorsChartQuery({
    fromDate: startDate,
    toDate: endDate,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const chartData = transformVendorsChartData(data || { totalVendors: [], activeVendors: [] });
  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No data available for the selected period
      </div>
    );
  }
  const maxCount = Math.max(
    ...chartData.map((item) => Math.max(item.Vendors, item.ActiveVendors)),
    1
  );
  const yAxisTicks = Array.from({ length: 5 }, (_, i) =>
    Math.ceil((Math.max(maxCount, 5) / 4) * i)
  );

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={yAxisTicks}
            tickFormatter={(value) => value.toString()}
            domain={[0, Math.max(maxCount, 5)]} // Ensure minimum range for visibility
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

export const Riders = ({ startDate, endDate }: GraphProps) => {
  const { data, isLoading, error } = useGetRidersChartQuery({
    fromDate: startDate,
    toDate: endDate,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const chartData = transformCompareChartData(data || { totalRiders: [], activeRiders: [] });
  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No data available for the selected period
      </div>
    );
  }

  const maxCount = Math.max(
    ...chartData.map((item) => Math.max(item.Riders, item.ActiveRiders)),
    1
  );
  const yAxisTicks = Array.from({ length: 5 }, (_, i) =>
    Math.ceil((Math.max(maxCount, 5) / 4) * i)
  );

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={yAxisTicks}
            tickFormatter={(value) => value.toString()}
            domain={[0, Math.max(maxCount, 5)]}
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

export const Customers = ({ startDate, endDate }: GraphProps) => {
  const { data, isLoading, error } = useGetCustomersChartQuery({
    fromDate: startDate,
    toDate: endDate,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const chartData = transformChartData(data || []);
  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No data available for the selected period
      </div>
    );
  }

  const maxCount = Math.max(...chartData.map((item) => item.count), 1);
  const yAxisTicks = Array.from({ length: 5 }, (_, i) => Math.ceil((maxCount / 4) * i));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={yAxisTicks}
            tickFormatter={(value) => value.toString()}
            domain={[0, Math.max(maxCount, 5)]}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "transparent", border: "none", boxShadow: "none" }}
            cursor={{ fill: "transparent" }}
          />
          <Legend wrapperStyle={{ bottom: -10 }} />
          <Bar dataKey="count" fill="#3F2BC3" barSize={18} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const Products = ({ startDate, endDate }: GraphProps) => {
  const { data, isLoading, error } = useGetProductsChartQuery({
    fromDate: startDate,
    toDate: endDate,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const chartData = transformChartData(data || []);
  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No data available for the selected period
      </div>
    );
  }

  const maxCount = Math.max(...chartData.map((item) => item.count), 1);
  const yAxisTicks = Array.from({ length: 5 }, (_, i) => Math.ceil((maxCount / 4) * i));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={yAxisTicks}
            tickFormatter={(value) => value.toString()}
            domain={[0, Math.max(maxCount, 5)]}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "transparent", border: "none", boxShadow: "none" }}
            cursor={{ fill: "transparent" }}
          />
          <Legend wrapperStyle={{ bottom: -10 }} />
          <Bar dataKey="count" fill="#3F2BC3" barSize={18} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
