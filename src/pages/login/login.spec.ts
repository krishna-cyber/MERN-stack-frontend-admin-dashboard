import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage from "./LoginPage.tsx";

describe("Login page", () => {
  it("should render ", () => {
    render(<LoginPage />);
    screen.debug();
    expect(screen.getByText("LoginPage")).toBeInTheDocument();
  });

  it("2 * 2 equals 4", () => {
    expect(2 * 2).toBe(4);
  });
});
