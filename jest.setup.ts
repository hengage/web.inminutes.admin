import "@testing-library/jest-dom"; // Provides better assertions for React components
import { useRouter } from "next/navigation";

jest.mock("lucide-react", () => ({
  X: () => "MockedXIcon",
  LucideIcon: () => "MockedLucideIcon",
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock implementation for test cases
(useRouter as jest.Mock).mockReturnValue({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
});
