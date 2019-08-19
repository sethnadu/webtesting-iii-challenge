import React from 'react';
import renderer from 'react-test-renderer'; 
import { render, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard"

describe('<Dashboard />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Dashboard />); 
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('close gate button toggles to open on click', () => {
    const {getByText, queryByText} = render(<Dashboard/>)
    const buttonClosed = getByText(/close gate/i)

    expect(queryByText(/close gate/i)).toBeTruthy()
    expect(queryByText(/Open Gate/i)).toBeFalsy()
    fireEvent.click(buttonClosed)
    expect(queryByText(/Open Gate/i)).toBeTruthy()
    expect(queryByText(/close gate/i)).toBeFalsy()
    fireEvent.click(buttonClosed)
    expect(queryByText(/close gate/i)).toBeTruthy()
    expect(queryByText(/Open Gate/i)).toBeFalsy()
  });
  
  it('lock button toggles to open on click', () => {
    const {getByText, queryByText} = render(<Dashboard/>)
    const buttonlocked = getByText(/lock gate/i)
    const buttonClosed = getByText(/close gate/i)

    fireEvent.click(buttonClosed)
    expect(queryByText(/lock gate/i)).toBeTruthy()
    expect(queryByText(/unlock Gate/i)).toBeFalsy()
    fireEvent.click(buttonlocked)
    expect(queryByText(/unlock Gate/i)).toBeTruthy()
    // expect(queryByText(/lock gate/i)).toBeFalsy()
    fireEvent.click(buttonlocked)
    expect(queryByText(/lock gate/i)).toBeTruthy()
    expect(queryByText(/unlock Gate/i)).toBeFalsy() 
  })
});