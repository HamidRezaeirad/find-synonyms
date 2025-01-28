import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Navbar from "../../components/Navbar";

describe("Navbar", () => {
  it("renders the Synonyms Finder title", () => {
    render(<Navbar />);
    const titleElement = screen.getByText(/Synonyms Finder/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the AdbIcon", () => {
    render(<Navbar />);
    const adbIcon = screen.getByTestId("AdbIcon");
    expect(adbIcon).toBeInTheDocument();
  });

  it("renders the PersonOutlineIcon", () => {
    render(<Navbar />);
    const personIcon = screen.getByTestId("PersonOutlineIcon");
    expect(personIcon).toBeInTheDocument();
  });

  it("renders the NotificationsNoneIcon", () => {
    render(<Navbar />);
    const notificationsIcon = screen.getByTestId("NotificationsNoneIcon");
    expect(notificationsIcon).toBeInTheDocument();
  });
});
