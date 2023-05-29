import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";

describe("Home Page", () => {
  it("should render", () => {
    render(<Home />);
  });

  it("should have initial page number set to 1", () => {
    const home = render(<Home />);
    const pageNumber = home.getByText("Page: 1");
    expect(pageNumber).toBeInTheDocument();
  });

  it("should increase page number by 1", () => {
    const home = render(<Home />);
    const pageNumber = home.getByText("Page: 1");
    const incrementButton = home.getByText(">");
    fireEvent.click(incrementButton);
    expect(pageNumber.textContent).toBe("Page: 2");
  });
});
