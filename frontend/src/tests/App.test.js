import React from "react";
import { fireEvent, render } from '@testing-library/react';
import App from '../components/App';

it("renders without crashing", function () {
  render(<App/>);
});

it("render matches snapshot", function () {
  const {asFragment} = render(<App/>);
  expect(asFragment()).toMatchSnapshot();
});


it("works when you click on the login and register button", function() {
  const { queryByText } = render(<App />);

  // expect the first window to show 
  expect(queryByText("The place to find your next destination")).toBeInTheDocument();
  expect(queryByText("World")).not.toBeInTheDocument();

  // move forward to register form
  const registerButton = queryByText("Register");
  fireEvent.click(registerButton);

  // expect register form to show
  expect(queryByText("Username")).toBeInTheDocument();
  expect(queryByText("Password")).toBeInTheDocument();
  expect(queryByText("First Name")).toBeInTheDocument();
  expect(queryByText("Last Name")).toBeInTheDocument();
  expect(queryByText("Email")).toBeInTheDocument();
  expect(queryByText("World")).not.toBeInTheDocument();

  // move forward to login form
  const loginButton = queryByText("Login");
  fireEvent.click(loginButton);

  // expect login form to show
  expect(queryByText("Username")).toBeInTheDocument();
  expect(queryByText("Password")).toBeInTheDocument();
  expect(queryByText("Email")).not.toBeInTheDocument();
  expect(queryByText("World")).not.toBeInTheDocument();
});

it("works when you set values in the login inputs", function() {
  const { queryByText, queryByLabelText } = render(<App />);

  // expect login form to show 
  expect(queryByText("Username")).toBeInTheDocument();
  expect(queryByText("Password")).toBeInTheDocument();
  expect(queryByText("Email")).not.toBeInTheDocument();
  expect(queryByText("World")).not.toBeInTheDocument();

  const usernameInput = queryByLabelText("Username");
  fireEvent.change(usernameInput, {target: {value: "test"}});
  expect(usernameInput.value).toBe('test');
  
  const passwordInput = queryByLabelText("Password");
  fireEvent.change(passwordInput, {target: {value: "password"}});
  expect(passwordInput.value).toBe('password');
});
