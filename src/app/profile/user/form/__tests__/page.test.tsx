import { screen, fireEvent, act } from "@testing-library/react";
import UserForm from "../page";
import { renderWithProviders } from "@/test/test-utils";

const mockRouter = {
  push: jest.fn(),
  back: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

describe("UserForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form fields correctly", () => {
    renderWithProviders(<UserForm />);
    
    expect(screen.getByLabelText("Department")).toBeInTheDocument();
    expect(screen.getByLabelText("Role")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Custom Field")).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    const { store } = renderWithProviders(<UserForm />);

    await act(async () => {
      // Fill form fields
      fireEvent.change(screen.getByLabelText("Department"), {
        target: { value: "engineering" },
      });
      fireEvent.change(screen.getByLabelText("Role"), {
        target: { value: "developer" },
      });
      fireEvent.change(screen.getByLabelText("Username"), {
        target: { value: "testuser" },
      });
      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "test@example.com" },
      });

      // Submit form
      fireEvent.click(screen.getByText("Submit"));
    });

    // Check form submission started
    expect(store.getState().form.loading).toBe(true);
  });

  it("handles back button navigation", () => {
    renderWithProviders(<UserForm />);
    
    fireEvent.click(screen.getByText("Back"));
    expect(mockRouter.back).toHaveBeenCalled();
  });
});
