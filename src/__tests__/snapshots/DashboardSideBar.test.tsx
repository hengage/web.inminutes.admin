import { render } from "@testing-library/react";
import DashboardSidebar from "@/components/layouts/sidebar/DashboardSidebar";

test("Dashboard Sidebar Layout matches snapshot", () => {
  const { asFragment } = render(<DashboardSidebar />);
  expect(asFragment()).toMatchSnapshot();
});
