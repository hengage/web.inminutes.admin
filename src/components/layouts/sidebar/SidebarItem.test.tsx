import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import { silentError } from "@root/jest.setup";

// Mock `iconPaths` with predictable values
jest.mock("../../../../public/icons/iconPaths", () => ({
  iconPaths: {
    "sidebar.dashboard.base": "/icons/svg/sidebar/home.svg",
    "sidebar.dashboard.active": "/icons/svg/sidebar/home-active.svg",
    "sidebar.vendor.base": "/icons/svg/sidebar/vendor.svg",
    "sidebar.vendor.active": "/icons/svg/sidebar/vendor-active.svg",
  },
}));

describe("SidebarItem", () => {
  let warnConsole: unknown | null = null;

  beforeAll(() => {
    warnConsole = silentError(['Icon "undefined" not found'], "warn");
  });

  afterAll(() => {
    console.warn = warnConsole as typeof console.warn;
  });

  test("renders with active state when pathname matches href", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");

    render(<SidebarItem label="Dashboard" href="/dashboard" />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    // expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute("href", "/dashboard");
  });

  test("renders with inactive state when pathname does not match href", () => {
    (usePathname as jest.Mock).mockReturnValue("/vendor");

    render(<SidebarItem label="Dashboard" href="/dashboard" />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    // expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute("href", "/dashboard");
  });

  //   test("selects the correct active icon when pathname matches href", () => {
  //     (usePathname as jest.Mock).mockReturnValue("/dashboard");

  //     render(<SidebarItem label="Dashboard" href="/dashboard" />);

  //     // Active icon should be used
  //     expect(screen.getByRole("img")).toHaveAttribute("name", "dashboard-active");
  //   });

  //   test("selects the correct base icon when pathname does not match href", () => {
  //     (usePathname as jest.Mock).mockReturnValue("/settings");

  //     render(<SidebarItem label="Dashboard" href="/dashboard" />);

  //     // Base icon should be used
  //     expect(screen.getByRole("link")).toHaveAttribute("name", "dashboard-base");
  //   });

  test("applies 'ctm-primary' variant when pathname matches href", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");

    render(<SidebarItem label="Dashboard" href="/dashboard" />);

    // Check if the button has the correct variant class or prop
    const button = screen.getByRole("link");
    expect(button).toHaveClass("text-white");
  });

  test("applies 'ctm-outline' variant when pathname does not match href", () => {
    (usePathname as jest.Mock).mockReturnValue("/settings");

    render(<SidebarItem label="Dashboard" href="/dashboard" />);

    const button = screen.getByRole("link");
    expect(button).toHaveClass("hover:text-white");
  });
});
