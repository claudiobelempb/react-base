import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

describe("<Button />", () => {
  it('should render the button with the title "Load more"', () => {
    render(<Button title={"Load more"} />);

    expect.assertions(1);
    const button = screen.getByRole("button", {name: /load more/i});

    expect(button).toBeInTheDocument();
  });

  it("should call function on button click", () => {
    const fn = jest.fn();
    render(
      <Button 
        title={"Load more"} 
        onClick={fn}
      />
    );

    const button = screen.getByRole("button", {name: /load more/i});
    userEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disable is true", () => {
    render(
      <Button 
        title={"Load more"} 
        disabled={true}
      />
    );

    const button = screen.getByRole("button", {name: /load more/i});
    userEvent.click(button);

    expect(button).toBeDisabled();
  });

  it("should be enabled when disable is false", () => {
    render(
      <Button 
        title={"Load more"} 
        disabled={false}
      />
    );

    const button = screen.getByRole("button", {name: /load more/i});
    userEvent.click(button);

    expect(button).toBeEnabled();
  });
});