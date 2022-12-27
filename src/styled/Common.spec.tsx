import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import theme from "./../theme";

import { Button } from "./Common";

describe("Button styled-component test", () => {
  it("should be able render Button with default background color", () => {
    render(<Button data-testid="btn" theme={theme} />);

    expect(screen.getByTestId("btn")).toHaveStyle("background-color: #ddd");
  });

  it("should be able render Button with active={true}", () => {
    render(<Button data-testid="btn" theme={theme} active={true} />);

    expect(screen.getByTestId("btn")).toHaveStyle("background-color: #333");
  });
});
