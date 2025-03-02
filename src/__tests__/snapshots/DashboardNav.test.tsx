import { render } from "@testing-library/react";
import DashboardNav from "@/components/layouts/DashboardNav";

test("Dashboard Nav Layout matches snapshot", () => {
  const { asFragment } = render(<DashboardNav />);
  expect(asFragment()).toMatchSnapshot();
});
