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
    // const buttonlocked = getByText(/lock gate/i)

  
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
    expect(queryByText(/Lock Gate/)).toBeTruthy()
    expect(queryByText(/Unlock Gate/)).toBeFalsy()
    fireEvent.click(buttonlocked)
    expect(queryByText(/Unlock Gate/)).toBeTruthy()
    expect(queryByText(/Lock Gate/)).toBeFalsy()
    fireEvent.click(buttonlocked)
    expect(queryByText(/Lock Gate/)).toBeTruthy()
    expect(queryByText(/Unlock Gate/)).toBeFalsy() 
  })


  it("'close gate' button disables and enables 'lock gate' button", ()=> {
    const {getByText} = render(<Dashboard/>)
    const buttonClosed = getByText(/close gate/i)
    const buttonlocked = getByText(/lock gate/i)
    expect(buttonlocked.disabled).toBe(true);
    fireEvent.click(buttonClosed)
    expect(buttonlocked.disabled).toBe(false);
  })


  it("'lock gate' button disables and enables 'close gate' button", ()=> {
    const {getByText} = render(<Dashboard/>)
    const buttonClosed = getByText(/close gate/i)
    const buttonlocked = getByText(/lock gate/i)

    fireEvent.click(buttonClosed)
    fireEvent.click(buttonlocked)
    expect(buttonClosed.disabled).toBe(true);
    fireEvent.click(buttonlocked)
    expect(buttonClosed.disabled).toBe(false);
  })

  it("toggles 'open div' on 'close' button click", () => {
    const {getByText} = render (<Dashboard />)
    const closeButton = getByText(/close gate/i)
    const openDiv = getByText(/open/i)

    expect(openDiv.className).toBe('led green-led')
    fireEvent.click(closeButton)
    expect(openDiv.className).toBe('led red-led')
    fireEvent.click(closeButton)
    expect(openDiv.className).toBe('led green-led')
    

  })

  it("toggles 'lock div' on 'lock' button click", () => {
    const {getByText} = render (<Dashboard />)
    const closeButton = getByText(/close gate/i)
    const lockButton = getByText(/lock gate/i)
    const lockDiv = getByText(/unlocked/i)

    expect(lockDiv.className).toBe('led green-led')
    fireEvent.click(closeButton)
    fireEvent.click(lockButton)
    expect(lockDiv.className).toBe('led red-led')
    fireEvent.click(lockButton)
    expect(lockDiv.className).toBe('led green-led')
    

  })

});