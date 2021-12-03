import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';



// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm />);
});

test("shows success message on submit with form details", async () => {
    render(<CheckoutForm />)
    const firstNameField = screen.getByLabelText(/first name:/i);
    const lastNameField = screen.getByLabelText(/last name:/i);
    const addressField = screen.getByLabelText(/address:/i);
    const cityField = screen.getByLabelText(/city:/i);
    const stateField = screen.getByLabelText(/state:/i);
    const zipField = screen.getByLabelText(/zip:/i);
    const checkoutButton = screen.getByRole('button');

    userEvent.type(firstNameField, 'firstName');
    userEvent.type(lastNameField, 'lastName');
    userEvent.type(addressField, 'address');
    userEvent.type(cityField, 'city');
    userEvent.type(stateField, 'STATE');
    userEvent.type(zipField, '12345');
    userEvent.click(checkoutButton);

    await waitFor(() => {
        const successMessage = screen.queryByTestId('successMessage');

        expect(successMessage).toBeInTheDocument();
        expect(successMessage).toHaveTextContent('firstName lastName');
        expect(successMessage).toHaveTextContent('address');
        expect(successMessage).toHaveTextContent('city, STATE 12345');
    });
});
